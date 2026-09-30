import { Container } from "@/components/layouts/container";
import { OrdersHeader } from "@/components/profile/orders/ordersHeader";
import { findOrder, type FindOrder } from "@/services/userProfile.services";

import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { OrderSummary } from "@/components/profile/ordersDetails/orderSummary";
import { OrderInformation } from "@/components/profile/ordersDetails/orderInformation";
import { OrderProgress } from "@/components/profile/ordersDetails/orderProgress";
import { PurchasedProduct } from "@/components/profile/ordersDetails/purchasedProduct";
import { BackButton, Column, DetailGrid, DetailPage, EmptyState } from "@/styles/profile/orderDetails/index.style";
import { useEffect, useState } from "react";
import { usableFetch } from "@/services/fetchs";
import type { UserOrders } from "@/types/orders.types";
import { DetailHeader } from "@/components/profile/ordersDetails/detailHeading";

type OrderState = {
	datas:UserOrders | null,
	status:number
}
export const OrderDetails = () => {
	const { orderId } = useParams();
	if(!orderId )return;
	const navigate = useNavigate();
	const [values,setValues] = useState<OrderState>({datas:null,status:0})
	useEffect(()=>{
		usableFetch<UserOrders | null , FindOrder>({
			service:findOrder,
			body:{orderId},
			setDatas:setValues
		})
	},[])
	if(values.status === 0)return

	const order = values.datas
	const hasError = values.status >= 400
	return (
		<Container showHeader={false}>
			<DetailPage>
				<OrdersHeader title="Detalhes da compra" onBack={() => navigate("/minhas-compras")} backLabel="Voltar às compras" />
				{hasError || !order || Array.isArray(order) ? (
					<EmptyState>
						<h2>{hasError ? "Não foi possível carregar a compra" : "Compra não encontrada"}</h2>
						<p>
							{hasError
								? "Ocorreu um erro ao buscar os detalhes. Tente novamente mais tarde."
								: "Não localizamos um pedido com esse número."}
						</p>
						<BackButton onClick={() => navigate("/minhas-compras")}><FiArrowLeft aria-hidden="true" /> Ver minhas compras</BackButton>
					</EmptyState>
				) : (
					<>
						<DetailHeader id={order.id} status={order.status}/>

						<DetailGrid>
							<Column>
								<PurchasedProduct product={order.product} quantity={order.quantity} price={order.price} />
								<OrderProgress createdAt={order.createdAt} status={order.status} />
								<OrderInformation createdAt={order.createdAt} id={order.id} />
							</Column>

							<OrderSummary 
                                total={order.total}
                                coupon={order.coupon}
                                quantity={order.quantity}
                                price={order.price}
                                changePage={navigate}
                                />
						</DetailGrid>
					</>
				)}
			</DetailPage>
		</Container>
	);
};
