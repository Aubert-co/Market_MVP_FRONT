import { useState } from "react"
import { getChatMessages, sendChatMessage,  } from "../services/iaChat.service"
import { initialMessages } from "../constants/initialMessage"
import type { ChatMessage } from "../types/index.types"



export const useIAChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState("")

    const sendMessage = async (message: string) => {
        const content = message.trim()
        if (!content || isSending) return

        setError("")
        setMessages((currentMessages) => [
            ...currentMessages,
            { id: `user-${Date.now()}`, content, sender: "user" },
        ])
        setIsSending(true)

        try {
            await sendChatMessage(content)
            const receivedMessages = await getChatMessages()
            setMessages(receivedMessages)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Ocorreu um erro ao enviar ou receber mensagens."
            )
        } finally {
            setIsSending(false)
        }
    }

    return { messages, isSending, error, sendMessage }
}
