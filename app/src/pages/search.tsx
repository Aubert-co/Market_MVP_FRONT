import { FilterProducts } from "@/components/filterProducts"
import { Container } from "@/components/layouts/container"
import { BoxProducts } from "@/components/product/boxProducts"
import { usableFetch } from "@/services/fetchs"
import { searchProduct, type BodySearch } from "@/services/productsService"
import type { Product } from "@/types/products.types"
import type { Filter, OrderBy } from "@/types/filters.types"
import { useEffect, useState } from "react"
import {  useSearchParams } from "react-router-dom"
import { Collapse } from "@/components/shared/collapse"
import styled from "styled-components"
import { checkIsAValidCategory, checkIsAValidNumber } from "@/utils/checkIsValid"

type ProductState ={
  datas: Product[];
  status: number;
  message:string
}

const SearchBox = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; 
  width: 95%;
  height: 100%;
  gap : 20px;
  .filtered{
    margin-left:15%;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .collapse-container {
      width: 70%;
      background: #ffffff; 
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.08);
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
      transition: all 0.3s ease;
      justify-self:start;
    }
    .filtered{
      width:100%;
    }
  }
`;
const getFilterParams = (searchParams:URLSearchParams)=>{
  const category = searchParams.get("category")
  const maxPrice = searchParams.get("maxPrice")
  const minPrice =  searchParams.get("minPrice")
  const orderBy = searchParams.get("orderBy")
  const productName = searchParams.get("q")
  const maxPriceNm = checkIsAValidNumber(maxPrice) ? Number(maxPrice) : ""
  const minPriceNm = checkIsAValidNumber(minPrice) ? Number(minPrice) : ""
  const od:OrderBy = orderBy === "asc" ? "asc" : "desc"
  const matchCategories = checkIsAValidCategory(category) ? category : undefined
  
  return {
    category:matchCategories ?? "Todas",
    orderBy:od,productName,
    maxPrice:maxPriceNm ?? 0,
    minPrice:minPriceNm ?? 0
  }
}
export const Search  = ()=>{
    const [products,setProducts] = useState<ProductState>({
        datas:[] as Product[],status:0,message:''
    })

    const [searchParams] = useSearchParams()
    const {minPrice,maxPrice,orderBy,category,productName} = getFilterParams(searchParams)
    const [values,setValues] = useState<Filter>({
      minPrice,maxPrice,orderBy,category
    })
   
    useEffect(()=>{
      usableFetch<Product[],BodySearch>({
        body:{name:productName , ...values},
        service:searchProduct,
        setDatas:setProducts
      })
    },[productName,values,setValues])
   
    return (
        <Container navigateMode="update">
            <SearchBox>
                <div className="filtered">
                    <Collapse title="Filtrar">
                        <FilterProducts values={values} setValues={setValues}/>
                    </Collapse>
                </div>
            
                <BoxProducts datas={products.datas} status={products.status}/>
            </SearchBox>
        </Container>
    )
}