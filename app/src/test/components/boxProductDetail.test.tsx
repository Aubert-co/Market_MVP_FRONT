import { BoxProductDetail } from "@/components/product/boxProductDetail"

import { render } from "@testing-library/react"

describe("Component ListProductDetail",()=>{

    it("should render 'Produto não encontrado' when product is empty and status is valid",()=>{
        const {queryByTestId,queryByText} = render(
            <BoxProductDetail 
            datas={{
                product:[],
                ratings:{_avg:{rating:0},_count:{rating:0}},
                reviews:[],
                comments:[]
            }}
            status={200} 
           />
        )
        expect(queryByText("Produto não encontrado")).toBeInTheDocument()
        expect(queryByTestId("comments")).not.toBeInTheDocument()
        expect(queryByTestId("product-detail")).not.toBeInTheDocument()
        expect(queryByText("Ocorreu um erro ao carregar os dados.")).not.toBeInTheDocument()
    })
     it("should render 'Ocorreu um erro ao carregar os dados' when product is empty and status is greater than 500",()=>{
        const {queryByTestId,queryByText} = render(
            <BoxProductDetail datas={
            {product:[],ratings:{_avg:{rating:0},_count:{rating:0}},reviews:[],comments:[]}}
            status={500}/>
        )
        expect(queryByText("Produto não encontrado")).not.toBeInTheDocument()
        expect(queryByText("Ocorreu um erro ao carregar os dados.")).toBeInTheDocument()
        expect(queryByTestId("comments")).not.toBeInTheDocument()
        expect(queryByTestId("product-detail")).not.toBeInTheDocument()
    })
    it("should render 'skeleton' when status is equal 0",()=>{
        const {queryByTestId,queryByText} = render(
            <BoxProductDetail datas={
            {product:[],ratings:{_avg:{rating:0},_count:{rating:0}},reviews:[],comments:[]}}
            status={0}/>
        )
        expect(queryByTestId("skeleton")).toBeInTheDocument()
        expect(queryByText("Produto não encontrado")).not.toBeInTheDocument()
        expect(queryByText("Ocorreu um erro ao carregar os dados.")).not.toBeInTheDocument()
        expect(queryByTestId("comments")).not.toBeInTheDocument()
        expect(queryByTestId("product-detail")).not.toBeInTheDocument()
    })
})