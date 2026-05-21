import { Search } from "@/pages/search"
import { fireEvent, render, waitFor,screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import * as searchProduct from "@/services/productsService"

const spy= jest.spyOn(searchProduct,'searchProduct')
describe("Page search",()=>{
    it("should successfully send the correct values",async()=>{
        const {getByText} = render(
            <BrowserRouter>
                <Search/>
            </BrowserRouter>
        )
       await waitFor(() => {
  expect(getByText("Filtrar")).toBeInTheDocument()
})

    fireEvent.click(getByText("Filtrar"))

    const minPrice = await screen.findByTestId("min-price")
    const maxPrice = await screen.findByTestId("max-price")

    const btnSubmit = await screen.findByText("BUSCAR")

    const inputName = await screen.findByPlaceholderText(
    "FAÇA UMA BUSCA"
    )

    fireEvent.change(minPrice, {
    target: {
        value: "50"
    }
    })

    fireEvent.change(maxPrice, {
    target: {
        value: "100"
    }
    })

    fireEvent.change(inputName, {
    target: {
        value: "camisa polo"
    }
    })

    await waitFor(() => {
    expect(minPrice).toHaveValue(50)
    expect(maxPrice).toHaveValue(100)
    })

    fireEvent.click(btnSubmit)

    await waitFor(() => {
    expect(spy).toHaveBeenNthCalledWith(2, {
        name: "camisa polo",
        category: "Todas",
        maxPrice: "",
        minPrice: "",
        orderBy: "desc"
    })
    })
    })
})