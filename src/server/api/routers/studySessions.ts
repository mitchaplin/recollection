
import { randomUUID } from "crypto";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studyRouter = createTRPCRouter({
  createStudySession: protectedProcedure
    .input(z.object({ duration: z.number(), score: z.number(), collectionName: z.string(), collectionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
    const id = randomUUID();
    const collection = await ctx.prisma.studySession.create({
        data: {
            id: id,
            userId: ctx.session.user.id,
            duration: input.duration,
            score: input.score,
            collectionName: input.collectionName,
            collectionId: input.collectionId,
        }
    });
    return collection
}),

  getStudySessions: protectedProcedure.query(async ({ ctx }) => {
    const studySessions = await ctx.prisma.studySession.findMany(
        { where: { userId: ctx.session.user.id }})
    return studySessions;
  }),
});
