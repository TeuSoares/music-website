import RegisterUser from './page'

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

const handleRegisterMock = jest.fn()

jest.mock('./RegisterService', () => ({
  __esModule: true,
  ...jest.requireActual('./RegisterService'),
  default: () => ({
    handleRegister: handleRegisterMock.mockImplementation(async (formData) => {
      http.post('http://localhost/api/register-user', () => {
        new HttpResponse(formData, { status: 201 })
        return HttpResponse.json({ message: 'Register user successfully' })
      })

      routerPushMock('/')
    }),
  }),
}))

describe('Register User Page', () => {
  it('should render the Register User page correctly', () => {
    const { getByText } = render(<RegisterUser />)

    expect(
      getByText(/Sign Up to listen and record to your music/i),
    ).toBeInTheDocument()
  })

  it('should render Register User page with these elements', () => {
    const { getByText, getByLabelText } = render(<RegisterUser />)

    const nameLabel = getByLabelText(/name/i)
    const emailLabel = getByLabelText(/e-mail/i)
    const passwordLabel = getByLabelText('Password')
    const passwordConfirmationLabel = getByLabelText(/Confirm your password/i)
    const createAccountLink = getByText(/Do you have an account/i)

    expect(nameLabel).toBeInTheDocument()
    expect(emailLabel).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
    expect(passwordConfirmationLabel).toBeInTheDocument()
    expect(createAccountLink).toBeInTheDocument()
  })

  it('handleRegister action should be called when there is a button click', async () => {
    const { getByTestId, getByLabelText } = render(<RegisterUser />)

    const name = getByLabelText(/name/i)
    const email = getByLabelText(/e-mail/i)
    const password = getByLabelText('Password')
    const passwordConfirmation = getByLabelText(/Confirm your password/i)

    fireEvent.input(name, { target: { value: 'teste' } })
    fireEvent.input(email, { target: { value: 'teste@gmail.com' } })
    fireEvent.input(password, { target: { value: '12345678' } })
    fireEvent.input(passwordConfirmation, { target: { value: '12345678' } })

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    await waitFor(() => {
      expect(handleRegisterMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalledWith('/')
    })
  })
})
