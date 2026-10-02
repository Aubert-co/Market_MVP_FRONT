import { usePagination } from "@/hooks/usePagination"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@/components/layouts/container"
import { BoxProducts } from "../components/boxProducts"
import type { Product } from "@/modules/products/user/types"
import { useState,useEffect } from "react"
import { serviceGetProducts, type GetProductsIndex } from "@/modules/products/user/services/products"
import { usableFetchWithPages } from "@/services/fetchs"
import { useSyncCart } from "@/modules/cart/hooks/useSyncCart"
import {PromoBox} from "@/components/promoBox"


type ProductState ={
  datas: Product[];
  status: number;
  message:string
}
export const Index = ()=>{
    const navigate = useNavigate()
    const {page} = useParams() 
    const changePage = (page:number)=>{
        navigate(`/produtos/pagina/${page}`)
    }
    useSyncCart()
    const {setPagesInfos,pageInfos,Pagination} = usePagination(changePage)
    const [products,setProducts] = useState<ProductState>({
        datas:[] as Product[],
        status:0,
        message:''
    })
    useEffect(() => {
        usableFetchWithPages<Product[],GetProductsIndex>({
            setPages:setPagesInfos,
            setDatas:setProducts,
            service:serviceGetProducts,
            body:{nextPage:pageInfos.currentPage}
        })
    }, [pageInfos.currentPage,setPagesInfos,page]);
    return (
        <Container>
            <PromoBox/>
            <BoxProducts datas={products.datas} status={products.status}/>
            <Pagination/>
        </Container>
    )
}