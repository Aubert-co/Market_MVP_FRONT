import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as orderServices from "@/modules/orders/user/service/orders.service";
import type { UserOrders } from "@/modules/orders/types/orders.types";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { OrderDetails } from "@/modules/orders/user/pages/orderDetails";

const order: UserOrders = {
	id: 42,
	total: 90,
	quantity: 2,
	status: "completed",
	createdAt: "2026-09-30T12:00:00.000Z",
	price: 50,
	product: {
		name: "Produto do pedido",
		imageUrl: "/produto.jpg",
	},
	coupon: {
		discount: 10,
		discountType: "percent",
	},
};

const findOrder = jest.spyOn(orderServices, "findOrder");

const renderOrderDetails = () =>
	render(
		<MemoryRouter initialEntries={["/minhas-compra/detalhes/42"]}>
			<Routes>
				<Route path="/minhas-compra/detalhes/:orderId" element={<OrderDetails />} />
				<Route path="/minhas-compras" element={<h1>Minhas compras</h1>} />
			</Routes>
		</MemoryRouter>,
	);

describe("OrderDetails page", () => {
	beforeEach(() => {
		localStorage.setItem("COOKIE_NOTICE", "true");
		findOrder.mockResolvedValue({ datas: order, status: 201, message: "Success" });
	});

	afterEach(() => {
		findOrder.mockReset();
	});

	it("should display order details when the API returns status 201", async () => {
		renderOrderDetails();

		expect(await screen.findByText("Pedido #42")).toBeInTheDocument();
		expect(findOrder).toHaveBeenCalledWith({ orderId: "42" });
		expect(screen.getByRole("heading", { name: "Detalhes da compra" })).toBeInTheDocument();
		expect(screen.getByText("Produto do pedido")).toBeInTheDocument();
		expect(screen.getByText("Quantidade: 2")).toBeInTheDocument();
		expect(screen.getByText("10%")).toBeInTheDocument();
		expect(screen.getByText("Etapa concluída")).toBeInTheDocument();
	});

	it("should display an error state when the API request fails", async () => {
		findOrder.mockRejectedValueOnce(new Error("API unavailable"));
		renderOrderDetails();

		expect(await screen.findByRole("heading", { name: "Não foi possível carregar a compra" })).toBeInTheDocument();
		expect(screen.getByText("Ocorreu um erro ao buscar os detalhes. Tente novamente mais tarde.")).toBeInTheDocument();
		expect(screen.queryByText("Pedido #42")).not.toBeInTheDocument();
	});

	it("should display an error state when the API responds with a failed status", async () => {
		findOrder.mockResolvedValueOnce({ datas: null, status: 500, message: "Server error" });
		renderOrderDetails();

		expect(await screen.findByRole("heading", { name: "Não foi possível carregar a compra" })).toBeInTheDocument();
		expect(screen.queryByText("Pedido #42")).not.toBeInTheDocument();
	});

	it("should navigate back to the orders list", async () => {
		const user = userEvent.setup();
		renderOrderDetails();

		await user.click(await screen.findByRole("button", { name: "Voltar às compras" }));

		expect(await screen.findByRole("heading", { name: "Minhas compras" })).toBeInTheDocument();
	});
});
