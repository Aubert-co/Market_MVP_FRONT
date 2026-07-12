import type { Product } from "@/types/products.types";
import { loadImage } from "@/utils";

import { ButtonsDiv, PrimaryButton } from "@/styles/shared.style";
import styled from "styled-components";

type ProductDetailsProps = {
  products: Product[];
  showEditModal:(product:Product)=>void
};

export const ProductDetailModal = ({ products ,showEditModal}: ProductDetailsProps) => {
  
  return (
    <ModalContainer>
      {products.map(product => (
        <div key={product.id} className="product-modal">
        <div className="image">
            <img src={loadImage(product.imageUrl)} alt={product.name} />
        </div>

        <div className="content">
            <h2 className="title">{product.name}</h2>

            <p className="description">{product.description}</p>

            <div className="meta">
            <span>ID: {product.id}</span>
            <span>Estoque: {product.stock}</span>
            </div>

            <div className="price">
            R$ {product.price}
            </div>

            <ButtonsDiv>
              <PrimaryButton
                onClick={() => showEditModal(product)}
                aria-label={`Editar produto ${product.name}`}
              >
                Editar
              </PrimaryButton>

              <PrimaryButton
                $bg="#FF6B6B"
                $hoverBg="#FF4C4C"
                $color="#fff"
                aria-label={`Desativar produto ${product.name}`}
              >
                Desativar
              </PrimaryButton>
            </ButtonsDiv>
        </div>
        </div>

      ))}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`

.product-modal {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  width: 100%;
}

.product-modal .image {
  flex: 0 0 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  background: #f5f5f5;
}

.product-modal .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-modal .content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-modal .title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.product-modal .description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.product-modal .meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #888;
}

.product-modal .price {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 10px;
}`