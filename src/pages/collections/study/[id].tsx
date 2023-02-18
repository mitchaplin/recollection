import {
  ClockIcon,
  FireIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useElapsedTime } from "use-elapsed-time";
import LoadingSpinner from "../../../components/LoadingIcon";
import { AppleIcon } from "../../../components/utils/AppleIcon";
import {
  renderNextQuestionTimer,
  renderRemainingTimer,
} from "../../../components/utils/Timers";
import { api } from "../../../utils/api";
const StudySession: NextPage = () => {
  const router = useRouter();
  const { query } = useRouter();

  const {
    data: collection,
    isFetching,
    isLoading,
  } = api.collectionsRouter.getCollection.useQuery(
    {
      id: query.id as string,
    },

    {
      enabled: Boolean(query.id),
      refetchOnMount: true,
    }
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numRecorded, setNumRecorded] = useState(0);
  const createStudySession = api.studyRouter.createStudySession.useMutation();
  const updateUser = api.userRouter.updateUser.useMutation();
  const session = useSession();
  const flashCards = api.flashCardRouter.getFlashCards.useQuery({
    collectionId: query.id as string,
  });

  const [totalTime, setTotalTime] = useState(0);

  const { elapsedTime } = useElapsedTime({
    isPlaying: currentIndex !== flashCards.data?.length,
    updateInterval: 1,
    onUpdate() {
      setTotalTime(totalTime + 1);
    },
  });

  const contextUtil = api.useContext();
  const displayName = collection?.name as string;

  const handleUpdateUser = async () => {
    await updateUser.mutateAsync({
      id: session.data?.user.id as string,
      apples: numCorrect,
    });
    await contextUtil.userRouter.invalidate();
  };

  const handleCreateStudySession = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStudySession.mutateAsync(
      {
        duration: elapsedTime,
        score: numCorrect,
        collectionName: displayName,
        collectionId: collection?.id as string,
      },
      { onSuccess: void handleUpdateUser() }
    );

    await contextUtil.studyRouter.invalidate();
    await router.push("/collections/list-collections");
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  const headers = [
    {
      name: "Collection Name",
      stat: collection?.name,
      image: <RectangleGroupIcon className="h-16 w-16 text-brand-offWhite" />,
    },
    {
      name: "Total elapsed time",
      stat: totalTime,
      image: <ClockIcon className="h-16 w-16 text-brand-offWhite" />,
    },
    {
      name: "Apples Earned",
      stat: numCorrect,
      image: AppleIcon,
    },
  ];

  const stats = [
    {
      name: "Collection Name",
      stat: collection?.name,
      image: <RectangleGroupIcon className="h-16 w-16 text-brand-offWhite" />,
    },
    {
      name: "Apples Earned",
      stat: numCorrect,
      image: AppleIcon,
    },
    {
      name: "Time Elapsed",
      stat: totalTime,
      image: <ClockIcon className="h-16 w-16 text-brand-offWhite" />,
    },
    {
      name: "Flash Cards Completed",
      stat: flashCards.data?.length,
      image: <FireIcon className="h-16 w-16 text-brand-offWhite" />,
    },
  ];

  if (isLoading || isFetching)
    return (
      <main className="flex h-screen w-screen flex-grow justify-center overflow-y-auto p-8">
        <div className="mx-auto flex justify-center py-8 px-4 lg:py-16">
          <LoadingSpinner />
        </div>
      </main>
    );

  return (
    <main className="m-auto flex h-screen w-screen flex-grow flex-col overflow-y-auto p-8 pt-12">
      <div className="grid grid-cols-4 gap-4">
        {currentIndex !== flashCards.data?.length && (
          <div className="col-span-4 flex justify-center rounded-lg">
            <dl className="mt-5 grid w-screen min-w-fit grid-cols-1 gap-5 rounded-lg xl:grid-cols-3">
              {headers.map((item) => (
                <div
                  className="grid grid-cols-2 items-center justify-items-center overflow-hidden rounded-lg bg-gray-800"
                  key={item.name}
                >
                  <div className="ml-[-2rem] flex justify-start">
                    {item.image}
                  </div>
                  <div className="flex w-full overflow-hidden">
                    <div
                      key={item.name}
                      className="py-5 pr-4 text-right sm:pr-6"
                    >
                      <div className="text-left font-heading text-sm font-medium text-brand-cream">
                        {item.name}
                      </div>
                      <div className="mt-1 flex w-40 items-start truncate pr-12 text-left font-body text-xl font-semibold tracking-tight text-brand-cream">
                        {item.stat}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        )}
        <section className="bg-brand-darkGray col-span-4 py-1">
          {currentIndex !== flashCards.data?.length && (
            <div className="grid grid-cols-5 gap-6">
              <div className="col-span-5 grid gap-4 rounded-lg bg-gray-800 shadow-md lg:col-span-2">
                <div className="flex flex-col justify-center">
                  {!showAnswer ? (
                    <div className="flex scale-90 justify-center p-1">
                      <CountdownCircleTimer
                        key={currentIndex}
                        isPlaying
                        duration={15}
                        isSmoothColorTransition
                        colors={["#00A300", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[11, 7, 3, 0]}
                        onComplete={() => {
                          setShowAnswer(true);
                        }}
                      >
                        {({ remainingTime }) =>
                          renderRemainingTimer({ remainingTime })
                        }
                      </CountdownCircleTimer>
                    </div>
                  ) : (
                    <div className="flex scale-90 justify-center p-1">
                      <CountdownCircleTimer
                        key={flashCards.data?.at(currentIndex)?.id}
                        isPlaying
                        rotation="counterclockwise"
                        duration={10}
                        isSmoothColorTransition
                        colors={["#004777", "#004777"]}
                        colorsTime={[5, 0]}
                        onComplete={() => {
                          setCurrentIndex(currentIndex + 1),
                            setNumRecorded(numRecorded + 1),
                            setShowAnswer(false);
                        }}
                      >
                        {({ remainingTime }) =>
                          renderNextQuestionTimer({ remainingTime })
                        }
                      </CountdownCircleTimer>
                    </div>
                  )}
                  <div className="flex flex-row justify-center gap-8 p-4">
                    <button
                      disabled={!showAnswer}
                      onClick={() => {
                        setCurrentIndex(currentIndex + 1),
                          setShowAnswer(false),
                          setNumCorrect(numCorrect + 1),
                          setNumRecorded(numRecorded + 1);
                      }}
                      className="items-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-white hover:bg-brand-subtleBlue focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-500"
                    >
                      <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      disabled={!showAnswer}
                      onClick={() => {
                        setCurrentIndex(currentIndex + 1),
                          setShowAnswer(false),
                          setNumRecorded(numRecorded + 1);
                      }}
                      className="items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-500"
                    >
                      <HandThumbDownIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-5 grid text-center lg:col-span-3">
                <ReactCardFlip
                  isFlipped={showAnswer}
                  flipDirection="horizontal"
                  flipSpeedBackToFront={1.25}
                  flipSpeedFrontToBack={1.0}
                >
                  <div
                    onClick={() => setShowAnswer(true)}
                    className={`grid gap-4 rounded-lg bg-gray-800 p-6 font-heading text-brand-offWhite shadow-md ${
                      !showAnswer ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <h1 className="text-heading text-3xl">
                      Question: {currentIndex + 1}
                    </h1>
                    <p className="text-body text-xl">
                      {flashCards.data?.at(currentIndex)?.question}
                    </p>
                  </div>
                  <div className="grid gap-4 rounded-lg bg-gray-800 p-6 font-heading text-brand-offWhite shadow-md ">
                    <h1 className="text-heading text-3xl">Answer:</h1>
                    <p className="text-body text-xl">
                      {flashCards.data?.at(currentIndex)?.answer}
                    </p>
                  </div>
                </ReactCardFlip>
              </div>
            </div>
          )}
          {numRecorded === flashCards.data?.length && (
            <>
              <div className="col-span-4 flex justify-center rounded-lg">
                <dl className="mt-5 grid w-screen min-w-fit grid-cols-1 gap-5 rounded-lg xl:grid-cols-2 ">
                  {stats.map((item) => (
                    <div
                      className="grid grid-cols-2 items-center justify-items-center overflow-hidden rounded-lg bg-gray-800"
                      key={item.name}
                    >
                      <div className="ml-[-2rem] flex justify-start">
                        {item.image}
                      </div>
                      <div className="flex w-full overflow-hidden">
                        <div
                          key={item.name}
                          className="py-5 pr-4 text-right sm:pr-6"
                        >
                          <div className="text-left font-heading text-sm font-medium text-brand-cream">
                            {item.name}
                          </div>
                          <div className="mt-1 flex w-40 items-start truncate pr-12 text-left font-body text-xl font-semibold tracking-tight text-brand-cream">
                            {item.stat}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="my-6 flex flex-col rounded-md bg-gray-800 p-4 lg:flex-row lg:justify-center lg:p-0">
                <button
                  onClick={(e) => void handleCreateStudySession(e)}
                  className="bg-brand-dark m-auto my-2 flex w-72 justify-center rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue lg:m-4"
                >
                  Submit Study Session
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTotalTime(0);
                    setCurrentIndex(0);
                    setShowAnswer(false);
                    setNumCorrect(0);
                    setNumRecorded(0);
                  }}
                  className="bg-brand-dark m-auto my-2 flex w-72 justify-center rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue lg:m-4"
                >
                  Start Over without Submitting
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default StudySession;
