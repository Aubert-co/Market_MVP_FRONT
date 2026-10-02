import type { FormEvent } from "react";
import { useState } from "react";
import type { UserOrders } from "../../types/orders.types";
import {
	ReviewField,
	ReviewForm,
	ReviewProduct,
	ReviewProductImage,
	ReviewStarButton,
	ReviewStars,
	ReviewTextarea,
} from "@/modules/orders/user/styles/reviews.style";
import { loadImage } from "@/utils";
import { PrimaryButton } from "@/styles/shared.style";
import { createReview } from "@/modules/orders/user/service/reviews.services";
import { useToastMessage } from "@/hooks/messages/useToastMessage";



type Props = {
	order: UserOrders;
	closeModal: () => void;
};

export const OrdersReviews = ({ order, closeModal }: Props) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const {addMessage} = useToastMessage()
	const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		const {status} = await createReview({comment,rating,orderId:order.id})

		if(status === 201){
			addMessage({content:'successo',type:'success'})
			closeModal()
			return 
		}
		addMessage({content:'Algo deu errado!',type:'error'})
		
	};

	return (
		<ReviewForm onSubmit={handleSubmit}>
			<ReviewProduct>
				<ReviewProductImage
					src={loadImage(order.product.imageUrl)}
					alt={order.product.name}
				/>
				<div>
					<h3>{order.product.name}</h3>
					<p>Pedido #{order.id}</p>
				</div>
			</ReviewProduct>

			<ReviewField>
				<span id="review-rating-label">Sua nota</span>
				<ReviewStars role="group" aria-labelledby="review-rating-label">
					{Array.from({ length: 5 }, (_, index) => {
						const value = index + 1;
						const isActive = value <= rating;

						return (
							<ReviewStarButton
								key={value}
								type="button"
								$active={isActive}
								aria-label={`${value} ${value === 1 ? "estrela" : "estrelas"}`}
								aria-pressed={rating === value}
								onClick={() => setRating(value)}
							>
								{isActive ? "★" : "☆"}
							</ReviewStarButton>
						);
					})}
				</ReviewStars>
			</ReviewField>

			<ReviewField>
				<label htmlFor="review-comment">Comentário</label>
				<ReviewTextarea
					id="review-comment"
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					placeholder="Conte como foi sua experiência com o produto"
					maxLength={1000}
				/>
			</ReviewField>

			<PrimaryButton $cursor="not-allowed" type="submit" disabled={ rating === 0}>
				Enviar avaliação
			</PrimaryButton>
		</ReviewForm>
	);
};
