import FormButton from '../../../components/form/components/form-button'
import Form, { FormProps } from '../../../components/form/form'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useAppContext } from '@/hooks'

interface CardFormProps extends FormProps {
  title: string
  textButton: string
  description?: string
}

const CardForm = ({
  title,
  textButton,
  description,
  defaultValues,
  children,
  formSchema,
  onSubmit,
}: CardFormProps) => {
  const { isLoading } = useAppContext()

  return (
    <>
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
          <FormButton disabled={isLoading}>{textButton}</FormButton>
        </Form>
      </CardContent>
    </>
  )
}

export default CardForm
