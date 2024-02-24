import { useRouter } from 'next/navigation'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

import { ForgotPasswordFormData } from './formSchema'

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
        setError(error, ['email'])
      }
    })

    setIsLoading(false)
  }

  return { handleForgotPassword }
}
