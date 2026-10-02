import { API_BASE_URL } from "@/configs/api"
import type { Response } from "@/types/services.types"

export type CreateOrder = {
    productId:number,
    couponId?:number,
    quantity:number
}
export const serviceCreateOrder = async(order:CreateOrder[]):Promise<Response>=>{
    try{
        const response = await fetch(`${API_BASE_URL}/orders`,{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({order}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const {message} = await response.json()
        return {status:response.status,message}
    }catch{
        return {message:'Algo deu errado!',status:500}
    }
}