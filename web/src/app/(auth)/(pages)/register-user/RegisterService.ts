import { useRouter } from 'next/navigation'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

import { CreateUserFormData } from './formSchema'

export default function RegisterService() {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post, csrfToken } = useFetch()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleRegister = async (formData: CreateUserFormData) => {
    setIsLoading(true)

    await csrfToken().then(async () => {
      try {
        const response = await post('register-user', formData)

        setMessage({
          title: response.message,
          description:
            'A notification has been sent to your email for verification.',
          status: 'success',
        })

        router.push('login')
      } catch (error: any) {
        setError(error, ['name', 'email', 'password', 'password_confirmation'])
      }
    })

    setIsLoading(false)
  }

  return { handleRegister }
}
