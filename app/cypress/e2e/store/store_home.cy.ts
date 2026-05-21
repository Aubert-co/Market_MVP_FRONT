import { users } from "cypress/fixtures/user"

const [user] = users
describe("page /abrir-loja",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.login({email:user.email,password:user.password})
        cy.visit("/perfil/loja")
    })
   it("should successfully create a store",()=>{
       cy.contains("Store 1")
       .click()
    })
})