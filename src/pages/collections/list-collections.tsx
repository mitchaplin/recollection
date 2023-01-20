import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import type { Collection } from "@prisma/client";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryBadge } from "../../components/CategoryBadge";
import { DeleteCollectionModal } from "../../components/utils/deleteCollectionModal";
import LoadingSpinner from "../../components/utils/LoadingIcon";
import { api } from "../../utils/api";

const Collections: NextPage = () => {
  const [searchState, setSearchState] = useState("");
  const [modalState, setModalState] = useState({
    open: false,
    id: "",
    name: "",
  });

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

  return (
    <main className="flex h-screen w-screen justify-center overflow-y-auto p-4">
      <div>
        <div className="flex w-full flex-col items-center justify-between gap-4 p-8 xl:flex-grow xl:flex-row">
          <div className="flex justify-between">
            <form className="flex w-96">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex">
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
              No Collections Found.
            </h5>
          )}
          {collections.data?.map((collection: Collection) => {
            return (
              <div
                key={collection.id}
                className="mb-6 flex animate-fade-in transition-all"
              >
                <div
                  key={collection.id}
                  className="flex w-[24rem] grow flex-col rounded-lg bg-gray-800 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex justify-between gap-4">
                    <span onClick={(e) => setSearchState(collection.category)}>
                      <CategoryBadge categoryName={collection.category} />
                    </span>
                    <div className="flex gap-2 p-4">
                      <button
                        // onClick={() => editCollection(collection.id)}
                        className="flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue"
                      >
                        <Link href={`/collection/${collection.id}/edit`}></Link>
                        <PencilIcon className="h-5 w-5 text-brand-offWhite" />
                      </button>
                      <button
                        onClick={() =>
                          setModalState({
                            open: true,
                            id: collection.id,
                            name: collection.name,
                          })
                        }
                        className="inline-flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-red-800 focus:outline-brand-lightBlue"
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
                      <h5 className="text-2xl font-bold tracking-tight text-brand-offWhite">
                        {collection.name}
                      </h5>
                      <h1 className="overflow-hidden text-ellipsis text-xl font-normal text-brand-offWhite">
                        {collection.description}
                      </h1>
                      <p className="text-md font-light tracking-tight text-brand-offWhite">
                        Author: {collection.author}
                      </p>
                    </div>
                    <button className="mt-6 flex justify-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue ">
                      <Link
                        href={`/collection/${collection.id}/study`}
                        className="inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-brand-offWhite focus:outline-none"
                      >
                        Begin Study
                        <BookOpenIcon className="ml-3 h-5 w-5 text-brand-offWhite" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DeleteCollectionModal
        name={modalState.name}
        id={modalState.id}
        open={modalState.open}
        setOpen={() => setModalState({ ...modalState, open: false })}
      />
    </main>
  );
};

export default Collections;
