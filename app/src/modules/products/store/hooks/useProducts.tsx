import { usableFetchWithPages } from "@/services/fetchs"

import type { Category, OrderBy } from "@/types/filters.types"
import type { Product } from "@/modules/products/user/types"
import type { SetPages } from "@/types/services.types"
import type { GetStoreProducts } from "@/modules/store/types/storeDashboard.types"
import { useEffect, useState } from "react"
import { getStoreProducts } from "../services/getProducts.service"

type Props = {
    category:Category
    setPagesInfos:SetPages,
    nextPage:{currentPage:number}
    searchProduct?:unknown,
    priceOrder?:OrderBy,
    stockOrder?:OrderBy
}
type State = {
    datas:Product[],
    status:number,
}
export const useStoreProducts = ({category,setPagesInfos,searchProduct,nextPage,priceOrder,stockOrder}:Props)=>{
    const [products,setProducts] = useState<State>({datas:[],status:0})
    
     useEffect(()=>{
            usableFetchWithPages<Product[],GetStoreProducts>({
                body:{category,nextPage:nextPage.currentPage,name:searchProduct,priceOrder,stockOrder},
                setDatas:setProducts,
                service:getStoreProducts,
                setPages:setPagesInfos,
                
            })
        },[searchProduct,category,nextPage.currentPage,priceOrder,setPagesInfos,stockOrder])

    return {products}
}