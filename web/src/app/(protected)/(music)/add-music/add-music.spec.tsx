import AddMusic from './page'

import { fireEvent, render, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

const handleAddMusicMock = jest.fn()

jest.mock('../MusicService', () => ({
  __esModule: true,
  ...jest.requireActual('../MusicService'),
  default: () => ({
    handleAddMusic: handleAddMusicMock.mockImplementation(async (formData) => {
      http.post('http://localhost/api/music', () => {
        new HttpResponse(formData, { status: 201 })
        return HttpResponse.json({ message: 'Music created with success.' })
      })
    }),
  }),
}))

describe('Add Music Page', () => {
  it('should render the add music page correctly', () => {
    const { getByText } = render(<AddMusic />)

    expect(getByText(/Add a music to your playlist./i)).toBeInTheDocument()
  })

  it('should render add music page elements with these labels', () => {
    const { getByLabelText } = render(<AddMusic />)

    const artistLabel = getByLabelText(/artist/i)
    const nameLabel = getByLabelText(/name/i)
    const genreLabel = getByLabelText(/genre/i)
    const youtubeLinkLabel = getByLabelText(/Youtube link for music/i)
    const thumbnailLabel = getByLabelText(/thumbnail/i)

    expect(artistLabel).toBeInTheDocument()
    expect(nameLabel).toBeInTheDocument()
    expect(genreLabel).toBeInTheDocument()
    expect(youtubeLinkLabel).toBeInTheDocument()
    expect(thumbnailLabel).toBeInTheDocument()
  })

  it('should be posible add a music if the fields not empty', async () => {
    const { getByTestId, getByLabelText } = render(<AddMusic />)

    const artist = getByLabelText(/artist/i)
    const name = getByLabelText(/name/i)
    const genre = getByLabelText(/genre/i)
    const youtubeLink = getByLabelText(/Youtube link for music/i)
    const thumbnail = getByLabelText(/thumbnail/i)

    fireEvent.input(artist, { target: { value: 'Imagine Dragons' } })
    fireEvent.input(name, { target: { value: 'Believer' } })
    fireEvent.input(genre, { target: { value: 'Rock' } })
    fireEvent.input(youtubeLink, {
      target: { value: 'https://www.youtube.com/watch?v=W0DM5lcj6mw' },
    })

    const file = new File(['(⌐□_□)'], 'thumbnail.png', { type: 'image/png' })

    fireEvent.change(thumbnail, {
      target: { files: [file] },
    })

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    await waitFor(() => {
      expect(handleAddMusicMock).toHaveBeenCalled()
    })
  })
})
