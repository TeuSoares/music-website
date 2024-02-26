import { api } from '@/services/config/api'

import { useError } from '.'

import axios from 'axios'

export const useFetch = () => {
  const { setError } = useError()

  const get = async (url: string) => {
    const { data } = await api.get(url)
    return data
  }

  const post = async (url: string, formData?: object) => {
    const { data } = await api.post(url, formData)
    return data
  }

  const put = async (url: string, formData: object) => {
    const { data } = await api.put(url, formData)
    return data
  }

  const destroy = async (url: string) => {
    const { data } = await api.delete(url)
    return data
  }

  const csrfToken = async () => {
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
      )
    } catch (error: any) {
      setError(error)
    }
  }

  return { get, post, put, destroy, csrfToken }
}
