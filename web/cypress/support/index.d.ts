declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to check for the 'token' cookie and redirect to login if not present.
     * @example cy.checkAndRedirectIfNoToken()
     */
    login(email: string, password: string): Chainable<void>
    logout(): Chainable<void>
  }
}
