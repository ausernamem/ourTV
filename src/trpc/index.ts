import { tvShowsRouter } from "./tvShows-router";
import { moviesRouter } from "./movies-router";
import { router } from "./trpc";

export const appRouter = router({
    tvShows: tvShowsRouter,
    movies: moviesRouter
})

export type AppRouter = typeof appRouter;