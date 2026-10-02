import type { UserCart } from "@/modules/cart/types/types"
import { CartActions } from "./actions"

import { loadImage } from "@/utils"

type PropsCartList = {
  cart:UserCart[]

}

export const CartList = ({ cart }: PropsCartList) => {
  
  return (
    <>
      {cart.map((val:UserCart) => {
        
        if (val?.isDeleted) return null; 
        
        return (
          <div className="list-item" key={val.id}>
            <div className="list-image">
              <img src={loadImage(val.product.imageUrl)} alt="Imagem do produto" />
            </div>

            <div className="list-info">
              <h3>Preço:R${val.product.price}</h3>
              <p>Produto: {val.product.name}</p>
              <p>Estoque: {val.product.stock}</p>
              <CartActions stock={val.product.stock}  id={val.id} quantity={val.quantity} />
            </div>
          </div>
        );
      })}
    </>
  );
};



