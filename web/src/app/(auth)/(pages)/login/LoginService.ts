import { useRouter } from 'next/navigation'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

import { setHours } from '@/utils/helpers'

import { LoginFormData } from './formSchema'

import { setCookie } from 'cookies-next'

export default function LoginService() {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post, csrfToken } = useFetch()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true)

    await csrfToken().then(async () => {
      try {
        const response = await post('login', formData)

        setMessage({
          title: response.message,
          description: 'now you can listen to your songs',
          status: 'success',
        })

        setCookie('token', response.data.token, {
          expires: setHours(7),
        })

        router.push('/')
      } catch (error: any) {
        setError(error, ['email', 'password', 'authetication'])
      }
    })

    setIsLoading(false)
  }

  return { handleLogin }
}
