import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getSessionUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        apples: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          apples: ctx.session.user.apples + input.apples,
        },
      });
      return user;
    }),

  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = await ctx.prisma.user.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      await ctx.prisma.account.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
