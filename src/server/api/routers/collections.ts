import { randomUUID } from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
    const collection = await ctx.prisma.collection.create({
        data: {
            collectionId: randomUUID(),
            ...input,
        }
    });
    return collection
}),
//   getCollections: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),
});
