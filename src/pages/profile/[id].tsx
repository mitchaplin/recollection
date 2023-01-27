import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../../utils/api";

const UserProfile: NextPage = () => {
  //   const router = useRouter();
  //   const { query } = useRouter();
  //   const contextUtil = api.useContext();
  const session = useSession();
  const router = useRouter();

  const collections = api.collectionsRouter.getCollections.useQuery({});
  const studySessions = api.studyRouter.getStudySessions.useQuery();

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
      {session.data?.user && (
        <section className="bg-brand-darkGray grow flex-col justify-center gap-8">
          <div className="mx-auto py-8 px-4 lg:py-16">
            <h1 className="font mx-52 mb-10 text-center font-heading text-3xl font-bold text-brand-offWhite">
              {session?.data?.user?.name}&apos;s Profile
            </h1>
            <span className="flex justify-center text-center">
              <h1 className="font mb-8 truncate pr-1 text-center font-heading text-xl font-bold italic text-brand-offWhite md:mx-52 md:block md:max-w-sm">
                Email: {session?.data?.user?.email}
              </h1>
            </span>
            <span className="flex justify-center text-center">
              <h1 className="font mb-8 truncate pr-1 text-center font-heading text-xl font-bold italic text-brand-offWhite md:mx-52 md:block md:max-w-sm">
                Total Collections: {collections.data?.length}
              </h1>
            </span>
            <span className="flex justify-center text-center">
              <h1 className="font mb-8 truncate pr-1 text-center font-heading text-xl font-bold italic text-brand-offWhite md:mx-52 md:block md:max-w-sm">
                Total Apples: 12
              </h1>
            </span>
            <span className="flex justify-center text-center">
              <h1 className="font mb-8 truncate pr-1 text-center font-heading text-xl font-bold italic text-brand-offWhite md:mx-52 md:block md:max-w-sm">
                Total Study {studySessions.data?.length}
              </h1>
            </span>
          </div>
        </section>
      )}
    </main>
  );
};

export default UserProfile;
