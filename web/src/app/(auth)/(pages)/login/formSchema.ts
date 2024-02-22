import { z } from 'zod'

export const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required()

export type LoginFormData = z.infer<typeof formSchema>
