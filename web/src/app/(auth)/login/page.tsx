'use client'

import Form from '@/components/form/form'
import TextField from '@/components/form/inputs/text-field'
import LinkUnderline from '@/components/layout/link-underline'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

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
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Log in to listen to your music.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          formSchema={formSchema}
          onSubmit={onSubmit}
          buttonText="Log In"
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
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <span className="text-sm">
          {`Don't have an account? `}
          <LinkUnderline href="register-user">Create an account</LinkUnderline>
        </span>
      </CardFooter>
    </>
  )
}
