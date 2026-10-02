import { Checkout } from "@/modules/checkout/page/checkout"
import { render, waitFor } from "@testing-library/react"
import * as storage from '@/modules/checkout/storage/checkout.storage'
import * as services from '@/modules/coupons/user/services/service'
import { mockProducts } from "@/test/fixtures/products"
import type { ItemsCheckout } from "@/modules/checkout/types/checkout.types"
import { mockCoupons } from "@/test/fixtures"
import { BrowserRouter } from "react-router-dom"
import { brlCurrency } from "@/utils"

const newItems:ItemsCheckout[] = mockProducts.map((val)=>{
    return {...val,quantity:val.id+5}
})
const items = jest.spyOn(storage,'getItemsCheckout')
const userCoupons = jest.spyOn(services,'userCoupons')

describe("Page checkout",()=>{
    it("should successfully render the items",async()=>{
        userCoupons.mockResolvedValue({datas:mockCoupons,status:201,message:'Sucess'})
        items.mockReturnValue( newItems as never )
        const {getByText} = render(
            <BrowserRouter>
                <Checkout/>
            </BrowserRouter>
        )
        const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        
        await waitFor(()=>{
            
            expect(getByText(`Total ${brlCurrency(total).replace(/\u00A0/g, " ")}`)).toBeInTheDocument()
        })
    })
})