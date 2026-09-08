import styled from "styled-components";

export const ProductsCheckout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  gap: 16px;



  .list-buy {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .overview {
    background: #ffffff;
    color: #0f172a;
    padding: 18px 20px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
    font-size: 1.05rem;
    font-weight: 700;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);

    button {
      width: 100%;
      height: 42px;
      background-color: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
      transition: all 0.2s ease;

      &:hover {
        background-color: #1d4ed8;
        transform: translateY(-1px);
      }
    }
  }
`;

export const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  color: #0f172a;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  width: 100%;
  gap: 16px;

  &:hover {
    border-color: #cbd5e1;
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
  }

 
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 10px;
    background-color: #f8fafc;
    border: 1px solid #f1f5f9;
    padding: 6px;
    flex-shrink: 0;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }

  .item-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .item-price {
    font-weight: 700;
    font-size: 0.95rem;
    color: #0f172a;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .checkout-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-direction:column;

    button {
      padding: 0 10px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #fecaca;
      background-color: #fef2f2;
      color: #ef4444;
      font-size: 0.775rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: #fee2e2;
        color: #dc2626;
      }
    }

    .quantity-controls,
    div {
      display: flex;
      align-items: center;
      gap: 2px;

      button {
        width: 28px;
        height: 28px;
        padding: 0;
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        color: #475569;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.85rem;

        &:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
      }

      input, span {
        font-size: 0.85rem;
        font-weight: 600;
        color: #0f172a;
        padding: 0 6px;
      }
    }
  }

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;

    .item-name {
      max-width: 100%;
    }

    .actions {
      justify-content: space-between;
      width: 100%;
      padding-top: 10px;
      border-top: 1px solid #f1f5f9;
    }
  }
`;

export const CouponContainer = styled.div`
  background: #ffffff;
  color: #0f172a;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
  }

  select {
    width: 100%;
    height: 40px;
    padding: 0 32px 0 10px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    background-color: #f8fafc;
    color: #0f172a;
    font-size: 0.875rem;
    outline: none;
    cursor: pointer;
    appearance: none;

    background-position: right 10px center;
    background-size: 16px;

    &:focus {
      background-color: #ffffff;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
`;