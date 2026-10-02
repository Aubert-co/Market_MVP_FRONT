import { MetaRow, Section, SectionTitle } from "@/modules/orders/user/styles/index.style";
import type { UserOrders } from "../../types/orders.types";
import { FiCalendar, FiPackage } from "react-icons/fi";

type Props = Pick<UserOrders, "createdAt" | "id">;

export const OrderInformation = ({ createdAt, id }: Props) => (
	<Section>
		<SectionTitle>
			<FiCalendar aria-hidden="true" />
			<h3>Informações do pedido</h3>
		</SectionTitle>
		<MetaRow>
			<FiCalendar aria-hidden="true" />
			<div>
				<span>Data da compra</span>
				<strong>{new Date(createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</strong>
			</div>
		</MetaRow>
		<MetaRow>
			<FiPackage aria-hidden="true" />
			<div>
				<span>Número do pedido</span>
				<strong>#{id}</strong>
			</div>
		</MetaRow>
	</Section>
);