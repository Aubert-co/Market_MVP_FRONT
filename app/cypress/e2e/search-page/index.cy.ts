/// <reference types="cypress" />
describe("filter",()=>{

    it("should correctly fill the filter form when the URL contains query params",()=>{
        cy.visit("/buscas?maxPrice=50&category=Livros&q=camisa+polo&minPrice=10&orderBy=asc")
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').should("have.value","10");
        cy.get('input[placeholder="FAÇA UMA BUSCA"]').should("have.value","camisa polo")
        cy.get('[data-testid="max-price"]').should("have.value",50)
        cy.get('.select-category').should("have.value","Livros")
        cy.get('.order-by').should("have.value","asc")
       
        cy.intercept("GET", "**/product/search**").as("searchProducts")
        cy.contains('button', 'Enviar').click();
        
       
       cy.wait("@searchProducts").then(({ request }) => {
            const {maxPrice,category,minPrice,orderBy,name} = request.query
            expect(maxPrice).to.eq("50")
            expect(minPrice).to.eq("10")
            expect(name).to.eq("camisa polo")
            expect(category).to.eq("Livros")
            expect(orderBy).to.eq("asc")
        })
    })
     it("should display 'Ocorreu um erro ao carregar os dados.' when the backend returns a 500 status",()=>{
        cy.visit("/buscas?maxPrice=50&category=Livros&q=camisa+polo")
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('10');
        cy.get('[data-testid="max-price"]').should("have.value",50)
        cy.get('.select-category').should("have.value","Livros")
       
        cy.intercept("GET", "**/api/product/search?**", {
            statusCode: 500 ,
            
            body: {
                message: "Internal Server Error",
                datas: []
            }
            }).as("searchProducts")
        cy.contains('button', 'Enviar').click();
        
        cy.wait("@searchProducts")
        cy.contains("Ocorreu um erro ao carregar os dados.")
    })
     
    it("should display 'Sem produtos disponíveis' when the backend returns an empty products array",()=>{
        cy.visit("/buscas?maxPrice=50&category=Livros&q=camisa+polo")
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('10');
        cy.get('[data-testid="max-price"]').should("have.value",50)
        cy.get('.select-category').should("have.value","Livros")
       
        cy.intercept("GET", "**/product/search**", {
            statusCode: 200,
            body: {
                message: "Internal Server Error",
                datas:[]
                
            }
        }).as("searchProducts")
        cy.contains('button', 'Enviar').click();
        cy.wait("@searchProducts")

        cy.contains("Sem produtos disponíveis")
        
    })
    it("should successfully clear the filter form and send the correct values",()=>{
        cy.visit('/buscas')
        
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('10');
        cy.get('[data-testid="max-price"]').type('500');

        cy.get('.order-by').select('maior preço');

        cy.get('.select-category').select('Livros',{force:true});

        cy.contains('button', 'Limpar').click();

        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('50');
        cy.get('[data-testid="max-price"]').type('100');

        cy.get('.order-by').select('menor preço');
        cy.get('.select-category').select('Todas');


        cy.intercept("GET", "**/product/search**").as("searchProducts")
        cy.contains('button', 'Enviar').click();
        
       

       cy.wait("@searchProducts").then(({ request }) => {
            const {maxPrice,category,minPrice,orderBy,name} = request.query
            expect(maxPrice).to.eq("100")
            expect(minPrice).to.eq("50")
            expect(name).to.eq("")
            expect(category).to.eq("")
            expect(orderBy).to.eq("asc")
        })
    })
    it("should load product name from URL, fill and clear filters, then send the correct values",()=>{
        cy.visit('/buscas?q=camisa+polo')
        
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('10');
        cy.get('[data-testid="max-price"]').type('500');
        
        cy.get('.order-by').select('maior preço');

        cy.get('.select-category').select('Livros',{force:true});

        cy.contains('button', 'Limpar').click();

        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('50');
        cy.get('[data-testid="max-price"]').type('100');

        cy.get('.order-by').select('menor preço');
        cy.get('.select-category').select('Livros');
      

          cy.wait(400)
        cy.intercept("GET", "**/product/search**").as("searchProducts")
        
      
        cy.contains('button', 'Enviar')
        .click();
       
        cy.get("@searchProducts").then(({ request }) => {
            const {maxPrice,category,minPrice,orderBy,name} = request.query
            
            expect(name).to.eq("camisa polo")
            expect(category).to.eq("Livros")
            expect(orderBy).to.eq("asc")
            expect(maxPrice).to.eq("100")
            expect(minPrice).to.eq("50")
        })
    })
})