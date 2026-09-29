import type { UserTotally } from "@/types/checkout.types";
import type { DiscountType } from "@/types/coupons.types";
import type { UserOrders } from "@/types/orders.types";
import type { OrderStatus } from "@/types/storeDashboard.types";

export type RefValue =
  React.RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null 
  >
export type SetSearchParams = (
  value:
    | URLSearchParams
    | ((prev: URLSearchParams) => URLSearchParams)
) => void;
export const getInputValue = (ref:RefValue):string =>{
    if(ref?.current && ref.current.value)return ref.current.value;
    return '';
};
export const getMultiInputValues = (...refs:RefValue[]):string[]=>refs.map((val)=>getInputValue(val));


export const shortDescription = (description:string):string=>
    description.split(" ").slice(0,20).join(" ");


export const getLocalDate = (date:number):string=>{
    const value = new Date(date)
    const localDate = value.toLocaleDateString()
    const [month,day,year] = localDate.split('/')
    return `${day}/${month}/${year}`
}

export const getOrderStatus = (order:OrderStatus):string=>{
    if(order === "completed")return "COMPLETA"
    if(order ==="cancelled")return "CANCELADA"

    return "PENDENTE"
}
export const loadImage = (imageName:string)=>`https://cdn.aubertbarbosa.com/market/${imageName}`

export const getUserTotally = ({items,discount,discountType}:UserTotally)=>{
  if(!items || items.length ===0)return 0 
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  if(!discount || !discountType){
    return total;
  }
  if(discountType === "fixed"){
    return total - discount
  }
  return total * (1 - discount / 100);
}


export const createUrlUpdater = (setSearchParams: SetSearchParams) => {
  return (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set(key, value);
      return next;
    });
  };
};

export const brlCurrency = (value:number)=>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });


export const calculateUserOrdersSummary = (orders: UserOrders[]) => {
  const activeOrders = orders.filter((order) => order.status !== "cancelled");
  const totalSpent = activeOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = activeOrders.filter((order) => order.status === "completed").length;
  const couponsUsed = activeOrders.filter((order) => Boolean(order.coupon?.discount)).length;

  const totalSaved = activeOrders.reduce((sum, order) => {
    const coupon = order.coupon;

    if (!coupon || coupon.discount === undefined || coupon.discount <= 0) {
      return sum;
    }

    if (coupon.discountType === "fixed") {
      return sum + Math.min(coupon.discount, order.total);
    }

    if (coupon.discount >= 100) {
      return sum + order.total;
    }

    const originalValue = order.total / (1 - coupon.discount / 100);
    return sum + Math.max(0, originalValue - order.total);
  }, 0);

  return {
    totalSpent,
    completedOrders,
    couponsUsed,
    totalSaved,
    lastOrders: activeOrders.length,
  };
};

export const getDiscount = (discount:number,coupon?:DiscountType):string=>{
 
  if(coupon === "fixed"){
    return brlCurrency(discount)
  }
  return discount+"%"
}