import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner from "../../../components/LoadingIcon";

import { api } from "../../../utils/api";

const EditCollection: NextPage = () => {
  const router = useRouter();
  const { query } = useRouter();
  const session = useSession();
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
      enabled: Boolean(query.id),
      refetchOnMount: true,
    }
  );

  const createStudySession = api.studyRouter.createStudySession.useMutation();

  //   const [name, setName] = useState<string>(collection?.name as string);
  //   const [description, setDescription] = useState<string>(
  //     collection?.description as string
  //   );
  //   const [difficulty, setDifficulty] = useState<number>(
  //     collection?.difficulty as number
  //   );
  //   const [author, setAuthor] = useState<string>(collection?.author as string);
  //   const [category, setCategory] = useState<string>(
  //     collection?.category as string
  //   );
  // const [deck, setDeck] = useState<string>("");
  const contextUtil = api.useContext();
  const displayName = collection?.name as string;

  const handleCreateStudySession = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStudySession.mutateAsync({
      duration: 25,
      score: 10,
      collectionName: displayName,
      collectionId: collection?.id as string,
    });
    await contextUtil.invalidate();
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

  return (
    <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
      <section className="bg-brand-darkGray grow gap-8">
        <button
          onClick={(e) => void handleCreateStudySession(e)}
          className="bg-brand-dark mt-4 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
        >
          Update Collection
        </button>
      </section>
    </main>
  );
};

export default EditCollection;
