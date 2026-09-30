import styled, { css } from "styled-components";

export const OrdersPage = styled.main`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 24px 16px 40px;
`;

export const OrdersHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;

  p {
    margin: 0 0 8px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3vw, 2.6rem);
    color: #0f172a;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const OrdersActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const OrderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
  margin-left: auto;
`;




export const OrdersList = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
`;

export const OrderCard = styled.article<{ $status?: "completed" | "pending" | "cancelled" }>`
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 16px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 14px 16px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: #bfdbfe;
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.06);
  }

  ${({ $status }) =>
    $status === "completed" &&
    css`
      border-left: 4px solid #10b981;
    `}

  ${({ $status }) =>
    $status === "pending" &&
    css`
      border-left: 4px solid #f59e0b;
    `}

  ${({ $status }) =>
    $status === "cancelled" &&
    css`
      border-left: 4px solid #ef4444;
    `}

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const OrderThumb = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  object-fit: cover;
  align-self: center;

  @media (max-width: 640px) {
    width: 100%;
    height: 180px;
  }
`;

export const OrderMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  .order-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .label {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #0f172a;
  }

  .product-name {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: #1e293b;
  }

  .order-info {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    color: #64748b;
    font-size: 0.82rem;
  }

  .order-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 2px;
    flex-wrap: wrap;
  }

  strong {
    color: #0f172a;
    font-size: 1.12rem;
  }
`;

export const StatusBadge = styled.span<{ $status?: "completed" | "pending" | "cancelled" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  ${({ $status }) =>
    $status === "completed" &&
    css`
      background: rgba(16, 185, 129, 0.12);
      color: #047857;
    `}

  ${({ $status }) =>
    $status === "pending" &&
    css`
      background: rgba(245, 158, 11, 0.12);
      color: #b45309;
    `}

  ${({ $status }) =>
    $status === "cancelled" &&
    css`
      background: rgba(239, 68, 68, 0.1);
      color: #b91c1c;
    `}
`;

export const DetailButton = styled.button`
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    color: #2563eb;
    background: #eff6ff;
  }
`;

