import Login from './page'

import { render, screen } from '@testing-library/react'

describe('Login Page', () => {
  it('should render Login with Log In title', () => {
    render(<Login />)

    screen.getByText('Log In')
  })
})
