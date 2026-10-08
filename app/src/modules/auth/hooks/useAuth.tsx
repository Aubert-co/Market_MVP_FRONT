import { useCallback, useEffect, useState } from "react"
import { serviceGetUser } from "../services/user.services"
import type {User} from '@/types/user.types'

type AuthState = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: "",
}

export const useAuth = () => {
    const [auth, setAuth] = useState<AuthState>(initialState)

    const refresh = useCallback(async () => {
        setAuth((current) => ({ ...current, isLoading: true, error: "" }))

        try {
            const result = await serviceGetUser()
            if (result.status === 401) {
                setAuth({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: "",
                })
                return
            }

            if (result.status < 200 || result.status >= 300 || !result.datas) {
                setAuth({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error:  "Não foi possível verificar sua sessão.",
                })
                return
            }

            setAuth({
                user: result.datas,
                isAuthenticated: true,
                isLoading: false,
                error: "",
            })
        } catch (error) {
            setAuth({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error:"Não foi possível verificar sua sessão.",
            })
        }
    }, [])

    useEffect(() => {
        void refresh()
    }, [refresh])

    return {
        ...auth,
        refresh,
    }
}
