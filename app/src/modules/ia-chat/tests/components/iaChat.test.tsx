import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { IAChat } from "../../components/iaChat"
import { useIAChat } from "../../hooks/useIAChat"
import { initialMessages } from "../../constants/initialMessage"
import * as service from "@/modules/auth/services/user.services"

jest.mock("../../hooks/useIAChat", () => ({
    useIAChat: jest.fn(),
}))

const mockUseIAChat = jest.mocked(useIAChat)
const mockServiceGetStores = jest.spyOn(service, "serviceGetUser")

describe("IAChat", () => {
    const sendMessage = jest.fn()
    const onClose = jest.fn()

    const renderChat = () =>
        render(
            <MemoryRouter>
                <IAChat onClose={onClose} />
            </MemoryRouter>,
        )

    beforeEach(() => {
        jest.clearAllMocks()
        mockServiceGetStores.mockResolvedValue({
            datas: null,
            status: 200,
            message: "Success",
        })
        mockUseIAChat.mockReturnValue({
            messages: initialMessages,
            isSending: false,
            error: "",
            sendMessage,
        })
    })

    it("should render the chat title, welcome message, and message input for an authenticated user", async () => {
        renderChat()

        expect(await screen.findByRole("textbox", { name: "Digite sua mensagem" })).toBeInTheDocument()
        expect(screen.getByRole("dialog", { name: "Chat com inteligência artificial" })).toBeInTheDocument()
        expect(screen.getByText("Assistente virtual")).toBeInTheDocument()
        expect(screen.getByText("Olá! Como posso ajudar você hoje?")).toBeInTheDocument()
        expect(mockServiceGetStores).toHaveBeenCalledTimes(1)
    })

    it("should close the chat when the close button is clicked", async () => {
        renderChat()

        await screen.findByRole("textbox", { name: "Digite sua mensagem" })
        fireEvent.click(screen.getByRole("button", { name: "Fechar chat" }))

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("should send a trimmed message and clear the input when submitted", async () => {
        renderChat()
        await screen.findByRole("textbox", { name: "Digite sua mensagem" })
        const input = screen.getByRole("textbox", { name: "Digite sua mensagem" })

        fireEvent.change(input, { target: { value: "  Preciso de ajuda  " } })
        fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }))

        expect(sendMessage).toHaveBeenCalledWith("Preciso de ajuda")
        expect(input).toHaveValue("")
    })

    it("should not submit an empty message", async () => {
        renderChat()
        await screen.findByRole("textbox", { name: "Digite sua mensagem" })

        const sendButton = screen.getByRole("button", { name: "Enviar mensagem" })
        expect(sendButton).toBeDisabled()
        fireEvent.click(sendButton)

        expect(sendMessage).not.toHaveBeenCalled()
    })

    it("should disable the message input and send button while sending", async () => {
        mockUseIAChat.mockReturnValue({
            messages: initialMessages,
            isSending: true,
            error: "",
            sendMessage,
        })
        renderChat()

        await screen.findByRole("textbox", { name: "Digite sua mensagem" })
        expect(screen.getByRole("button", { name: "Enviar mensagem" })).toBeDisabled()
        expect(screen.getByText("Enviando mensagem...")).toBeInTheDocument()
    })

    it("should display the hook error in the conversation", async () => {
        mockUseIAChat.mockReturnValue({
            messages: initialMessages,
            isSending: false,
            error: "Falha ao enviar",
            sendMessage,
        })

        renderChat()

        await screen.findByRole("textbox", { name: "Digite sua mensagem" })
        expect(screen.getByRole("alert")).toHaveTextContent("Falha ao enviar")
    })

    it("should prompt an unauthenticated user to log in instead of showing the chat input", async () => {
        mockServiceGetStores.mockResolvedValue({
            datas: null,
            status: 401,
            message: "Unauthorized",
        })
        renderChat()

        expect(
            await screen.findByText("Você precisa entrar na sua conta para conversar com a IA."),
        ).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Ir para o login" })).toHaveAttribute(
            "href",
            "/login",
        )
        expect(screen.queryByRole("textbox", { name: "Digite sua mensagem" })).not.toBeInTheDocument()
    })

    it("should display an error if authentication cannot be verified", async () => {
        mockServiceGetStores.mockResolvedValue({
            datas: null,
            status: 500,
            message: "Server error",
        })
        renderChat()

        expect(
            await screen.findByText(
                "Não foi possível verificar seu acesso. Tente novamente mais tarde.",
            ),
        ).toBeInTheDocument()
    })
})
