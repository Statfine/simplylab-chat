"use client";
import { useRouter } from "next/navigation";
import Com from "./com";
import { useState } from "react";

export default function MemoPage() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <div
        className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20"
        id="element-to-print"
      >
        <h1>MemoPage</h1>
        {count}
        <div onClick={() => setCount(count + 1)}>Add</div>
        <Com />
      </div>
    </div>
  );
}
