import { fireEvent, render, screen } from "@testing-library/react"
import { IAChatSuggestions } from "../../components/iaChatSuggestions"
import { chatSuggestion } from "../../constants/chatSuggestion"
import type { ChatSuggestion } from "../../types/index.types"

describe("IAChatSuggestions", () => {
    it("should render the default suggestion cards", () => {
        render(<IAChatSuggestions onSelect={jest.fn()} />)

        expect(
            screen.getByRole("region", { name: "Sugestões para começar" }),
        ).toBeInTheDocument()
        expect(screen.getByText("Experimente perguntar")).toBeInTheDocument()
        expect(screen.getAllByRole("button")).toHaveLength(chatSuggestion.length)

        chatSuggestion.forEach(({ title }) => {
            expect(screen.getByRole("button", { name: title })).toBeInTheDocument()
        })
    })

    it("should call onSelect with the prompt for the clicked suggestion", () => {
        const onSelect = jest.fn()
        render(<IAChatSuggestions onSelect={onSelect} />)

        fireEvent.click(
            screen.getByRole("button", { name: "Produtos abaixo de R$ 50" }),
        )

        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith("Quero ver produtos abaixo de R$ 50")
    })

    it("should render the provided options instead of the defaults", () => {
        const options: ChatSuggestion[] = [
            {
                id: "custom",
                title: "Sugestão personalizada",
                prompt: "Este é um prompt personalizado",
                icon: <span>★</span>,
            },
        ]

        render(<IAChatSuggestions onSelect={jest.fn()} options={options} />)

        expect(
            screen.getByRole("button", { name: "Sugestão personalizada" }),
        ).toBeInTheDocument()
        expect(
            screen.queryByRole("button", { name: "Produtos em oferta" }),
        ).not.toBeInTheDocument()
    })

    it("should call onSelect with the prompt from a provided option", () => {
        const onSelect = jest.fn()
        const options: ChatSuggestion[] = [
            {
                id: "custom",
                title: "Sugestão personalizada",
                prompt: "Este é um prompt personalizado",
                icon: <span>★</span>,
            },
        ]

        render(<IAChatSuggestions onSelect={onSelect} options={options} />)
        fireEvent.click(
            screen.getByRole("button", { name: "Sugestão personalizada" }),
        )

        expect(onSelect).toHaveBeenCalledWith("Este é um prompt personalizado")
    })

    it("should render the heading without cards when options are empty", () => {
        render(<IAChatSuggestions onSelect={jest.fn()} options={[]} />)

        expect(screen.getByText("Experimente perguntar")).toBeInTheDocument()
        expect(screen.queryAllByRole("button")).toHaveLength(0)
    })
})
