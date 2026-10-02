import { fireEvent, render, screen } from "@testing-library/react";
import { OrderSummary } from "@/modules/orders/user/components/orderSummary";
import { brlCurrency } from "@/utils";

const formatCurrency = (value: number) => brlCurrency(value).replace(/\u00A0/g, " ");

describe("OrderSummary", () => {
	it("should display plural item totals, a percentage coupon, and navigate to shopping", () => {
		const changePage = jest.fn();
		render(
			<OrderSummary
				quantity={2}
				coupon={{ discount: 10, discountType: "percent" }}
				price={50}
				total={90}
				changePage={changePage}
			/>,
		);

		expect(screen.getByRole("heading", { name: "Resumo dos valores" })).toBeInTheDocument();
		expect(screen.getByText("Subtotal (2 itens)").nextSibling).toHaveTextContent(formatCurrency(100));
		expect(screen.getByText("Cupom usado").nextSibling).toHaveTextContent("10%");
		expect(screen.getByText("Total pago").nextSibling).toHaveTextContent(formatCurrency(90));

		fireEvent.click(screen.getByRole("button", { name: /Continuar comprando/ }));
		expect(changePage).toHaveBeenCalledWith("/");
	});

	it("should use the singular item label and format a fixed coupon value", () => {
		render(
			<OrderSummary
				quantity={1}
				coupon={{ discount: 5, discountType: "fixed" }}
				price={25}
				total={20}
				changePage={jest.fn()}
			/>,
		);

		expect(screen.getByText("Subtotal (1 item)").nextSibling).toHaveTextContent(formatCurrency(25));
		expect(screen.getByText("Cupom usado").nextSibling).toHaveTextContent(formatCurrency(5));
		expect(screen.getByText("Total pago").nextSibling).toHaveTextContent(formatCurrency(20));
	});

	it("should omit the coupon row when no discount is applied", () => {
		render(
			<OrderSummary
				quantity={0}
				price={25}
				total={0}
				changePage={jest.fn()}
			/>,
		);

		expect(screen.getByText("Subtotal (0 itens)")).toBeInTheDocument();
		expect(screen.queryByText("Cupom usado")).not.toBeInTheDocument();
	});
});
