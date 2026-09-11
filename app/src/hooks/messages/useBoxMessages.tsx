import { ListMessages } from "@/components/shared/listMessages";
import { useMessageHandler } from "./useMessageHandler";




export const useBoxMessage = ()=>{
    const {messages,addMessage} = useMessageHandler()
    const BoxMessage = ()=>{
        return <ListMessages messages={messages} styledType="normal"/>
    };
    return {messages,addMessage,BoxMessage}
}