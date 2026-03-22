import { ChangeQuantity } from "@/components/checkout/changeItemQuantity"
import { fireEvent, render } from "@testing-library/react"
import * as storage from '@/storage/checkout.storage'

const spyStorage = jest.spyOn(storage,'updateItemCheckout')

describe("component ChangeQuantity",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should increase the quantity normally when it is smaller than the stock",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 39
        const id = 32
        const {getByText}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )
        const increase = getByText("+")
      

        fireEvent.click( increase )

        expect( setUpdate).toHaveBeenCalledTimes(1)
        expect( spyStorage ).toHaveBeenCalledWith(id,quantity+1)
    })
     it("should not increase the quantity when it is equal to the stock",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 40
        const id = 32
        const {getByText}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )
        const increase = getByText("+")
     

        fireEvent.click( increase )

        expect( setUpdate).toHaveBeenCalledTimes(0)
        expect( spyStorage ).not.toHaveBeenCalled()
    })
    it("should not decrease the quantity when it is equal to 1",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 1
        const id = 32
        const {getByText}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )
     
        const decrease = getByText("-")

        fireEvent.click( decrease )

        expect( setUpdate).toHaveBeenCalledTimes(0)
        expect( spyStorage ).not.toHaveBeenCalled()
    })
    it("should not decrease the quantity when it is equal to 0",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 0
        const id = 32
        const {getByText}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )

        const decrease = getByText("-")

        fireEvent.click( decrease )

        expect( spyStorage ).not.toHaveBeenCalled()
        expect( setUpdate).toHaveBeenCalledTimes(0)
   
    })
    it("should not change the input quantity when it is greater than stock",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 2
        const id = 32
        const {container}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )
        const input = container.querySelector('input') as HTMLInputElement
        
        fireEvent.change(input,{target:{value:41}})

        expect( spyStorage ).not.toHaveBeenCalled()
        expect( setUpdate).toHaveBeenCalledTimes(0)
   
    })
    it("should not change the input quantity when it is smaller than 0",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 2
        const id = 32
        const {container}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )
        const input = container.querySelector('input') as HTMLInputElement
        
        fireEvent.change(input,{target:{value:-1}})

        expect( spyStorage ).not.toHaveBeenCalled()
        expect( setUpdate).toHaveBeenCalledTimes(0)
   
    })
    it("should not change the input quantity when it is smaller than 1",()=>{
        const setUpdate = jest.fn()
        const stock = 40
        const quantity = 2
        const id = 32
        const {container}=render(
            <ChangeQuantity 
            stock={stock}
            setUpdate={setUpdate}
            quantity={quantity}
            id={id}
            />
        )
        const input = container.querySelector('input') as HTMLInputElement
        
        fireEvent.change(input,{target:{value:0}})

        expect( spyStorage ).not.toHaveBeenCalled()
        expect( setUpdate).toHaveBeenCalledTimes(0)
   
    })
})