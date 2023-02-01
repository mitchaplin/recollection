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
  const contextUtil = api.useContext();
  const collections = api.collectionsRouter.getCollections.useQuery({});
  const user = api.userRouter.getSessionUser.useQuery();
  const deleteUser = api.userRouter.deleteUser.useMutation({});
  const studySessions = api.studyRouter.getStudySessions.useQuery();

  const handleDeleteUser = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    await deleteUser.mutateAsync({
      id: id,
    });
    await contextUtil.userRouter.invalidate();
    await router.push("/");
  };

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
      {session.data?.user && (
        <section className="bg-brand-darkGray gap-8 pt-8">
          <div className="grid w-fit grid-cols-4 rounded-lg bg-gray-800 p-12 shadow-md transition-all ease-out">
            <div className="col-span-4 m-auto mt-4 grid gap-4 self-center text-brand-offWhite">
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
                <p>{user.data?.apples}</p>
              </h1>

              <h1 className="font mb-8 flex flex-row truncate text-center font-heading text-xl font-bold italic text-brand-offWhite">
                <p>Lifetime Study Sessions:&nbsp;</p>
                <p>{studySessions.data?.length}</p>
              </h1>
              {/* <div className="flex justify-center">
                <button
                  onClick={(e) =>
                    void handleDeleteUser(e, session.data?.user.id)
                  }
                  className="text-brand-darkGray  rounded bg-red-600 py-2 px-4 font-bold text-brand-offWhite"
                >
                  Delete User
                </button>
              </div> */}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default UserProfile;
