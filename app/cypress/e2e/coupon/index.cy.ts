/// <reference types="cypress" />

import {users} from "../../fixtures/user"
const [user] = users
describe("cicle productPage to profile/cart",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.login(user)
        cy.visit("/")
        
        
    })
    it("should navigate to coupon page, add a coupon, and view it in user profile",()=>{
        cy.intercept("GET","http://localhost:8080/api/product?page=1").as("getProducts")
        cy.wait("@getProducts")
     
        cy.contains("Dezenas de Cupons")
        .click()

        cy.get('[data-testid="add-coupon"]')
        .first()
        .click()

        cy.get(".message_success")
        .should("contain.text","Sucesso ao adicionar o cupom")

        cy.get('[data-testid="add-coupon"]')
        .first()
        .click()

        cy.contains("Você já possui este cupom")
        .should("be.visible")

        cy.contains("Você já possui este cupom")
        .should("not.exist")
        cy.get('[data-testid="add-coupon"]')
        .eq(1)
        .click()   

        cy.get(".message_success")
        .should("contain.text","Sucesso ao adicionar o cupom")

        cy.get('[data-testid="profile-orders"]')
        .click()

        cy.contains("Meus cupons")
        .click()

        cy.get(".list-item")
        .should("have.length",2)
    })
})




