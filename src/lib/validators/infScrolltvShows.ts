import { z } from "zod"

export const infScrollTV = z.object({
    cursorQuery: z.string().optional()
})

export type infScrollTVType = z.infer<typeof infScrollTV>