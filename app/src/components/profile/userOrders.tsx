import { ListContainer } from "@/styles/profile.style"
import { RenderDataState } from "@/components/shared/renderDataState"
import type { UserOrders } from "@/types/orders.types"
import { useEffect, useState } from "react"
import { userOrders } from "@/services/userProfile.services"
import { usableFetch } from "@/services/fetchs"
import { BoxSkeleton } from "../templates/skeleton"
import { PrimaryButton } from "@/styles/shared.style"
import { ListUserOrders } from "./orders/listUserOrders"
import { useNavigate } from "react-router-dom"



type State = {
  datas: UserOrders[]
  status:number
   
}

export const UserOrdersComponent = ()=>{
  const [orders,setDatas] = useState<State>({datas:[],status:0})
  const navigate = useNavigate()
  useEffect(()=>{
    usableFetch<UserOrders[],unknown>({
      service:userOrders,
      setDatas,
      body:{}
    })
      
  },[])
  const redictOrderDetails = (id:number)=>navigate(`/minhas-compras/detalhes/${id}`)
  return( 
  <ListContainer>
      <div className="text">
          <h1> Minhas compras</h1>
      </div>

      <div className="list-container">
          <RenderDataState<UserOrders>
              datas={orders.datas} 
              status={orders.status}
              emptyMessage={
                  <>Voce ainda não tenhuma compra </>
              }
              errorMessage="Algo deu errado ao buscar suas compras"
              skeleton={
                <BoxSkeleton className="list-item" classNameImg="list-image" length={3}/>
              }
              >
                <ListUserOrders orderDetails={redictOrderDetails} orders={orders.datas}/>
                <PrimaryButton onClick={()=>navigate('/minhas-compras')}>
                  Ver todas as compras
                </PrimaryButton>
              </RenderDataState>
      </div>
  </ListContainer>
  )
}