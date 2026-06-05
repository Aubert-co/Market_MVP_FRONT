import type {  Stat, FormatStats } from "@/types/storeDashboard.types";

import { FaDollarSign, FaShoppingCart, FaBox, FaTicketAlt, FaEye, FaStar, FaComments } from "react-icons/fa";

export const Stats: Omit<Stat, "value" | "hasError">[] = [
  {
    id: 1,
    label: "Visualizações",
    icon: FaEye,
    dataKey: "views",
   
  },
  {
    id: 2,
    label: "Faturamento Mensal",
    icon: FaDollarSign,
    dataKey: "revenue",
   
  },
  {
    id: 3,
    label: "Produtos Ativos",
    icon: FaBox,
    dataKey: "countActiveProducts",
   
  },
  {
    id: 4,
    label: "Cupons Ativos",
    icon: FaTicketAlt,
    dataKey: "totalActiveCoupons",
   
  },
  {
    id: 5,
    label: "Produtos em Carrinhos",
    icon: FaShoppingCart,
    dataKey: "productsInCart",
   
  },
  {
    id: 6,
    label: "Avaliações totais",
    icon: FaComments,
    dataKey: "totalReviews",
   
  },
   {
    id: 7,
    label: "Media de avalialçoes",
    icon: FaStar,
    dataKey: "averageRating",
   
  },
];



export const formatValues = (
  key: keyof FormatStats,
  value: number
): string => {

  if(key === "revenue"){
    
    return  new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
  }
  return value.toString()
};

export const mapStats = (backendStats: FormatStats): Stat[] => {
  
  return Stats.map((stat) => ({
    ...stat,
      value:formatValues(stat.dataKey,backendStats[stat.dataKey].value),
      hasError:backendStats[stat.dataKey].hasError
  }));  
};

