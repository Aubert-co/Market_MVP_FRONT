export const datas = {
      views: {
        value: 1250,
        hasError: false,
      },
      revenue: {
        value: 15420.5,
        hasError: false,
      },
      openOrders: {
        value: [
          {
            id: 1,
            user: "João Silva",
            product: {
              id: 1,
              name: "Mouse Gamer",
              imageUrl: "/mouse.jpg",
            },
            productId: 1,
            total: 299.9,
            quantity: 2,
            status: "PENDING",
            createdAt: Date.now(),
            price: 149.95,
          },
          {
            id: 2,
            user: "Maria Souza",
            product: {
              id: 2,
              name: "Teclado Mecânico",
              imageUrl: "/keyboard.jpg",
            },
            productId: 2,
            total: 450,
            quantity: 1,
            status: "PAID",
            createdAt: Date.now(),
            price: 450,
          },
        ],
        hasError: false,
      },
      countActiveProducts: {
        value: 48,
        hasError: false,
      },
      totalActiveCoupons: {
        value: 12,
        hasError: false,
      },
      reviews: {
        averageRating: {
          value: 4.8,
          hasError: false,
        },
        totalReviews: {
          value: 156,
          hasError: false,
        },
      },
      productsInCart: {
        value: 87,
        hasError: false,
      },
      topViewedProducts: {
        value: [
          {
            id: 1,
            name: "Mouse Gamer RGB",
            imageUrl: "/mouse.jpg",
            views: 1520,
            category: "Periféricos",
          },
          {
            id: 2,
            name: "Monitor 27 Polegadas",
            imageUrl: "/monitor.jpg",
            views: 980,
            category: "Monitores",
          },
          {
            id: 3,
            name: "Headset Wireless",
            imageUrl: "/headset.jpg",
            views: 740,
            category: "Áudio",
          },
        ],
        hasError: false,
      },
    }
