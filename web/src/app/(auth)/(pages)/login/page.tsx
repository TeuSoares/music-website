'use client'

import TextField from '@/components/form/components/text-field'
import CardFooterLink from '@/components/layout/card-footer-link'
import CardForm from '@/components/layout/card-form'
import LinkUnderline from '@/components/layout/link-underline'

import { formSchema } from './formSchema'
import LoginService from './LoginService'

export default function Login() {
  const { handleLogin } = LoginService()

  return (
    <>
      <CardForm
        title="Log In Now"
        description="Log in to listen to your music."
        textButton="Log In"
        formSchema={formSchema}
        onSubmit={handleLogin}
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
