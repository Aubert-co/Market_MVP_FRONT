/// <reference types="cypress" />

import {users} from "../../fixtures/user"
const [user] = users
describe("cicle productPage to profile/cart",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.login(user)
        cy.visit("/")
        
        
    })
    it("should navigate through product, coupon and cart flow and successfully complete a purchase",()=>{
        cy.intercept("GET","http://localhost:8080/api/product?page=1").as("getProducts")
        cy.wait("@getProducts")
     
        cy.contains("Dezenas de Cupons")
        .click()

        cy.contains("Pegar")
        .first()
        .click()

        cy.get(".message_success")
        .should("contain.text","Sucesso ao adicionar o cupom")

        cy.intercept("GET", "http://localhost:8080/api/product?page=1").as("getProducts")

        cy.visit("/")

        cy.wait("@getProducts")

        cy.get('[data-testid="product"]')   
        .first()
        .click()

        cy.contains('Adicionar ao carrinho')
        .click()

        cy.get('[data-testid="profile-cart"]')
        .click()   

        cy.contains("Finalizar compra")
        .click()

        cy.get('[data-testid="select-coupon"]')
        .select("DESCONTO10")

        cy.contains("Finalizar")
        .click()

        cy.get(".message_success")
        .should("contain.text","Compra realizada com sucesso!")

         cy.get('[data-testid="profile-orders"]')
        .click()   
    })
})




