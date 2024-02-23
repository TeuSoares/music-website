'use client'

import CardFooterLink from '../../components/card-footer-link'
import CardForm from '@/app/(auth)/components/card-form'
import TextField from '@/components/form/components/text-field'

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
