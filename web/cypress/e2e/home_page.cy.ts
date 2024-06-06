describe('Home Page', () => {
  after(() => {
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
  })

  it('should be redirected to login if token does not exist', () => {
    cy.visit('/')

    cy.getCookie('token').should('not.exist')

    cy.url().should('include', '/login')

    cy.contains('Log In Now')
  })

  it('should be redirected to home after login', () => {
    cy.login('mateus@gmail.com', '12345678')

    cy.url().should('include', '/')

    cy.getCookie('token').should('exist')

    cy.get('h1').should('contain', 'Choose a music would you like to hear')
  })

  it('should start the song by clicking the start button but stop when clicking the stop button', () => {
    cy.visit('/')

    cy.get('[data-testid^="button-play-"]').first().click()

    cy.get('[data-testid="music-title"]').should(
      'not.contain',
      'Choose a music would you like to hear',
    )

    cy.get('[data-testid^="button-stop-"]').first().click()

    cy.get('[data-testid="music-title"]').should(
      'contain',
      'Choose a music would you like to hear',
    )
  })

  it('should be redirected to the update page when clicking the edit button', () => {
    cy.visit('/')

    cy.get('[data-testid^="button-edit-"]').first().click()

    cy.url().should('match', /\/\d+\/update$/)

    cy.contains('[data-testid="card-title"]', /Update Music #\d+/)
  })

  it('should delete the song when clicking the trash can button', () => {
    cy.intercept('DELETE', '/api/music/*').as('deleteMusic')

    cy.visit('/')

    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('td')
          .eq(3)
          .invoke('text')
          .then((musicName) => {
            cy.get('[data-testid^="button-delete-"]').click()

            cy.wait('@deleteMusic')

            cy.contains('td', musicName).should('not.exist')
          })
      })
  })

  it('should be redirected to login page when clicking logout button and deleting token cookie', () => {
    cy.visit('/')

    cy.logout()

    cy.url().should('include', '/login')

    cy.getCookie('token').should('not.exist')
  })
})
