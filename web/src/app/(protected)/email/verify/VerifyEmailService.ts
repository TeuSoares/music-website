import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { useFetch, useAppContext } from '@/hooks'

export default function VerifyEmailService(url: string) {
  const { get } = useFetch()
  const { setIsLoading } = useAppContext()

  const { data, isLoading, error } = useQuery(
    'verifyEmail',
    async () => await get(url),
    { refetchOnWindowFocus: false },
  )

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return { data, error }
}
