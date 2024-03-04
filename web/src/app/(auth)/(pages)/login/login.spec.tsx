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
  it('should render the login page correctly', () => {
    const { getByText } = render(<Login />)

    expect(getByText(/Log in to listen to your music/i)).toBeInTheDocument()
  })

  it('should render login page elements with these labels', () => {
    const { getByText, getByLabelText } = render(<Login />)

    const emailLabel = getByLabelText(/e-mail/i)
    const passwordLabel = getByLabelText(/password/i)
    const createAccountLink = getByText(/Create an account/i)
    const forgotPasswordLink = getByText(/Forgot Password/i)

    expect(emailLabel).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
    expect(createAccountLink).toBeInTheDocument()
    expect(forgotPasswordLink).toBeInTheDocument()
  })
})
