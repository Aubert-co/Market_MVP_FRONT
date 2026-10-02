import { fireEvent, render, screen } from "@testing-library/react";
import { OrdersList } from "@/modules/orders/user/components/ordersList";
import type { UserOrders } from "@/modules/orders/types/orders.types";
import { brlCurrency, loadImage } from "@/utils";

const orders: UserOrders[] = [
	{
		id: 11,
		total: 149.9,
		quantity: 2,
		status: "completed",
		createdAt: "2026-09-30T12:00:00.000Z",
		price: 74.95,
		product: {
			name: "Produto concluído",
			imageUrl: "produto-concluido.jpg",
		},
	},
	{
		id: 12,
		total: 80,
		quantity: 1,
		status: "pending",
		createdAt: "2026-09-29T12:00:00.000Z",
		price: 80,
		product: {
			name: "Produto pendente",
			imageUrl: "produto-pendente.jpg",
		},
	},
];

describe("OrdersList", () => {
	it("should display order details, status, dates, prices, and product images", () => {
		render(<OrdersList orders={orders} onOpenDetails={jest.fn()} />);

		expect(screen.getByText("#11")).toBeInTheDocument();
		expect(screen.getByText("Produto concluído")).toBeInTheDocument();
		expect(screen.getByText("COMPLETA")).toBeInTheDocument();
		expect(screen.getByText("Qtd: 2")).toBeInTheDocument();
		expect(
			screen.getByText(new Date(orders[0].createdAt).toLocaleDateString("pt-BR")),
		).toBeInTheDocument();
		expect(screen.getByText(brlCurrency(orders[0].total).replace(/\u00A0/g, " "))).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Produto concluído" })).toHaveAttribute(
			"src",
			loadImage("produto-concluido.jpg"),
		);

		expect(screen.getByText("#12")).toBeInTheDocument();
		expect(screen.getByText("Produto pendente")).toBeInTheDocument();
		expect(screen.getByText("PENDENTE")).toBeInTheDocument();
	});

	it("should call the matching callback when order actions are clicked", () => {
		const onOpenDetails = jest.fn();
		const onOpenReview = jest.fn();
		render(<OrdersList orders={orders} onOpenDetails={onOpenDetails} onOpenReview={onOpenReview} />);

		fireEvent.click(screen.getAllByRole("button", { name: "Ver detalhes" })[1]);
		fireEvent.click(screen.getByRole("button", { name: "Avaliar" }));

		expect(onOpenDetails).toHaveBeenCalledWith(12);
		expect(onOpenReview).toHaveBeenCalledWith(11);
	});

	it("should only show review actions for completed orders when the callback is provided", () => {
		const { rerender } = render(
			<OrdersList orders={orders} onOpenDetails={jest.fn()} onOpenReview={jest.fn()} />,
		);

		expect(screen.getAllByRole("button", { name: "Avaliar" })).toHaveLength(1);

		rerender(<OrdersList orders={orders} onOpenDetails={jest.fn()} />);
		expect(screen.queryByRole("button", { name: "Avaliar" })).not.toBeInTheDocument();
	});
});