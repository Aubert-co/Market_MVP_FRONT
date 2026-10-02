import { API_BASE_URL } from "@/configs/api"
import { getStorageStore } from "@/modules/store/user/storage/store.storage"
import type {  ResponseWithPages } from "@/types/services.types"
import type {   GetStoreProducts } from "@/modules/store/types/storeDashboard.types";
import type { Product } from "../../user/types";



export const getStoreProducts = async({nextPage,category,priceOrder,name="",stockOrder}:
    GetStoreProducts):Promise<ResponseWithPages<Product[]>>=>{
         try{     
            if(category === "Todas")category = "";
            const store = getStorageStore()
            const response = await fetch(`${API_BASE_URL}/stores/${store.id}/products?page=${nextPage}&category=${category}&orderBy=${priceOrder}&search=${name}&stock=${stockOrder}`,{
                method:'GET',
                headers: {'Content-Type': 'application/json'},
                credentials:'include'
            })  
            
            const responseValues = await response.json()
           
             if(!response.ok){
                return {datas:[],message:responseValues.message,currentPage:1,totalPages:1,status:response.status}
             }
            return {
                datas:responseValues.datas
                ,currentPage:responseValues.currentPage
                ,totalPages:responseValues.totalPages,
                status:response.status,
                message:''
            }
        
          
        }catch{
            return {datas:[],currentPage:1,totalPages:1,status:500,message:'Algo deu errado!'}
        }

}
