import { API_BASE_URL } from "@/configs/api";
import type { Response } from "@/types/services.types";

type LoginOrRegister ={
    name?:string,
    email:string,
    password:string,
    typeForm: 'login' | 'register'
}
export const serviceLoginOrRegister = async({name,email,password,typeForm}:LoginOrRegister):Promise<Response>=>{
    try{
        const url = typeForm === 'login' ? '/login' : '/register'
        const response = await fetch(`${API_BASE_URL}${url}`,{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers: {
            'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        if(!response.ok){
            return {status:response.status,message:''}
        }

        const res = await response.json()
        console.log(res)
        return {status:response.status,message:res.message}
    }catch{
        return {status:501,message:'Algo deu errado'}
    }

}