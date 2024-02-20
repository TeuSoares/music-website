import { z } from 'zod'

export const formSchema = z
  .object({
    name: z
      .string()
      .max(50)
      .regex(
        new RegExp('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
        'The field name must contain only letters.',
      )
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          })
          .join(' ')
      }),
    email: z.string().email().max(50),
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

export type CreateUserFormData = z.infer<typeof formSchema>
