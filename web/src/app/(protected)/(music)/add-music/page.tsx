'use client'

import FormMusic from '../components/form-music'

import { MusicFormData } from '../formSchema'

export default function AddMusic() {
  const handleAddMusic = (formData: MusicFormData) => {
    console.log(formData)
  }

  return <FormMusic onSubmit={handleAddMusic} />
}
