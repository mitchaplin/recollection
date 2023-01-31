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
        <section className="bg-brand-darkGray grow flex-col justify-center gap-8 pt-8">
          <div className="grid grid-cols-4 rounded-lg bg-gray-800 p-4 shadow-md transition-all ease-out">
            <div className="col-span-4 m-auto mt-4 grid gap-4 text-brand-offWhite">
              <h1 className="font mb-10 text-center font-heading text-3xl font-bold text-brand-offWhite">
                {session?.data?.user?.name}&apos;s Profile
              </h1>

              <h1 className="font mb-8 flex flex-row truncate text-center font-heading text-xl font-bold italic text-brand-offWhite">
                <p>Email:&nbsp;</p>
                <p>{session?.data?.user?.email}</p>
              </h1>

              <h1 className="font mb-8 flex flex-row truncate text-center font-heading text-xl font-bold italic text-brand-offWhite">
                <p>Total Collections:&nbsp;</p>
                <p>{collections.data?.length}</p>
              </h1>

              <h1 className="font mb-8 flex flex-row truncate text-center font-heading text-xl font-bold italic text-brand-offWhite">
                <p>Lifetime Apples:&nbsp;</p>
                <p>{collections.data?.length}</p>
              </h1>

              <h1 className="font mb-8 flex flex-row truncate text-center font-heading text-xl font-bold italic text-brand-offWhite">
                <p>Lifetime Study Sessions:&nbsp;</p>
                <p>{studySessions.data?.length}</p>
              </h1>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default UserProfile;
