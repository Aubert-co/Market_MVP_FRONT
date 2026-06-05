import { DashboardStats } from "@/components/shared/dashboardStats"
import { formatValues, mapStats, Stats } from "@/constants/dashboardStats"
import type {  FormatStats } from "@/types/storeDashboard.types"

import { render } from "@testing-library/react"


export const mockBackendStats:FormatStats = {
    views:{
        hasError:false,
        value:1200
    },
    countActiveProducts:{
        hasError:false,
        value:130
    },
    productsInCart:{
        hasError:false,
        value:500
    },

         averageRating:{
        value:4.8,
        hasError:false
    },
        totalReviews:{
            value:50,
            hasError:false,
        },
    
    revenue:{
        value:340,
        hasError:false
    },
    totalActiveCoupons:{
        value:4,
        hasError:false
    },
   
  
}
describe("component DashboardStats",()=>{
    it("should successfully render the data",()=>{
        const map = mapStats(mockBackendStats)
        
        const {getByText,queryByText} = render(
            <DashboardStats stats={map}/>
        )
        Stats.forEach((stat) => {
            const value = mockBackendStats[stat.dataKey].value 
            expect(queryByText(stat.label)).toBeInTheDocument()
           
           if (stat.dataKey === "revenue") {
                const formatted = formatValues("revenue",value)

                const escaped = formatted.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

                expect(
                    getByText(new RegExp(escaped.replace(/\s/, "\\s?")))
                ).toBeInTheDocument()

                return
            }
            expect(getByText(String(value))).toBeInTheDocument()
        })
    })
   
})
