import { UpdateCartContext} from "@/context/cart.context"
import  { useContext } from "react"
import { FaTrash } from "react-icons/fa"

import { useRemoveFromCart } from "./useRemoveFromCart"

type Props ={
    id:number,
    
}



export const RemoveFromCart = ({id}:Props)=>{
    const {setUpdateCart} = useContext(UpdateCartContext)!
    const {onClick} = useRemoveFromCart({
        setUpdateCart:setUpdateCart
    })
    const click = ()=>{
        onClick([id])
    }
    return <FaTrash aria-label="Remover item do carrinho" key={id} data-testid="delete-item" onClick={click}/>
    
}