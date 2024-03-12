import ResetPassword from './[token]/page'

import { fireEvent, render, waitFor, within } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

const routerPushMock = jest.fn()

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => {
    return {
      push: routerPushMock.mockImplementation((url) => routerPushMock(url)),
    }
  },
  useSearchParams: () => ({
    get: () => {},
  }),
}))

const handleResetPasswordMock = jest.fn()

jest.mock('./PasswordService', () => ({
  __esModule: true,
  ...jest.requireActual('./PasswordService'),
  default: () => ({
    handleResetPassword: handleResetPasswordMock.mockImplementation(
      async (formData) => {
        http.post('http://localhost/api/reset-password', () => {
          new HttpResponse(formData, { status: 200 })
          return HttpResponse.json({ message: 'Reset Password successfully' })
        })

        routerPushMock('/')
      },
    ),
  }),
}))

describe('Reset Password Page', () => {
  it('should render the Reset Password page correctly', () => {
    const { getByTestId } = render(
      <ResetPassword params={{ token: 'token-valid' }} />,
    )

    const cardTitle = getByTestId('card-title')

    expect(within(cardTitle).getByText('Reset Password')).toBeInTheDocument()
  })

  it('should render Reset Password page with these elements', () => {
    const { getByLabelText } = render(
      <ResetPassword params={{ token: 'token-valid' }} />,
    )

    const passwordLabel = getByLabelText('Password')
    const passwordConfirmationLabel = getByLabelText(/Confirm your password/i)

    expect(passwordLabel).toBeInTheDocument()
    expect(passwordConfirmationLabel).toBeInTheDocument()
  })

  it('handleResetPassword action should be called when there is a button click', async () => {
    const { getByTestId, getByLabelText } = render(
      <ResetPassword params={{ token: 'token-valid' }} />,
    )

    const password = getByLabelText('Password')
    const passwordConfirmation = getByLabelText(/Confirm your password/i)

    fireEvent.input(password, { target: { value: '12345678' } })
    fireEvent.input(passwordConfirmation, { target: { value: '12345678' } })

    const button = getByTestId('button-submit')

    fireEvent.click(button)

    await waitFor(() => {
      expect(handleResetPasswordMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalled()
      expect(routerPushMock).toHaveBeenCalledWith('/')
    })
  })
})
