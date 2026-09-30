import { render, screen } from "@testing-library/react";
import { PurchasedProduct } from "@/components/profile/ordersDetails/purchasedProduct";
import { brlCurrency, loadImage } from "@/utils";

const formatCurrency = (value: number) => brlCurrency(value).replace(/\u00A0/g, " ");

describe("PurchasedProduct", () => {
	it("should display the product image, quantity, unit price, and calculated total", () => {
		render(
			<PurchasedProduct
				product={{ name: "Produto teste", imageUrl: "produto.jpg" }}
				quantity={3}
				price={25.5}
			/>,
		);

		expect(screen.getByRole("heading", { name: "Produto comprado" })).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Produto teste" })).toHaveAttribute(
			"src",
			loadImage("produto.jpg"),
		);
		expect(screen.getByRole("heading", { name: "Produto teste" })).toBeInTheDocument();
		expect(screen.getByText("Quantidade: 3")).toBeInTheDocument();
		expect(screen.getByText(`Preço unitário: ${formatCurrency(25.5)}`)).toBeInTheDocument();
		expect(screen.getByText(formatCurrency(76.5))).toBeInTheDocument();
	});
});
