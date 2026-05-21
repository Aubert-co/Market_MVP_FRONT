import { API_BASE_URL } from "@/configs/api";
import type { Response, ResponseDatas } from "@/types/services.types";
import type { Store } from '@/types/store.types'


type CreateStore = Omit<Store,"photo" | "id"> &{
  image:File
}
export const serviceCreateStore = 
  async ({ name, description, image }: CreateStore)
  :Promise<Response> => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    const response = await fetch(`${API_BASE_URL}/stores`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

  

    const {message} = await response.json();
    
    return { message, status: response.status };
  } catch  {
  
    return { message: 'Algo deu errado', status: 500};
  }
};


export const serviceGetStores = async():Promise<ResponseDatas<Store[]>>=>{
    try{
        const response = await fetch(`${API_BASE_URL}/stores`,{
          method:'GET',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
       
        const {datas} = await response.json()
         if(!response.ok){
          return {message:'Algo deu errado',status:response.status,datas:[]}
        }
        return {status:200 ,datas,message:'sucess'}
    }catch{
      return {
          status:500,datas:[]
          ,message:'Algo deu errado!'
        }
    }
}
