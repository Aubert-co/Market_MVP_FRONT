/// <reference types="cypress" />

import {users} from "../../fixtures/user"
const [user] = users
describe("cicle productPage to profile/cart",()=>{
    beforeEach(()=>{
        cy.login(user)
        cy.visit("/")
        
        
    })
    it("should enter in the product page add to cart an see this in the cart and realizes increase ,decrease ,and remove from cart",()=>{
        cy.intercept("GET","http://localhost:8080/api/product?page=1").as("getProducts")
        cy.wait("@getProducts")
        cy.get('.product')
        .first().click()

        cy.contains('Adicionar ao carrinho')
        .click()

        cy.get(".message_success")
        .should("contain.text","Adicionado ao carrinho com sucesso")

        cy.get("nav i").first()
        .click()

        cy.contains("Meu carrinho")
        cy.get('[aria-label="Quantidade de itens no carrinho"]')
            .should('contain', '1')
        
        cy.get('[aria-label="Aumentar quantidade"]')
        .click()
        cy.get('[aria-label="Quantidade de itens no carrinho"]')
            .should('contain', '2')

        cy.get('[aria-label="Diminuir quantitdade"]')
        .click()
        cy.get('[aria-label="Quantidade de itens no carrinho"]')
            .should('contain', '1')

        cy.get('[aria-label="Remover item do carrinho"]')
        .click()

        cy.contains("Seu carrinho está vazio. Adicionar produtos")
    })
})




