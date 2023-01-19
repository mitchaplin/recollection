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
import { api } from "../../utils/api";

const Collections: NextPage = () => {
  const contextUtil = api.useContext();
  const deleteCollection = api.collectionsRouter.delete.useMutation();

  const handleDeleteCollction = async (id: string) => {
    await deleteCollection.mutateAsync({
      id,
    });
    await contextUtil.invalidate();
  };
  const collections = api.collectionsRouter.getCollections.useQuery();
  return (
    <main className="flex h-screen w-screen justify-center overflow-y-auto p-8">
      <div>
        <div className="flex flex-grow flex-col items-center justify-between gap-4 p-8 xl:flex-grow xl:flex-row">
          {collections && collections.data && collections.data?.length > 0 && (
            <div className="grow">
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
                    id="default-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search Collections"
                    required
                  />
                </div>
              </form>
            </div>
          )}

          <Link
            href={"/collections/create-collection"}
            className="pt-2 focus:outline-none xl:p-0"
          >
            <button
              type="button"
              className="mb-2 divide-x-4 rounded-lg bg-brand-offWhite px-5 py-2.5 text-sm font-medium text-brand-gray hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
            >
              Create Collection
            </button>
          </Link>
        </div>
        <div
          className={
            "grid grid-cols-1 gap-12 p-8 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
          }
        >
          {collections.data?.map((collection: Collection) => {
            return (
              <div
                key={collection.id}
                className="flex w-[22rem] grow flex-col rounded-lg bg-gray-800 shadow-xl hover:shadow-2xl"
              >
                <div className="flex justify-end gap-2 p-4">
                  <button
                    // onClick={() => editCollection(collection.id)}
                    className="inline-flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue"
                  >
                    <Link href={`/collection/${collection.id}/edit`}></Link>
                    <PencilIcon className="h-5 w-5 text-brand-offWhite" />
                  </button>
                  <button
                    onClick={() => handleDeleteCollction(collection.id)}
                    className="inline-flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-red-800 focus:outline-brand-lightBlue"
                  >
                    <TrashIcon className="h-5 w-5 text-brand-offWhite" />
                  </button>
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
                      className="inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-brand-offWhite focus:outline-none "
                    >
                      Begin Study
                      <BookOpenIcon className="ml-3 h-5 w-5 text-brand-offWhite" />
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Collections;
