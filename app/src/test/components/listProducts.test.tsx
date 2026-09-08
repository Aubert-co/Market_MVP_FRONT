import {  render } from "@testing-library/react";
import  {BrowserRouter} from "react-router-dom"
import { ListProducts } from "@/components/product/listProducts";
import { mockProducts } from "../fixtures/products";
import { brlCurrency, loadImage } from "@/utils";



describe("component ListProducts",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should list the products list correctly when the type is product",()=>{
      
        const {getAllByTestId ,getAllByRole,getByText}=render(
            <BrowserRouter>
                <ListProducts products={mockProducts}  listType="Product"/>
            </BrowserRouter>
        )
        const products = getAllByTestId("product")
        const image = getAllByRole("img")
        expect( products).toHaveLength( mockProducts.length)
        
        products.map((val,index)=>{
            expect( val ).toHaveClass('product')
            expect(val).toHaveAttribute('href',`/produto/${mockProducts[index].id}`)
            expect(image[index]).toHaveAttribute('src',loadImage(mockProducts[index].imageUrl))
            expect(getByText(mockProducts[index].name)).toBeInTheDocument()
            const expectedPrice = brlCurrency(mockProducts[index].price).replace(/\u00a0/g, ' ');

            expect(getByText( expectedPrice )).toBeInTheDocument( )

        })
    })
    it("should list the products list correctly when the type is cart",()=>{
       
        const {getAllByTestId ,getAllByRole,getByText,queryByText}=render(
            <BrowserRouter>
                <ListProducts products={mockProducts}  listType="Cart"/>
            </BrowserRouter>
        )
        const products = getAllByTestId("product")
        const image = getAllByRole("img")
        expect( products).toHaveLength( mockProducts.length)
        
        products.map((val,index)=>{
            expect( val ).toHaveClass('product')
            expect(val).toHaveAttribute('href',`/produto/${mockProducts[index].id}`)
            expect(image[index]).toHaveAttribute('src',loadImage(mockProducts[index].imageUrl))
            expect(getByText(mockProducts[index].name)).toBeInTheDocument()
            expect(queryByText(brlCurrency(mockProducts[index].price))).not.toBeInTheDocument( )

        })
    })
    
})