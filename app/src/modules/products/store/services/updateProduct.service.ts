import { API_BASE_URL } from "@/configs/api"
import type { UpsertProducts } from "@/modules/store/types/storeDashboard.types"
import { getStorageStore } from "@/modules/store/user/storage/store.storage"
import type { Response } from "@/types/services.types"



export type UpdateProduct = Omit<UpsertProducts,"image"> & {
    image?:File 
}
export  const serviceUpdateProduct = async(payload:UpdateProduct):Promise<Response>=>{
    const {id:storeId} = getStorageStore()
    const formData = new FormData()
    const allowedFields: (keyof UpsertProducts)[] = [
        "name",
        "description",
        "price",
        "image",
        "category",
        "stock",
    ];

    allowedFields.forEach((field) => {
        const value = payload[field];
        if (value !== undefined && value !== null) {
            formData.append(field, value as keyof UpsertProducts);
        }
    }); 
    formData.append('storeId',String( storeId ))
    formData.append('productId',String(payload.id))
    try{
        const response = await fetch(`${API_BASE_URL}/stores/products`,{
            method:'PUT',
            body:formData,
            credentials:'include'
        })
        return {message:'',status:response.status}
    }catch{
        return {message:'Algo deu errado',status:500}
    }
}