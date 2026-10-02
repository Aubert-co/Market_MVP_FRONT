import { render, screen } from "@testing-library/react";
import { OrderProgress } from "@/modules/orders/user/components/orderProgress";

describe("OrderProgress", () => {
	const createdAt = "2026-09-30T12:00:00.000Z";

	it("should display the completed steps for a completed order", () => {
		render(<OrderProgress createdAt={createdAt} status="completed" />);

		expect(screen.getByRole("heading", { name: "Andamento do pedido" })).toBeInTheDocument();
		expect(screen.getByText("Pedido realizado")).toBeInTheDocument();
		expect(screen.getByText("Em processamento")).toBeInTheDocument();
		expect(screen.getByText("Etapa concluída")).toBeInTheDocument();
		expect(screen.getByText("Compra concluída")).toBeInTheDocument();
		expect(screen.getByText("Pedido finalizado")).toBeInTheDocument();
	});

	it("should show pending messages while the order is in progress", () => {
		render(<OrderProgress createdAt={createdAt} status="pending" />);

		expect(screen.getByText("Aguardando atualização")).toBeInTheDocument();
		expect(screen.getByText("Aguardando conclusão")).toBeInTheDocument();
	});

	it("should show a cancellation message instead of the timeline", () => {
		render(<OrderProgress createdAt={createdAt} status="cancelled" />);

		expect(screen.getByText("Esta compra foi cancelada.")).toBeInTheDocument();
		expect(screen.queryByText("Pedido realizado")).not.toBeInTheDocument();
	});
});
