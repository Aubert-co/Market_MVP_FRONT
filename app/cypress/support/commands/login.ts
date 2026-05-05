
Cypress.Commands.add("login",(data:LoginDTO)=>{

    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/login',
        body: {
            email: data.email,
            password: data.password
        },

    }).its("status")
    .should("eq",201)

})