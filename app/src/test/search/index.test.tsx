import { Search } from "@/pages/search"
import { fireEvent, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import * as searchProduct from "@/services/productsService"

const spy= jest.spyOn(searchProduct,'searchProduct')
describe("Page search",()=>{
    it("should successfully send the correct values",()=>{
        const {getByText,getByTestId,getByPlaceholderText} = render(
            <BrowserRouter>
                <Search/>
            </BrowserRouter>
        )

        expect(getByText("Filtrar")).toBeInTheDocument()

        fireEvent.click(getByText("Filtrar"))
        const minPrice = getByTestId("min-price")
        const maxPrice = getByTestId("max-price")
        const btnSubmit = getByText("BUSCAR")
        const inputName = getByPlaceholderText("FAÇA UMA BUSCA")
        fireEvent.change(minPrice,{target:{
            value:'50'
        }})
         fireEvent.change(maxPrice,{target:{
            value:'100'
        }})
        fireEvent.change(inputName,{
            target:{value:"camisa polo"}
        })
        expect(minPrice).toHaveValue(50)
        expect(maxPrice).toHaveValue(100)

        fireEvent.click(btnSubmit)

        expect(spy).toHaveBeenNthCalledWith(2,{
            name:"camisa polo",
            category:"Todas",
            maxPrice:"",
            minPrice:"",
            orderBy:"desc"
        })
    })
})