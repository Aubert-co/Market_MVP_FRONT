import { useAuth } from "@/modules/auth/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedUserRoute = () => {
  const { isAuthenticated, isLoading, error, refresh } = useAuth()

  if (isLoading) {
    return <div role="status">Verificando seu acesso...</div>
  }

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={() => void refresh()}>
          Tentar novamente
        </button>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
