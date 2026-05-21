import type { ProductDetails } from "@/types/productDetail.types"
import { Collapse } from "../shared/collapse"
import { ListComments } from "./listComments"
import { ListProductDetail } from "./listProductDetail"
import type { AddMessageParams } from "../../hooks/useBoxMessages"
import { RenderDataState } from "@/components/shared/renderDataState"
import type { Product } from "@/types/products.types"
import { BoxSkeleton } from "../templates/skeleton"

type Props ={
    datas:ProductDetails,
    addMessage: ({content,type}:AddMessageParams)=>void,
    status:number
}

export const BoxProductDetail = ({datas,addMessage,status}:Props)=>{
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
                <ListProductDetail addMessage={addMessage}
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