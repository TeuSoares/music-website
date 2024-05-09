import Image from 'next/image'

import FileField from '@/components/form/components/file-field'
import TextField from '@/components/form/components/text-field'
import CardForm from '@/components/layout/card-form'
import Center from '@/components/layout/center'
import { Card } from '@/components/ui/card'

import { MusicFormData, formSchema } from '../formSchema'

interface FormMusicProps {
  onSubmit: (data: MusicFormData) => void
  data?: {
    id: number
    user_id: number
    artist: string
    genre: string
    name: string
    youtube_id: string
    thumbnail: string
  }
  id?: number
}

const FormMusic = ({ onSubmit, data, id }: FormMusicProps) => {
  return (
    <Center>
      <Card className="min-[450px]:w-[450px]">
        <CardForm
          title={data ? `Update Music #${id}` : 'Add Music'}
          description={
            data
              ? 'Update the music and keep listening'
              : 'Add a music to your playlist.'
          }
          textButton={data ? 'Update Music' : 'Add Music'}
          formSchema={formSchema}
          onSubmit={onSubmit}
          defaultValues={{
            artist: data ? data.artist : '',
            name: data ? data.name : '',
            genre: data ? data.genre : '',
            link_youtube: data
              ? `https://www.youtube.com/watch?v=${data.youtube_id}`
              : '',
            thumbnail: '',
          }}
        >
          <TextField
            name="artist"
            label="Artist"
            placeholder="Who is the artist"
          />
          <TextField
            name="name"
            label="Name of the Music"
            placeholder="Enter name of the music"
          />
          <TextField
            name="genre"
            label="Genre"
            placeholder="Ex: Rock, Indie, etc"
          />
          <TextField
            name="link_youtube"
            label="Youtube link for music"
            placeholder="Ex: https://www.youtube.com/watch?v=<youtube_id>"
          />
          <FileField name="thumbnail" label="Thumbnail (JPG or PNG)" />
          {data && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.thumbnail}`}
              alt={data.name}
              width={100}
              height={100}
            />
          )}
        </CardForm>
      </Card>
    </Center>
  )
}

export default FormMusic
