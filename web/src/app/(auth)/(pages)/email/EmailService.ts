import { useRouter } from 'next/navigation'

import { useError, useFetch, useAppContext } from '@/hooks'

export default function EmailService() {
  const { setError } = useError()
  const { get } = useFetch()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleVerifyEmail = async (url: string) => {
    setIsLoading(true)

    try {
      await get(url)
    } catch (error: any) {
      setError(error)

      router.push('/')
    }

    setIsLoading(false)
  }

  return { handleVerifyEmail }
}
