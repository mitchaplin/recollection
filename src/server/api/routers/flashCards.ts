
import { randomUUID } from "crypto";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const flashCardRouter = createTRPCRouter({
  createFlashCard: protectedProcedure
    .input(z.object({ question: z.string(), answer: z.string(), collectionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
    const id = randomUUID();
    const flashCard = await ctx.prisma.flashCard.create({
        data: {
            collectionId: input.collectionId,
            id: id,
            question: input.question,
            answer: input.answer,
        }
    });
    return flashCard
}),


updateFlashCard: protectedProcedure
.input(z.object({  question: z.string(), answer: z.string(), collectionId: z.string(),  id: z.string(), }))
.mutation(async ({ input, ctx }) => {
const flashCard = await ctx.prisma.flashCard.update({
  where: { id: input.id },
  data: {
    collectionId: input.collectionId,
    id: input.id,
    question: input.question,
    answer: input.answer,
}
    });
    return flashCard
}),


getFlashCards: protectedProcedure.input(z.object({ collectionId: z.string() })).query(async ({ input , ctx }) => {
    const flashCard = await ctx.prisma.collection.findFirstOrThrow(
        { where: { AND: [{ id: input.collectionId }, { userId: ctx.session.user.id}]},
        include: { cards: true }})

    return flashCard.cards ;
  }),

  getFlashCard: protectedProcedure.input(z.object({ cardId: z.string() })).query(async ({ input, ctx }) => {
    const flashCard = await ctx.prisma.flashCard.findFirstOrThrow(
        { where: { id: input.cardId },
            include: { Collection: true }})
        if (!flashCard || !flashCard.Collection) return;
        if ((flashCard.Collection ).userId !== ctx.session.user.id) return
        return flashCard;
  }),

  deleteFlashCard: protectedProcedure
  .input(
      z.object({
          id: z.string(),
      })
  )
  .mutation(async ({ input, ctx }) => {
      const { id } = await ctx.prisma.flashCard.findFirstOrThrow({
          where: {
              id: input.id,
          },
      })
      const deleteCard = await ctx.prisma.flashCard.delete({
          where: {
              id: input.id,
          },
      })

      return deleteCard
  }),

  
});
