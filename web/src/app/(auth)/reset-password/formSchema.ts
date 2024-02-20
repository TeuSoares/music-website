import { z } from 'zod'

export const formSchema = z
  .object({
    token: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, 'Password must contain at least 6 character(s)')
      .max(12, 'Password must contain at most 12 character(s)'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords are not the same.',
    path: ['password_confirmation'],
  })

export type ResetPasswordFormData = z.infer<typeof formSchema>
