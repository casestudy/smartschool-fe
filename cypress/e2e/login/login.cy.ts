/// <reference types="Cypress" />

describe('Login Page', () => {
  it('Show fail when no forware slash in username', () => {
    cy.visit(Cypress.env('host_url'))
    cy.get('[data-cy="username"]').type('test');
    cy.get('[data-cy="password"]').type('dev01');
    cy.get('[data-cy="username"]').should('have.length.above', 0);
    cy.get('[data-cy="password"]').should('have.length.above', 0);
    cy.get('[data-cy="submitLogin"]').click()
  })
})

describe('Login Page', () => {
	it('Redirect when to dashboard when user inputs correct username and password', () => {
	  cy.visit(Cypress.env('host_url'))
	  cy.get('[data-cy="username"]').type('dev01/01');
	  cy.get('[data-cy="password"]').type('dev01');
	  cy.get('[data-cy="username"]').should('have.length.above', 0);
	  cy.get('[data-cy="password"]').should('have.length.above', 0);
	  cy.get('[data-cy="submitLogin"]').click()
	})
  })