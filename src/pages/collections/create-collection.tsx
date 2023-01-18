import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { api } from "../../utils/api";

const CreateCollection: NextPage = () => {
  const createCollection = api.collectionsRouter.createCollection.useMutation();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(5);
  const [author, setAuthor] = useState<string>("You");
  // const [deck, setDeck] = useState<string>("");

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    await createCollection.mutateAsync({
      name,
      description,
      difficulty,
      author,
      // deck,
    });
    await router.push("/collections/list-collections");
  };

  return (
    <>
      <>
        <main className="flex h-screen w-screen justify-center overflow-y-auto p-8">
          <section className="bg-brand-darkGray gap-8">
            <div className="mx-auto py-8 px-4 lg:py-16">
              <h1 className="font mx-52 mb-10 text-center font-heading text-3xl font-bold text-brand-offWhite">
                Add Your New Collection
              </h1>
              <form
                onSubmit={handleCreateCollection}
                className={"flex flex-col gap-6"}
              >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-brand-offWhite"
                    >
                      Collection Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                      placeholder="Enter your collection name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-brand-offWhite"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      defaultValue={"other"}
                      className="dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                    >
                      <option>Select category</option>
                      <option value="math">Mathematics</option>
                      <option value="bio">Biology</option>
                      <option value="chem">Chemsitry</option>
                      <option value="his">History</option>
                      <option value="phys">Physics</option>
                      <option value="eng">Engineering</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="difficulty"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-brand-offWhite"
                    >
                      Collection Difficulty (1-10)
                    </label>
                    <input
                      type="number"
                      name="difficulty"
                      id="difficulty"
                      max={10}
                      min={1}
                      value={difficulty}
                      onChange={(e) =>
                        setDifficulty(parseInt(e.target.value, 10))
                      }
                      className="dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                      placeholder="7"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-brand-offWhite"
                    >
                      Description
                    </label>
                    <input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                      placeholder="Your description here"
                    ></input>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-brand-offWhite"
                  >
                    Author
                  </label>
                  <input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                    placeholder="Your description here"
                  ></input>
                </div>
                <div className="flex justify-center gap-10">
                  <button className="bg-brand-dark mt-4 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue">
                    Add Flash Cards
                  </button>
                  <button className="bg-brand-dark mt-4 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue">
                    Create Collection
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </>

      <main className="bg-brand-orange flex min-h-screen  flex-col items-center justify-center gap-8"></main>
    </>
  );
};

export default CreateCollection;
