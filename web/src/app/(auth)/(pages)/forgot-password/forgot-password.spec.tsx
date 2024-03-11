import ForgotPassword from './page'

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

const handleForgotPasswordMock = jest.fn()

jest.mock('./ForgotPasswordService', () => ({
  __esModule: true,
  ...jest.requireActual('./ForgotPasswordService'),
  default: () => ({
    handleForgotPassword: handleForgotPasswordMock.mockImplementation(
      async (formData) => {
        http.post('http://localhost/api/forgot-password', () => {
          new HttpResponse(formData, { status: 200 })
          return HttpResponse.json({ message: 'Forgot Password successfully' })
        })

        routerPushMock('/')
      },
    ),
  }),
}))

describe('ForgotPassword Page', () => {
  it('should render the ForgotPassword page correctly', () => {
    const { getByText } = render(<ForgotPassword />)

    expect(getByText(/Forgot Password/i)).toBeInTheDocument()
  })

  it('should render ForgotPassword page with these elements', () => {
    const { getByText, getByLabelText } = render(<ForgotPassword />)

    const emailLabel = getByLabelText(/e-mail/i)
    const createAccountLink = getByText(/Would you like to log in/i)

    expect(emailLabel).toBeInTheDocument()
    expect(createAccountLink).toBeInTheDocument()
  })

  it('handleForgotPassword action should be called when there is a button click', async () => {
    const { getByTestId, getByLabelText } = render(<ForgotPassword />)

    const email = getByLabelText(/e-mail/i)

    fireEvent.input(email, { target: { value: 'teste@gmail.com' } })

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    await waitFor(() => {
      expect(handleForgotPasswordMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalledWith('/')
    })
  })
})
