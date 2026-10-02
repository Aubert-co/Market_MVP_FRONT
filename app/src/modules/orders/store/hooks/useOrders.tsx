import {  usableFetchWithPages } from "@/services/fetchs"
import { getStoreOrders } from "@/modules/orders/store/services/service"
import type {  SetPages } from "@/types/services.types"
import type { GetStoreOrders, Order, OrderStatus } from "@/modules/store/types/storeDashboard.types"
import { useEffect, useState } from "react"

type OrderState = {
    datas:Order[]
    status:number
}
type ReturnDatas = {
    orders:Order[]
    status:number
}
type Props = {
    nextPage:number,
    orderStatus:OrderStatus,
    setPagesInfos:SetPages,
    search:unknown
}
export const useStoreOrders = ({nextPage,orderStatus
    ,setPagesInfos,search
}:Props):ReturnDatas=>{
    const [orders,setOrders] = useState<OrderState>({datas:[],status:0})
    useEffect(()=>{
        usableFetchWithPages<Order[],GetStoreOrders>({
            service:getStoreOrders,
            setDatas:setOrders,
            body:{nextPage,status:orderStatus,search},
            setPages:setPagesInfos
        })
    },[nextPage,orderStatus,search,setPagesInfos])
    return {orders:orders.datas,status:orders.status};
}
