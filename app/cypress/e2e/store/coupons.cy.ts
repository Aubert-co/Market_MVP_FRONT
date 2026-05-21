/// <reference types="cypress" />


describe("/loja/cupons",()=>{
    const couponDatas = {
        code:"DESCONTO5",
        discount:10,
        discountType:"percent",
        expiresAt:"oneweek",
        quantity:5
    }
    beforeEach(()=>{
        cy.reset_mocks()
        cy.register_login()
        cy.createStore()
     
    })
    it("should successfully create a new coupon",()=>{
        cy.visit("/loja/cupons")
     
        cy.contains("Criar Cupom")
        .click()

        cy.get('[id="drawer-title-criar-cupom"]')
         .should("be.visible")
        cy.get('[data-testid="select"]')
        .first()
        .select("Em porcentagem",{force:true})
        
        cy.get('[placeholder="Ex: 15"]')
        .type(couponDatas.discount.toString())

        cy.get('[placeholder="Ex: DESCONTO15"]')
        .type(couponDatas.code)

        cy.get('[name="cupom-expires"]')
        .select("1 semana")

        cy.get('[placeholder="Ex: 25"]')
        .type(couponDatas.quantity.toString())

        cy.intercept("POST","**/stores/coupons").as("createCoupon")
        cy.contains("button","Criar")
        .click()
        cy.wait(3100)
        cy.get('[id="drawer-title-criar-cupom"]')
        .should("not.be.visible")
       
        cy.wait("@createCoupon").then(({request})=>{
            const {code,discount,discountType,expiresAt,quantity}  =request.body

            expect(code).to.eq(couponDatas.code)
            expect(discount).to.eq(couponDatas.discount)
            expect(expiresAt).to.eq("oneweek")
            expect(quantity).to.eq(couponDatas.quantity)
            expect(discountType).to.eq(couponDatas.discountType)
        })

        cy.contains(`${couponDatas.discount}%`)
        cy.contains(couponDatas.quantity)
    })
    it("should return 'Nenhum cupom disponivel' when the datas is empty",()=>{
        cy.intercept("GET", "**/stores/coupons/**", {
            statusCode: 200,
            body: {
                datas: [],
                status: 200,
                message: "success",
                currentPage:1,
                totalPages:1
            }
            }).as("getCoupons")
            cy.visit("/loja/cupons")

            cy.contains("Nenhum cupom disponivel").should("be.visible")

    })
      it("should return 'Algo deu errado, tente novamente mais tarde!' when the status is 500",()=>{
        cy.intercept("GET", "**/stores/coupons/**", {
            statusCode: 500,
            body: {
                datas: [],
                status: 500,
                message: "success",
                currentPage:1,
                totalPages:1
            }
            }).as("getCoupons")

            cy.visit("/loja/cupons")
            cy.contains("Algo deu errado, tente novamente mais tarde!").should("be.visible")
    })
     it("should return 'Você não está logado. Faça login.!' when the status is 401",()=>{
        cy.intercept("GET", "**/stores/coupons/**", {
            statusCode: 401,
            body: {
                datas: [],
                status: 401,
                message: "success",
                currentPage:1,
                totalPages:1
            }
            }).as("getCoupons")

            cy.visit("/loja/cupons")
            cy.contains("Você não está logado. Faça login.").should("be.visible")
    })
})