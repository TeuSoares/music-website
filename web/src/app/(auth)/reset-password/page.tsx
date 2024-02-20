'use client'

import CardForm from '@/app/(auth)/components/card-form'
import TextField from '@/components/form/components/text-field'

import { formSchema, ResetPasswordFormData } from './formSchema'

export default function ResetPassword() {
  const onSubmit = (values: ResetPasswordFormData) => {
    console.log(values)
  }

  return (
    <>
      <CardForm
        title="Reset Password"
        textButton="Reset Password"
        formSchema={formSchema}
        onSubmit={onSubmit}
      >
        <TextField
          name="token"
          label="Token"
          placeholder="Enter the token received by email."
        />
        <TextField
          name="email"
          type="email"
          label="E-mail"
          placeholder="Enter your e-mail address"
        />
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
