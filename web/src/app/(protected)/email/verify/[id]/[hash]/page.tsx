'use client'

import { useSearchParams } from 'next/navigation'

import { useVerifyEmail } from '../../hooks/useVerifyEmail'
import { useAppContext } from '@/hooks'

import CardChecked from '../../components/card-checked'
import CardFailed from '../../components/card-failed'
import { Card } from '@/components/ui/card'

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

  const { data, error } = useVerifyEmail(
    params.id,
    params.hash,
    expires!,
    signature!,
  )

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {!isLoading && (
        <Card className="min-[450px]:w-[450px]">
          {data && <CardChecked />}
          {error && <CardFailed />}
        </Card>
      )}
    </div>
  )
}
