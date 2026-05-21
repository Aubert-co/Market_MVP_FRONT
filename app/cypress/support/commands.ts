/// <reference types="cypress" />

import "./commands/login"
import "./commands/register_login"
import "./commands/createStore"
Cypress.Commands.add('reset_mocks',()=>{
    cy.request('POST', 'http://localhost:8080/test/reset');
})

