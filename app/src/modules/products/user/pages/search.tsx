import { FilterProducts } from "@/modules/products/user/components/filterProducts"
import { Container } from "@/components/layouts/container"
import { BoxProducts } from "@/modules/products/user/components/boxProducts"
import { usableFetch } from "@/services/fetchs"
import { searchProduct, type BodySearch } from "@/modules/products/user/services/products"
import type { Product } from "@/modules/products/user/types"
import type { Filter } from "@/types/filters.types"
import { useEffect, useState } from "react"
import {  useSearchParams } from "react-router-dom"
import { Collapse } from "@/components/shared/collapse"
import { filterParams } from "../utils/filterParams"
import { SearchBox } from "../styles/index.styles"


type ProductState ={
  datas: Product[];
  status: number;
  message:string
}



export const Search  = ()=>{
    const [products,setProducts] = useState<ProductState>({
        datas:[] as Product[],status:0,message:''
    })

    const [searchParams] = useSearchParams()
    const {minPrice,maxPrice,orderBy,category,productName} = filterParams(searchParams)
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