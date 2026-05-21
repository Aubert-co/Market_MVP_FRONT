/// <reference types="cypress" />


describe("",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.register_login()
        cy.createStore()
    })
    it("",()=>{
        cy.visit("/loja/produtos")

        cy.contains("Criar Produto")
        .click()

        cy.get('[data-testid="upsert-name"]')
        .type("camisa")

        cy.get('[data-testid="image-product"]')
        .selectFile('cypress/fixtures/image.jpeg')

        cy.get('[data-testid="upsert-description"]')
        .type("lorem ipstu description")

        cy.get('[data-testid="upsert-price"]')
        .type("59.99")

        cy.get('[data-testid="upsert-stock"]')
        .type("50")

        cy.get('[data-testid="select-product"]')
        .select("Livros")

      
        cy.contains("button","Enviar")
        .click()

    })
})