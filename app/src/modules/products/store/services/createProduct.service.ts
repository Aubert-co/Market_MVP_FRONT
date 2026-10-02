import { API_BASE_URL } from "@/configs/api"
import { getStorageStore } from "@/modules/store/user/storage/store.storage"
import type { Response } from "@/types/services.types"


export type CreateProduct = {
    name:string,
    description:string,
    price:string,
    stock:string,
    category:string,
    image:File
}
export const serviceCreateProduct = async({name,description,price,
    stock,image,category}:CreateProduct):Promise<Response>=>{
    const {id:storeId} = getStorageStore()
    const formData = new FormData()
    formData.append('name',name)
    formData.append('category',category)
    formData.append('image',image)
    formData.append('price',price)
    formData.append('stock',stock)
    formData.append('description',description)
    formData.append('storeId',storeId.toString())
    try{
        const response = await fetch(`${API_BASE_URL}/stores/products`,{
            method:'POST',
            credentials:'include',
            body:formData,
            
        })
        if(!response.ok){
            return {status:response.status,message:''}
        }
        const datas = await response.json()
        return {message:datas.message,status:response.status}
    }catch{
        return {message:'Algo deu errado',status:500}
    }
}