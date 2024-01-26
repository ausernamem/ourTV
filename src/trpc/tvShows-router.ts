import { tvValidator } from "@/lib/validators/tvShowsValidator"
import { protectedProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server"
import { infScrollTV } from "@/lib/validators/infScrolltvShows";
import { z } from "zod";

export const tvShowsRouter = router({
  add: protectedProcedure.input(tvValidator).mutation(async ({ input, ctx }) => {
    const { name, posterLink } = input;
    const videoLink = 'videoLink'

    if(ctx.auth.sessionClaims.metadata.role !== "admin") 
         throw new TRPCError({ code: 'UNAUTHORIZED' })

    const existingShow = await ctx.db.tvShow.findUnique({
        where: {
            name
        }
    })

        
    if(existingShow) 
         throw new TRPCError({ code: 'CONFLICT' })

    await ctx.db.tvShow.create({
        data: {
            name,
            videoLink,
            posterLink,
        }
    })

    return { success: true }
  }),
  get: protectedProcedure.input( z.object({
    cursor: z.string().optional(), // <-- "cursor" needs to exist, but can be any type
  }),).query(async ({ ctx, input }) => {

    const take = 1
    const cursorQuery = (input.cursor) ?? undefined
    const cursor = cursorQuery ? { id: cursorQuery } : undefined

    const skip = cursorQuery ? 1 : 0

    try {
      const shows = await ctx.db.tvShow.findMany({
        skip,
        take,
        cursor,
    })
      const nextId = shows.length < take ? undefined : shows[take - 1].id

      return {...shows, nextId, success: true};
    } catch(error) {
        return { success: false }
    }
  })
})