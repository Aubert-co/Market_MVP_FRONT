import type { Product } from "@/types/products.types";
import { brlCurrency, loadImage } from "@/utils";

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
            {brlCurrency(product.price)}
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


export const ModalContainer = styled.div`

 

  .product-modal {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    max-width: 520px; /* Largura ajustada para o formato vertical */
    width: 100%;
    background: #ffffff;
    border-radius: 16px;
    margin: 0 auto;
  }


  .product-modal .image {
    width: 100%;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
  }

  .product-modal .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


  .product-modal .content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

 
  .product-modal .title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    line-height: 1.3;
  }

  
  .product-modal .meta {
    display: flex;
    gap: 8px;
  }

  .product-modal .meta span {
    background: #f1f5f9;
    color: #475569;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }


  .product-modal .description {
    font-size: 0.95rem;
    color: #475569;
    line-height: 1.6;
    margin: 4px 0 8px 0;
    white-space: pre-wrap;
  }


  .product-modal .price {
    font-size: 1.65rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
  }


  .product-modal .content > div:last-child {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }


  button {
    flex: 1;
    height: 42px;
    padding: 0 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;