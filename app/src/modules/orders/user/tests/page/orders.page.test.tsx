import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as orderServices from "@/modules/orders/user/service/orders.service";
import type { UserOrders } from "@/modules/orders/types/orders.types";
import { brlCurrency } from "@/utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Orders } from "@/modules/orders/user/pages/orders";

const orders: UserOrders[] = [
	{
		id: 42,
		total: 90,
		quantity: 2,
		status: "completed",
		createdAt: "2026-09-30T12:00:00.000Z",
		price: 50,
		product: {
			name: "Produto 422",
			imageUrl: "/produto-concluido.jpg",
		},
		coupon: {
			discount: 10,
			discountType: "percent",
		},
	},
	{
		id: 43,
		total: 40,
		quantity: 1,
		status: "pending",
		createdAt: "2026-09-29T12:00:00.000Z",
		price: 40,
		product: {
			name: "Produto 4111",
			imageUrl: "/produto-pendente.jpg",
		},
	},
];

const userOrders = jest.spyOn(orderServices, "userOrders");

const renderOrdersPage = () =>
	render(
		<MemoryRouter initialEntries={["/minhas-compras"]}>
			<Routes>
				<Route path="/minhas-compras" element={<Orders />} />
				<Route path="/minhas-compra/detalhes/:orderId" element={<h1>Detalhes do pedido</h1>} />
				<Route path="/perfil/ordens" element={<h1>Perfil</h1>} />
			</Routes>
		</MemoryRouter>,
	);

describe("Orders page", () => {
	beforeEach(() => {
		localStorage.setItem("COOKIE_NOTICE", "true");
		userOrders.mockResolvedValue({ datas: orders, status: 201, message: "Success" });
	});

	afterEach(() => {
		userOrders.mockReset();
	});

	it("should display orders and their summary when the API succeeds", async () => {
		renderOrdersPage();

		expect(await screen.findByText("Produto 422")).toBeInTheDocument();
		expect(userOrders).toHaveBeenCalledWith({});
		expect(screen.getByText("Produto 4111")).toBeInTheDocument();
		expect(screen.getByText("COMPLETA")).toBeInTheDocument();
		expect(screen.getByText("PENDENTE")).toBeInTheDocument();
		expect(screen.getByText(brlCurrency(130).replace(/\u00A0/g, " "))).toBeInTheDocument();
		expect(screen.getByText("2", { selector: "strong" })).toBeInTheDocument();
		expect(screen.getByText("Cupons usados").nextSibling).toHaveTextContent("1");
	});

	it("should keep the page available without orders when the API request fails", async () => {
		userOrders.mockRejectedValueOnce(new Error("API unavailable"));
		renderOrdersPage();

		expect(await screen.findByRole("heading", { name: "Minhas compras" })).toBeInTheDocument();
		expect(userOrders).toHaveBeenCalledWith({});
		expect(screen.queryByText("Produto 4111")).not.toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "Ver detalhes" })).not.toBeInTheDocument();
		expect(screen.getByText("Total gasto").nextSibling).toHaveTextContent(brlCurrency(0).replace(/\u00A0/g, " "));
	});

	it("should navigate to the selected order details", async () => {
		const user = userEvent.setup();
		renderOrdersPage();

		const detailButtons = await screen.findAllByRole("button", { name: "Ver detalhes" });
		await user.click(detailButtons[1]);

		expect(await screen.findByRole("heading", { name: "Detalhes do pedido" })).toBeInTheDocument();
	});

	it("should open a review for a completed order", async () => {
		const user = userEvent.setup();
		renderOrdersPage();

		await user.click(await screen.findByRole("button", { name: "Avaliar" }));

		expect(screen.getByRole("dialog", { name: "Avaliações" })).toBeInTheDocument();
		expect(screen.getByText("Produto 4111")).toBeInTheDocument();
		expect(screen.getByText("Pedido #42")).toBeInTheDocument();
	});
});
