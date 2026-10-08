import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import * as userService from "@/modules/auth/services/user.services"
import { ProtectedUserRoute } from "@/components/protectedUserRoute"

const serviceGetUser = jest.spyOn(userService, "serviceGetUser")

const renderProtectedRoute = () =>
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route element={<ProtectedUserRoute />}>
          <Route path="/protected" element={<h1>Conteúdo protegido</h1>} />
        </Route>
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
    </MemoryRouter>,
  )

describe("ProtectedUserRoute", () => {
  beforeEach(() => {
    serviceGetUser.mockReset()
  })

  it("should render protected content when the user is logged in", async () => {
    serviceGetUser.mockResolvedValue({
      datas: { id: 1, name: "Usuário", email: "usuario@example.com" },
      message: "Success",
      status: 200,
    })

    renderProtectedRoute()

    expect(await screen.findByRole("heading", { name: "Conteúdo protegido" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Login" })).not.toBeInTheDocument()
    expect(serviceGetUser).toHaveBeenCalledTimes(1)
  })

  it("should redirect to login when the user is not logged in", async () => {
    serviceGetUser.mockResolvedValue({
      datas: null,
      message: "Unauthorized",
      status: 401,
    })

    renderProtectedRoute()

    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Conteúdo protegido" })).not.toBeInTheDocument()
    expect(serviceGetUser).toHaveBeenCalledTimes(1)
  })

  it("should show an error when checking the user session fails", async () => {
    serviceGetUser.mockResolvedValue({
      datas: null,
      message: "Server error",
      status: 500,
    })

    renderProtectedRoute()

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível verificar sua sessão.",
    )
    expect(screen.getByRole("button", { name: "Tentar novamente" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Conteúdo protegido" })).not.toBeInTheDocument()
  })

  it("should retry checking the user session when refresh is clicked", async () => {
    serviceGetUser
      .mockResolvedValueOnce({
        datas: null,
        message: "Server error",
        status: 500,
      })
      .mockResolvedValueOnce({
        datas: { id: 1, name: "Usuário", email: "usuario@example.com" },
        message: "Success",
        status: 200,
      })

    renderProtectedRoute()

    await userEvent.click(await screen.findByRole("button", { name: "Tentar novamente" }))

    expect(await screen.findByRole("heading", { name: "Conteúdo protegido" })).toBeInTheDocument()
    expect(serviceGetUser).toHaveBeenCalledTimes(2)
  })
})
