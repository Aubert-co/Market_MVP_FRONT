import { MessageContext } from "@/context/message.context"
import { useContext } from "react"

export const useToastMessage = ()=>{
    const context = useContext(MessageContext)

    if(!context){
        throw new Error(
            "useToastMessage must be used with a context"
        )
    }
    return context;
}