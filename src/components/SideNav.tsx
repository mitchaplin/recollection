import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { RefObject } from "react";
import { useRef, useState } from "react";

import { useEventListener } from "usehooks-ts";

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event: MouseEvent) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
}

export const SideNav: NextPage = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const session = useSession();
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
    console.log("clicked outside");
  };

  const handleClickInside = () => {
    setOpen(!open);
    console.log("clicked inside");
  };

  useOnClickOutside(ref, handleClickOutside);

  if (!session.data) return <></>;
  return (
    <div className="relative z-[999999999] h-screen">
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm md:static md:bg-transparent ${
          open ? "" : "hidden"
        }`}
      ></div>
      <div ref={ref} className="relative">
        <button
          onClick={handleClickInside}
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="absolute z-10 ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <aside
          className={`shadow-inner-2xl ${
            open ? "absolute" : "hidden md:block"
          }  top-0 left-0 h-screen border-r border-gray-700 md:static md:w-auto md:max-w-none`}
          aria-label="Sidebar"
        >
          <div className="flex h-full w-72 flex-col overflow-y-auto bg-brand-gray px-3 py-4">
            <div className="mr-4 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="mb-4 mr-2 pl-4 md:pl-0"
              ></Image>
              <h1 className="font-heading text-xl text-brand-offWhite">
                Recollection
              </h1>
            </div>
            <ul className="space-y-2 pt-4 font-heading">
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href="/dashboard"
                  className={
                    currentRoute === "/dashboard"
                      ? `flex items-center rounded-l border-r-4 border-r-brand-subtleBlue bg-gray-700 p-2 text-base text-brand-offWhite transition-all hover:bg-gray-700`
                      : `flex items-center rounded-l p-2 text-base text-brand-offWhite transition-all hover:rounded-lg hover:bg-gray-700`
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
                  onClick={() => setOpen(false)}
                  href="/collections/list-collections"
                  className={
                    currentRoute.includes("/collections")
                      ? `flex items-center rounded-l border-r-4 border-r-brand-subtleBlue bg-gray-700 p-2 text-base text-brand-offWhite  transition-all hover:rounded-l hover:bg-gray-700`
                      : `flex items-center rounded-l p-2 text-base text-brand-offWhite transition-all hover:rounded-lg hover:bg-gray-700`
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
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Collections
                  </span>
                </Link>
              </li>
              {session?.data?.user?.id && (
                <Link
                  onClick={() => setOpen(false)}
                  href={`/profile/${session.data?.user?.id}`}
                  className={
                    currentRoute.includes("profile")
                      ? `flex items-center rounded-l border-r-4 border-r-brand-subtleBlue bg-gray-700 p-2 text-base text-brand-offWhite  transition-all hover:bg-gray-700`
                      : `flex items-center rounded-l p-2 text-base text-brand-offWhite transition-all hover:rounded-lg hover:bg-gray-700`
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
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Notifications
                  </span>
                  <span className="ml-3 inline-flex h-3 w-fit items-center justify-center rounded-full bg-blue-200 p-3 text-sm font-medium text-brand-lightBlue dark:bg-brand-actionBlue ">
                    Coming Soon
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="mb-2 flex items-center rounded-lg p-2 text-base  text-brand-offWhite hover:bg-gray-700"
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
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Statistics
                  </span>
                  <span className="ml-3 inline-flex h-3 w-fit items-center justify-center rounded-full bg-blue-200 p-3 text-sm font-medium text-brand-lightBlue dark:bg-brand-actionBlue ">
                    Coming Soon
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
                      onClick={() => void signOut({ callbackUrl: "/" })}
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
                <Link href={`/profile/${session.data?.user?.id}`}>
                  <div className="flex flex-row justify-evenly gap-2 rounded-md bg-brand-gray p-2 text-left hover:bg-gray-700">
                  {session?.data?.user?.image && (
                    <Image
                      width={150}
                      height={150}
                      src={`${session?.data?.user?.image}`}
                      className="w-12 rounded-full"
                      alt="Avatar"
                    />)}
                    <div className="flex items-center">
                      <h5 className="font-xs text-md font-body text-brand-offWhite">
                        {session.data.user.email}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideNav;
