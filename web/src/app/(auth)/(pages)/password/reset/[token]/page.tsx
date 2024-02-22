'use client'

import { useSearchParams } from 'next/navigation'

import CardForm from '@/app/(auth)/components/card-form'
import TextField from '@/components/form/components/text-field'

import { formSchema, ResetPasswordFormData } from '../../formSchema'

interface ResetPasswordProps {
  params: {
    token: string
  }
}

export default function ResetPassword({ params }: ResetPasswordProps) {
  const searchParams = useSearchParams()

  const onSubmit = (values: ResetPasswordFormData) => {
    const formData = {
      token: params.token,
      ...values,
    }
    console.log(formData)
  }

  return (
    <>
      <CardForm
        title="Reset Password"
        textButton="Reset Password"
        formSchema={formSchema}
        onSubmit={onSubmit}
        defaultValues={{
          email: searchParams.get('email'),
        }}
      >
        <TextField name="email" type="email" label="E-mail" disabled />
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
