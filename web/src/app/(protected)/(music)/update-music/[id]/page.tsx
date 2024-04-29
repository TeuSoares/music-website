'use client'

import FormMusic from '../../components/form-music'

import { MusicFormData } from '../../formSchema'

export default function UpdateMusic({ params }: { params: { id: number } }) {
  const handleUpdateMusic = (formData: MusicFormData) => {
    console.log(formData)
  }

  return <FormMusic onSubmit={handleUpdateMusic} id={params.id} />
}
