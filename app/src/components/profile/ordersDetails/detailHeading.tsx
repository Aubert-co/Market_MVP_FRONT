import { DetailHeading, StatusBadge } from "@/styles/profile/orderDetails/index.style"
import type { OrderStatus } from "@/types/storeDashboard.types"
import { getOrderStatus } from "@/utils"
import { FiCheck, FiClock, FiX } from "react-icons/fi"

type Props = {
    id:number,
    status:OrderStatus
}
export const DetailHeader = ({id,status}:Props)=>{
    return (
        <DetailHeading>
            <div>
                <p className="eyebrow">Pedido #{id}</p>
                <h2>Resumo da compra</h2>
            </div>
            <StatusBadge $status={status}>
                {status === "completed" ? <FiCheck aria-hidden="true" /> : status === "pending" ? <FiClock aria-hidden="true" /> : <FiX aria-hidden="true" />}
                {getOrderStatus(status)}
            </StatusBadge>
        </DetailHeading>
    )
}