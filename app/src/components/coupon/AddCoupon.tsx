import type { AddMessageParams } from "../../hooks/useBoxMessages"
import { userAddCoupon } from "@/services/coupons.services"

type Props = {
    id:number,
    addMessage:({}:AddMessageParams)=>void
}
export const AddCoupon = ({id,addMessage}:Props)=>{
    const onClick = async()=>{
        const { message,status } = await userAddCoupon(id)
        
        if(status === 201){
            addMessage({content:'Sucesso ao adicionar o cupom',type:'success'})
            return;
        }
        if(status ===401){
            addMessage({content:'Faça login para adicionar o cupom',type:'info'})
            return;
        }
        if(message === "This user already possesses the coupon."){
            addMessage({content:'Você já possui este cupom',type:'info'})
            return
        }
        if(message ==="Limit of active coupons reached."){
            addMessage({content:'Você já possui muitos cupons',type:'info'})
            return
        }
        addMessage({content:'Algo deu errado!',type:'error'})
        
    }
  return <button onClick={onClick} data-testid="add-coupon" className="btn-get-coupon">Pegar</button>
}