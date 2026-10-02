import { usableFetch } from "@/services/fetchs"
import {  serviceGetStores } from "@/modules/store/user/services/store.services"
import type { Store } from "@/modules/store/user/types/store.types"
import { useEffect, useState } from "react"

type State = {
    datas:Store[],
    status:number,
    message:string
}

export const useGetStoreInfo = ()=>{
    const [storeInfo,setStoreInfo] = useState<State>({
        datas:[],status:0,message:''
    })
    useEffect(()=>{
        usableFetch<Store[],unknown>({
            service:serviceGetStores,
            setDatas:setStoreInfo,
            body:{}
        })
      
    },[])

    return {storeInfo}
}