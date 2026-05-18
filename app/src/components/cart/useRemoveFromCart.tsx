import { removeItemFromCart } from "@/storage/cart.storage"
import React from "react"
import type { AddMessageParams } from "../../hooks/useBoxMessages"
import { deleteFromCart } from "@/services/cart.services"

type PropsRemove = {
    addMessage: ({content,type}:AddMessageParams)=>void,
    setUpdateCart: React.Dispatch<React.SetStateAction<boolean>>
}
export const useRemoveFromCart = ({addMessage,setUpdateCart}:PropsRemove)=>{
    
    const onClick = async(values:Array<number>)=>{
        try {
        
            const {status} = await deleteFromCart(values)
        
            if (status === 200) {
                removeItemFromCart(values);
                setUpdateCart(true);
                addMessage({ content: 'Removido do carrinho com sucesso!', type: 'success' });
                return;
            }

            if (status === 401) {
                addMessage({ content: 'Sua sessão expirou. Faça login novamente.', type: 'error' });
                return;
            }

            addMessage({ content: 'Não foi possível remover o item. Tente novamente mais tarde.', type: 'error' });

        } catch  {
            addMessage({ content: 'Ocorreu um erro inesperado. Tente novamente.', type: 'error' });
        }
    }
    return {onClick}
}