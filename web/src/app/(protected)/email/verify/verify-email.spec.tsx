import { QueryClient, QueryClientProvider } from 'react-query'

import VerifyEmail from './[id]/[hash]/page'
import * as VerifyEmailService from './VerifyEmailService'

import { render } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: () => ({
    get: () => {},
  }),
}))

jest.mock('./VerifyEmailService', () => ({
  __esModule: true,
  ...jest.requireActual('./VerifyEmailService'),
}))

const verifyEmailMock = jest.spyOn(VerifyEmailService, 'default')

describe('Verify Email Page', () => {
  it('should render the Verify Email page with success message', () => {
    verifyEmailMock.mockReturnValue({
      data: true,
      error: false,
    })

    const queryClient = new QueryClient()

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <VerifyEmail params={{ id: '50', hash: 'valid-hash' }} />,
      </QueryClientProvider>,
    )

    expect(getByText('Successful Email Verification')).toBeInTheDocument()
  })

  it('should render an error message when email verification fails', () => {
    verifyEmailMock.mockReturnValue({
      data: false,
      error: true,
    })

    const queryClient = new QueryClient()

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <VerifyEmail params={{ id: '50', hash: 'valid-hash' }} />,
      </QueryClientProvider>,
    )

    expect(getByText('Email verification failed')).toBeInTheDocument()
  })
})
