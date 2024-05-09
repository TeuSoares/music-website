import { validateFile } from '@/utils/helpers'

import { z } from 'zod'

export const formSchema = z.object({
  artist: z
    .string()
    .min(1, 'Required field')
    .regex(
      new RegExp('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
      'The field must contain only letters.',
    )
    .refine((value) => value.trim().length > 0, {
      message: 'the field must not contain only spaces',
    })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  name: z.string().min(1, 'Required field'),
  genre: z
    .string()
    .min(1, 'Required field')
    .regex(
      new RegExp('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
      'The field must contain only letters.',
    )
    .refine((value) => value.trim().length > 0, {
      message: 'the field must not contain only spaces',
    }),
  link_youtube: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/,
      'Invalid YouTube link',
    ),
  thumbnail: z.custom(
    (data: any) => {
      if (!data) {
        return true
      }

      return validateFile(data[0] as File)
    },
    {
      message: 'Invalid file',
    },
  ),
})

export type MusicFormData = z.infer<typeof formSchema>
