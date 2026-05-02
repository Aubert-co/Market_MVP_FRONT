import { API_BASE_URL } from "@/configs/api"
import type { BaseCoupon } from "@/types/coupons.types"
import type { UserOrders } from "@/types/orders.types"
import type { ResponseDatas } from "@/types/services.types"





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

export const userOrders = async():Promise<ResponseDatas<UserOrders[]>>=>{
  try{
    const response = await fetch(`${API_BASE_URL}/orders`,{
      method:'GET',
      credentials:'include',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok){
      return {status:response.status,message:'',datas:[]}
    }
    const {datas} = await response.json()
    
    return {datas,message:'Success',status:200}
    
  }catch{
    return {status:500,message:'Algo deu errado',datas:[]}
  }
}