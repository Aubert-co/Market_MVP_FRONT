import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { UserOrders } from "@/modules/orders/types/orders.types";
import type { Response } from "@/types/services.types";
import { OrdersReviews } from "@/modules/orders/user/components/ordersReviews";
import { createReview } from "@/modules/orders/user/service/reviews.services";
import { useToastMessage } from "@/hooks/messages/useToastMessage";

jest.mock("@/modules/orders/user/service/reviews.services", () => ({
	createReview: jest.fn(),
}));

jest.mock("@/hooks/messages/useToastMessage", () => ({
	useToastMessage: jest.fn(),
}));

const order: UserOrders = {
	id: 42,
	total: 120,
	quantity: 1,
	status: "completed",
	createdAt: "2025-01-01",
	price: 120,
	product: {
		name: "Produto de teste",
		imageUrl: "/product.jpg",
	},
};

describe("OrdersReviews", () => {
	const addMessage = jest.fn();
	const closeModal = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useToastMessage).mockReturnValue({
			addMessage,
			messages: [],
		});
	});

	it("should render the order and disable submission until a rating is selected", () => {
		render(<OrdersReviews order={order} closeModal={closeModal} />);

		expect(screen.getByText("Produto de teste")).toBeInTheDocument();
		expect(screen.getByText("Pedido #42")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Enviar avaliação" })).toBeDisabled();
	});

	it("should submit the review and close the modal on success", async () => {
		jest.mocked(createReview).mockResolvedValue({ status: 201, message: "Created" } as Response);
		render(<OrdersReviews order={order} closeModal={closeModal} />);

		fireEvent.click(screen.getByRole("button", { name: "4 estrelas" }));
		fireEvent.change(screen.getByLabelText("Comentário"), {
			target: { value: "Gostei do produto" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Enviar avaliação" }));

		await waitFor(() => {
			expect(createReview).toHaveBeenCalledWith({
				comment: "Gostei do produto",
				rating: 4,
				orderId: 42,
			});
		});
		expect(addMessage).toHaveBeenCalledWith({ content: "successo", type: "success" });
		expect(closeModal).toHaveBeenCalledTimes(1);
	});

	it("should show an error message and keep the modal open when the review fails", async () => {
		jest.mocked(createReview).mockResolvedValue({ status: 500, message: "Failed" } as Response);
		render(<OrdersReviews order={order} closeModal={closeModal} />);

		fireEvent.click(screen.getByRole("button", { name: "2 estrelas" }));
		fireEvent.click(screen.getByRole("button", { name: "Enviar avaliação" }));

		await waitFor(() => {
			expect(addMessage).toHaveBeenCalledWith({
				content: "Algo deu errado!",
				type: "error",
			});
		});
		expect(closeModal).not.toHaveBeenCalled();
	});
});