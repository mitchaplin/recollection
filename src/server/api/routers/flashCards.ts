import { randomUUID } from "crypto";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const flashCardRouter = createTRPCRouter({
  createFlashCard: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        collectionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = randomUUID();
      await ctx.prisma.flashCard.updateMany({
        where: { collectionId: input.collectionId },
        data: { rank: { increment: 1 } },
      });
      const flashCard = await ctx.prisma.flashCard.create({
        data: {
          collectionId: input.collectionId,
          id: id,
          rank: 0,
          question: input.question,
          answer: input.answer,
        },
      });
      return flashCard;
    }),

  updateFlashCard: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        collectionId: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const flashCard = await ctx.prisma.flashCard.update({
        where: { id: input.id },
        data: {
          collectionId: input.collectionId,
          id: input.id,
          question: input.question,
          answer: input.answer,
        },
      });
      return flashCard;
    }),

  reorderFlashCard: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        cardId: z.string(),
        startIndex: z.number(),
        endIndex: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.flashCard.update({
        where: { id: input.cardId },
        data: {
          rank: -1,
        },
      });
      if (input.startIndex < input.endIndex) {
        // move card down
        await ctx.prisma.flashCard.updateMany({
          where: {
            NOT: { id: input.cardId },
            collectionId: input.collectionId,
            rank: { gt: input.startIndex, lte: input.endIndex },
          },
          data: { rank: { decrement: 1 } },
        });
      } else {
        // move card up
        await ctx.prisma.flashCard.updateMany({
          where: {
            NOT: { id: input.cardId },
            collectionId: input.collectionId,
            rank: { lt: input.startIndex, gte: input.endIndex },
          },
          data: { rank: { increment: 1 } },
        });
      }
      const flashCard = await ctx.prisma.flashCard.update({
        where: { id: input.cardId },
        data: {
          rank: input.endIndex,
        },
      });
      return flashCard;
    }),

  getFlashCards: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const cards = await ctx.prisma.flashCard.findMany({
        where: { collectionId: input.collectionId },
        orderBy: { rank: "asc" },
      });
      return cards;
    }),

  getFlashCard: protectedProcedure
    .input(z.object({ cardId: z.string() }))
    .query(async ({ input, ctx }) => {
      const flashCard = await ctx.prisma.flashCard.findFirstOrThrow({
        where: { id: input.cardId },
        include: { Collection: true },
      });
      if (!flashCard || !flashCard.Collection) return;
      if (flashCard.Collection.userId !== ctx.session.user.id) return;
      return flashCard;
    }),

  deleteFlashCard: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.flashCard.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      const deleteCard = await ctx.prisma.flashCard.delete({
        where: {
          id: input.id,
        },
      });

      return deleteCard;
    }),
});
