import { mapStats } from "@/constants/dashboardStats";
import { usableFetch } from "@/services/fetchs";
import { dashboardStats, dashboardStatsFallback } from "@/services/store/storeDashboard.service";
import type { BackendStats, Order, Stat, TopVisitedProduct, TypeStats } from "@/types/storeDashboard.types";
import { useEffect, useState } from "react";



type StatsState ={
  datas:BackendStats,
  status:number
}
type ReturnUseStats = {
  stats:Stat[],
  openOrders:TypeStats<Order[]>,
  status:number,
  topVisitProducts:TypeStats<TopVisitedProduct[]>
}
export const useDashboardStats = ():ReturnUseStats=>{
  const [stats,setStats] = useState<StatsState>({datas:dashboardStatsFallback,status:0})
  const { reviews,topViewedProducts,openOrders, ...values } = stats.datas
  const mappedStats = mapStats({totalReviews:reviews.totalReviews,averageRating:reviews.averageRating,...values})
  useEffect(()=>{
    usableFetch<BackendStats,unknown>({
      service:dashboardStats,
      setDatas:setStats,
      body:{}
    })
  },[])
  return {stats:mappedStats,openOrders,status:stats.status,
    topVisitProducts:topViewedProducts
  }
}