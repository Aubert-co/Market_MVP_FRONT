import { usableFetch } from "@/services/fetchs"
import { lastOrders } from "@/modules/orders/store/services/service"
import type { Order } from "@/modules/store/types/storeDashboard.types"
import { useEffect, useState } from "react"

type OrderState = {
    datas:Order[]
    status:number
}
type ReturnDatas = {
    orders:Order[]
    status:number
}

export const useStoreLastOrders = ():ReturnDatas=>{
    const [orders,setOrders] = useState<OrderState>({datas:[],status:0})
    useEffect(()=>{
        usableFetch<Order[],unknown>({
            service:lastOrders,
            setDatas:setOrders,
            body:{}
        })
    },[])
    return {orders:orders.datas,status:orders.status};
}