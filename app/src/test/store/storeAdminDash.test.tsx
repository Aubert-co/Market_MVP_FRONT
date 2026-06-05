import {StoreHome} from "@/pages/store/storeHome"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import * as dashboardStats from "@/hooks/store/useDashboardStas"
import { mapStats } from "@/constants/dashboardStats"
import { mockBackendStats } from "./dashboardStats.test"
import userEvent from "@testing-library/user-event"
import { FixtureOrders, FixtureVisitedProducs } from "../fixtures/store.fixtures"


const spyDashboardStats = jest.spyOn(dashboardStats,'useDashboardStats')

const mockSetIsOpen = jest.fn()

jest.mock("@/hooks/useSidebarOrDrawer", () => ({
  useSideBarOrDrawer: () => ({
    isOpen: false,
    setIsOpen: mockSetIsOpen,
  }),
})) 
const mockOrders = {
    value:FixtureOrders,
    hasError:false
}
const mockVisitedProducts = {
    value:FixtureVisitedProducs,
    hasError:false
}

describe("StoreDashboard",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should render the page correctly",async()=>{
        
        
        spyDashboardStats.mockReturnValue({status:201,stats:mapStats(mockBackendStats),openOrders:mockOrders,topVisitProducts:mockVisitedProducts})
        
        const {getByRole,getAllByText,queryByText} = render(
            <BrowserRouter>
                <StoreHome/>
            </BrowserRouter>
        )
        const [ordersLink,mostVisitedLink] = getAllByText("ver mais")
        expect(queryByText("Visualizações")).toBeInTheDocument()
        expect(queryByText("Faturamento Mensal")).toBeInTheDocument()
        expect(queryByText("Produtos Ativos")).toBeInTheDocument()
        expect(queryByText("Cupons Ativos")).toBeInTheDocument()
        expect(queryByText("Últimas Ordens")).toBeInTheDocument()
        expect(queryByText("Produtos em Carrinhos")).toBeInTheDocument()
        expect(queryByText("Produtos mais visitados no mês")).toBeInTheDocument()
        expect(queryByText("Media de avalialçoes")).toBeInTheDocument()
        expect(getAllByText("ver mais")).toHaveLength(2)
         expect(ordersLink.closest("a")).toHaveAttribute(
            "href",
            "/loja/pedidos"
        )

        expect(mostVisitedLink.closest("a")).toHaveAttribute(
            "href",
            "/loja/produtos"
        )
         const button = getByRole("button", {
            name: /open menu/i,
        })

        expect(button).toBeInTheDocument()

        await userEvent.click(button)

        expect(mockSetIsOpen).toHaveBeenCalledWith('sidebar')
        
    })
     
})