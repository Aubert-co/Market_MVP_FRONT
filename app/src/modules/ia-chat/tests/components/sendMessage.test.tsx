import { fireEvent, render, screen } from "@testing-library/react"
import { SendMessage } from "../../components/sendMessage"

describe("SendMessage", () => {
    it("should render the message input and disabled send button for an empty draft", () => {
        render(
            <SendMessage
                draft=""
                setDraft={jest.fn()}
                onSubmit={jest.fn()}
            />,
        )

        expect(
            screen.getByRole("textbox", { name: "Digite sua mensagem" }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: "Enviar mensagem" }),
        ).toBeDisabled()
    })

    it("should call setDraft when the user types a message", () => {
        const setDraft = jest.fn()
        render(
            <SendMessage
                draft=""
                setDraft={setDraft}
                onSubmit={jest.fn()}
            />,
        )

        fireEvent.change(
            screen.getByRole("textbox", { name: "Digite sua mensagem" }),
            { target: { value: "Quero ajuda" } },
        )

        expect(setDraft).toHaveBeenCalledWith("Quero ajuda")
    })

    it("should enable the send button when the draft contains non-whitespace text", () => {
        render(
            <SendMessage
                draft="  Olá  "
                setDraft={jest.fn()}
                onSubmit={jest.fn()}
            />,
        )

        expect(
            screen.getByRole("button", { name: "Enviar mensagem" }),
        ).toBeEnabled()
    })

    it("should keep the send button disabled when the draft contains only whitespace", () => {
        render(
            <SendMessage
                draft="   "
                setDraft={jest.fn()}
                onSubmit={jest.fn()}
            />,
        )

        expect(
            screen.getByRole("button", { name: "Enviar mensagem" }),
        ).toBeDisabled()
    })

    it("should keep the send button disabled when disabled is true", () => {
        render(
            <SendMessage
                draft="Olá"
                setDraft={jest.fn()}
                onSubmit={jest.fn()}
                disabled
            />,
        )

        expect(
            screen.getByRole("button", { name: "Enviar mensagem" }),
        ).toBeDisabled()
    })

    it("should call onSubmit when the form is submitted", () => {
        const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
        })
        render(
            <SendMessage
                draft="Olá"
                setDraft={jest.fn()}
                onSubmit={onSubmit}
            />,
        )

        fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }))

        expect(onSubmit).toHaveBeenCalledTimes(1)
    })
})
