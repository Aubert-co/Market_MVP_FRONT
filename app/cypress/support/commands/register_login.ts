export const registerUserData = {
    email: "testing@gmail.com",
    password: "1234567",
    
}
Cypress.Commands.add("register_login", () => {
   cy.request({
        method: "POST",
        url: "http://localhost:8080/api/register",
        body: {
        email: registerUserData.email,
        name: "josef",
        password: registerUserData.password
        }
    }).its("status").should("eq",201)

    cy.login({
      email: registerUserData.email,
      password: registerUserData.password
    })
  
})