import { useFetch, useAppContext } from '@/hooks'

export default function EmailService() {
  const { get } = useFetch()
  const { setIsLoading } = useAppContext()

  const handleVerifyEmail = async (url: string): Promise<string> => {
    try {
      await get(url)
      setIsLoading(false)
      return 'checked'
    } catch (error) {
      setIsLoading(false)
      return 'failed'
    }
  }

  return { handleVerifyEmail }
}
