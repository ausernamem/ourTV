import { publicProcedure, router } from "./trpc"

export const moviesRouter = router({
    helloworld: publicProcedure.query(() => {
        return "hello, world";
    })
})