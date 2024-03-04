import Login from './page'

import { render } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe('Login Page', () => {
  const screen = render(<Login />)

  it('should render the login page correctly', () => {
    screen.getByText(/Log in to listen to your music/i)
  })
})
