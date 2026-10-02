import { API_BASE_URL } from "@/configs/api"
import type { BaseCoupon } from "@/modules/coupons/types/coupons.types"
import type { Response, ResponseDatas } from "@/types/services.types"

type Coupom = BaseCoupon<number>[]

export const availableCoupons = async():Promise<ResponseDatas<Coupom>>=>{
    try{
        const response = await fetch(`${API_BASE_URL}/coupons/available?page=1`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const {datas,message}  = await response.json()
        
        if(!response.ok){
            return {datas:[],message:'',status:response.status}
        }
        return {datas ,message,status:response.status}
    }catch{
        return {datas:[] ,message:'Algo deu errado!',status:500}
    }
}
export const userAddCoupon = async(couponId:number):Promise<Response>=>{
    try{
        const response = await fetch(`${API_BASE_URL}/coupons`,{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({couponId})
        })
        const {message} = await response.json()
        return {message,status:response.status}
    }catch{
        return {message:'Algo deu errado!',status:500}
    }
}

export const userCoupons = async():Promise<ResponseDatas<BaseCoupon<number>[]>>=>{
  
    try{
      const response = await fetch(`${API_BASE_URL}/coupons`,{
        method:'GET',
        credentials:'include',
        headers: {
        'Content-Type': 'application/json'
        }
      })
      if(!response.ok){
        return {status:response.status,message:'',datas:[]}
      }
      const {datas} = await response.json()
      
      return {datas,message:'Success',status:response.status}
        
    }catch{
      return {status:500,message:'Algo deu errado',datas:[] as BaseCoupon<number>[]}
    }
}