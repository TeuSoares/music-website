import { useRouter } from 'next/navigation'

import { logout } from '@/services/http/logout'

import { useAppContext, useError, useMessage } from '@/hooks'

import { deleteCookie } from 'cookies-next'

export const useLogout = () => {
  const { setError } = useError()
  const { setMessage } = useMessage()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      const data = await logout()

      deleteCookie('token')

      setMessage({
        description: data.message,
        status: 'success',
      })

      router.push('/login')
    } catch (error: any) {
      setError(error)
    }

    setIsLoading(false)
  }

  return { handleLogout }
}
