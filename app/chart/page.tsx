"use client"; // This is a client component

import { useState } from "react";

import useMessages from "@/app/hooks/useMessages";

import AppKeyDialog from "../components/AppKeyDialog";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";

export default function Home() {
  const [keyDialogOpen, setKeyDialogOpen] = useState<boolean>(true);
  // 先做抽离后续可以放置createContext中或者redux&saga，无需组件传入
  const { setAppKey, messageLoading, addMessage, messages } = useMessages();

  return (
    <div className="max-w-4xl mx-auto pl-4 pr-4 flex flex-col h-screen">
      <MessageList
        messageLoading={messageLoading}
        addMessage={addMessage}
        messages={messages}
      />
      <MessageForm messageLoading={messageLoading} addMessage={addMessage} />
      <AppKeyDialog
        open={keyDialogOpen}
        onSubmit={(key: string) => {
          setAppKey(key);
          setKeyDialogOpen(false);
        }}
      />
    </div>
  );
}
