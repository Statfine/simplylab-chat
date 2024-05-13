"use client";
import useDisableDebug from "./hooks/useDisableDebug";

// This is a client component

export default function Home() {
  useDisableDebug();

  return (
    <div className="max-w-4xl mx-auto pl-4 pr-4 flex flex-col h-screen text-black">
      hello word
    </div>
  );
}
