import { FIVE_MINUTES } from "@/constants"
import { syncCart } from "@/modules/cart/services/services"
import { getItemsFromCart } from "@/modules/cart/storage/storage"
import { useEffect } from "react"



export const useSyncCart = ()=>{
    
    useEffect(()=>{
        const { cart, isSaved, updatedAt } = getItemsFromCart()
        
        if(cart.length ===0)return;
        const isExpired = !updatedAt || Date.now() - updatedAt > FIVE_MINUTES

        if (!isSaved && isExpired ) {
           syncCart({cart})
        }
    },[])
}
