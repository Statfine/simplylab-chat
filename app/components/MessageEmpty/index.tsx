import { memo } from "react";
import Image from "next/image";

import iconOpenAi from "@/public/openai.png";

export interface MessageEmptyProps {
  /** 添加对话 */
  addMessage: (content: string) => void;
}

/** 快捷方式 */
const DEFAULT_CONTENT = [
  [
    { title: "规划一次旅行", content: "像当地人一样体验首尔" },
    { title: "建议有趣的活动", content: "供一个四口之家在雨天室内做的活动" },
  ],
  [
    {
      title: "写一条信息",
      content: "有陪伴小猫gif的文字，用于安慰朋友的糟糕日子",
    },
    { title: "写一封电子邮件", content: "请求延长我的项目的截止日期" },
  ],
];

const MessageEmpty: React.FC<MessageEmptyProps> = ({ addMessage }) => {
  const handleClick = (info: { title: string, content: string}) => {
    addMessage(`${info.title},${info.content}`);
  };

  return (
    <>
      <div className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20">
        <Image
          src={iconOpenAi}
          width={60}
          height={60}
          className="rounded-full  mr-2"
          style={{ width: 60, height: 60 }}
          alt="avatar"
        />
        <p className="text-gray-700 text-center">我今天能帮你做什么？</p>
      </div>
      {DEFAULT_CONTENT.map((i, index) => (
        <div className="flex justify-between mt-4 mb-4" key={index}>
          {i.map((j) => (
            <div
              key={j.title}
              className="w-2/5 text-gray-700 border border-slate-200 hover:border-slate-400 rounded-2xl border-solid flex flex-col p-4 cursor-pointer"
              onClick={() => handleClick(j)}
            >
              <p className="m-0 text-gray-900">{j.title}</p>
              <p className="m-0 text-gray-400">{j.content}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

/**
 * 列表空状态
 */
export default memo(MessageEmpty);
