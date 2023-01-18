import { BeakerIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import type { Collection } from "@prisma/client";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../utils/api";

const Collections: NextPage = () => {
  const collections = api.collectionsRouter.getCollections.useQuery();
  return (
    <>
      <main className="flex h-screen w-screen justify-center overflow-y-auto p-8">
        <div className="mt-4">
          <div className="flex justify-end p-8">
            <Link
              href={"/collections/create-collection"}
              className="focus:outline-none"
            >
              <button
                type="button"
                className="bg-brand-dark mb-2 divide-x-4 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
              >
                Create Collection
              </button>
            </Link>
          </div>
          <div
            className={
              "grid grid-cols-1 gap-12 p-8  lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
            }
          >
            {collections.data?.map((collection: Collection) => {
              return (
                <div
                  key={collection.id}
                  className="w-[22rem] rounded-lg bg-brand-lightGray shadow-xl hover:shadow-2xl"
                >
                  <div className="flex justify-end gap-2 p-4">
                    <button
                      // onClick={() => editCollection(collection.id)}
                      className="inline-flex items-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue"
                    >
                      <Link href={`/collection/${collection.id}/edit`}></Link>
                      <PencilIcon className="h-5 w-5 text-brand-offWhite" />
                    </button>
                    <button
                      // onClick={() => deleteCollection(collection.id)}
                      className="inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-red-800 focus:outline-brand-lightBlue"
                    >
                      <TrashIcon className="h-5 w-5 text-brand-offWhite" />
                    </button>
                  </div>
                  <Image
                    className="m-auto rounded-t-lg pt-8"
                    src="/flashcards.png"
                    alt=""
                    height={100}
                    width={200}
                  />

                  <div className="p-8">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-brand-offWhite">
                      {collection.name}
                    </h5>
                    <h5 className="mb-2 text-xl font-light tracking-tight text-brand-offWhite">
                      Author: {collection.author}
                    </h5>

                    <p className="mb-3 overflow-hidden text-ellipsis font-normal text-brand-offWhite">
                      {collection.description}
                    </p>
                    <button className="inline-flex items-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue ">
                      <Link
                        href={`/collection/${collection.id}/study`}
                        className="bg-brand-purple-primary inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-brand-offWhite focus:outline-none "
                      >
                        Begin Study
                        <BeakerIcon className="ml-3 h-5 w-5 text-brand-offWhite" />
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Collections;
