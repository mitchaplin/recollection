import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { api } from "../../utils/api";

const CreateCollection: NextPage = () => {
  const createCollection = api.collectionsRouter.createCollection.useMutation();
  const router = useRouter();
  const session = useSession();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(5);
  const [author, setAuthor] = useState<string>("You");
  const [category, setCategory] = useState<string>("Other");
  // const [deck, setDeck] = useState<string>("");
  const contextUtil = api.useContext();
  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCollection.mutateAsync({
      name,
      description,
      author,
      category,
      difficulty,
      // deck,
    });
    await contextUtil.invalidate();
    await router.push("/collections/list-collections");
  };

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
      <section className="bg-brand bg-darkGray max-w-[72rem] grow gap-8">
        <div className="mx-auto py-8 px-4 lg:py-16">
          <h1 className="font mx-52 mb-10 text-center font-heading text-3xl font-bold text-brand-offWhite">
            Add Your New Collection
          </h1>
          <form
            onSubmit={(e) => void handleCreateCollection(e)}
            className={"mx-36 flex grow flex-col gap-6"}
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
                  placeholder="My Awesome Collection"
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={"other"}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                >
                  <option>Select category</option>
                  <option value="Math">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="History">History</option>
                  <option value="Physics">Physics</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Other">Other</option>
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
                  onChange={(e) => setDifficulty(parseInt(e.target.value, 10))}
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
                  placeholder="Physics 500 Level Unit 4"
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
                placeholder="Author Name"
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
  );
};

export default CreateCollection;
