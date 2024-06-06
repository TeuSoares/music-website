/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

Cypress.Commands.add('login', (email: string, password) => {
  cy.visit('/login')

  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password, { log: false })

  cy.intercept('POST', '**/api/login').as('login')

  cy.get('button[type="submit"]').click()

  cy.wait('@login', { timeout: 10000 })
})

Cypress.Commands.add('logout', () => {
  cy.intercept('POST', '**/api/logout').as('logout')

  cy.get('[data-testid="logout-button"]').click()

  cy.wait('@logout', { timeout: 10000 })
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}
