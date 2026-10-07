import {  useState, type FormEvent } from "react"
import {  FiX } from "react-icons/fi"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { SendMessage } from "./sendMessage"
import { useIAChat } from "../hooks/useIAChat"
import { ListMessages } from "./ListMessages"


type Props = {
    onClose: () => void
}

export const IAChat = ({ onClose }: Props) => {
    const [draft, setDraft] = useState("")
    const [authStatus,] = useState<"loading" | "authenticated" | "unauthenticated" | "error">("loading")
    const { messages, isSending, error, sendMessage } = useIAChat()


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const content = draft.trim()
        if (!content || isSending || authStatus !== "authenticated") return

        setDraft("")
        void sendMessage(content)
    }

    return (
        <ChatPanel
            id="ia-chat-panel"
            role="dialog"
            aria-label="Chat com inteligência artificial"
        >
            <PanelHeader>
                <HeaderContent>
                    <AssistantAvatar aria-hidden="true">IA</AssistantAvatar>
                    <div>
                        <Title>Assistente virtual</Title>
                        <Status>Estamos aqui para ajudar</Status>
                    </div>
                </HeaderContent>
                <CloseButton
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar chat"
                >
                    <FiX aria-hidden="true" />
                </CloseButton>
            </PanelHeader>
            
            {authStatus === "loading" && (
                <AccessNotice role="status">Verificando seu acesso...</AccessNotice>
            )}
            {authStatus === "unauthenticated" && (
                <AccessNotice role="status">
                    <p>Você precisa entrar na sua conta para conversar com a IA.</p>
                    <LoginLink to="/login">Ir para o login</LoginLink>
                </AccessNotice>
            )}
            {authStatus === "error" && (
                <AccessNotice role="alert">
                    Não foi possível verificar seu acesso. Tente novamente mais tarde.
                </AccessNotice>
            )}
            {authStatus === "authenticated" && (
                <>
                    <ListMessages sendMessage={sendMessage} messages={messages} error={error} isSending={isSending}/>
                    <SendMessage
                        setDraft={setDraft}
                        draft={draft}
                        onSubmit={handleSubmit}
                        disabled={isSending}
                    />
                </>
            )}
        </ChatPanel>
    )
}

const ChatPanel = styled.section`
    position: absolute;
    right: 0;
    bottom: 76px;
    display: flex;
    flex-direction: column;
    width: min(360px, calc(100vw - 32px));
    height: min(440px, calc(100vh - 120px));
    min-height: 260px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 16px 48px rgba(15, 23, 42, 0.18);
`

const PanelHeader = styled.header`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
    background: #2563eb;
    color: #ffffff;
`

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const AssistantAvatar = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    font-size: 13px;
    font-weight: 700;
`

const Title = styled.h2`
    margin: 0;
    font-size: 15px;
    font-weight: 600;
`

const Status = styled.p`
    margin: 4px 0 0;
    color: #dbeafe;
    font-size: 12px;
`

const AccessNotice = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px;
    color: #475569;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;

    p {
        margin: 0;
    }
`

const LoginLink = styled(Link)`
    padding: 10px 16px;
    border-radius: 8px;
    background: #2563eb;
    color: #ffffff;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        background: #1d4ed8;
    }

    &:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 2px;
    }
`

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #ffffff;
    cursor: pointer;
    font-size: 20px;

    &:hover {
        background: rgba(255, 255, 255, 0.16);
    }

    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 2px;
    }
`
