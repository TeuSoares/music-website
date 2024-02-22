import { useRouter } from 'next/navigation'

import { LoginFormData } from './formSchema'

import { useError, useFetch, useMessage } from '@/hooks'
import { setCookie } from 'cookies-next'

export default function LoginService() {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post, csrfToken } = useFetch()
  const router = useRouter()

  const handleLogin = async (formData: LoginFormData) => {
    await csrfToken().then(async () => {
      try {
        const response = await post('login', formData)

        setMessage({
          title: response.message,
          description: 'now you can listen to your songs',
          status: 'success',
        })

        setCookie('token', response.data.token)

        router.push('/')
      } catch (error: any) {
        setError(error, ['email', 'password', 'authetication'])
      }
    })
  }

  return { handleLogin }
}
