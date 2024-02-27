import { useEffect, useState } from 'react'

import EmailService from '../../EmailService'

export const useVerifyEmail = (
  id: string,
  hash: string,
  expires: string,
  signature: string,
) => {
  const [status, setStatus] = useState<string | null>(null)

  const { handleVerifyEmail } = EmailService()

  useEffect(() => {
    const verifyEmail = async () => {
      const url = `/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`

      const response = await handleVerifyEmail(url)

      setStatus(response)
    }

    verifyEmail()
  }, [])

  return { status }
}
