import {
  SectionHeader,
  SectionTitle,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryValue,
} from "@/styles/profile/orders/summary.style";
import { brlCurrency } from "@/utils";

type Props = {
    totalSpent:number,
    completedOrders:number,
    lastOrders:number,
    couponsUsed:number,
    totalSaved:number
}

export const SummaryHeader = ({
    totalSpent,
    completedOrders,
    lastOrders,
    couponsUsed,
    totalSaved,
}:Props)=>{
    return (
        <>
            <SummaryGrid>
                <SummaryCard>
                    <SummaryLabel>Total gasto</SummaryLabel>
                    <SummaryValue>{brlCurrency(totalSpent)}</SummaryValue>
                </SummaryCard>

                <SummaryCard>
                    <SummaryLabel>Compras concluídas</SummaryLabel>
                    <SummaryValue>{completedOrders}</SummaryValue>
                </SummaryCard>

                <SummaryCard>
                    <SummaryLabel>Cupons usados</SummaryLabel>
                    <SummaryValue>{couponsUsed}</SummaryValue>
                </SummaryCard>

                <SummaryCard>
                    <SummaryLabel>Economizado</SummaryLabel>
                    <SummaryValue>{brlCurrency(totalSaved)}</SummaryValue>
                </SummaryCard>

                <SummaryCard>
                    <SummaryLabel>Últimas compras</SummaryLabel>
                    <SummaryValue>{lastOrders}</SummaryValue>
                </SummaryCard>
            </SummaryGrid>

            <SectionHeader>
                <SectionTitle>Últimas compras</SectionTitle>
            </SectionHeader>
        </>
    )
}