'use client'

import TextField from '@/components/form/components/text-field'
import CardFooterLink from '@/components/layout/card-footer-link'
import CardForm from '@/components/layout/card-form'

import ForgotPasswordService from './ForgotPasswordService'
import { formSchema } from './formSchema'

export default function ForgotPassword() {
  const { handleForgotPassword } = ForgotPasswordService()

  return (
    <>
      <CardForm
        title="Forgot Password?"
        description="Enter your email address to reset your password."
        textButton="Send"
        formSchema={formSchema}
        onSubmit={handleForgotPassword}
        defaultValues={{
          email: '',
        }}
      >
        <TextField
          name="email"
          type="email"
          label="E-mail"
          placeholder="Enter your e-mail address"
        />
      </CardForm>
      <CardFooterLink
        description="Would you like to log in?"
        textLink="Click here"
        href="login"
      />
    </>
  )
}
