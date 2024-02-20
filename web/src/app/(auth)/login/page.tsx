'use client'

import CardForm from '@/components/form/components/card-form'
import TextField from '@/components/form/components/text-field'
import LinkUnderline from '@/components/layout/link-underline'
import { CardFooter } from '@/components/ui/card'

import { z } from 'zod'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})

export default function Login() {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
      <CardFooter className="flex flex-col gap-5">
        <span className="text-sm">
          {`Don't have an account? `}
          <LinkUnderline href="register-user">Create an account</LinkUnderline>
        </span>
      </CardFooter>
    </>
  )
}
