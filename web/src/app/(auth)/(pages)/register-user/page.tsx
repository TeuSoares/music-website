'use client'

import TextField from '@/components/form/components/text-field'
import CardFooterLink from '@/components/layout/card-footer-link'
import CardForm from '@/components/layout/card-form'

import { formSchema } from './formSchema'
import RegisterService from './RegisterService'

export default function RegisterUser() {
  const { handleRegister } = RegisterService()

  return (
    <>
      <CardForm
        title="Sign Up"
        description="Sign Up to listen and record to your music."
        textButton="Sign Up"
        formSchema={formSchema}
        onSubmit={handleRegister}
        defaultValues={{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}
      >
        <TextField name="name" label="Name" placeholder="Write your fullname" />
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
      <CardFooterLink
        description="Do you have an account?"
        textLink="Click here to log in"
        href="login"
      />
    </>
  )
}
