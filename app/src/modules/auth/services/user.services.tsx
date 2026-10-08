import { API_BASE_URL } from "@/configs/api"
import type {  ResponseDatas } from "@/types/services.types"
import type { User } from "@/types/user.types"




export const serviceGetUser = async (): Promise<ResponseDatas<User | null>> => {
    const response = await fetch(`${API_BASE_URL}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        return {
            datas: null,
            message: `Não foi possível carregar o usuário`,
            status: response.status,
        }
    }

    const result = await response.json()
    const user = result.datas

    return {
        datas: user,
        message: result.message ?? "Usuário carregado com sucesso.",
        status: response.status,
    }
}