import type { AddMessageParams, Message } from "@/types/messages.types";
import { useState,useRef,useCallback } from "react";




export const useMessageHandler = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const timersRef = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());

  const messageContentRef = useRef<Map<string, boolean>>(new Map());

  const addMessage = useCallback(
    ({ content, type }: AddMessageParams) => {
      if (messageContentRef.current.has(content)) {
        return;
      }

      const id = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        { id, content, type },
      ]);

      messageContentRef.current.set(content, true);

      const timer = setTimeout(() => {
        setMessages((prev) =>
          prev.filter((message) => message.id !== id)
        );

        timersRef.current.delete(id);
        messageContentRef.current.delete(content);
      }, 3000);

      timersRef.current.set(id, timer);
    },
    [],
  );

  return {
    messages,
    addMessage,
  };
};