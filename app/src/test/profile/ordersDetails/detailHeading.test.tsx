import { render, screen } from "@testing-library/react";
import { DetailHeader } from "@/components/profile/ordersDetails/detailHeading";

describe("DetailHeader", () => {
	it.each([
		["completed", "COMPLETA"],
		["pending", "PENDENTE"],
		["cancelled", "CANCELADA"],
	] as const)("should display the %s order status", (status, label) => {
		render(<DetailHeader id={31} status={status} />);

		expect(screen.getByText("Pedido #31")).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Resumo da compra" })).toBeInTheDocument();
		expect(screen.getByText(label)).toBeInTheDocument();
	});
});
