import type { Response } from "@/types/services.types"

export type ReviewValues = {
    comment?:string,
    rating:number
    orderId:number
}
export const createReview = async({comment,rating,orderId}:ReviewValues):Promise<Response>=>{
    try{
        const response = await fetch('',{
            method:'POST',
            body:JSON.stringify({comment,rating,orderId})
        })
        if(!response.ok){
            throw new Error("Failed")
        }
        const datas = await response.json()

        return {message:datas.message,status:response.status}
    }catch{
        return {message:"Falha ao criar review",status:500}
    }
}