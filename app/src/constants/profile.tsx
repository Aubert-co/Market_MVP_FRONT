import orderhistory from '@/assets/orderhistory.png'
import couponImg from '@/assets/coupon.png'
import cartImg from '@/assets/cart.png'
import storeImg from '@/assets/store2.png'


export const PROFILE_OPTIONS  = [
  {
    label: "Histórico de Compras",
    img: orderhistory,
    page:"ordens",
  },
  {
    label: "Meus cupons",
    img: couponImg,
    page:"cupons"
  },
  {
    label: "Meu carrinho",
    img: cartImg,
    page:"carrinho"
  },
  {
    label: "Minha loja",
    img: storeImg,
    page:"loja"
  }
]