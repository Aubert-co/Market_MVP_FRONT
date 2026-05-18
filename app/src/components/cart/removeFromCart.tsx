import { UpdateCartContext} from "@/context/cart.context"
import  { useContext } from "react"
import { FaTrash } from "react-icons/fa"
import type { AddMessageParams } from "../../hooks/useBoxMessages"
import { useRemoveFromCart } from "./useRemoveFromCart"

type Props ={
    id:number,
    addMessage:({}:AddMessageParams)=>void
}



export const RemoveFromCart = ({id,addMessage}:Props)=>{
    const {setUpdateCart} = useContext(UpdateCartContext)!
    const {onClick} = useRemoveFromCart({
        addMessage,
        setUpdateCart:setUpdateCart
    })
    const click = ()=>{
        onClick([id])
    }
    return <FaTrash aria-label="Remover item do carrinho" key={id} data-testid="delete-item" onClick={click}/>
    
}