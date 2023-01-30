import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { api } from "../../utils/api";

export const FlashCardModal = ({
  collectionId,
  open,
  setOpen,
  isEdit,
  data,
}: {
  collectionId: string;
  open: boolean;
  isEdit: boolean;
  setOpen: () => void;
  data: { question: string; answer: string; id: string };
}) => {
  const cancelButtonRef = useRef(null);
  const session = useSession();
  const router = useRouter();
  const contextUtil = api.useContext();
  const createFlashCard = api.flashCardRouter.createFlashCard.useMutation();
  const updateFlashCard = api.flashCardRouter.updateFlashCard.useMutation();
  const [question, setQuestion] = useState<string>(isEdit ? data.question : "");
  const [answer, setAnswer] = useState<string>(isEdit ? data.answer : "");
  useEffect(() => {
    if (isEdit) {
      setQuestion(data.question);
      setAnswer(data.answer);
    }
  }, [isEdit, data.answer, data.question]);

  useEffect(() => {
    if (!isEdit) {
      setQuestion("");
      setAnswer("");
    }
  }, [isEdit]);

  const handleSubmitFlashCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateFlashCard.mutateAsync(
        {
          id: data.id,
          question: question,
          answer: answer,
          collectionId: collectionId,
        },
        { onSuccess: () => setOpen() }
      );
    } else {
      await createFlashCard.mutateAsync(
        {
          question: question,
          answer: answer,
          collectionId: collectionId,
        },
        { onSuccess: () => setOpen() }
      );
    }
    await contextUtil.flashCardRouter.getFlashCards.invalidate();
  };

  useEffect(() => {
    if (session.status === "loading") return;
  }, [router, session]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99999999999999999]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto bg-opacity-75">
          <div className="flex min-h-full items-center justify-center p-0 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-brand-offWhite  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="mx-auto px-4 py-16">
                  <h1 className="font mb-10 text-center font-heading text-3xl font-bold text-brand-gray">
                    {isEdit ? "Edit Flash Card" : "Create Flash Card"}
                  </h1>
                  <form
                    onSubmit={(e) => void handleSubmitFlashCard(e)}
                    className={"flex w-full grow flex-col gap-6"}
                  >
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="question"
                          className="text-heading mb-2 block font-medium text-brand-gray"
                        >
                          Collection Question
                        </label>
                        <textarea
                          name="question"
                          id="question"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="dark:focus:border-primary-500 dark:focus:ring-primary-500 block h-44 w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                          placeholder="Flash Card Question"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="answer"
                          className="text-body mb-2 block font-medium text-brand-gray"
                        >
                          Answer
                        </label>
                        <textarea
                          id="answer"
                          cols={8}
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="dark:focus:border-primary-500 dark:focus:ring-primary-500 block h-44 w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-brand-offWhite placeholder-gray-400 focus:border-brand-subtleBlue"
                          placeholder="Flash Card Answer"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-center gap-10">
                      <button className="bg-brand-dark mt-4 rounded-lg bg-brand-actionBlue px-5 py-2.5 text-sm font-medium text-brand-offWhite hover:bg-brand-subtleBlue focus:outline-brand-lightBlue">
                        {isEdit ? "Edit Flash Card" : "Create Flash Card"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
