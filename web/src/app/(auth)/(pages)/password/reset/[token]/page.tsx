'use client'

import { useSearchParams } from 'next/navigation'

import TextField from '@/components/form/components/text-field'
import CardForm from '@/components/layout/card-form'

import { formSchema, ResetPasswordFormData } from '../formSchema'
import PasswordService from '../PasswordService'

interface ResetPasswordProps {
  params: {
    token: string
  }
}

export default function ResetPassword({ params }: ResetPasswordProps) {
  const searchParams = useSearchParams()
  const { handleResetPassword } = PasswordService()

  const onSubmit = async (values: ResetPasswordFormData): Promise<void> => {
    const formData = {
      token: params.token,
      email: searchParams.get('email'),
      ...values,
    }

    await handleResetPassword(formData)
  }

  return (
    <>
      <CardForm
        title="Reset Password"
        textButton="Reset Password"
        formSchema={formSchema}
        onSubmit={onSubmit}
        defaultValues={{
          password: '',
          password_confirmation: '',
        }}
      >
        <TextField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter a password between 6 and 12 characters"
        />
        <TextField
          name="password_confirmation"
          type="password"
          label="Confirm your password"
          placeholder="Confirm your password"
        />
      </CardForm>
    </>
  )
}
