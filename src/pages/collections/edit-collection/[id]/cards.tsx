import { TrashIcon } from "@heroicons/react/24/solid";
import type { FlashCard } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/LoadingIcon";
import { CreateFlashCardModal } from "../../../../components/utils/CreateFlashCardModal";
import { DeleteCardModal } from "../../../../components/utils/DeleteCardModal";
import { api } from "../../../../utils/api";

const FlashCards: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const { query } = useRouter();
  const contextUtil = api.useContext();

  const [deleteCardModalState, setDeleteCardModalState] = useState({
    open: false,
    id: "",
  });

  const collectionId = query.id as string;

  const [createFlashCardModalState, setCreateFlashCardModalState] = useState({
    open: false,
    collectionId: collectionId,
  });

  const flashCards = api.flashCardRouter.getFlashCards.useQuery({
    collectionId: collectionId,
  });

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="flex h-screen w-screen justify-center overflow-y-auto p-4">
      <div>
        <div className="flex w-full flex-col items-center justify-between gap-4 p-8 xl:flex-grow xl:flex-row">
          <div className="pt-8 xl:pt-2">
            <button
              onClick={() =>
                setCreateFlashCardModalState({
                  open: true,
                  collectionId: collectionId,
                })
              }
              className="mb-2 divide-x-4 rounded-lg bg-brand-offWhite px-5 py-2.5 text-sm font-medium text-brand-gray hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
            >
              Create Flash Card
            </button>
          </div>
        </div>
        <div
          className={
            "grid grid-cols-1 gap-12 p-8 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
          }
        >
          {flashCards.isLoading && (
            <div
              role="status"
              className="xl flex h-2/3 w-[24rem] items-center justify-center text-center xl:flex-grow xl:flex-row xl:justify-end"
            >
              <LoadingSpinner />
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {flashCards.isError && <p>Error Fetching Card Data :/</p>}
          {flashCards.data?.length === 0 && (
            <h5 className="flex h-2/3 w-[24rem] items-center justify-center text-2xl font-bold tracking-tight text-brand-offWhite xl:flex-grow xl:flex-row xl:justify-start">
              No Cards Found.
            </h5>
          )}
          {flashCards.data?.map((card: FlashCard) => {
            return (
              <div
                key={card.id}
                onClick={() =>
                  void router.push(`/collections/edit-collection/${card.id}`)
                }
                className="duration-250 mb-6 flex transform transition ease-in-out hover:-translate-y-1 hover:scale-105"
              >
                <div
                  key={card.id}
                  className="flex w-[24rem] grow flex-col rounded-lg bg-gray-800 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-2 p-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeleteCardModalState({
                            open: true,
                            id: card?.id as string,
                          });
                        }}
                        className="z-10 inline-flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-red-800 focus:outline-brand-lightBlue"
                      >
                        <TrashIcon className="h-5 w-5 text-brand-offWhite" />
                      </button>
                    </div>
                  </div>
                  <Image
                    className="m-auto rounded-t-lg pt-8"
                    src="/flashcards.png"
                    alt=""
                    height={75}
                    width={175}
                  />

                  <div className="flex flex-grow flex-col p-8">
                    <div className="flex grow flex-col gap-4">
                      <h5 className="truncate text-2xl font-bold tracking-tight text-brand-offWhite">
                        {card.question}
                      </h5>
                      <h1 className="overflow-hidden truncate text-xl font-normal text-brand-offWhite">
                        {card.answer}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CreateFlashCardModal
        collectionId={collectionId}
        open={createFlashCardModalState.open}
        setOpen={() =>
          setCreateFlashCardModalState({
            ...createFlashCardModalState,
            open: false,
          })
        }
      />
      <DeleteCardModal
        id={deleteCardModalState.id}
        open={deleteCardModalState.open}
        setOpen={() =>
          setDeleteCardModalState({ ...deleteCardModalState, open: false })
        }
      />
    </main>
  );
};

export default FlashCards;
