'use client'

import { useSearchParams } from 'next/navigation'

import { useAppContext } from '@/hooks'

import CardChecked from '../../components/card-checked'
import CardFailed from '../../components/card-failed'
import { Card } from '@/components/ui/card'

import VerifyEmailService from '../../VerifyEmailService'

interface VerifyEmailProps {
  params: {
    id: string
    hash: string
  }
}

export default function VerifyEmail({ params }: VerifyEmailProps) {
  const { isLoading } = useAppContext()
  const searchParams = useSearchParams()

  const expires = searchParams.get('expires')
  const signature = searchParams.get('signature')

  const url = `/email/verify/${params.id}/${params.hash}?expires=${expires}&signature=${signature}`

  const { data, error } = VerifyEmailService(url)

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {!isLoading && (data || error) && (
        <Card className="min-[450px]:w-[450px]">
          {data && <CardChecked />}
          {error && <CardFailed />}
        </Card>
      )}
    </div>
  )
}
