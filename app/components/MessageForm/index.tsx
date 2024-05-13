import { memo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import iconOpenAi from "@/public/openai.png";
import useMessages from "@/app/hooks/useMessages";

export interface MessageFormProps {
  /** 对话请求 */
  messageLoading: boolean;
  /** 添加对话 */
  addMessage: (content: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = (props) => {
  const textareaRef = useRef<any>();
  const [content, setContent] = useState<string>("");
  const { messageLoading, addMessage } = props;

  /** 动态设置输入框高度 */
  const handleChangeContent = (e: any) => {
    textareaRef.current.style.height = 52 + "px";
    textareaRef.current.style.height = e.target.scrollHeight + "px";
    setContent(e.target.value);
  };

  /** 清空输入框&重置高度  添加对话 */
  const requestMessage = async () => {
    setContent("");
    textareaRef.current.style.height = 52 + "px";
    await addMessage(content);
  };
  return (
    <div className="flex w-full items-center relative">
      <textarea
        ref={textareaRef}
        className="overflow-y-hidden rounded-2xl text-base m-0 w-full resize-none border border-slate-100 bg-transparent focus:border-slate-300 focus-visible:border-slate-300 max-h-25 py-[10px] pr-10 md:py-3.5 md:pr-12 placeholder-black/50 pl-3 md:pl-4"
        rows={1}
        placeholder="Message ChatGPT…"
        style={{
          height: 52,
          boxSizing: "border-box",
        }}
        onInput={handleChangeContent}
        value={content}
      />
      <Button
        className="absolute bottom-1.5 right-2 rounded-lg border border-black p-0.5 text-white transition-colors enabled:text-black  disabled:opacity-60 md:bottom-3 md:right-3"
        endIcon={<ArrowUpwardIcon className="ml-[-8px]" />}
        onClick={requestMessage}
        disabled={messageLoading || content.trim().length === 0}
      />
    </div>
  );
};

/**
 * 对话表单
 */
export default memo(MessageForm);
