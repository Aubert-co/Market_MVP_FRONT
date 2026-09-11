import { serviceCreateOrder, type CreateOrder } from "@/services/checkout.services"
import { getItemsCheckout } from "@/storage/checkout.storage"

import { PrimaryButton } from "@/styles/shared.style"
import { useToastMessage } from "@/hooks/messages/useToastMessage"
type Props = {
    couponId?:number,

}
export const FinishCheckout = ({couponId}:Props)=>{
    const {addMessage} = useToastMessage()
     const onClick = async()=>{
        const items = getItemsCheckout()
        if(!items ||  items.length === 0 ){
            return
        }
        const order = items.map((val)=>{
            return {productId:val.id,quantity:val.quantity,couponId}
        }) as CreateOrder[]
        const {status} = await serviceCreateOrder(order)
        if(status === 201){
            addMessage({type:'success',content:'Compra realizada com sucesso!'})
            return;
        }
        if(status === 401){
            addMessage({type:'info',content:'Faça login para finalizar a compra!'})
            return 
        }
        addMessage({type:'error',content:'Algo deu errado ao tentar finalizar a compra!'})
    }
    return <PrimaryButton onClick={onClick}>Finalizar</PrimaryButton>
}