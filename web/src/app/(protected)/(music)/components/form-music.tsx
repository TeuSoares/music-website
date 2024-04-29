import TextField from '@/components/form/components/text-field'
import CardForm from '@/components/layout/card-form'
import Center from '@/components/layout/center'
import { Card } from '@/components/ui/card'

import { MusicFormData, formSchema } from '../formSchema'

interface FormMusicProps {
  onSubmit: (data: MusicFormData) => void
  data?: MusicFormData
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
            link_youtube: data ? data.link_youtube : '',
            thumbnail: data ? data.thumbnail : '',
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
          <TextField
            name="thumbnail"
            type="file"
            label="Thumbnail (JPG or PNG)"
          />
        </CardForm>
      </Card>
    </Center>
  )
}

export default FormMusic
