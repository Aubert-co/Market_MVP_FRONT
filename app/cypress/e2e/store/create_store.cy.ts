describe("page /abrir-loja",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.register_login()
        cy.visit("/perfil/loja")
    })
   it("should successfully create a store",()=>{
        cy.intercept("POST", "/api/store").as("getStore")
        const storeName = "eletronic"
        const description = "lorem isptu"
        cy.contains("Minha loja")
        cy.contains("Você ainda não tem uma loja ,crie uma agora mesmo")
        cy.contains("crie uma agora mesmo")
            .click()
        cy.location("pathname").should("include","/abrir-loja")
        cy.contains("Crie sua loja agora mesmo e comece a faturar com facilidade e segurança.")
        .click()

        cy.contains("Criar Loja!")

        cy.get('input[placeholder="Ex: EletronicArts"]').type("eletronic");
        cy.get('textarea[placeholder="Ex: Produtos eletrônicos diversos"]').type(description);
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/image.jpeg')

        cy.contains("button","Enviar")
        .click()

        cy.visit("/perfil/loja")
        cy.contains(storeName)
            .click()
        cy.contains("Dashboard")
        cy.intercept("/api/store")
        
    })
})