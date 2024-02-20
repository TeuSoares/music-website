'use client'

import { useSearchParams } from 'next/navigation'

import LinkUnderline from '@/components/layout/link-underline'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Terminal } from 'lucide-react'

interface VerifyEmailProps {
  params: {
    id: string
    hash: string
  }
}

export default function VerifyEmail({ id, hash }: VerifyEmailProps) {
  const searchParams = useSearchParams()

  const handleVerifyEmail = async () => {
    const signed = searchParams.get('signed')
    console.log(signed)
  }

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Your email has been successfully verified</AlertTitle>
      <AlertDescription className="flex flex-col">
        {`Your email has been successfully verified. Now you can listen to your music without any problems`}
        <LinkUnderline href="/" className="mt-2">
          Click here to back home
        </LinkUnderline>
      </AlertDescription>
    </Alert>
  )
}
