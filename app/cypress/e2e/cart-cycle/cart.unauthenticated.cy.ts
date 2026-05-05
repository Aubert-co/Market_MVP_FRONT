/// <reference types="cypress" />



describe('Unauthenticated user navigation (product → profile/cart)',()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.visit("/")
    })
    it("should return an error message when adding a product to the cart while the user is not logged in",()=>{
        cy.intercept("GET","http://localhost:8080/api/product?page=1").as("getProducts")
        cy.wait("@getProducts")
        cy.get('.product')
        .first().click()

        cy.contains('Adicionar ao carrinho')
        .click()

        cy.get(".message_error")
        .should("contain.text","Faça login para adicionar ao carrinho")

        cy.get("nav i").first()
        .click()

       

        cy.contains("Você não está logado. Faça login.")
    })
})




