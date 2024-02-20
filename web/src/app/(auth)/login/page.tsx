'use client'

import CardFooterLink from '../components/card-footer-link'
import CardForm from '@/app/(auth)/components/card-form'
import TextField from '@/components/form/components/text-field'
import LinkUnderline from '@/components/layout/link-underline'

import { formSchema, LoginFormData } from './formSchema'

export default function Login() {
  const onSubmit = (values: LoginFormData) => {
    console.log(values)
  }

  return (
    <>
      <CardForm
        title="Log In"
        description="Log in to listen to your music."
        textButton="Log In"
        formSchema={formSchema}
        onSubmit={onSubmit}
        defaultValues={{
          email: '',
          password: '',
        }}
      >
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
          placeholder="Enter your password"
          description={
            <>
              Forgot Password?
              <LinkUnderline href="forgot-password" className="ml-1">
                Click here to reset
              </LinkUnderline>
            </>
          }
        />
      </CardForm>
      <CardFooterLink
        description="Don't have an account?"
        textLink="Create an account"
        href="register-user"
      />
    </>
  )
}
