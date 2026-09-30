import { fireEvent, render, screen } from "@testing-library/react";
import { Container } from "../../components/layouts/container";

jest.mock("../../components/header/topBar", () => ({
  TopBar: () => <div />,
}));

jest.mock("../../components/acceptCookie", () => ({
  AcceptCookie: ({ closeModal }: { closeModal: () => void }) => (
    <button onClick={closeModal}>Entendi</button>
  ),
}));

describe("Container", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render its children and the header by default", () => {
    render(
      <Container>
        <p>Conteudo da pagina</p>
      </Container>,
    );

    expect(screen.getByText("Conteudo da pagina")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the header when showHeader is true", () => {
    render(
      <Container showHeader>
        <p>Conteudo da pagina</p>
      </Container>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should hide the header when showHeader is false and keep rendering children", () => {
    render(
      <Container showHeader={false}>
        <p>Conteudo da pagina</p>
      </Container>,
    );

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.getByText("Conteudo da pagina")).toBeInTheDocument();
  });

  it("should open the cookie notice and save the choice when accepted", () => {
    render(
      <Container>
        <p>Conteudo da pagina</p>
      </Container>,
    );

    expect(screen.getByRole("dialog", { name: "Uso de cookies" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Entendi" }));

    expect(screen.queryByRole("dialog", { name: "Uso de cookies" })).not.toBeInTheDocument();
    expect(localStorage.getItem("COOKIE_NOTICE")).toBe("true");
  });

  it("should not open the cookie notice when the choice was already saved", () => {
    localStorage.setItem("COOKIE_NOTICE", "true");

    render(
      <Container>
        <p>Conteudo da pagina</p>
      </Container>,
    );

    expect(screen.queryByRole("dialog", { name: "Uso de cookies" })).not.toBeInTheDocument();
  });
});