import { PrimaryButton } from "@/styles/shared.style"
import type { UserOrders } from "@/types/orders.types"
import { brlCurrency, getOrderStatus, loadImage } from "@/utils"

type PropsList ={
  orders:UserOrders[],
  orderDetails:(id:number)=>void
}
export const ListUserOrders = ({orders,orderDetails}:PropsList)=>{
  return orders.map((val)=>{
    return(
      <div className="list-item" key={val.id}>
        <div className="list-image">
          <img src={loadImage(val.product.imageUrl)} alt="" />
        </div>
        <div className="list-info">
            <p className="name"><strong>Produto:</strong> {val.product.name}</p>
            <p><strong>Quantidade:</strong> {val.quantity}</p>
            <p><strong>Total:</strong> {brlCurrency(val.total)}</p>
            <p><strong>Status:</strong> {getOrderStatus(val.status)}</p>
      
            <PrimaryButton $width="100%" onClick={()=>orderDetails(val.id)}>
                Ver detalhes
            </PrimaryButton>
          </div>
      </div>
    )
  })
}