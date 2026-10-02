import { render, screen } from "@testing-library/react";
import { SummaryHeader } from "@/modules/orders/user/components/summaryHeader";
import { brlCurrency } from "@/utils";

describe("SummaryHeader", () => {
	const summary = {
		totalSpent: 1234.5,
		completedOrders: 4,
		lastOrders: 3,
		couponsUsed: 2,
		totalSaved: 125.75,
	};

	it("should display the order summary labels and counts", () => {
		render(<SummaryHeader {...summary} />);

		expect(screen.getByText("Compras concluídas")).toBeInTheDocument();
		expect(screen.getByText("4")).toBeInTheDocument();
		expect(screen.getByText("Cupons usados")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("Últimas compras", { selector: "h2" })).toBeInTheDocument();
		expect(screen.getAllByText("Últimas compras")).toHaveLength(2);
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("should format spent and saved totals as Brazilian currency", () => {
		render(<SummaryHeader {...summary} />);

		expect(screen.getByText("Total gasto")).toBeInTheDocument();
		expect(screen.getByText(brlCurrency(summary.totalSpent).replace(/\u00A0/g, " "))).toBeInTheDocument();
		expect(screen.getByText("Economizado")).toBeInTheDocument();
		expect(screen.getByText(brlCurrency(summary.totalSaved).replace(/\u00A0/g, " "))).toBeInTheDocument();
	});
});