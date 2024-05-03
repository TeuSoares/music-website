'use client'

import FormMusic from '../components/form-music'

import MusicService from '../MusicService'

export default function AddMusic() {
  const { handleAddMusic } = MusicService()

  return <FormMusic onSubmit={handleAddMusic} />
}
