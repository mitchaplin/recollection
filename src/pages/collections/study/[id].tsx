import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useElapsedTime } from "use-elapsed-time";
import LoadingSpinner from "../../../components/LoadingIcon";

import { api } from "../../../utils/api";
const renderRemainingTimer = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too Late</div>;
  }

  return (
    <div className="timer">
      <div className="flex justify-center text-2xl text-brand-offWhite">
        {remainingTime}
      </div>
      <div className="flex justify-center text-brand-offWhite">Answer in</div>

      <div className="flex justify-center text-brand-offWhite">seconds</div>
    </div>
  );
};
const renderNextQuestionTimer = ({
  remainingTime,
}: {
  remainingTime: number;
}) => {
  if (remainingTime === 15) {
    return <div className="timer">Loading Next Question</div>;
  }

  return (
    <div className="timer">
      <div className="flex justify-center text-2xl text-brand-offWhite">
        {remainingTime}
      </div>
      <div className="flex justify-center text-brand-offWhite">
        Next Question In
      </div>
      <div className="flex justify-center text-brand-offWhite">seconds</div>
    </div>
  );
};
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
  const createStudySession = api.studyRouter.createStudySession.useMutation();

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

  const handleCreateStudySession = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStudySession.mutateAsync({
      duration: elapsedTime,
      score: numCorrect,
      collectionName: displayName,
      collectionId: collection?.id as string,
    });
    await contextUtil.studyRouter.invalidate();
    await router.push("/collections/list-collections");
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

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
      <div className="flex flex-col items-center justify-center gap-8">
        {currentIndex !== flashCards.data?.length && (
          <div className="m-auto flex h-[16rem] flex-grow flex-row items-center justify-center gap-4 rounded-lg  bg-gray-800 shadow-md">
            {!showAnswer ? (
              <div className="scale-90 p-1">
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
              <div className="scale-90 p-1">
                <CountdownCircleTimer
                  key={flashCards.data?.at(currentIndex)?.id}
                  isPlaying
                  rotation="counterclockwise"
                  duration={10}
                  isSmoothColorTransition
                  colors={["#004777", "#004777"]}
                  colorsTime={[5, 0]}
                  onComplete={() => {
                    setCurrentIndex(currentIndex + 1), setShowAnswer(false);
                  }}
                >
                  {({ remainingTime }) =>
                    renderNextQuestionTimer({ remainingTime })
                  }
                </CountdownCircleTimer>
              </div>
            )}

            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 font-heading text-2xl font-bold tracking-tight text-brand-offWhite">
                  Apples Earned
                </h5>
                <p className="mb-3 font-body text-2xl font-normal text-brand-offWhite">
                  <div className="flex flex-row gap-4">
                    {numCorrect}
                    <Image
                      className="p; mt-0.5 h-6 w-6 rounded-full"
                      src={"/apple.png"}
                      alt="Activity"
                      width={70}
                      height={70}
                    />
                  </div>
                </p>
              </div>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 font-heading text-2xl font-bold tracking-tight text-brand-offWhite">
                  Session Time
                </h5>
                <p className="mb-3 flex flex-row gap-4 font-body text-2xl font-normal text-brand-offWhite">
                  {totalTime} <p className="mt-0.5 text-xl">seconds</p>
                </p>
              </div>
            </div>
          </div>
        )}
        <section className="bg-brand-darkGray flex grow flex-col justify-center gap-8">
          {currentIndex !== flashCards.data?.length && (
            <div className="flex grow flex-col rounded-lg bg-gray-800 p-4 shadow-md transition-all ease-out">
              <p className="text-body mb-2 pb-24 text-center text-2xl font-bold tracking-tight text-brand-offWhite">
                <h1 className="text-heading text-3xl">
                  {showAnswer ? "Answer" : `${"Question"}: ${currentIndex + 1}`}
                </h1>
                {showAnswer
                  ? flashCards.data?.at(currentIndex)?.answer
                  : flashCards.data?.at(currentIndex)?.question}
              </p>

              {!showAnswer ? (
                <button
                  onClick={() => {
                    setCurrentIndex(currentIndex + 1), setShowAnswer(true);
                  }}
                  className="m-auto inline-flex items-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-white hover:bg-brand-subtleBlue focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {currentIndex + 1 !== flashCards.data?.length
                    ? "View Answer"
                    : "Complete Study Session"}
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              ) : (
                <div className="flex flex-row">
                  <button
                    onClick={() => {
                      setShowAnswer(false), setNumCorrect(numCorrect + 1);
                    }}
                    className="m-auto inline-flex items-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-white hover:bg-brand-subtleBlue focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    I got it!
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowAnswer(false)}
                    className="m-auto inline-flex w-[9rem] items-center rounded-lg bg-brand-actionBlue px-3 py-2 text-center text-sm font-medium text-white hover:bg-brand-subtleBlue focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Nope, Wrong..
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
          {currentIndex === flashCards.data?.length && (
            <div>
              <p>You completed all {flashCards.data?.length} flash cards.</p>
              <p>You score totaled {numCorrect}.</p>
              <p>Study time elapsed was {totalTime} seconds.</p>
              <button
                onClick={(e) => void handleCreateStudySession(e)}
                className="bg-brand-dark m-auto mt-4 w-72 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
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
                }}
                className="bg-brand-dark m-auto mt-4 w-72 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
              >
                Start Over without Submitting
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default StudySession;
