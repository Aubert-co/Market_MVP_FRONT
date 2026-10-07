export type ChatSuggestion = {
    id: string
    title: string
    prompt: string
    icon: React.ReactNode
}

export type ChatMessage = {
    id: string | number
    content: string
    sender: "assistant" | "user"
}