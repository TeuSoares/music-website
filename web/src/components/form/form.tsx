import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { Form as FormUI } from '../ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType, z } from 'zod'

export interface FormProps {
  formSchema: ZodType
  children: ReactNode
  onSubmit: (values: z.infer<FormProps['formSchema']>) => void
  defaultValues?: object
  className?: string
}

const Form = ({
  formSchema,
  children,
  onSubmit,
  defaultValues,
  className,
}: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={`flex w-full gap-4 ${className}`}>{children}</div>
      </form>
    </FormUI>
  )
}

export default Form
