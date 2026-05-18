import { ToastMessage,NormalMessage } from "@/styles/messages.style";
import { useCallback, useRef, useState } from "react";

export type Message ={
    id:string,
    content:string,
    type:'error' | 'info' | 'success'
}

export type Props = {
    styledType?:"toast" | "" 
}
export type AddMessageParams  = Omit<Message, "id">
export const useBoxMessage = ({styledType}:Props)=>{
    const [messages,setMessages] = useState<Message[]>([])
    
    const timersRef = useRef<Map<string,ReturnType<typeof setTimeout>>>(new Map());
    const messageContentRef = useRef<Map<string,boolean>>(new Map());
 
    const addMessage = useCallback(({ content, type }: AddMessageParams) => {
        const id = crypto.randomUUID();
        if(messageContentRef.current.has(content))return;

        
        setMessages((prev) => [...prev, { id, content, type }]);

        const timer = setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        timersRef.current.delete(id);
        messageContentRef.current.delete(content)
        }, 3000);

        timersRef.current.set(id, timer);
        messageContentRef.current.set(content,true)
    }, []);
    const BoxMessage = ()=>{
        const Wrapper = styledType === "toast" ? ToastMessage : NormalMessage
        return (
            <Wrapper>
                {messages.map((val)=>{
                    return val.content && (
                    <div data-testid={"message_"} key={val.id} className={"message_"+val.type} >
                        <p data-testid="message_content">{val.content}</p>
                    </div>
                )
                })}
            </Wrapper>
        );
    
    };
    return {messages,addMessage,BoxMessage}
}