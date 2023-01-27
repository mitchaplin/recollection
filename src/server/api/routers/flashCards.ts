
import type { Collection, FlashCard } from "@prisma/client";
import { randomUUID } from "crypto";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const flashCardRouter = createTRPCRouter({
  createFlashCard: protectedProcedure
    .input(z.object({ question: z.string(), answer: z.string(), collectionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
    const id = randomUUID();
    const collection = await ctx.prisma.flashCard.create({
        data: {
            collectionId: input.collectionId,
            id: id,
            question: input.question,
            answer: input.answer,
        }
    });
    return collection
}),


updateFlashCard: protectedProcedure
.input(z.object({ name: z.string(), description: z.string(), author: z.string(), category: z.string(), id: z.string(), difficulty: z.number() }))
.mutation(async ({ input, ctx }) => {
const collection = await ctx.prisma.collection.update({
  where: { id: input.id },
    data: {
        name: input.name,
        description: input.description,
        author: input.author,
        category: input.category,     
        difficulty: input.difficulty,     
        }
    });
    return collection
}),


getFlashCards: protectedProcedure.input(z.object({ collectionId: z.string() })).query(async ({ input , ctx }) => {
    const collection = await ctx.prisma.collection.findFirstOrThrow(
        { where: { AND: [{ id: input.collectionId }, { userId: ctx.session.user.id}]},
        include: { cards: true }})

    return collection.cards as FlashCard[];
  }),

  getFlashCard: protectedProcedure.input(z.object({ cardId: z.string() })).query(async ({ input, ctx }) => {
    const flashCard = await ctx.prisma.flashCard.findFirstOrThrow(
        { where: { id: input.cardId },
            include: { Collection: true }})
        if (!flashCard || !flashCard.Collection) return;
        if ((flashCard.Collection as Collection).userId !== ctx.session.user.id) return
        return flashCard;
  }),

  deleteFlashCard: protectedProcedure
  .input(
      z.object({
          id: z.string(),
      })
  )
  .mutation(async ({ input, ctx }) => {
      const { id } = await ctx.prisma.collection.findFirstOrThrow({
          where: {
              id: input.id,
          },
      })
      const deleteCollection = await ctx.prisma.collection.delete({
          where: {
              id: input.id,
          },
      })

      return deleteCollection
  }),

  
});
