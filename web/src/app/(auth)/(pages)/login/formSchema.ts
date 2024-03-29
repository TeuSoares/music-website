import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})

export type LoginFormData = z.infer<typeof formSchema>
