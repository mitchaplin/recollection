import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LoadingSpinner from "../../../../components/LoadingIcon";
import { api } from "../../../../utils/api";

const EditCollection: NextPage = () => {
  const router = useRouter();
  const { query } = useRouter();

  const {
    data: collection,
    isFetching,
    isLoading,
    error,
  } = api.collectionsRouter.getCollection.useQuery(
    {
      id: query.id as string,
    },

    {
      onSuccess: (response) => {
        setDescription(response.description);
        setDifficulty(response.difficulty);
        setAuthor(response.author);
        setCategory(response.category);
        setName(response.name);
      },
      enabled: Boolean(query.id),
      refetchOnMount: true,
    }
  );

  const updateCollection = api.collectionsRouter.updateCollection.useMutation();

  const [name, setName] = useState<string>(collection?.name as string);
  const [description, setDescription] = useState<string>(
    collection?.description as string
  );
  const [difficulty, setDifficulty] = useState<number>(
    collection?.difficulty as number
  );
  const [author, setAuthor] = useState<string>(collection?.author as string);
  const [category, setCategory] = useState<string>(
    collection?.category as string
  );

  const contextUtil = api.useContext();
  const displayName = collection?.name as string;

  const handleUpdateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCollection.mutateAsync({
      id: query.id as string,
      name,
      description,
      author,
      category,
      difficulty,
    });
    await contextUtil.collectionsRouter.invalidate();
    await router.push("/collections/list-collections");
  };

  if (isLoading || isFetching)
    return (
      <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
        <div className="mx-auto flex justify-center py-8 px-4 lg:py-16">
          <LoadingSpinner />
        </div>
      </main>
    );

  if (error)
    return (
      <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
        <div className="mx-auto flex justify-center py-8 px-4 text-brand-offWhite lg:py-16">
          Error Loading Collection Details
        </div>
      </main>
    );

  return (
    <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
      <section className="bg-brand-darkGray max-w-[72rem] grow gap-8">
        <div className="mx-auto py-8 px-4 lg:py-16">
          <h1 className="font mx-52 mb-10 text-center font-heading text-3xl font-bold text-brand-offWhite">
            Edit Collection
          </h1>
          <span className="flex justify-center text-center">
            <h1 className="font mb-8 hidden truncate pr-1 text-center font-heading text-xl font-bold italic text-brand-offWhite md:mx-52 md:block md:max-w-sm">
              {displayName}
            </h1>
          </span>
          <form
            onSubmit={(e) => void handleUpdateCollection(e)}
            className={"mx-36 flex flex-col gap-6"}
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

              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
                Update Collection
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditCollection;
