import { randomUUID } from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(z.object({ name: z.string(), description: z.string(), author: z.string(), category: z.string() }))
    .mutation(async ({ input, ctx }) => {
    const collectionId = randomUUID();
    const collection = await ctx.prisma.collection.create({
        data: {
            id: collectionId,
            name: input.name,
            description: input.description,
            author: input.author,
            category: input.category,     
        }
    });
    return collection
}),
  getCollections: publicProcedure.input(z.object({
    searchText: z.string().optional(),
  })).query(async ({ input , ctx }) => {
    let collections;
    if (!!input.searchText) { 
      collections = await ctx.prisma.collection.findMany(
        { where: { OR: [
          { name: { contains: input.searchText }}, 
          { description: { contains: input.searchText }}, 
          { author: { contains: input.searchText }}, 
          { category: { contains: input.searchText }}]}})
    } else { 
      collections = await ctx.prisma.collection.findMany(); 
    }
    return collections;
  }),
  
  delete: publicProcedure
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
