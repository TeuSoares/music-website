import { useRouter } from 'next/navigation'

import { useAppContext } from '@/hooks'

import MusicService from './MusicService'
import Home from './page'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

jest.mock('@/hooks')
jest.mock('./MusicService')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Home Page', () => {
  let mockSetDataToUpdate: jest.Mock
  let mockHandleDeleteMusic: jest.Mock
  let mockRouterPush: jest.Mock
  let mockData: { data: any[]; error: null }

  beforeEach(() => {
    mockSetDataToUpdate = jest.fn()
    mockHandleDeleteMusic = jest.fn()
    mockRouterPush = jest.fn()
    ;(useAppContext as jest.Mock).mockReturnValue({
      setDataToUpdate: mockSetDataToUpdate,
    })

    mockData = { data: [], error: null }
    ;(MusicService as jest.Mock).mockReturnValue({
      data: mockData,
      handleDeleteMusic: mockHandleDeleteMusic,
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    })
  })

  it('renders correctly', () => {
    render(<Home />)

    expect(
      screen.getByText(/Choose a music would you like to hear/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/You don't have a music on your album yet/i),
    ).toBeInTheDocument()
  })

  it('plays music when play button is clicked', async () => {
    mockData.data = [
      {
        id: 1,
        name: 'Believer',
        artist: 'Imagine Dragons',
        youtube_id: 'W0DM5lcj6mw',
        thumbnail: 'thumbnail.jpg',
      },
    ]

    render(<Home />)

    const playButton = screen.getByTestId('button-play-1')
    fireEvent.click(playButton)

    await waitFor(() => {
      expect(screen.getByTitle('YouTube video player')).toHaveAttribute(
        'src',
        'https://www.youtube.com/embed/W0DM5lcj6mw',
      )

      const title = screen.getByTestId('music-title')
      expect(title).toHaveTextContent(/Believer/i)
    })
  })

  it('stops music when stop button is clicked', async () => {
    mockData.data = [
      {
        id: 1,
        name: 'Believer',
        artist: 'Imagine Dragons',
        youtube_id: 'W0DM5lcj6mw',
        thumbnail: 'thumbnail.jpg',
      },
    ]

    render(<Home />)

    const playButton = screen.getByTestId('button-play-1')
    fireEvent.click(playButton)

    await waitFor(() => {
      expect(screen.getByTitle('YouTube video player')).toBeInTheDocument()
    })

    const stopButton = screen.getByTestId('button-stop-1')
    fireEvent.click(stopButton)

    await waitFor(() => {
      expect(screen.queryByRole('iframe')).not.toBeInTheDocument()
      expect(
        screen.getByText(/Choose a music would you like to hear/i),
      ).toBeInTheDocument()
    })
  })

  it('calls setDataToUpdate and navigates to edit page when edit button is clicked', () => {
    mockData.data = [
      {
        id: 1,
        name: 'Believer',
        artist: 'Imagine Dragons',
        youtube_id: 'W0DM5lcj6mw',
        thumbnail: 'thumbnail.jpg',
      },
    ]

    render(<Home />)

    const editButton = screen.getByTestId('button-edit-1')
    fireEvent.click(editButton)

    expect(mockSetDataToUpdate).toHaveBeenCalledWith({
      id: 1,
      name: 'Believer',
      artist: 'Imagine Dragons',
      youtube_id: 'W0DM5lcj6mw',
      thumbnail: 'thumbnail.jpg',
    })
    expect(mockRouterPush).toHaveBeenCalledWith('/1/update')
  })

  it('calls handleDeleteMusic when delete button is clicked', () => {
    mockData.data = [
      {
        id: 1,
        name: 'Believer',
        artist: 'Imagine Dragons',
        youtube_id: 'W0DM5lcj6mw',
        thumbnail: 'thumbnail.jpg',
      },
    ]

    render(<Home />)

    const deleteButton = screen.getByTestId('button-delete-1')
    fireEvent.click(deleteButton)

    expect(mockHandleDeleteMusic).toHaveBeenCalledWith(1)
  })
})
