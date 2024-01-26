import { z } from "zod"

export const tvValidator = z.object({
   posterLink: z.string().url(),
   name: z.string(),
})

export type tvValidatorType = z.infer<typeof tvValidator>