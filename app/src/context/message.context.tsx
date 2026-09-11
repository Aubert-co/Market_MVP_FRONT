import { ListMessages } from "@/components/shared/listMessages";
import { useMessageHandler } from "@/hooks/messages/useMessageHandler";
import {
  ToastMessage,
} from "@/styles/messages.style";
import type { AddMessageParams, Message } from "@/types/messages.types";
import  {
  createContext,
  type ReactNode,

}  from "react";




type MessageContextData = {
  messages: Message[];
  addMessage: (params: AddMessageParams) => void;
};

type MessageProviderProps = {
  children: ReactNode;

};

export const MessageContext = createContext<MessageContextData | null>(null);

export const MessageProvider = ({
  children,
}: MessageProviderProps) => {
  const {messages,addMessage} = useMessageHandler()
  const Wrapper = ToastMessage ;

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
      }}
    >
      {children}

      <Wrapper>
        <ListMessages messages={messages} styledType="toast"/>
      </Wrapper>
    </MessageContext.Provider>
  );
};