import { users } from "cypress/fixtures/user";

 const [user] = users
describe("Page Login",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.visit('/login')
        
    })
    
    it("should log a new user successfully and redirect to /",()=>{
       
        cy.get('input[placeholder="Ex: joao@gmail.com"]').type(user.email);
        cy.get('input[placeholder="Digite uma senha forte!"]').type(user.password);
       

        cy.contains('button','Enviar').click()

        cy.get('.message_success')
        .should('contain.text', 'Você fez login com sucesso, você será redirecionado');

        cy.location('pathname').should('eq', '/');
    })
    it("should display 'Usuário ou senha inválidos' when the user password is invalid",()=>{
        
        cy.get('input[placeholder="Ex: joao@gmail.com"]').type(user.email);
        cy.get('input[placeholder="Digite uma senha forte!"]').type(user.password+"e");
       

        cy.contains('button','Enviar').click()
        cy.contains('div', 'Usuário ou senha inválidos');
        cy.location('pathname').should('eq', '/login');
    })
    it("should return 'Erro interno, tente novamente' when the backend returns status 500",()=>{
        cy.intercept("POST", "http://localhost:8080/api/login", {
            statusCode: 500,
            body: {
                message: "Internal Server Error"
            }
        }).as("loginError")
    
         cy.get('input[placeholder="Ex: joao@gmail.com"]').type(user.email);
        cy.get('input[placeholder="Digite uma senha forte!"]').type(user.password+"e");
       

        cy.contains('button','Enviar').click()
        cy.contains('div', 'Erro interno, tente novamente');
        cy.location('pathname').should('eq', '/login');
    })
})