import { useFetch, useAppContext } from '@/hooks'

export default function EmailService() {
  const { get } = useFetch()
  const { setIsLoading } = useAppContext()

  const handleVerifyEmail = async (url: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      await get(url)
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  return { handleVerifyEmail }
}
