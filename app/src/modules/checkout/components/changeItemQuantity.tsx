import {  updateItemCheckout } from "@/modules/checkout/storage/checkout.storage";
import { useState, type SetStateAction } from "react";
import { QuantityControl } from "../styles";

type Props = {
    quantity:number,
    id:number,
    setUpdate:React.Dispatch<SetStateAction<boolean>>,
    stock:number
}



export const ChangeQuantity = ({quantity,id,setUpdate,stock}:Props)=>{
    const [newQuantity,setQuantity] = useState(quantity)
     const click = (type:'decrease'|'increase')=>{
        let quant = newQuantity
    
        if(type === 'decrease' && quant  <= 1)return;
        if(type === 'increase' && quant >= stock)return;
        if(type === 'decrease'){
            quant = quant -1
        }
        if(type === 'increase'){
            quant = quant+1
        }
        updateItemCheckout(id,quant)
        setQuantity(quant)
        setUpdate(true)
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = Number(e.target.value)
        if(value > stock)return;
        if(value <= 1)return;
        if(!Number.isInteger(value))return
        setQuantity( value )
        setUpdate( true )
        updateItemCheckout(id,value)
    }
    return(
         <QuantityControl>
     
            <button onClick={()=>click('decrease')}>
            -
            </button>
            <input
                type="number"
                onChange={onChange}
                value={newQuantity}
                className="input-quantity"
            />

            <button  onClick={()=>click('increase')}>
                +
            </button>
        </QuantityControl>
    )
}