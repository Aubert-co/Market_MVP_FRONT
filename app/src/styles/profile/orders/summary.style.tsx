import styled from "styled-components";

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 22px 20px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
`;

export const SummaryLabel = styled.span`
  display: block;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const SummaryValue = styled.strong`
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  color: #0f172a;
`;
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 18px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
  color: #0f172a;
`;