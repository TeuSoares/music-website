import { useRouter } from 'next/navigation'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

import { MusicFormData } from '../formSchema'

export default function MusicServiceID(id: number) {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post } = useFetch()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const handleUpdateMusic = async (formData: MusicFormData) => {
    setIsLoading(true)

    if (!formData.thumbnail) {
      delete formData.thumbnail
    } else {
      formData.thumbnail = formData.thumbnail[0]
    }

    try {
      const response = await post(`music/${id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMessage({
        description: response.message,
        status: 'success',
      })

      router.push('/')
    } catch (error: any) {
      setError(error, ['artist', 'genre', 'name', 'link_youtube', 'thumbnail'])
    }

    setIsLoading(false)
  }

  return { handleUpdateMusic }
}
