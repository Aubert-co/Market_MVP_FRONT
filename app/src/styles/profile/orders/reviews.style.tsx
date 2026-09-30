import styled from "styled-components";

export const ReviewButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(37, 99, 235, 0.2);
  }
`;

export const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ReviewProduct = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    margin: 0 0 6px;
    color: #0f172a;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.85rem;
  }
`;

export const ReviewProductImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
`;

export const ReviewField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ReviewStarButton = styled.button<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid ${({ $active }) => ($active ? "#f59e0b" : "#cbd5e1")};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#fffbeb" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#d97706" : "#64748b")};
  font-size: 1.3rem;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`;

export const ReviewTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  color: #0f172a;
  font: inherit;

  &:focus {
    border-color: #2563eb;
    outline: 2px solid rgba(37, 99, 235, 0.15);
  }
`;

