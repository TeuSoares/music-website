import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { useError, useFetch, useMessage, useAppContext } from '@/hooks'

import { MusicFormData } from './formSchema'

interface IMusics {
  data: [
    {
      id: number
      user_id: number
      artist: string
      genre: string
      name: string
      youtube_id: string
      thumbnail: string
    },
  ]
}

export default function MusicService() {
  const { setMessage } = useMessage()
  const { setError } = useError()
  const { post, get, destroy } = useFetch()
  const { setIsLoading, setResetFields } = useAppContext()

  const { data, isLoading, error, refetch } = useQuery<IMusics>(
    'musics',
    async () => await get('music'),
    { refetchOnWindowFocus: false },
  )

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  const handleAddMusic = async (formData: MusicFormData) => {
    setIsLoading(true)

    formData.thumbnail = formData.thumbnail[0]

    try {
      const response = await post('music', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMessage({
        description: response.message,
        status: 'success',
      })

      setResetFields(true)
    } catch (error: any) {
      setError(error, ['artist', 'genre', 'name', 'link_youtube', 'thumbnail'])
    }

    setIsLoading(false)
  }

  const handleDeleteMusic = async (id: number) => {
    setIsLoading(true)

    try {
      const response = await destroy(`music/${id}`)

      setMessage({
        description: response.message,
        status: 'success',
      })

      refetch()
    } catch (error: any) {
      setError(error)
    }

    setIsLoading(false)
  }

  return { data, error, handleAddMusic, handleDeleteMusic }
}
