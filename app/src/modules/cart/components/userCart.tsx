import { useEffect, useState } from "react"
import type { UserCart } from "@/modules/cart/types/types"
import {  CartList } from "@/modules/cart/components/listItems"
import { getUserCart } from "@/modules/cart/services/services"
import { UpdateCartContext } from "@/modules/cart/context/cart.context"
import { ListContainer } from "@/styles/profile.style"
import { CartOverview } from "@/modules/cart/components/overview"
import { RenderDataState } from "@/components/shared/renderDataState"

import { Link } from "react-router-dom"
import { usableFetch } from "@/services/fetchs"
import { BoxSkeleton } from "@/components/templates/skeleton"


type CartState = {
  datas:UserCart[],
  status:number
}
type Props = {
  formRef:React.RefObject<HTMLInputElement | null>,
 

}


export const Cart = ({formRef}:Props)=>{
    const [userCart,setUserCart] = useState<CartState>({
        datas:[],
        status:0
    })
    const [updateCart,setUpdateCart] = useState<boolean>(true)

    useEffect(() => {
        if (updateCart) {
          usableFetch<UserCart[],unknown>({
            service:getUserCart,
            setDatas:setUserCart,
            body:{}
          });
          setUpdateCart(false);
        }
    }, [updateCart]);
    
    return(
        <UpdateCartContext.Provider value={{updateCart,setUpdateCart}}>
            <ListContainer>
            <div className="text">
              <h1>Meu carrinho</h1>
            </div>
        

          <div className="list-container">
            <RenderDataState<UserCart>
                datas={userCart.datas}
                status={userCart.status}
                emptyMessage={
                      <>
                        Seu carrinho está vazio. <Link to="/">Adicionar produtos</Link>
                      </>

                }
                errorMessage="Algo deu errado ao carregar o seu carrinho"
                skeleton={
                  <BoxSkeleton className="list-item" classNameImg="list-image" length={3}/>
                }
              >
              <CartOverview  setUpdateCart={setUpdateCart} updateCart={updateCart}/>
              <CartList  cart={userCart.datas}/>
            </RenderDataState>
             
             
          </div>
          <div ref={formRef} className="end"></div>
        </ListContainer>
        </UpdateCartContext.Provider>
        
    )
}