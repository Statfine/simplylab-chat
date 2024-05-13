import { useEffect, useState } from "react";
import { sendMessageOpenRouter } from "../services/sendMessage";

export type MessagesType = {
  role: "assistant" | "user" | "system";
  content: string;
};

function useMessages() {
  const [appKey, setAppKey] = useState<string>("");
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessagesType[]>([]);

  const addMessage = async (content: string) => {
    setMessageLoading(true);
    try {
      const newMessage: MessagesType = { role: "user", content };
      // 理解上下文，传入搜索对话
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      const result = await sendMessageOpenRouter(newMessages, appKey);
      const reply = result.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (error) {
      alert("error");
    } finally {
      setMessageLoading(false);
    }
  };

  return { messageLoading, addMessage, messages, setAppKey };
}

/**
 * 快速实现，后续可以放置createContext中或者redux&saga，无需组件传入
 * loading -  对话请求
 * addMessage - 添加对话内容
 * messages - 对话内容
 * setAppKey - 设置appkey
 */
export default useMessages;
