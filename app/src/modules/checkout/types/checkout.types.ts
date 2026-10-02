import type { Product } from "@/modules/products/user/types"
import type { DiscountType } from "@/modules/coupons/types/coupons.types"
export type ItemsCheckout = Omit<Product,'category'|'description'> &{
    quantity:number
}
export type UserTotally = {
  items:ItemsCheckout[] ,
  discount?:number ,
  discountType?:DiscountType 
}