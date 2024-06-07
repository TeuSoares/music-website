describe('Register User Page', () => {
  after(() => {
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
  })

  it('should redirect to the register user page', () => {
    cy.visit('/register-user')

    cy.url().should('include', '/register-user')

    cy.get('[data-testid="card-title"]').should('contain', 'Sign Up')
  })

  it('should be possible to register a user if the fields are not empty', () => {
    cy.visit('/register-user')

    cy.get('input[name=name]').type('test')
    cy.get('input[name=email]').type('test@example.com')
    cy.get('input[name=password]').type('12345678')
    cy.get('input[name=password_confirmation]').type('12345678')

    cy.intercept('POST', '**/api/register-user').as('register-user')

    cy.get('[data-testid="button-submit"]').should('be.visible').click()

    cy.wait('@register-user', { timeout: 10000 })

    cy.url().should('include', '/login')
  })
})
