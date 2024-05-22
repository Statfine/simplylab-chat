"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { IDetail } from "./com/one";
import One from "./com/one";

export default function ReactPage() {
  const router = useRouter();

  const [detail, setDetail] = useState<IDetail>({ is_lock: 2 });

  // 模拟pay
  const handleJump = (url: string) => {
    router.push(url);
  };

  const handleSetDetail = () => {
    setDetail({
      is_lock: 1,
    });
  };

  console.log("ReactPage render");
  return (
    <div>
      <div
        className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20"
        id="element-to-print"
      >
        <h1>React</h1>
        {/* <div onClick={() => handleJump("react/memo")}>Memo</div> */}
        <One detail={detail} />
        <div onClick={handleSetDetail}>Memo</div>
      </div>
    </div>
  );
}
