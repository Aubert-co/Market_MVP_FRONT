import type {  GetStoreOrders, Order } from "@/types/storeDashboard.types";
import type {  ResponseDatas, ResponseWithPages } from "@/types/services.types";
import { getStorageStore } from "@/storage/store.storage";


export const getStoreOrders = async({status,nextPage,search}:GetStoreOrders)
:Promise<ResponseWithPages<Order[]> >=>{
 
   try{
    const store = getStorageStore()
      const response = await fetch(`/stores/${store.id}/orders?page=${nextPage}&status=${status}&orderId=${search}`,{
          method:'GET',
          credentials:'include'
      })
      

      const json = await response.json()

      return {
          status:response.status,
          datas:json.datas,
          message:'',
          currentPage:json.currentPage,
          totalPages:json.totalPages
          
      }
    }catch{
      return {
          status:500,
          message:'Algo deu errado!',
          currentPage:1,
          totalPages:1,
          datas:[] 
      }
    }
}


export const lastOrders = async():Promise<ResponseDatas<Order[]>>=>{
    
    try{
        const store = getStorageStore()
        const response = await fetch(`/stores/${store.id}/lastOrders`,{
            credentials:'include'
        })
        if(!response.ok){
            return {
                message:'Algo deu errado',
                status:500,
                datas:[]
            }
        }
        const {message,datas} = await response.json()

        return {datas,status:response.status,message} 
    }catch{
        return {datas:[],message:'Algo deu errado',status:500}
    }
}