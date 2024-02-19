import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { Form as FormUI } from '../ui/form'
import FormButton from './form-button'

import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType, z } from 'zod'

type FormCardProps = {
  formSchema: ZodType
  children: ReactNode
  buttonText: string
  onSubmit: (values: z.infer<FormCardProps['formSchema']>) => void
  defaultValues?: object
}

const Form = ({
  formSchema,
  children,
  buttonText,
  onSubmit,
  defaultValues,
}: FormCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          {children}
          <FormButton>{buttonText}</FormButton>
        </div>
      </form>
    </FormUI>
  )
}

export default Form
