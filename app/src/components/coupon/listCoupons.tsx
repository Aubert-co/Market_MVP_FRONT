import type { BaseCoupon } from "@/types/coupons.types";
import assets from '@/assets/coupon.png'
import type { AddMessageParams } from "../../hooks/useBoxMessages"
import { AddCoupon } from "./AddCoupon";


type Props = {
  datas:BaseCoupon<number>[],
  addMessage:({}:AddMessageParams)=>void
}
export const ListCoupons = ({ datas,addMessage }: Props) => {
  return (
 
      <>
      {datas.map((val) => (
        <div key={val.id} className="coupon-item">
          <img
            src={assets}
            alt={`Cupom ${val.code}`}
            className="coupon-image"
          />
          <div className="coupon-details">
            <div className="coupon-row">
              <span className="label">Código</span>
              <span className="value code">{val.code}</span>
            </div>

            <div className="coupon-row">
              <span className="label">Quantidade</span>
              <span className="value">{val.quantity}</span>
            </div>

            <div className="coupon-row" data-testid="discount">
              <span className="label">Desconto</span>
              <span className="value highlight">
                {val.discount}{val.discountType === "percent" ? "%" : " R$"}
              </span>
            </div>

            <div className="coupon-row">
              <span className="label">Expira em</span>
              <span className="value">
                {new Date(val.expiresAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
            <AddCoupon id={val.id} addMessage={addMessage}/>
        </div>
      ))}
      </>

  );
};
