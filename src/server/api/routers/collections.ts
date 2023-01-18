import { randomUUID } from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(z.object({ name: z.string(), description: z.string(), author: z.string(), difficulty: z.number()  }))
    .mutation(async ({ input, ctx }) => {
    const collectionId = randomUUID();
    const collection = await ctx.prisma.collection.create({
        data: {
            id: collectionId,
            name: input.name,
            description: input.description,
            author: input.author,
            difficulty: input.difficulty,     
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
          id: input.collectionId,
        },
      });
    return collectionTotal
  }),
});
