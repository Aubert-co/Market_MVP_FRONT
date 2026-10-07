import { fireEvent, render, screen } from "@testing-library/react"
import { ListMessages } from "../../components/ListMessages"
import type { ChatMessage } from "../../types/index.types"

const initialMessages: ChatMessage[] = [
    {
        id: 0,
        content: "Olá! Como posso ajudar você hoje?",
        sender: "assistant",
    },
]

describe("ListMessages", () => {
    it("should render messages from the assistant and the user", () => {
        const messages: ChatMessage[] = [
            ...initialMessages,
            { id: 1, content: "Preciso de ajuda", sender: "user" },
        ]

        render(
            <ListMessages
                messages={messages}
                error=""
                sendMessage={jest.fn()}
                isSending={false}
            />,
        )

        expect(screen.getByText("Olá! Como posso ajudar você hoje?")).toBeInTheDocument()
        expect(screen.getByText("Preciso de ajuda")).toBeInTheDocument()
    })

    it("should display suggestions when there is only the initial message", () => {
        render(
            <ListMessages
                messages={initialMessages}
                error=""
                sendMessage={jest.fn()}
                isSending={false}
            />,
        )

        expect(screen.getByRole("region", { name: "Sugestões para começar" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /Produtos abaixo de R\$ 50/ })).toBeInTheDocument()
    })

    it("should send the selected suggestion", () => {
        const sendMessage = jest.fn()
        render(
            <ListMessages
                messages={initialMessages}
                error=""
                sendMessage={sendMessage}
                isSending={false}
            />,
        )

        fireEvent.click(screen.getByRole("button", { name: /Produtos abaixo de R\$ 50/ }))

        expect(sendMessage).toHaveBeenCalledWith("Quero ver produtos abaixo de R$ 50")
    })

    it("should hide suggestions after another message is added", () => {
        render(
            <ListMessages
                messages={[
                    ...initialMessages,
                    { id: 1, content: "Preciso de ajuda", sender: "user" },
                ]}
                error=""
                sendMessage={jest.fn()}
                isSending={false}
            />,
        )

        expect(screen.queryByRole("region", { name: "Sugestões para começar" })).not.toBeInTheDocument()
    })

    it("should show the sending status while waiting for a response", () => {
        render(
            <ListMessages
                messages={initialMessages}
                error=""
                sendMessage={jest.fn()}
                isSending
            />,
        )

        expect(screen.getByText("Enviando mensagem...")).toBeInTheDocument()
    })

    it("should show an error message when an error is provided", () => {
        render(
            <ListMessages
                messages={initialMessages}
                error="Falha ao enviar"
                sendMessage={jest.fn()}
                isSending={false}
            />,
        )

        expect(screen.getByRole("alert")).toHaveTextContent("Falha ao enviar")
    })
})
