import { useState } from "react"
import { FiMessageCircle, FiX } from "react-icons/fi"
import styled from "styled-components"
import { IAChat } from "./iaChat"

export const IAChatLauncher = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Widget>
            {isOpen && (
                <IAChat onClose={() => setIsOpen(false)} />
            )}
            <LauncherButton
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Fechar chat com IA" : "Abrir chat com IA"}
                aria-expanded={isOpen}
                aria-controls={isOpen ? "ia-chat-panel" : undefined}
            >
                {isOpen ? (
                    <FiX aria-hidden="true" />
                ) : (
                    <FiMessageCircle aria-hidden="true" />
                )}
            </LauncherButton>
        </Widget>
    )
}

const Widget = styled.div`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1200;
`

const LauncherButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
    cursor: pointer;
    font-size: 27px;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
        background: #1d4ed8;
        transform: translateY(-2px);
    }

    &:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 3px;
    }
`
