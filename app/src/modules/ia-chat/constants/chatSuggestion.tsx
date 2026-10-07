import { FiTag, FiTrendingUp, FiStar } from "react-icons/fi"
import type { ChatSuggestion } from "../types/index.types"
export const chatSuggestion: ChatSuggestion[] = [
    {
        id: "under-50",
        title: "Produtos abaixo de R$ 50",
        prompt: "Quero ver produtos abaixo de R$ 50",
        icon: <FiTag />,
    },
    {
        id: "offers",
        title: "Produtos em oferta",
        prompt: "Quero encontrar produtos em oferta",
        icon: <FiTrendingUp />,
    },
    {
        id: "top-rated",
        title: "Produtos mais bem avaliados",
        prompt: "Quero ver os produtos mais bem avaliados",
        icon: <FiStar/>,
    },
]