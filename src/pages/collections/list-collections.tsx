import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CategoryBadge } from "../../components/CategoryBadge";
import LoadingSpinner from "../../components/LoadingIcon";
import { DeleteCollectionModal } from "../../components/utils/DeleteCollectionModal";

import { api } from "../../utils/api";

const Collections: NextPage = () => {
  const session = useSession();
  const [searchState, setSearchState] = useState("");
  const [deleteModalState, setDeleteModalState] = useState({
    open: false,
    id: "",
    name: "",
  });

  const router = useRouter();

  function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  }
  const debouncedSearchTerm = useDebounce(searchState, 500);

  const collections = api.collectionsRouter.getCollections.useQuery({
    searchText: debouncedSearchTerm,
  });

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="flex h-screen w-screen justify-center overflow-y-auto p-4">
      <div>
        <div className="flex w-full flex-col items-center justify-between gap-4 p-8 xl:flex-grow xl:flex-row">
          <div className="flex justify-between">
            <form className="flex w-96">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 font-body text-sm font-medium text-brand-offWhite"
              >
                Search
              </label>
              <div className="relative grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  id="collection-search"
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="block w-full rounded-lg border  border-gray-600 bg-gray-700 p-2.5  pl-10 text-sm text-brand-offWhite placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search Collections"
                />
              </div>
            </form>
          </div>
          <div className="pt-8 xl:pt-2">
            <Link
              href={"/collections/create-collection"}
              className="mt-1 focus:outline-none xl:p-0"
            >
              <button
                type="button"
                className="mb-2 divide-x-4 rounded-lg bg-brand-offWhite px-5 py-2.5 text-sm font-medium text-brand-gray hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
              >
                Create Collection
              </button>
            </Link>
          </div>
        </div>
        <div
          className={
            "grid grid-cols-1 gap-12 p-8 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
          }
        >
          {collections.isLoading && (
            <div
              role="status"
              className="xl flex h-2/3 w-[24rem] items-center justify-center text-center xl:flex-grow xl:flex-row xl:justify-end"
            >
              <LoadingSpinner />
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {collections.isError && <p>Error Fetching Collection Data :/</p>}
          {collections.data?.length === 0 && (
            <h5 className="flex h-2/3 w-[24rem] items-center justify-center text-2xl font-bold tracking-tight text-brand-offWhite xl:flex-grow xl:flex-row xl:justify-start">
              <p>No Collections Found.</p>
            </h5>
          )}
          {collections.data?.map((collection) => {
            return (
              <div
                key={collection.id}
                onClick={() =>
                  void router.push(
                    `/collections/edit-collection/${collection.id}/cards`
                  )
                }
                className="duration-250 mb-6 flex transform transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
              >
                <div
                  key={collection.id}
                  className="flex w-[24rem] grow flex-col rounded-lg bg-gray-800 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex justify-between gap-4">
                    <span>
                      <CategoryBadge categoryName={collection.category} />
                    </span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex gap-2 p-4"
                    >
                      <Link
                        href={`/collections/edit-collection/${collection.id}/general`}
                      >
                        <button
                          data-bs-toggle="tooltip"
                          data-bs-placement="center"
                          title="Edit Details"
                          onClick={(e) => {
                            e.preventDefault();
                            void router.push(
                              `/collections/edit-collection/${collection.id}/general`
                            );
                          }}
                          className="z-[500] flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue"
                        >
                          <PencilIcon className="h-5 w-5 text-brand-offWhite" />
                        </button>
                      </Link>
                      <button
                        data-bs-toggle="tooltip"
                        data-bs-placement="center"
                        title="Edit Cards"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          void router.push(
                            `/collections/edit-collection/${collection.id}/cards`
                          );
                        }}
                        className="flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue"
                      >
                        <Square2StackIcon className="h-5 w-5 text-brand-offWhite" />
                      </button>
                      <button
                        data-bs-toggle="tooltip"
                        data-bs-placement="center"
                        title="Delete Collection"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeleteModalState({
                            open: true,
                            id: collection.id,
                            name: collection.name,
                          });
                        }}
                        className="z-500 inline-flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-red-800 focus:outline-brand-lightBlue"
                      >
                        <TrashIcon className="h-5 w-5 text-brand-offWhite" />
                      </button>
                    </div>
                  </div>
                  <Image
                    className="m-auto rounded-t-lg pt-8"
                    src="/flashcards.png"
                    alt=""
                    height={75}
                    width={175}
                  />

                  <div className="flex flex-grow flex-col p-8">
                    <div className="flex grow flex-col gap-4">
                      <h5 className="truncate text-2xl font-bold tracking-tight text-brand-offWhite">
                        {collection.name}
                      </h5>
                      <h1 className="overflow-hidden truncate text-xl font-normal text-brand-offWhite">
                        {collection.description}
                      </h1>
                      <p className="text-md truncate font-light tracking-tight text-brand-offWhite">
                        Author: {collection.author}
                      </p>
                    </div>
                    {/* <Link
                      disabled={collection.cards.length === 0}
                      href={`/collections/study/${collection.id}`}
                      className="flex items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-brand-offWhite focus:outline-none"
                    > */}
                    <button
                      disabled={collection.cards.length === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        void router.push(`/collections/study/${collection.id}`);
                      }}
                      className="z-50 mt-6 flex justify-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue disabled:bg-gray-400 disabled:text-gray-700"
                    >
                      {collection.cards.length === 0
                        ? "Add cards to study"
                        : "Begin Study"}
                      <BookOpenIcon className="ml-3 h-5 w-5 text-brand-offWhite" />
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DeleteCollectionModal
        name={deleteModalState.name}
        id={deleteModalState.id}
        open={deleteModalState.open}
        setOpen={() =>
          setDeleteModalState({ ...deleteModalState, open: false })
        }
      />
    </main>
  );
};

export default Collections;
