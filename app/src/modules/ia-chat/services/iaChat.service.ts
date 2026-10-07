import { API_BASE_URL } from "@/configs/api"
import type { ChatMessage } from "../types/index.types"



type GetMessagesResponse = {
    messages: ChatMessage[]
}

const SEND_MESSAGE_ENDPOINT = ""
const GET_MESSAGES_ENDPOINT = ""

export const sendChatMessage = async (content: string): Promise<void> => {
  
    const response = await fetch(`${API_BASE_URL}${SEND_MESSAGE_ENDPOINT}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
    })

    if (!response.ok) {
        throw new Error(`Não foi possível enviar a mensagem (${response.status}).`)
    }
}

export const getChatMessages = async (): Promise<ChatMessage[]> => {
   

    const response = await fetch(`${API_BASE_URL}${GET_MESSAGES_ENDPOINT}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error(`Não foi possível receber as mensagens (${response.status}).`)
    }

    const result = (await response.json()) as GetMessagesResponse
    if (!Array.isArray(result.messages)) {
        throw new Error("A resposta do chat não contém uma lista válida de mensagens.")
    }

    return result.messages
}
