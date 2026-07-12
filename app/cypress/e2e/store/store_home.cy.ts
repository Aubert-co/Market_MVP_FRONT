import { users } from "cypress/fixtures/user"
import {storeDashboard} from "cypress/fixtures/storeDashboard"
import { formatValues} from "../../../src/constants/dashboardStats"
import { getLocalDate, getOrderStatus } from "@/utils"
import { OrderStatus } from "@/types/storeDashboard.types"
/// <reference types="cypress" />

const [user] = users

describe("page /loja",()=>{
    beforeEach(()=>{
        cy.reset_mocks()
        cy.login({email:user.email,password:user.password})
        cy.visit("/perfil/loja")
       
    })
   it("should render the store dashboard successfully",()=>{
        cy.intercept(
            "GET",
            "**/api/store/dashboard/*",
            {
                statusCode: 200,
                body:{ datas:storeDashboard }
            }
            ).as("getDashboard")
            cy.contains("Store 1")
                .click()
        
        cy.wait("@getDashboard")

        const {topViewedProducts,openOrders,reviews,...values} = storeDashboard
        const newObject = {totalReviews:reviews.totalReviews,averageRating:reviews.averageRating,...values}
        Object.entries(newObject).forEach(([key, data]) => {
            const val = data.value 
            if(key ==="revenue"){
                
                cy.get(`[data-testid="stats-${key}"]`)
                .should("contain", formatValues(key,val))
                return 
            }
            cy.get(`[data-testid="stats-${key}"]`)
            .should("contain", val)
        })
        topViewedProducts.value.forEach((val)=>{
            cy.contains(val.views+"%")
            cy.contains(val.name)
            cy.get(`img[alt="${val.name}"]`)
                .should("exist")
        })
        openOrders.value.forEach((val)=>{
            cy.contains(val.product.name)
            cy.contains(getOrderStatus(val.status as OrderStatus))
            cy.contains(val.total.toFixed(2))
            cy.contains(getLocalDate(val.createdAt))
        })
    })
    it("should display an error message when a dashboard item has an error",()=>{
        cy.intercept(
            "GET",
            "**/api/store/dashboard/*",
            {
                statusCode: 200,
                body:{ datas:storeDashboard }
            }
            ).as("getDashboard")
            cy.contains("Store 1")
                .click()
        
        cy.wait("@getDashboard")

        const {topViewedProducts,openOrders,reviews,...values} = storeDashboard
        
        const newObject = {totalReviews:reviews.totalReviews,averageRating:reviews.averageRating,...values}
        newObject.revenue.hasError = true;
        Object.entries(newObject).forEach(([key, data]) => {
            if(key === "revenue"){
                cy.get(`[data-testid="stats-error-${key}"]`)
                .should("contain", "Erro")
                return;
            }
            
            cy.get(`[data-testid="stats-${key}"]`)
            .should("contain", data.value)
        })
        topViewedProducts.value.forEach((val)=>{
            cy.contains(val.views+"%")
            cy.contains(val.name)
            cy.get(`img[alt="${val.name}"]`)
                .should("exist")
        })
        openOrders.value.forEach((val)=>{
            cy.contains(val.product.name)
            cy.contains(getOrderStatus(val.status as OrderStatus))
            cy.contains(val.total.toFixed(2))
            cy.contains(getLocalDate(val.createdAt))
        })
    })
     it("should render an error when no data is returned with status 200",()=>{
        cy.intercept(
            "GET",
            "**/api/store/dashboard/*",
            {
                statusCode: 200,
                body:{ datas:[] }
            }
            ).as("getDashboard")
            cy.contains("Store 1")
                .click()
        
        cy.wait("@getDashboard")

        const {reviews,...values} = storeDashboard
        const newObject = {totalReviews:reviews.totalReviews,averageRating:reviews.averageRating,...values}
        Object.entries(newObject).forEach(([key]) => {
        
        
            cy.get(`[data-testid="stats-error-${key}"]`)
            .should("contain", "Erro")

            cy.contains("Erro ao carregar os pedidos. Tente novamente.")

            cy.contains("Erro ao carregar os produtos mais visitados.")
        })
    })
     it("should render an error when no data is returned with status 500",()=>{
        cy.intercept(
            "GET",
            "**/api/store/dashboard/*",
            {
                statusCode: 500,
                body:{ datas:[] }
            }
            ).as("getDashboard")
            cy.contains("Store 1")
                .click()
        
        cy.wait("@getDashboard")

        const {reviews,...values} = storeDashboard
        const newObject = {totalReviews:reviews.totalReviews,averageRating:reviews.averageRating,...values}
        Object.entries(newObject).forEach(([key]) => {
        
        
            cy.get(`[data-testid="stats-error-${key}"]`)
            .should("contain", "Erro")

            cy.contains("Erro ao carregar os pedidos. Tente novamente.")

            cy.contains("Erro ao carregar os produtos mais visitados.")
        })
    })
    it("should render an error when no data is returned with status 401",()=>{
        cy.intercept(
            "GET",
            "**/api/store/dashboard/*",
            {
                statusCode: 401,
                body:{ datas:[] }
            }
            ).as("getDashboard")
            cy.contains("Store 1")
                .click()
        
        cy.wait("@getDashboard")

        const {reviews,...values} = storeDashboard
        const newObject = {totalReviews:reviews.totalReviews,averageRating:reviews.averageRating,...values}
        Object.entries(newObject).forEach(([key]) => {
        
        
            cy.get(`[data-testid="stats-error-${key}"]`)
            .should("contain", "Erro")

            cy.contains("Erro ao carregar os pedidos. Tente novamente.")

            cy.contains("Erro ao carregar os produtos mais visitados.")
        })
    })
})