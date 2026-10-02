import type { UserOrders } from "../../types/orders.types";
import {
  OrderActions,
  OrderCard,
  OrderMeta,
  OrderThumb,
  OrdersList as OrdersListContainer,
  StatusBadge,
  DetailButton,
  
} from "@/modules/orders/user/styles/orders.style";
import { brlCurrency, getOrderStatus, loadImage } from "@/utils";
import { ReviewButton } from "@/modules/orders/user/styles/reviews.style";

type OrdersListProps = {
  orders: UserOrders[];
  onOpenDetails: (id: number) => void;
  onOpenReview?: (id: number) => void;
};

const OrderItem = ({ order, onOpenDetails, onOpenReview }: { order: UserOrders; onOpenDetails: (id: number) => void; onOpenReview?: (id: number) => void; }) => {
  return (
    <OrderCard $status={order.status}>
      <OrderThumb src={loadImage(order.product.imageUrl)} alt={order.product.name} />

      <OrderMeta>
        <div className="order-top">
          <div>
            <span className="label">Pedido</span>
            <h3>#{order.id}</h3>
          </div>
          <StatusBadge $status={order.status}>{getOrderStatus(order.status)}</StatusBadge>
        </div>

        <p className="product-name">{order.product.name}</p>

        <div className="order-info">
          <span>Qtd: {order.quantity}</span>
          <span>{new Date(order.createdAt).toLocaleDateString("pt-BR")}</span>
        </div>

        <div className="order-footer">
          <strong>{brlCurrency(order.total)}</strong>
          <OrderActions>
            <DetailButton onClick={() => onOpenDetails(order.id)}>Ver detalhes</DetailButton>
            {order.status === "completed" && onOpenReview && (
              <ReviewButton onClick={() => onOpenReview(order.id)}>Avaliar</ReviewButton>
            )}
          </OrderActions>
        </div>
      </OrderMeta>
    </OrderCard>
  );
};

export const OrdersList = ({ orders, onOpenDetails, onOpenReview }: OrdersListProps) => {
  return (
    <OrdersListContainer>
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onOpenDetails={onOpenDetails}
          onOpenReview={onOpenReview}
        />
      ))}
    </OrdersListContainer>
  );
};
