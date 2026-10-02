import { fireEvent, render, screen } from "@testing-library/react";
import { ListUserOrders } from "@/modules/orders/user/components/listUserOrders";
import type { UserOrders } from "@/modules/orders/types/orders.types";
import { brlCurrency, loadImage } from "@/utils";

const orders: UserOrders[] = [
	{
		id: 21,
		total: 99.9,
		quantity: 2,
		status: "completed",
		createdAt: "2026-09-30T12:00:00.000Z",
		price: 49.95,
		product: {
			name: "Produto A",
			imageUrl: "produto-a.jpg",
		},
	},
	{
		id: 22,
		total: 45,
		quantity: 1,
		status: "pending",
		createdAt: "2026-09-29T12:00:00.000Z",
		price: 45,
		product: {
			name: "Produto B",
			imageUrl: "produto-b.jpg",
		},
	},
];

describe("ListUserOrders", () => {
	it("should display each order's product, quantity, total, status, and image", () => {
		const { container } = render(<ListUserOrders orders={orders} orderDetails={jest.fn()} />);

		expect(screen.getByText("Produto A")).toBeInTheDocument();
		expect(screen.getAllByText("Quantidade:")[0].parentElement).toHaveTextContent("2");
		expect(
			screen.getByText(brlCurrency(orders[0].total).replace(/\u00A0/g, " ")),
		).toBeInTheDocument();
		expect(screen.getByText("COMPLETA")).toBeInTheDocument();
		expect(screen.getByText("Produto B")).toBeInTheDocument();
		expect(screen.getByText("PENDENTE")).toBeInTheDocument();

		const images = container.querySelectorAll(".list-image img");
		expect(images).toHaveLength(2);
		expect(images[0]).toHaveAttribute("src", loadImage("produto-a.jpg"));
		expect(images[1]).toHaveAttribute("src", loadImage("produto-b.jpg"));
	});

	it("should pass the selected order ID to the details callback", () => {
		const orderDetails = jest.fn();
		render(<ListUserOrders orders={orders} orderDetails={orderDetails} />);

		fireEvent.click(screen.getAllByRole("button", { name: "Ver detalhes" })[1]);

		expect(orderDetails).toHaveBeenCalledTimes(1);
		expect(orderDetails).toHaveBeenCalledWith(22);
	});

	it("should render no order items when the list is empty", () => {
		const { container } = render(<ListUserOrders orders={[]} orderDetails={jest.fn()} />);

		expect(container.firstChild).toBeNull();
	});
});