import { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Form, { FormProps } from '../form'
import FormButton from './form-button'

interface CardFormProps extends FormProps {
  title: string
  textButton: string
  description?: string
  footer?: string | ReactNode
}

const CardForm = ({
  title,
  textButton,
  description,
  defaultValues,
  children,
  formSchema,
  onSubmit,
  footer,
}: CardFormProps) => {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Form
          formSchema={formSchema}
          onSubmit={onSubmit}
          className="flex-col"
          defaultValues={defaultValues}
        >
          {children}
          <FormButton>{textButton}</FormButton>
        </Form>
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col gap-5 text-sm">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

export default CardForm
