import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import type { FlashCard } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LoadingSpinner from "../../../../components/LoadingIcon";
import { DeleteCardModal } from "../../../../components/utils/DeleteCardModal";
import { FlashCardModal } from "../../../../components/utils/FlashCardModal";
import { api } from "../../../../utils/api";

const FlashCards: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const { query } = useRouter();
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [deleteCardModalState, setDeleteCardModalState] = useState({
    open: false,
    id: "",
  });
  const contextUtil = api.useContext();
  const reorderFlashCard = api.flashCardRouter.reorderFlashCard.useMutation();

  const collectionId = query.id as string;
  // a little function to help us with reordering the result
  const reorder = async (
    // cardId: string,
    // startIndex: number,
    // endIndex: number

    result: DropResult
  ) => {
    if (!result.destination) return;
    console.log(result);
    await reorderFlashCard.mutateAsync(
      {
        collectionId: collectionId,
        startIndex: result.source.index,
        endIndex: result.destination.index,
        cardId: result.draggableId,
      },
      {
        onSuccess: () => {
          void contextUtil.flashCardRouter.getFlashCards.invalidate();
        },
      }
    );
  };

  const [flashCardModalState, setFlashCardModalState] = useState({
    open: false,
    collectionId: collectionId,
    isEdit: false,
    data: { id: "", question: "", answer: "" },
  });

  const flashCards = api.flashCardRouter.getFlashCards.useQuery(
    {
      collectionId: collectionId,
    },
    { onSuccess: (data) => setCards(data) }
  );

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <main className="flex h-screen w-screen justify-center overflow-y-auto p-4">
      <div className="mb-4 flex w-[50rem] flex-col gap-4">
        <div className="flex w-full items-start justify-end gap-4 p-8">
          <div className="pt-8 xl:pt-2">
            <button
              onClick={(e) => {
                setFlashCardModalState({
                  open: true,
                  collectionId: collectionId,
                  isEdit: false,
                  data: { id: "", question: "", answer: "" },
                });
              }}
              className="mb-2 divide-x-4 rounded-lg bg-brand-offWhite px-5 py-2.5 text-sm font-medium text-brand-gray hover:bg-brand-subtleBlue focus:outline-brand-lightBlue"
            >
              Create Flash Card
            </button>
          </div>
        </div>

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

        <DragDropContext onDragEnd={(props) => void reorder(props)}>
          <Droppable
            droppableId="flash-cards"
            isDropDisabled={reorderFlashCard.isLoading}
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cards
                  // ?.sort((a, b) => a.rank - b.rank)
                  .map((card: FlashCard, index) => {
                    return (
                      <Draggable
                        key={card.id}
                        draggableId={card.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="duration-250 hover:scale-102 cursor-pointem  grid h-[14rem] w-auto transform pb-4 transition ease-in-out hover:-translate-y-1">
                              <div className="flex-col rounded-lg bg-gray-800 pb-12 shadow-xl hover:shadow-2xl">
                                <div className="flex justify-between gap-4">
                                  <h5 className="truncate p-8 text-xl font-bold tracking-tight text-brand-offWhite">
                                    Question:
                                  </h5>
                                  <div className="flex gap-2 p-6">
                                    <button
                                      onClick={(e) => {
                                        setFlashCardModalState({
                                          open: true,
                                          collectionId: collectionId,
                                          isEdit: true,
                                          data: {
                                            id: card.id,
                                            question: card.question,
                                            answer: card.answer,
                                          },
                                        });
                                      }}
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="center"
                                      title="Edit Details"
                                      className="flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue  focus:outline-brand-lightBlue"
                                    >
                                      <PencilIcon className="h-5 w-5 text-brand-offWhite" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setDeleteCardModalState({
                                          open: true,
                                          id: card?.id,
                                        });
                                      }}
                                      className="z-10 inline-flex items-center rounded-lg bg-none px-3 py-2 text-center text-sm font-medium text-brand-offWhite hover:bg-red-800 focus:outline-brand-lightBlue"
                                    >
                                      <TrashIcon className="h-5 w-5 text-brand-offWhite" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-grow flex-col px-8">
                                  <div className="flex grow flex-col gap-4">
                                    <p className="text-md dis block h-16 overflow-auto whitespace-normal break-normal break-words break-all text-left font-normal text-brand-offWhite">
                                      {card.question}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <FlashCardModal
        collectionId={collectionId}
        open={flashCardModalState.open}
        isEdit={flashCardModalState.isEdit}
        data={flashCardModalState.data}
        setOpen={() =>
          setFlashCardModalState({
            ...flashCardModalState,
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
