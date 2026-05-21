/// <reference types="cypress" />





declare namespace Cypress {
  interface Chainable {
    login(data:LoginDTO): Chainable<void>,
    reset_mocks():Chainable<void>,
    register_login():Chainable<void>
  }
}