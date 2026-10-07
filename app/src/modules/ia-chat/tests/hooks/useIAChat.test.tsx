import { act, renderHook } from "@testing-library/react"
import * as chatService from "../../services/iaChat.service"
import { useIAChat } from "../../hooks/useIAChat"
import { initialMessages } from "../../constants/initialMessage"
import type { ChatMessage } from "../../types/index.types"

const sendChatMessage = jest.spyOn(chatService, "sendChatMessage")
const getChatMessages = jest.spyOn(chatService, "getChatMessages")

describe("useIAChat", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should start with the initial assistant message", () => {
        const { result } = renderHook(() => useIAChat())

        expect(result.current.messages).toEqual(initialMessages)
        expect(result.current.isSending).toBe(false)
        expect(result.current.error).toBe("")
    })

    it("should send a message and replace the conversation with backend messages", async () => {
        const backendMessages: ChatMessage[] = [
            { id: 1, content: "Olá!", sender: "user" },
            { id: 2, content: "Como posso ajudar?", sender: "assistant" },
        ]
        sendChatMessage.mockResolvedValue(undefined)
        getChatMessages.mockResolvedValue(backendMessages)
        const { result } = renderHook(() => useIAChat())

        await act(async () => {
            await result.current.sendMessage("  Preciso de ajuda  ")
        })

        expect(sendChatMessage).toHaveBeenCalledWith("Preciso de ajuda")
        expect(getChatMessages).toHaveBeenCalledTimes(1)
        expect(result.current.messages).toEqual(backendMessages)
        expect(result.current.isSending).toBe(false)
        expect(result.current.error).toBe("")
    })

    it("should ignore empty messages", async () => {
        const { result } = renderHook(() => useIAChat())

        await act(async () => {
            await result.current.sendMessage("   ")
        })

        expect(sendChatMessage).not.toHaveBeenCalled()
        expect(getChatMessages).not.toHaveBeenCalled()
        expect(result.current.messages).toEqual(initialMessages)
    })

    it("should expose an error when sending a message fails", async () => {
        sendChatMessage.mockRejectedValue(new Error("Falha ao enviar"))
        const { result } = renderHook(() => useIAChat())

        await act(async () => {
            await result.current.sendMessage("Quero ver produtos")
        })

        expect(getChatMessages).not.toHaveBeenCalled()
        expect(result.current.error).toBe("Falha ao enviar")
        expect(result.current.isSending).toBe(false)
        expect(result.current.messages).toHaveLength(initialMessages.length + 1)
    })

    it("should expose an error when receiving messages fails", async () => {
        sendChatMessage.mockResolvedValue(undefined)
        getChatMessages.mockRejectedValue(new Error("Falha ao receber"))
        const { result } = renderHook(() => useIAChat())

        await act(async () => {
            await result.current.sendMessage("Quero ver produtos")
        })

        expect(sendChatMessage).toHaveBeenCalledTimes(1)
        expect(result.current.error).toBe("Falha ao receber")
        expect(result.current.isSending).toBe(false)
    })

    it("should show a fallback error when a non-Error value is thrown", async () => {
        sendChatMessage.mockRejectedValue("unexpected error")
        const { result } = renderHook(() => useIAChat())

        await act(async () => {
            await result.current.sendMessage("Quero ver produtos")
        })

        expect(result.current.error).toBe(
            "Ocorreu um erro ao enviar ou receber mensagens."
        )
        expect(result.current.isSending).toBe(false)
    })
})
