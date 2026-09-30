import { BackButton, Column, Section, SummaryLine } from "@/styles/profile/orderDetails/index.style"
import { SectionTitle } from "@/styles/profile/orders/summary.style"
import type { DiscountType } from "@/types/coupons.types"
import { brlCurrency } from "@/utils"
import { FiArrowLeft, FiTag } from "react-icons/fi"

type Coupon ={
    discount?:number,
    discountType?:DiscountType
}
type Props = {
    quantity:number,
    coupon?:Coupon
    price:number,
    total:number,
    changePage:(page:string)=>void
}
//                {coupon && price * quantity > total && <SummaryLine><span>Você economizou</span><strong>-{brlCurrency(price * quantity - total)}</strong></SummaryLine>}
const ListCoupon = ({discount,discountType}:Coupon)=>{
    if(!discount)return;
    return (
        <>
          <SummaryLine><span>Cupom usado</span><strong>{discountType === "percent" ? `${discount}%` : brlCurrency(discount)}</strong></SummaryLine>

        </>
    )
}
export const OrderSummary = ({quantity,coupon,price,total,changePage}:Props)=>{
    return (
        <Column>
            <Section>
                <SectionTitle><FiTag aria-hidden="true" /><p>Resumo dos valores</p></SectionTitle>
                <SummaryLine><span>Subtotal ({quantity} {quantity === 1 ? "item" : "itens"})</span><strong>{brlCurrency(price * quantity)}</strong></SummaryLine>
                <ListCoupon discount={coupon?.discount} discountType={coupon?.discountType}/>
                <SummaryLine $total><span>Total pago</span><strong>{brlCurrency(total)}</strong></SummaryLine>
            </Section>
            <BackButton onClick={() => changePage("/")}><FiArrowLeft aria-hidden="true" /> Continuar comprando</BackButton>
        </Column>
    )
}