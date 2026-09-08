import type {  Stat } from "@/types/storeDashboard.types";
import styled from "styled-components";


type Props = {
  stats:Stat[],
  status:number
}


export const DashboardStats = ({ stats ,status}: Props) => {
  if (status === 0) {
    return (
      <Container>
        <LoadingText>Carregando...</LoadingText>
      </Container>
    )
  }
  return (
    <Container>
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card className={"card-"+stat.dataKey} key={stat.id}>
            <BoxIcon>
              <Icon />
            </BoxIcon>

            {stat.hasError ? (
              <>
                <strong data-testid={"stats-error-"+stat.dataKey}>Erro</strong>
                <p>Não foi possível carregar esta métrica.</p>
              </>
            ) : (
              <>
                <strong data-testid={"stats-"+stat.dataKey}>{stat.value}</strong>
                <h3>{stat.label}</h3>
              </>
            )}
          </Card>
        )
      })}
    </Container>
  )
}
export const BoxIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eff6ff;
  color: #2563eb;
  flex-shrink: 0;

  svg {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;


  &, * {
   box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingText = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 0.9rem;
  color: #64748b;
  padding: 32px 0;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Card = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    border-color: #cbd5e1;
  }


  ${BoxIcon} {
    align-self: flex-end;
    margin-bottom: -12px;
  }


  h3 {
    order: -1;
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 12px 0;
  }

  strong {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
    margin: 0;

 
    &[data-testid^="stats-error"] {
      color: #ef4444;
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 4px 0 0 0;
  }

 
  &.card-revenue ${BoxIcon},
  &.card-faturamento ${BoxIcon} {
    background-color: #f0fdf4;
    color: #16a34a;
  }

  &.card-products ${BoxIcon},
  &.card-produtos ${BoxIcon} {
    background-color: #faf5ff;
    color: #9333ea;
  }

  &.card-coupons ${BoxIcon},
  &.card-cupons ${BoxIcon} {
    background-color: #fffbeb;
    color: #d97706;
  }
`;