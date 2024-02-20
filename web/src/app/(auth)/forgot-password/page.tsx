'use client'

import CardFooterLink from '../components/card-footer-link'
import CardForm from '@/app/(auth)/components/card-form'
import TextField from '@/components/form/components/text-field'

import { formSchema, ForgotPasswordFormData } from './formSchema'

export default function ForgotPassword() {
  const onSubmit = (values: ForgotPasswordFormData) => {
    console.log(values)
  }

  return (
    <>
      <CardForm
        title="Forgot Password?"
        description="Enter your email address to reset your password."
        textButton="To Send"
        formSchema={formSchema}
        onSubmit={onSubmit}
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
