import { useAppContext } from '@/hooks'

import FormButton from '../../../components/form/components/form-button'
import Form, { FormProps } from '../../../components/form/form'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
        <CardTitle data-testid="card-title">{title}</CardTitle>
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
          <FormButton data-testid="button-submit" disabled={isLoading}>
            {textButton}
          </FormButton>
        </Form>
      </CardContent>
    </>
  )
}

export default CardForm
