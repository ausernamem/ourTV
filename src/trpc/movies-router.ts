import { protectedProcedure, publicProcedure, router } from "./trpc"

export const moviesRouter = router({
    helloworld: protectedProcedure.query(() => {
        return "hello, world";
    })
})