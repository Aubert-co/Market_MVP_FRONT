import { NormalMessage, ToastMessage } from "@/styles/messages.style";
import type { Message } from "@/types/messages.types";

type Props = {
    messages:Message[],
    styledType:"toast" | "normal"
}
export const ListMessages = ({messages,styledType}:Props)=>{
    const Wrapper  = styledType === "toast" ? ToastMessage : NormalMessage
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
}