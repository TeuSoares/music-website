import Login from './page'

import { fireEvent, render, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

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
      http.post('http://localhost/api/login', () => {
        new HttpResponse(formData, { status: 200 })
        return HttpResponse.json({ message: 'Login successfully' })
      })

      routerPushMock('/')
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
    const { getByTestId, getByLabelText } = render(<Login />)

    const email = getByLabelText(/e-mail/i)
    const password = getByLabelText(/password/i)

    fireEvent.input(email, { target: { value: 'teste@gmail.com' } })
    fireEvent.input(password, { target: { value: '12345678' } })

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    await waitFor(() => {
      expect(handleLoginMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalledWith('/')
    })
  })
})
