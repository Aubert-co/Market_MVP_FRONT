import type { Order } from "@/types/storeDashboard.types"



export const ordersMock: Order[] = [
  {
    id: 1,

    user: "Carlos Henrique",

    productId: 101,

    product: {
      id: 101,
      name: "Mouse Gamer RGB",
      imageUrl: "/images/mouse.jpg"
    },

    total: 299.9,

    quantity: 2,

    status: "completed",

    createdAt: Date.now(),

    price: 149.95,

    coupon: {
      code: "PROMO10",
      discount: 10,
      discountType: "fixed"
    }
  },

  {
    id: 2,

    user: "Mariana Souza",

    productId: 202,

    product: {
      id: 202,
      name: "Teclado Mecânico",
      imageUrl: "/images/keyboard.jpg"
    },

    total: 450,

    quantity: 1,

    status: "pending",

    createdAt: Date.now(),

    price: 450
  },

  {
    id: 3,

    user: "Lucas Almeida",

    productId: 303,

    product: {
      id: 303,
      name: "Monitor UltraWide",
      imageUrl: "/images/monitor.jpg"
    },

    total: 2400,

    quantity: 2,

    status: "cancelled",

    createdAt: Date.now(),

    price: 1200,

    coupon: {
      code: "FRETEGRATIS",
      discount: 0,
      discountType: "percent"
    }
  }
]