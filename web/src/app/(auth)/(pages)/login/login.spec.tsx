import Login from './page'

import { fireEvent, render } from '@testing-library/react'

const routerPushMock = jest.fn()

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => {
    return {
      push: routerPushMock.mockImplementation((url) => routerPushMock(url)),
    }
  },
}))

const handleLoginMock = jest.fn()

jest.mock('./LoginService', () => ({
  __esModule: true,
  ...jest.requireActual('./LoginService'),
  default: () => ({
    handleLogin: handleLoginMock.mockImplementation(async (formData) => {
      console.log(formData)
      routerPushMock('/')
      return {
        email: 'bYw2Y@example.com',
        password: '12345678',
      }
    }),
  }),
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

  it('should be posible the user can login with correct credentials', async () => {
    const { getByTestId, debug, getByLabelText } = render(<Login />)

    const email = getByLabelText(/e-mail/i)
    const password = getByLabelText(/password/i)

    fireEvent.input(email, { target: { value: 'bYw2Y@example.com' } })
    fireEvent.input(password, { target: { value: '12345678' } })

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    debug()

    expect(1 + 1).toBe(2)
    expect(handleLoginMock).toHaveBeenCalled()
    expect(routerPushMock).toHaveBeenCalled()
    expect(routerPushMock).toHaveBeenCalledWith('/')
  })
})
