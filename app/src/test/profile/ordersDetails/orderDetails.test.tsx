import { fireEvent, render, screen } from "@testing-library/react";
import { DetailHeader } from "@/components/profile/ordersDetails/detailHeading";
import { OrderInformation } from "@/components/profile/ordersDetails/orderInformation";
import { OrderProgress } from "@/components/profile/ordersDetails/orderProgress";
import { OrderSummary } from "@/components/profile/ordersDetails/orderSummary";
import { PurchasedProduct } from "@/components/profile/ordersDetails/purchasedProduct";
import { brlCurrency, loadImage } from "@/utils";

const formatCurrency = (value: number) => brlCurrency(value).replace(/\u00A0/g, " ");
const createdAt = "2026-09-30T12:00:00.000Z";

describe("Order details components", () => {
	it("should display the order number and localized status in the header", () => {
		const { rerender } = render(<DetailHeader id={31} status="completed" />);

		expect(screen.getByText("Pedido #31")).toBeInTheDocument();
		expect(screen.getByText("Resumo da compra")).toBeInTheDocument();
		expect(screen.getByText("COMPLETA")).toBeInTheDocument();

		rerender(<DetailHeader id={31} status="pending" />);
		expect(screen.getByText("PENDENTE")).toBeInTheDocument();

		rerender(<DetailHeader id={31} status="cancelled" />);
		expect(screen.getByText("CANCELADA")).toBeInTheDocument();
	});

	it("should display product information, image, and calculated total", () => {
		render(
			<PurchasedProduct
				product={{ name: "Produto teste", imageUrl: "produto.jpg" }}
				quantity={3}
				price={25.5}
			/>,
		);

		expect(screen.getByRole("heading", { name: "Produto comprado" })).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Produto teste" })).toHaveAttribute("src", loadImage("produto.jpg"));
		expect(screen.getByText("Quantidade: 3")).toBeInTheDocument();
		expect(screen.getByText(`Preço unitário: ${formatCurrency(25.5)}`)).toBeInTheDocument();
		expect(screen.getByText(formatCurrency(76.5))).toBeInTheDocument();
	});

	it("should show the appropriate order progress for completed, pending, and cancelled orders", () => {
		const { rerender } = render(<OrderProgress createdAt={createdAt} status="completed" />);

		expect(screen.getByText("Pedido realizado")).toBeInTheDocument();
		expect(screen.getByText("Etapa concluída")).toBeInTheDocument();
		expect(screen.getByText("Pedido finalizado")).toBeInTheDocument();

		rerender(<OrderProgress createdAt={createdAt} status="pending" />);
		expect(screen.getByText("Aguardando atualização")).toBeInTheDocument();
		expect(screen.getByText("Aguardando conclusão")).toBeInTheDocument();

		rerender(<OrderProgress createdAt={createdAt} status="cancelled" />);
		expect(screen.getByText("Esta compra foi cancelada.")).toBeInTheDocument();
		expect(screen.queryByText("Pedido realizado")).not.toBeInTheDocument();
	});

	it("should display the purchase date and order number", () => {
		render(<OrderInformation createdAt={createdAt} id={31} />);

		expect(screen.getByRole("heading", { name: "Informações do pedido" })).toBeInTheDocument();
		expect(screen.getByText("Data da compra").nextSibling).toHaveTextContent(
			new Date(createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
		);
		expect(screen.getByText("#31")).toBeInTheDocument();
	});

	it("should display the subtotal, coupon, total, and navigate to shopping", () => {
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

		expect(screen.getByText("Subtotal (2 itens)")).toBeInTheDocument();
		expect(screen.getByText(formatCurrency(100))).toBeInTheDocument();
		expect(screen.getByText("10%")).toBeInTheDocument();
		expect(screen.getByText("Total pago").nextSibling).toHaveTextContent(formatCurrency(90));

		fireEvent.click(screen.getByRole("button", { name: /Continuar comprando/ }));
		expect(changePage).toHaveBeenCalledWith("/");
	});

	it("should display a fixed coupon value and singular item label", () => {
		render(
			<OrderSummary
				quantity={1}
				coupon={{ discount: 5, discountType: "fixed" }}
				price={25}
				total={20}
				changePage={jest.fn()}
			/>,
		);

		expect(screen.getByText("Subtotal (1 item)")).toBeInTheDocument();
		expect(screen.getByText("Cupom usado").nextSibling).toHaveTextContent(formatCurrency(5));
	});
});