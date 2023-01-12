import { type NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const createCollection = api.collectionsRouter.createCollection.useMutation();
  const router = useRouter();
  const [collection, setCollection] = React.useState<string>("");
  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Collection");
    await createCollection.mutateAsync({ name: collection });
    await router.push("/");
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-white">Create a collection</h1>

        <form onSubmit={handleCreateCollection} className="flex flex-col gap-4">
          <label className={"text-white"} htmlFor="collection">
            Collection Name
          </label>
          <input
            id="collection-name"
            className={"p-2 text-black"}
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            required
          />
          <button className="bg-white text-black">Create</button>
        </form>
      </main>
    </>
  );
};

export default Home;
