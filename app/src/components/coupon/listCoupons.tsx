import type { BaseCoupon } from "@/types/coupons.types";
import assets from '@/assets/coupon.png'

import { AddCoupon } from "./AddCoupon";
import { CouponDetails, CouponItem, CouponRow,Label,Divider,Value,CouponHeader } from "@/styles/coupomCart.style";


type Props = {
  datas:BaseCoupon<number>[],
 
}
export const ListCoupons = ({ datas }: Props) => {
  return (
 
      <>
      {datas.map((val) => (
      <CouponItem key={val.id}>
        <CouponHeader>
          <img
            src={assets}
            alt={`Cupom ${val.code}`}
            className="coupon-image"
          />
          <div className="discount-badge">
            {val.discount}{val.discountType === "percent" ? "% OFF" : " R$ OFF"}
          </div>
        </CouponHeader>

        <CouponDetails>
          <CouponRow>
            <Label>Código</Label>
            <Value className="code">{val.code}</Value>
          </CouponRow>

          <CouponRow>
            <Label>Quantidade</Label>
            <Value>{val.quantity}</Value>
          </CouponRow>

          <CouponRow data-testid="discount">
            <Label>Desconto</Label>
            <Value className="highlight">
              {val.discount}{val.discountType === "percent" ? "%" : " R$"}
            </Value>
          </CouponRow>

          <CouponRow>
            <Label>Expira em</Label>
            <Value>
              {new Date(val.expiresAt).toLocaleDateString("pt-BR")}
            </Value>
          </CouponRow>

          <Divider />

          <AddCoupon id={val.id} />
        </CouponDetails>
      </CouponItem>
      ))}
      </>

  );
};
