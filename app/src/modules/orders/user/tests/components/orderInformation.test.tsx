import { render, screen } from "@testing-library/react";
import { OrderInformation } from "@/modules/orders/user/components/orderInformation";

describe("OrderInformation", () => {
	it("should display the localized purchase date and order number", () => {
		const createdAt = "2026-09-30T12:00:00.000Z";
		render(<OrderInformation createdAt={createdAt} id={31} />);

		expect(screen.getByRole("heading", { name: "Informações do pedido" })).toBeInTheDocument();
		expect(screen.getByText("Data da compra").nextSibling).toHaveTextContent(
			new Date(createdAt).toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		);
		expect(screen.getByText("Número do pedido").nextSibling).toHaveTextContent("#31");
	});
});
