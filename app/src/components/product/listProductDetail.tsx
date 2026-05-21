import { loadImage } from "@/utils/index";
import type { Product } from "@/types/products.types";
import { ListRatings } from "./listRatings";
import { Collapse } from "../shared/collapse";
import type { AddMessageParams } from "../../hooks/useBoxMessages";
import { addToCart } from "@/services/cart.services";
import { setItemsCheckout } from "@/storage/checkout.storage";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/styles/shared.style";

type Props = {
    product:Product[],
    ratings: {
    _avg: {
      rating?: number;
    };
    _count: {
      rating: number;
    };
  };
 addMessage:({}:AddMessageParams)=>void
}
export const ListProductDetail = ({product,ratings,addMessage}:Props)=>{
    const navigate = useNavigate()
    const addCart  = async()=>{
        const {status} = await addToCart(product[0].id)
        if(status === 401){
            addMessage({content:'Faça login para adicionar ao carrinho',type:'error'})
            return
        }
        if(status >= 500){
            addMessage({content:'Algo deu errado!',type:'error'})
            return;
        }
        addMessage({content:'Adicionado ao carrinho com sucesso',type:'success'})
    }
    const redirectCheckout = ()=>{
        const [items] = product.map((val)=>{
            return {...val,quantity:1}
        })
    
        setItemsCheckout( [items] )
        navigate('/pagamento')
    }
    return product.map((val)=>{
        return (
            <>
            <div key={val.id} data-testid="product-detail" className="product-detail">
                <div className="product-image">
                    <img src={loadImage(val.imageUrl)}/>
                </div>
                
                <div className="product-infos">
                     <div className="name">
                        <h2>{val.name}</h2>
                    </div>
                    <div className="ratings">
                        <ListRatings ratings={ratings}/>
                    </div>
                    <div className="product-stocks">
                        <p>Em estoque {val.stock}</p>
                        <h3>Preço ${val.price}</h3>
                    </div>
                    <div className="actions">
                        <PrimaryButton onClick={addCart}>Adicionar ao carrinho</PrimaryButton>
                        <PrimaryButton onClick={redirectCheckout} >Comprar</PrimaryButton>
                    </div>
                </div>
            </div>
            <Collapse  title="Descrição">
                <div className="desctipions"> 
                    <div className="description-content">
                        <p> {val.description }</p>
                    </div>
                </div>
            </Collapse>
        </>
        )
        })
    
}