import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../utils/api";

const Collections: NextPage = () => {
  const collections = api.collectionsRouter.getCollections.useQuery();
  console.log(collections);
  return (
    <>
      <main className="h-screen overflow-y-scroll bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8">
        <div className={"grid grid-cols-3 gap-8"}>
          {collections.data?.map((collection) => {
            return (
              <div
                className="w-full rounded-lg bg-white p-8 align-bottom shadow-md dark:border-gray-700 dark:bg-gray-800"
                key={collection.collectionId}
              >
                <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg bg-white p-8 pt-4 align-middle  dark:border-gray-700 dark:bg-gray-800">
                  <Image
                    src={"/flashcards2.png"}
                    alt="Flashcards"
                    width={250}
                    height={250}
                  />

                  <div className="">
                    <a href="#">
                      <h5 className="mb-8 text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {collection.name}
                      </h5>
                    </a>
                    <div className="flex flex-col items-center justify-between gap-8">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Best Score: 100
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Attempts: 7
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Difficulty: 4
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white"></span>
                      <Link href={"/collection}"}>
                        <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Edit Collection
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
export default Collections;
