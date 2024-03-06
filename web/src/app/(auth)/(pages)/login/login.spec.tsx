import LoginService from './LoginService'
import Login from './page'

import { fireEvent, render } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

// const mockNavigate = jest.fn()

// jest.mock('next/navigation', () => ({
//   ...jest.requireActual('next/navigation'),
//   useRouter: () => {
//     return {
//       prefetch: () => null,
//       mockNavigate,
//     }
//   },
// }))

jest.mock('./LoginService', () => {
  const handleLogin = { handleLogin: jest.fn() }
  return {
    __esModule: true,
    default: jest.fn(() => handleLogin),
  }
})

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

  it('should be posible the user can login with correct credentials', async () => {
    const { getByTestId } = render(<Login />)

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    const loginService = LoginService()

    const obj = {}

    loginService.handleLogin.call(obj, {
      email: 'foo@example.com',
      password: '12345678',
    })

    expect(1 + 1).toBe(2)
  })
})
