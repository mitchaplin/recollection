import { randomUUID } from "crypto";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  createCollection: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string(), author: z.string(), category: z.string(), difficulty: z.number() }))
    .mutation(async ({ input, ctx }) => {
    const id = randomUUID();
    const collection = await ctx.prisma.collection.create({
        data: {
            userId: ctx.session.user.id,
            id: id,
            name: input.name,
            description: input.description,
            author: input.author,
            category: input.category,     
            difficulty: input.difficulty,
        }
    });
    return collection
}),

updateCollection: protectedProcedure
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

  getCollections: protectedProcedure.input(z.object({
    searchText: z.string().optional(),
  })).query(async ({ input , ctx }) => {
    let collections;
    if (!!input.searchText) { 
      collections = await ctx.prisma.collection.findMany(
        { where: 
          { AND: [{ userId: ctx.session.user.id},
            { OR: [
            { name: { contains: input.searchText, mode: 'insensitive' }}, 
            { description: { contains: input.searchText, mode: 'insensitive' }}, 
            { author: { contains: input.searchText, mode: 'insensitive' }}, 
            { category: { contains: input.searchText, mode: "insensitive"}}]}]}})
    } else { 
      collections = await ctx.prisma.collection.findMany({ where: { userId: ctx.session.user.id}}); 
    }
    return collections;
  }),
  
  getCollection: protectedProcedure.input(z.object({
    id: z.string(),
  })).query(async ({ input , ctx }) => {
      const collections = await ctx.prisma.collection.findFirstOrThrow(
        { where: { AND: [{ id: input.id }, { userId: ctx.session.user.id}]}})

    return collections;
  }),

  delete: protectedProcedure
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

  getCollectionCardCount: protectedProcedure.input(
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
