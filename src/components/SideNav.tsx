import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export const SideNav: NextPage = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const session = useSession();
  return (
    <aside
      className="shadow-inner-2xl h-screen min-w-[16rem] border-r border-gray-700"
      aria-label="Sidebar"
    >
      <div className="min-w-72 flex h-full flex-col overflow-y-auto bg-brand-gray px-3 py-4">
        <div className="mr-4 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="mb-4 mr-4"
          ></Image>
          <h1 className="font-heading text-xl text-brand-offWhite">
            Recollection
          </h1>
        </div>
        {/* <hr className=" dark:border-gray-700" /> */}
        <ul className="space-y-2 pt-4 font-heading">
          <li>
            <Link
              href="/"
              className={
                currentRoute === "/"
                  ? `flex items-center rounded-l border-r-4 border-r-brand-subtleBlue bg-gray-700 p-2 text-base text-brand-offWhite transition-all hover:bg-gray-700`
                  : `flex items-center rounded-l p-2 text-base  text-brand-offWhite transition-all hover:bg-gray-700`
              }
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/collections/list-collections"
              className={
                currentRoute.includes("/collections")
                  ? `flex items-center rounded-l  border-r-4 border-r-brand-subtleBlue bg-gray-700 p-2 text-base text-brand-offWhite  transition-all hover:bg-gray-700`
                  : `flex items-center rounded-l p-2 text-base text-brand-offWhite   transition-all hover:bg-gray-700`
              }
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Collections</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base  text-brand-offWhite hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">
                Notifications
              </span>
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-200 p-3 text-sm font-medium text-brand-lightBlue dark:bg-brand-actionBlue ">
                3
              </span>
            </a>
          </li>
          {session?.data?.user?.id && (
            <li
              className=""
              onClick={() =>
                void router.push(
                  `/collections/edit-collection/${
                    session.data?.user?.id as string
                  }`
                )
              }
            >
              <Link
                href={`/user/${session.data?.user?.id}`}
                className={
                  currentRoute.includes("user")
                    ? `flex items-center rounded-l  border-r-4 border-r-brand-subtleBlue bg-gray-700 p-2 text-base text-brand-offWhite  transition-all hover:bg-gray-700`
                    : `flex items-center rounded-l p-2 text-base text-brand-offWhite   transition-all hover:bg-gray-700`
                }
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap">Profile</span>
              </Link>
            </li>
          )}
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base  text-brand-offWhite hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Statistics</span>
              <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </a>
          </li>
          <li className="pb-2">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base text-brand-offWhite hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite"
                focusable="false"
                data-prefix="fas"
                data-icon="gem"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                ></path>
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">
                Recollection Pro
              </span>
            </a>
          </li>
        </ul>
        <ul className="gap-4 space-y-2 border-t border-gray-200 pt-4 font-heading dark:border-gray-700">
          {session && session.data?.user ? (
            <div className="flex flex-col gap-4">
              <li>
                <div
                  className="flex items-center rounded-lg p-2 text-base  text-brand-offWhite hover:bg-gray-700"
                  onClick={() => void signOut()}
                >
                  <ArrowLongLeftIcon className="h-6 w-6 text-brand-offWhite transition duration-75 group-hover:text-brand-offWhite" />
                  <span className="ml-3 flex justify-end whitespace-nowrap text-center">
                    Sign Out
                  </span>
                </div>
              </li>
            </div>
          ) : (
            <div className="flex flex-col">
              <button
                className="flex flex-col items-center justify-center rounded-lg bg-none p-4 text-sm font-medium text-brand-offWhite hover:bg-gray-700  focus:outline-brand-lightBlue"
                onClick={() => void signIn()}
              >
                <Image
                  src={"/discord-logo-blue.svg"}
                  alt="Discord"
                  width={150}
                  height={200}
                ></Image>
              </button>
            </div>
          )}
        </ul>
        {session?.data?.user?.image && (
          <div className="mt-auto">
            <div
              className="flex flex-row justify-evenly gap-2 rounded-md bg-brand-gray p-2 text-left hover:bg-gray-700"
              // onClick={(e) => router.push(`/users/${id}`)}
            >
              <Image
                width={150}
                height={150}
                src={`${session?.data?.user?.image}`}
                className="w-12 rounded-full"
                alt="Avatar"
              />
              <div className="flex items-center">
                <h5 className="font-xs text-md font-body text-brand-offWhite">
                  {session.data.user.email}
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideNav;
