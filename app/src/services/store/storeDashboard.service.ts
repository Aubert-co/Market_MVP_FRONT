import { API_BASE_URL } from "@/configs/api"
import { getStorageStore } from "@/storage/store.storage"
import type {  ResponseDatas } from "@/types/services.types"
import type { BackendStats } from "@/types/storeDashboard.types"



export const dashboardStatsFallback: BackendStats = {
  views: {
    value: 0,
    hasError: true
  },
  revenue: {
    value: 0,
    hasError: true
  },
  openOrders: {
    value: [],
    hasError: true
  },
  countActiveProducts: {
    value: 0,
    hasError: true
  },
  totalActiveCoupons: {
    value: 0,
    hasError: true
  },
  reviews: {
    averageRating: {
      value: 0,
      hasError: true
    },
    totalReviews: {
      value: 0,
      hasError: true
    }
  },
  productsInCart: {
    value: 0,
    hasError: true
  },
  topViewedProducts:{
    value:[],
    hasError:true
  }
}

export const dashboardStats = async():Promise<ResponseDatas<BackendStats>>=>{
  try{
    const storeId = getStorageStore()
    const response = await fetch(`${API_BASE_URL}/store/dashboard/${storeId.id}`,{
      credentials:'include'
    })
    
    const {datas ,message} =await response.json()
    if(!response.ok){
  
      return {message,status:response.status,
        datas:dashboardStatsFallback
      }
    }
    if (!datas || Object.keys(datas).length === 0) {
      return {
        datas: dashboardStatsFallback,
        message,
        status: response.status,
      }
    }
    return {datas , message , status:response.status}

  }catch(err:unknown){
       
    return {message:'Algo deu errado',status:500,datas:dashboardStatsFallback}
  }
}