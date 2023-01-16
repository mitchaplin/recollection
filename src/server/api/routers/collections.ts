import { randomUUID } from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(z.object({ name: z.string()  }))
    .mutation(async ({ input, ctx }) => {
    const collection = await ctx.prisma.collection.create({
        data: {
            collectionId: randomUUID(),
            ...input,
        }
    });
    return collection
}),
  getCollections: publicProcedure.query(async ({ ctx }) => {
    const collections = await ctx.prisma.collection.findMany();
    return collections;
  }),
  
  getCollectionCardCount: publicProcedure.input(
    z.object({
        collectionId: z.string(),
      }).required()).query(async ({ input, ctx }) => {

    const collectionTotal = await ctx.prisma.collection.count({
        where: {        
          collectionId: input.collectionId,
        },
      });
    return collectionTotal
  }),
});
