import { useRouter } from 'next/navigation'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

import { ResetPasswordFormData } from './formSchema'

export default function PasswordService() {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post, csrfToken } = useFetch()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleResetPassword = async (formData: ResetPasswordFormData) => {
    setIsLoading(true)

    await csrfToken().then(async () => {
      try {
        const response = await post('reset-password', formData)

        setMessage({
          title: response.message,
          description:
            'Your password has been reset, log in using the new password',
          status: 'success',
        })

        router.push('/login')
      } catch (error: any) {
        setError(error, ['token', 'email', 'password', 'password_confirmation'])
      }
    })

    setIsLoading(false)
  }

  return { handleResetPassword }
}
