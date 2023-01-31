import { BookOpenIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "../utils/api";

import duration from "dayjs/plugin/duration";
import fromNow from "dayjs/plugin/relativeTime";
import { AppleIcon } from "../components/utils/AppleIcon";

dayjs.extend(fromNow);
dayjs.extend(duration);

export const Dashboard: NextPage = () => {
  const router = useRouter();
  const session = useSession();

  const routeToCollections = async (e: React.FormEvent) => {
    e.preventDefault();
    await router.push("/collections/list-collections");
  };

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  const collections = api.collectionsRouter.getCollections.useQuery({});
  const studySessions = api.studyRouter.getStudySessions.useQuery();
  const stats = [
    {
      name: "Total Collections",
      stat: collections.data?.length,
      image: <RectangleGroupIcon className="h-16 w-16 text-brand-offWhite" />,
    },
    {
      name: "Study Sessions",
      stat: studySessions.data?.length,
      image: <BookOpenIcon className="h-16 w-16 text-brand-offWhite" />,
    },
    {
      name: "Apples Earned",
      stat: session.data?.user.apples,
      image: AppleIcon,
    },
  ];

  return (
    <main className="h-screen w-screen overflow-y-auto p-8">
      <div className="grid grid-cols-4">
        <div className="col-span-4 flex justify-center rounded-lg">
          <dl className="mt-5 grid w-screen min-w-fit grid-cols-1 gap-5 rounded-lg xl:grid-cols-3">
            {stats.map((item) => (
              <div
                className={`grid grid-cols-2 items-center justify-items-center overflow-hidden rounded-lg bg-gray-800 ${
                  item.name === "Total Collections"
                    ? "hover:cursor-pointer"
                    : "hover:cursor-default"
                }`}
                key={item.name}
                onClick={(e) =>
                  item.name === "Total Collections"
                    ? void routeToCollections(e)
                    : null
                }
              >
                <div className="m-0 flex items-center">{item.image}</div>
                <div className="inline-flex w-28">
                  <div key={item.name} className="py-5 px-4 text-right sm:p-6">
                    <div className="truncate font-heading text-sm font-medium text-brand-cream">
                      {item.name}
                    </div>
                    <div className="mt-1 flex flex-auto items-start text-left font-body text-3xl font-semibold tracking-tight text-brand-cream">
                      {item.stat}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
        {(studySessions?.data?.length || []) > 0 ? (
          <div className="col-span-full mx-auto w-96 xl:w-[50rem]">
            <div className="text-body pt-14 text-center text-sm text-brand-offWhite">
              - Recent Activity -
            </div>
            <ul
              role="list"
              className="divide-y divide-brand-subtleBlue border-b border-brand-subtleBlue"
            >
              {studySessions.data
                ?.filter((val, idx, arr) => idx > arr.length - 6)
                .reverse()
                .map((ss) => (
                  <li key={ss.id} className="py-4 pt-12">
                    <div className="flex space-x-3">
                      <Image
                        className="h-6 w-6 rounded-full"
                        src={"/apple.png"}
                        alt="Activity"
                        width={70}
                        height={70}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-md font-medium text-brand-offWhite">
                            {session.data?.user?.name} earned {ss.score} apples!
                          </h3>
                          <p className="text-sm text-gray-500">
                            {dayjs(ss.createdAt).fromNow()}
                          </p>
                        </div>

                        <p className="text-sm text-gray-500">
                          <span
                            onClick={() =>
                              void router.push(
                                `/collections/edit-collection/${ss.collectionId}/cards`
                              )
                            }
                            className="text-heading text-brand-actionBlue hover:cursor-pointer"
                          >
                            {ss.collectionName}
                          </span>{" "}
                          was studied for{" "}
                          {dayjs.duration(ss.duration, "second").humanize()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className="mx-none col-span-full pt-24 text-center text-brand-offWhite xl:mx-72">
            - No Recent Activity -
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
