import { type NextPage } from "next";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="h-screen w-screen overflow-y-auto">
      <div className="pag-4 mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div onClick={() => void signIn()} className="cursor-pointer">
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Please Sign In
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
