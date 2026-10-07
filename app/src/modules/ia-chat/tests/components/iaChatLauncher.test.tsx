import { fireEvent, render, screen } from "@testing-library/react"
import { IAChatLauncher } from "../../components/iaChatLauncher"

jest.mock("../../components/iaChat", () => ({
    IAChat: ({ onClose }: { onClose: () => void }) => (
        <section role="dialog" aria-label="Chat de teste">
            <button type="button" onClick={onClose}>
                Fechar painel
            </button>
        </section>
    ),
}))

describe("IAChatLauncher", () => {
    it("should render the launcher with the closed state", () => {
        render(<IAChatLauncher />)

        expect(screen.getByRole("button", { name: "Abrir chat com IA" })).toHaveAttribute(
            "aria-expanded",
            "false",
        )
        expect(screen.queryByRole("dialog", { name: "Chat de teste" })).not.toBeInTheDocument()
    })

    it("should open the chat when the launcher is clicked", () => {
        render(<IAChatLauncher />)

        fireEvent.click(screen.getByRole("button", { name: "Abrir chat com IA" }))

        expect(screen.getByRole("dialog", { name: "Chat de teste" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Fechar chat com IA" })).toHaveAttribute(
            "aria-expanded",
            "true",
        )
    })

    it("should close the chat when the launcher button is clicked again", () => {
        render(<IAChatLauncher />)

        fireEvent.click(screen.getByRole("button", { name: "Abrir chat com IA" }))
        fireEvent.click(screen.getByRole("button", { name: "Fechar chat com IA" }))

        expect(screen.queryByRole("dialog", { name: "Chat de teste" })).not.toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Abrir chat com IA" })).toHaveAttribute(
            "aria-expanded",
            "false",
        )
    })

    it("should close the chat when its close callback is called", () => {
        render(<IAChatLauncher />)

        fireEvent.click(screen.getByRole("button", { name: "Abrir chat com IA" }))
        fireEvent.click(screen.getByRole("button", { name: "Fechar painel" }))

        expect(screen.queryByRole("dialog", { name: "Chat de teste" })).not.toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Abrir chat com IA" })).toBeInTheDocument()
    })
})
