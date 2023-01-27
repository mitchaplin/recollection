import { authRouter } from "./routers/auth";
import { collectionsRouter } from "./routers/collections";
import { flashCardRouter } from "./routers/flashCards";
import { studyRouter } from "./routers/studySessions";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  authRouter: authRouter,
  collectionsRouter: collectionsRouter,
  studyRouter: studyRouter,
  flashCardRouter: flashCardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
