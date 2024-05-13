"use client";
import { useEffect, useState } from "react";

export default function TestTwo() {
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   history.pushState("", "", "/testOne");
  // }, []);

  const handleAddCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div
        className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20"
        id="element-to-print"
      >
        <h1>TestTwo</h1>
        <div onClick={handleAddCount}>{count}</div>
      </div>
    </div>
  );
}
