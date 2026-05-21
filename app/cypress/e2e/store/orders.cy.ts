/// <reference types="cypress" />

import { getLocalDate, getOrderStatus } from "@/utils"
import { ordersMock } from "cypress/fixtures/orders"

const firtsMock = [ordersMock[0]]
describe("/loja/pedidos",()=>{
    
    beforeEach(()=>{
        cy.reset_mocks()
        cy.register_login()
        cy.createStore()
     
    })
    it("should successfully render the data",()=>{
        cy.visit("/loja/pedidos")
     
        cy.intercept("GET","**/stores/3/orders**",{
            statusCode:200,
            body:{
                datas:ordersMock
            }
        })

        ordersMock.forEach((val)=>{
            cy.contains(val.product.name)
            cy.contains(getOrderStatus(val.status))
            cy.contains(val.total)
            cy.contains(getLocalDate(val.createdAt))
        })

        cy.get("button[aria-label='Abrir detalhes do pedido 1']")
        .click()

        cy.contains("Detalhes da ordem")
        firtsMock.forEach((val) => {
            cy.contains(`#${val.id}`)

            cy.contains(val.user)

            cy.contains(val.product.name)

            cy.contains(String(val.quantity))

            cy.contains(`R$ ${val.price}`)

            cy.contains(`R$ ${val.total}`)

            cy.contains(getOrderStatus(val.status))

            cy.contains(getLocalDate(val.createdAt))

            if (val.coupon) {
                cy.contains(
                `${val.coupon.code} (${val.coupon.discount}%)`
                )
            }
        })
    }) 
    it("should render the message 'Nenhum pedido encontrado.'' when the status is 200 and the data is empty",()=>{
        cy.visit("/loja/pedidos")
     
        cy.intercept("GET","**/stores/3/orders**",{
            statusCode:200,
            body:{
                datas:[]
            }
        })
        cy.contains("Nenhum pedido encontrado.")
    }) 
    it("should render the message 'Erro ao carregar os pedidos. Tente novamente.' when the status is 500",()=>{
        cy.visit("/loja/pedidos")
     
        cy.intercept("GET","**/stores/3/orders**",{
            statusCode:500,
            body:{
                datas:[]
            }
        })
        cy.contains("Erro ao carregar os pedidos. Tente novamente.")
    }) 
})