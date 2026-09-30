import { ProductRow, Section, SectionTitle } from "@/styles/profile/orderDetails/index.style";
import type { UserOrders } from "@/types/orders.types";
import { brlCurrency, loadImage } from "@/utils";
import { FiPackage } from "react-icons/fi";

type Props = Pick<UserOrders, "product" | "quantity" | "price">;

export const PurchasedProduct = ({ product, quantity, price }: Props) => (
	<Section>
		<SectionTitle>
			<FiPackage aria-hidden="true" />
			<h3>Produto comprado</h3>
		</SectionTitle>
		<ProductRow>
			<img src={loadImage(product.imageUrl)} alt={product.name} />
			<div>
				<h4>{product.name}</h4>
				<p>Quantidade: {quantity}</p>
				<p>Preço unitário: {brlCurrency(price)}</p>
			</div>
			<strong>{brlCurrency(price * quantity)}</strong>
		</ProductRow>
	</Section>
);