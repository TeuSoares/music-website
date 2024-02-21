import { api } from '@/services/config/api'

export const useFetch = () => {
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

  return { get, post, put, destroy }
}
