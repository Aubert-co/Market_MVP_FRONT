const userSettings = {
    name:"joaotest",
    email:"user@example1.com",
    password:"1234567"
}
describe("Page Registro",()=>{
    before(()=>{
        cy.request('POST', 'http://localhost:8080/test/reset');
        cy.visit('/registro')
    })
    
    it("should successfully register a new user, redirect to the login page, and log the user in",()=>{
       
        cy.contains('p','Cadastre-se agora e aproveite cupons de desconto exclusivos e muito mais!')
        .click()

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type(userSettings.email);
        cy.get('input[placeholder="Ex: joao"]').type(userSettings.name);
        cy.get('input[placeholder="Digite uma senha forte!"]').type(userSettings.password);
        cy.get('input[placeholder="Igual a do campo senha"]').type(userSettings.password);

        cy.contains('button','Enviar').click()

        cy.get('.message_success')
        .should('contain.text', 'Você criou sua conta com sucesso, você será redirecionado');

        cy.location('pathname').should('eq', '/login');

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type(userSettings.email);
        cy.get('input[placeholder="Digite uma senha forte!"]').type(userSettings.password);
       

        cy.contains('button','Enviar').click()

        cy.get('.message_success')
        .should('contain.text', 'Você fez login com sucesso, você será redirecionado');

        cy.location('pathname').should('eq', '/');
    })
     
})