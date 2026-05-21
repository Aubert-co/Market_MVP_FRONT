/// <reference types="cypress" />

Cypress.Commands.add("createStore", () => {
  cy.fixture("image.jpeg", "binary").then((fileContent) => {
    const blob = Cypress.Blob.binaryStringToBlob(
      fileContent,
      "image/png"
    )

    const formData = new FormData()

    formData.append("name", "Minha Loja")
    formData.append("description", "Descrição da loja")
    formData.append("image", blob, "image.png")

    cy.window().then((win) => {
      return win.fetch("http://localhost:8080/api/stores", {
        method: "POST",
        body: formData,
        credentials: "include"
      })
    })
  })
})