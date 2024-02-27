import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { useAppContext, useFetch } from '@/hooks'

export const useVerifyEmail = (
  id: string,
  hash: string,
  expires: string,
  signature: string,
) => {
  const { get } = useFetch()
  const { setIsLoading } = useAppContext()

  const url = `/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`

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
