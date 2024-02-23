import { useRouter } from 'next/navigation'

import { ForgotPasswordFormData } from './formSchema'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

export default function ForgotPasswordService() {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post, csrfToken } = useFetch()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleForgotPassword = async (formData: ForgotPasswordFormData) => {
    setIsLoading(true)

    await csrfToken().then(async () => {
      try {
        const response = await post('forgot-password', formData)

        setMessage({
          title: response.message,
          description:
            'A link to reset your password has been sent to your email',
          status: 'success',
        })

        router.push('/login')
      } catch (error: any) {
        setError(error, ['email', 'request'])
      }
    })

    setIsLoading(false)
  }

  return { handleForgotPassword }
}
