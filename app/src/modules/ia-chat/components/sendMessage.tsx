import styled from "styled-components"
import {  type FormEvent } from "react"
import { FiSend } from "react-icons/fi"

type Props= {
    onSubmit:(event:FormEvent<HTMLFormElement>)=>void,
    draft:string,
    setDraft: React.Dispatch<React.SetStateAction<string>>,
    disabled?:boolean
}
export const SendMessage = ({draft,setDraft,onSubmit,disabled = false}:Props)=>{
    return(
      <MessageForm onSubmit={onSubmit}>
            <MessageInput
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Digite sua mensagem..."
                aria-label="Digite sua mensagem"
            />
            <SendButton
                type="submit"
                aria-label="Enviar mensagem"
                disabled={!draft.trim() || disabled}
            >
                <FiSend aria-hidden="true" />
            </SendButton>
        </MessageForm>
    )
}

const MessageForm = styled.form`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #e2e8f0;
    background: #ffffff;
`

const MessageInput = styled.input`
    flex: 1;
    min-width: 0;
    padding: 11px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    color: #0f172a;
    font-size: 14px;

    &:focus {
        border-color: #2563eb;
        outline: 2px solid rgba(37, 99, 235, 0.15);
    }
`

const SendButton = styled.button`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 10px;
    background: #2563eb;
    color: #ffffff;
    cursor: pointer;
    font-size: 18px;

    &:hover:not(:disabled) {
        background: #1d4ed8;
    }

    &:disabled {
        background: #94a3b8;
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 2px;
    }
`
