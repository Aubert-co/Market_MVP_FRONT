import { Container } from "@/components/layouts/container";
import { OrdersHeader } from "@/components/profile/orders/ordersHeader";
import { OrdersList } from "@/components/profile/orders/ordersList";
import { SummaryHeader } from "@/components/profile/orders/summaryHeader";
import { useNavigate } from "react-router-dom";
import { userOrders } from "@/services/userProfile.services";
import { OrdersPage } from "@/styles/profile/orders/orders.style";
import { calculateUserOrdersSummary } from "@/utils";
import  { useModal } from "@/hooks/useModal";
import { OrdersReviews } from "@/components/profile/orders/ordersReviews";
import { useEffect, useState } from "react";
import type { UserOrders } from "@/types/orders.types";
import { usableFetch } from "@/services/fetchs";

type StateOrders = {
  datas:UserOrders[],
  status:number
}
export const Orders = () => {
    const navigate = useNavigate();
    //const orders = userOrdersMock;
    const  [ orders,setOrders] = useState<StateOrders>({datas:[],status:0})
    const summary = calculateUserOrdersSummary(orders.datas);
    const [reviewOrder, setReviewOrder] = useState<UserOrders | null>(null);
  
    const {Modal:ReviewModal,openModal,closeModal} = useModal({modalLocation:'center'})
    const handleOpenDetails = (id: number) => navigate(`/minhas-compra/detalhes/${id}`);
    
    const handleOpenReview = (id: number) => {
      const order = orders.datas.find((item) => item.id === id);
      if (!order) return;

      setReviewOrder(order);
      openModal();
    };
   useEffect(()=>{
    usableFetch<UserOrders[],unknown>({
      service:userOrders,
      setDatas:setOrders,
      body:{}
    })
   },[])
  return (
    <Container showHeader={false}>
        <ReviewModal title="Avaliações">
          {reviewOrder && <OrdersReviews closeModal={closeModal} order={reviewOrder} />}
        </ReviewModal>
      <OrdersPage>
        <OrdersHeader title="Minhas compras" onBack={() => navigate("/perfil/ordens")} />
        
        <SummaryHeader
          totalSpent={summary.totalSpent}
          completedOrders={summary.completedOrders}
          lastOrders={summary.lastOrders}
          couponsUsed={summary.couponsUsed}
          totalSaved={summary.totalSaved}
        />

        <OrdersList orders={orders.datas} onOpenDetails={handleOpenDetails} onOpenReview={handleOpenReview} />
      </OrdersPage>
    </Container>
  );
};