import {
  DetailButton,
  OrdersActions,
  OrdersHeader as HeaderContainer,
} from "@/modules/orders/user/styles/orders.style";

type OrdersHeaderProps = {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
};

export const OrdersHeader = ({ title = "Minhas compras", onBack, backLabel = "Voltar ao perfil" }: OrdersHeaderProps) => {
  return (
    <HeaderContainer>
      <div>
        <p>Minha conta</p>
        <h1>{title}</h1>
      </div>

      <OrdersActions>
        {onBack && <DetailButton onClick={onBack}>{backLabel}</DetailButton>}
      </OrdersActions>
    </HeaderContainer>
  );
};
