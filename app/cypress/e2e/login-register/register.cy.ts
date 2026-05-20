import { registerUserData } from "cypress/support/commands/register_login"

describe("Page Registro",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.visit('/registro')
    })
    
    it("should register a new user sucessfully and redirect to login",()=>{
       
        cy.contains('p','Cadastre-se agora e aproveite cupons de desconto exclusivos e muito mais!')
        .click()

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Ex: joao"]').type('lucass');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
        cy.get('input[placeholder="Igual a do campo senha"]').type('1234567');

        cy.contains('button','Enviar').click()

        cy.get('.message_success')
        .should('contain.text', 'Você criou sua conta com sucesso, você será redirecionado');

        cy.location('pathname').should('eq', '/login');
    })
     it("should render 'Ocorreu um erro inesperado.' when the backend returns a 500 status code",()=>{
         cy.intercept("POST", "http://localhost:8080/api/register", {
            statusCode: 500,
            body: {
                message: "Internal Server Error"
            }
        }).as("registerError")
        cy.contains('p','Cadastre-se agora e aproveite cupons de desconto exclusivos e muito mais!')
        .click()

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Ex: joao"]').type('lucass');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
        cy.get('input[placeholder="Igual a do campo senha"]').type('1234567');

        cy.contains('button','Enviar').click()

        cy.get('.message_error')
        .should('contain.text', 'Ocorreu um erro inesperado.');

        cy.location('pathname').should('eq', '/registro');
    })
    it("should return 'Confira seus dados e tente novamente. Caso já tenha uma conta, faça login' when email is already registered",()=>{
        cy.register_login()
    
        cy.contains('p','Cadastre-se agora e aproveite cupons de desconto exclusivos e muito mais!')
        .click()

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type(registerUserData.email);
        cy.get('input[placeholder="Ex: joao"]').type('lucass');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
        cy.get('input[placeholder="Igual a do campo senha"]').type('1234567');

        cy.contains('button','Enviar').click()

        cy.get('.message_info')
        .should('contain.text', 'Confira seus dados e tente novamente. Caso já tenha uma conta, faça login');

        cy.location('pathname').should('eq', '/registro');
    })
})