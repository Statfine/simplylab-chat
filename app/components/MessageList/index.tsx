import { memo, useEffect, useRef } from "react";
import Image from "next/image";

import type {MessagesType} from "@/app/hooks/useMessages";
import iconOpenAi from "@/public/openai.png";
import iconUser from "@/public/user.png";
import ListEmpty from "@/app/components/MessageEmpty";

export interface MessageListProps {
  messageLoading: boolean;
  addMessage: (content: string) => void;
  messages: MessagesType[];
}

const MessageList: React.FC<MessageListProps> = (props) => {
  const chatContainerRef = useRef<any>(null);
  const { messageLoading, addMessage, messages } = props;

  /** 有新数据渲染后，滚动到底部 */
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="flex-1 h-full pr-4 pl-4 overflow-y-auto"
      ref={chatContainerRef}
    >
      {messages.length === 0 && <ListEmpty addMessage={addMessage} />}
      {messages.map((i) => (
        <div className="p-2" key={i.role + i.content}>
          <div className="mb-10">
            <div className="text-gray-700 flex items-center">
              <Image
                src={i.role === "assistant" ? iconOpenAi : iconUser}
                width={30}
                height={30}
                className="rounded-full  mr-2"
                style={{ width: 30, height: 30 }}
                alt="avatar"
              />
              <strong>{i.role === "assistant" ? 'ChatGPT' : 'You'}</strong>
            </div>
            <p className="text-gray-700 whitespace-pre-line pl-[20px] mr-2">
              {i.content.trim()}
            </p>
          </div>
        </div>
      ))}
      {messageLoading && (
        <div className="flex justify-center mb-4">
          <div className="loader ml-2 p-2.5 px-4 rounded-full space-x-1.5 flex justify-center relative">
            <span className="block w-2 h-2 rounded-full bg-slate-300"></span>
            <span className="block w-2 h-2 rounded-full bg-slate-300"></span>
            <span className="block w-2 h-2 rounded-full bg-slate-300"></span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 对话列表
 */
export default memo(MessageList);
