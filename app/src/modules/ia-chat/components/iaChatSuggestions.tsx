import styled from "styled-components"
import type { ChatSuggestion } from "../types/index.types"
import { chatSuggestion } from "../constants/chatSuggestion"



type Props = {
    onSelect: (prompt: string) => void
    options?: ChatSuggestion[]
}

export const IAChatSuggestions = ({
    onSelect,
    options = chatSuggestion,
}: Props) => (
    <SuggestionsSection aria-label="Sugestões para começar">
        <SuggestionsTitle>Experimente perguntar</SuggestionsTitle>
        <SuggestionsList>
         {options.map((option) => {
            const Icon = option.icon

            return (
                <SuggestionCard
                    key={option.id}
                    type="button"
                    onClick={() => onSelect(option.prompt)}
                >
                    <SuggestionIcon aria-hidden="true">
                        {Icon}
                    </SuggestionIcon>

                    <span>{option.title}</span>
                </SuggestionCard>
            )
        })}
        </SuggestionsList>
    </SuggestionsSection>
)

const SuggestionsSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const SuggestionsTitle = styled.h3`
    margin: 0;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
`

const SuggestionsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const SuggestionCard = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background: #ffffff;
    color: #334155;
    cursor: pointer;
    font-size: 13px;
    text-align: left;
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
        border-color: #93c5fd;
        background: #eff6ff;
    }

    &:focus-visible {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
    }
`

const SuggestionIcon = styled.span`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #eff6ff;
    color: #2563eb;
    font-size: 14px;
`
