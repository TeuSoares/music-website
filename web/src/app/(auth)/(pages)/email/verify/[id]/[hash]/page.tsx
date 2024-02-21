'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import BulletPoint from '@/components/layout/bullet-point'
import LinkUnderline from '@/components/layout/link-underline'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface VerifyEmailProps {
  params: {
    id: string
    hash: string
  }
}

export default function VerifyEmail({ params }: VerifyEmailProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleVerifyEmail = async () => {
      const expires = searchParams.get('expires')
      const signature = searchParams.get('signature')

      const url = `/email/verify/${params.id}/${params.hash}?expires=${expires}&signature=${signature}`
      console.log(url)
    }

    handleVerifyEmail()
  }, [searchParams, params])

  return (
    <>
      <CardHeader>
        <CardTitle>Successful Email Verification</CardTitle>
        <CardDescription>
          Your email has been successfully verified. Now you can listen to your
          music without any problems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BulletPoint
          title="Have fun with favorite songs"
          description="Listen to your musics anywhere."
        />
        <BulletPoint
          title="Practicality in everyday life"
          description="Manage your music in one place."
        />
      </CardContent>
      <CardFooter>
        <LinkUnderline href="/" className="mt-2">
          Click here to return to home page
        </LinkUnderline>
      </CardFooter>
    </>
  )
}
