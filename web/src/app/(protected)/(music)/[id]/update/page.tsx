'use client'

import { useAppContext } from '@/hooks'

import FormMusic from '../../components/form-music'

import MusicServiceID from '../MusicServiceID'

export default function UpdateMusic({ params }: { params: { id: number } }) {
  const { handleUpdateMusic } = MusicServiceID(params.id)
  const { dataToUpdate } = useAppContext()

  return (
    <FormMusic
      onSubmit={handleUpdateMusic}
      id={params.id}
      data={dataToUpdate}
    />
  )
}
