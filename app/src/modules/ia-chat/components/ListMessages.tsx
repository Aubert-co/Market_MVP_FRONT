import styled from "styled-components"
import { IAChatSuggestions } from "./iaChatSuggestions"
import type { ChatMessage } from "../types/index.types"

type Props = {
    messages:ChatMessage[],
    error:string,
    sendMessage:(content:string)=>void,
    isSending:boolean
}
export const ListMessages = ({messages,error,sendMessage,isSending}:Props)=>{
    return (
        <MessageList aria-live="polite" aria-label="Mensagens do chat">
                {messages.map((message) => (
                    <MessageBubble key={message.id} $sender={message.sender}>
                        {message.content}
                    </MessageBubble>
                ))}
                {messages.length === 1 && (
                    <IAChatSuggestions onSelect={(prompt) => void sendMessage(prompt)} />
                )}
                {isSending && <MessageStatus>Enviando mensagem...</MessageStatus>}
                {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
            </MessageList>
    )
}

const MessageList = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
    padding: 20px 16px;
    background: #f8fafc;
`

const MessageBubble = styled.p<{ $sender: ChatMessage["sender"] }>`
    align-self: ${({ $sender }) =>
        $sender === "user" ? "flex-end" : "flex-start"};
    max-width: 85%;
    margin: 0;
    padding: 12px 14px;
    border-radius: ${({ $sender }) =>
        $sender === "user" ? "14px 4px 14px 14px" : "4px 14px 14px"};
    background: ${({ $sender }) =>
        $sender === "user" ? "#2563eb" : "#ffffff"};
    color: ${({ $sender }) => ($sender === "user" ? "#ffffff" : "#334155")};
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
    font-size: 14px;
    line-height: 1.5;
    overflow-wrap: anywhere;
`

const MessageStatus = styled.p`
    align-self: flex-start;
    margin: 0;
    color: #64748b;
    font-size: 12px;
`

const ErrorMessage = styled.p`
    align-self: flex-start;
    margin: 0;
    color: #b91c1c;
    font-size: 12px;
`
