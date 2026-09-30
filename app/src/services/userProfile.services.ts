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
export const userOrdersMock: UserOrders[] = [
    {
        id: 1001,
        total: 299.90,
        quantity: 1,
        status: 'completed',
        createdAt: '2026-09-10T14:30:00.000Z',
        price: 299.90,
        product: {
            name: 'Teclado Mecânico RGB',
            imageUrl: '/images/keyboard.png',
        },
    },
    {
        id: 1002,
        total: 239.90,
        quantity: 2,
        status: 'completed',
        createdAt: '2026-09-08T18:15:00.000Z',
        price: 149.90,
        product: {
            name: 'Mouse Gamer',
            imageUrl: '/images/mouse.png',
        },
        coupon: {
            discount: 10,
            discountType: 'percent',
        },
    },
    {
        id: 1003,
        total: 219.90,
        quantity: 1,
        status: 'completed',
        createdAt: '2026-09-06T11:20:00.000Z',
        price: 219.90,
        product: {
            name: 'Headset Bluetooth',
            imageUrl: '/images/headset.png',
        },
    },
    {
        id: 1004,
        total: 799.90,
        quantity: 1,
        status: 'cancelled',
        createdAt: '2026-09-03T09:45:00.000Z',
        price: 899.90,
        product: {
            name: 'Monitor 24"',
            imageUrl: '/images/monitor.png',
        },
        coupon: {
            discount: 100,
            discountType: 'fixed',
        },
    },
    {
        id: 1005,
        total: 179.90,
        quantity: 3,
        status: 'pending',
        createdAt: '2026-08-29T16:10:00.000Z',
        price: 59.90,
        product: {
            name: 'Suporte para Notebook',
            imageUrl: '/images/notebook-stand.png',
        },
        coupon: {
            discount: 15,
            discountType: 'percent',
        },
    },
]
export const userOrders = async():Promise<ResponseDatas<UserOrders[]>>=>{
  return {datas:userOrdersMock,status:201,message:'succes'}
  /* try{
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
  }*/
}

export type FindOrder = {
  orderId:string
}
export const findOrder = async({orderId}:FindOrder):Promise<ResponseDatas<UserOrders | null>>=>{
  return {datas:userOrdersMock[1],status:201,message:'success'} 
  /*try{
    const response = await fetch(`${API_BASE_URL}/user/order/${orderId}`,{
      method:'GET',
      credentials:'include',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok){
      return {status:response.status,message:'',datas:null}
    }
    const {datas} = await response.json()
    
    return {datas,message:'Success',status:200}
    
  }catch{
    return {status:500,message:'Algo deu errado',datas:null}
  }*/
}