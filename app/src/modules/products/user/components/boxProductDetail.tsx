import type { ProductDetails } from "../types"
import { Collapse } from "@/components/shared/collapse"
import { ListComments } from "./listComments"
import { ListProductDetail } from "./listProductDetail"

import { RenderDataState } from "@/components/shared/renderDataState"
import type { Product } from "@/modules/products/user/types"
import { BoxSkeleton } from "@/components/templates/skeleton"

type Props ={
    datas:ProductDetails,
    
    status:number
}

export const BoxProductDetail = ({datas,status}:Props)=>{
    return (
        <>
        <RenderDataState<Product>
        datas={datas.product}
        status={status}
        emptyMessage={"Produto não encontrado"}
        errorMessage="Ocorreu um erro ao carregar os dados."
        skeleton={<BoxSkeleton classNameImg="product-image" className="product-detail"
        length={1}/>}
        >
                <ListProductDetail 
                    ratings={datas.ratings}
                    product={datas.product}/>
                                
                <Collapse  title="Comentarios">
                    <ListComments reviews={datas.reviews} 
                        comments={datas.comments}/>
                </Collapse>
        </RenderDataState>
       
        
        </>
    )
}