import {  updateItemCheckout } from "@/storage/checkout.storage";
import { useState, type SetStateAction } from "react";
import styled from "styled-components";
type Props = {
    quantity:number,
    id:number,
    setUpdate:React.Dispatch<SetStateAction<boolean>>,
    stock:number
}

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    width: 32px;
    height: 32px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background-color: #f8fafc;
    color: #334155;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    user-select: none;

    &:hover {
      background-color: #e2e8f0;
      color: #0f172a;
      border-color: #94a3b8;
    }

    &:active {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #f1f5f9;
    }
  }

  .input-quantity {
    width: 44px;
    height: 32px;
    text-align: center;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background-color: #ffffff;
    font-size: 0.875rem;
    font-weight: 600;
    color: #0f172a;
    outline: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

   
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
`;

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