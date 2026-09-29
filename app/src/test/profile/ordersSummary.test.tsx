import type { UserOrders } from "@/types/orders.types";
import { calculateUserOrdersSummary } from "@/utils";

describe("calculateUserOrdersSummary", () => {
  it("should sum total spent, use count and total saved from coupon discounts", () => {
    const orders:UserOrders[] = [
      {
        id: 1,
        total: 200,
        quantity: 1,
        status: "completed",
        createdAt: "2026-09-10T14:30:00.000Z",
        price: 200,
        product: {
          name: "Produto A",
          imageUrl: "/images/a.png",
        },
      },
      {
        id: 2,
        total: 190,
        quantity: 1,
        status: "completed",
        createdAt: "2026-09-10T14:30:00.000Z",
        price: 200,
        product: {
          name: "Produto B",
          imageUrl: "/images/b.png",
        },
        coupon: {
          discount: 10,
          discountType: "percent",
        },
      },
      {
        id: 3,
        total: 250,
        quantity: 1,
        status: "cancelled",
        createdAt: "2026-09-10T14:30:00.000Z",
        price: 300,
        product: {
          name: "Produto C",
          imageUrl: "/images/c.png",
        },
        coupon: {
          discount: 50,
          discountType: "fixed",
        },
      },
    ];

    const summary = calculateUserOrdersSummary(orders);

    expect(summary.totalSpent).toBe(390);
    expect(summary.completedOrders).toBe(2);
    expect(summary.couponsUsed).toBe(1);
    expect(summary.totalSaved).toBeCloseTo(21.1111111111);
    expect(summary.lastOrders).toBe(2);
  });
});
