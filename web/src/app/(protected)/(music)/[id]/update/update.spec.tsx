import UpdateMusic from './page'

import { fireEvent, render, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

const routerPushMock = jest.fn()

const handleUpdateMusicMock = jest.fn()

jest.mock('../MusicServiceID', () => ({
  __esModule: true,
  ...jest.requireActual('../MusicServiceID'),
  default: () => ({
    handleUpdateMusic: handleUpdateMusicMock.mockImplementation(
      async (formData) => {
        http.post(`http://localhost/api/music/${8}`, () => {
          new HttpResponse(formData, { status: 200 })
          return HttpResponse.json({ message: 'Music updated with success.' })
        })

        routerPushMock('/')
      },
    ),
  }),
}))

describe('Update Music Page', () => {
  it('should render the Update Music page correctly', () => {
    const { getByText } = render(<UpdateMusic params={{ id: 8 }} />)

    expect(
      getByText(/Update the music and keep listening/i),
    ).toBeInTheDocument()
  })

  it('should render Update Music page elements with these labels', () => {
    const { getByLabelText } = render(<UpdateMusic params={{ id: 8 }} />)

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
    const { getByTestId, getByLabelText } = render(
      <UpdateMusic params={{ id: 8 }} />,
    )

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
      expect(handleUpdateMusicMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalledWith('/')
    })
  })
})
