'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAppContext } from '@/hooks'

import CardChecked from './components/card-checked'
import CardFailed from './components/card-failed'

import EmailService from '../../../EmailService'

interface VerifyEmailProps {
  params: {
    id: string
    hash: string
  }
}

export default function VerifyEmail({ params }: VerifyEmailProps) {
  const [isChecked, setIsChecked] = useState(false)
  const { isLoading } = useAppContext()
  const searchParams = useSearchParams()

  const { handleVerifyEmail } = EmailService()

  useEffect(() => {
    const verifyEmail = async () => {
      const expires = searchParams.get('expires')
      const signature = searchParams.get('signature')

      const url = `/email/verify/${params.id}/${params.hash}?expires=${expires}&signature=${signature}`

      const status = await handleVerifyEmail(url)

      setIsChecked(status)
    }

    verifyEmail()
  }, [])

  return (
    <>
      {!isLoading && isChecked && <CardChecked />}
      {!isLoading && !isChecked && <CardFailed />}
    </>
  )
}
