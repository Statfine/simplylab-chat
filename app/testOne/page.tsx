"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TestOne() {
  const router = useRouter();

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // alert("1");
    console.log("init");
    // window.addEventListener("popstate", function (event) {
    //   window.location.reload();
    // });
    // window.addEventListener("pageshow", function (e) {
    //   if (e.persisted) {
    //     // 如果页面是读取缓存
    //     window.location.reload(); //刷新页面
    //   }
    // });

    // setTimeout(handlePush, 5000);
    handlePush();
  }, []);

  const handleAddCount = () => {
    setCount(count + 1);
  };

  /**
   * safari
   *    PC端
   *      router.push 返回会重置
   *      window.location.href 返回不会重置
   *    **自动跳转** M端 **自动跳转**
   *      router.push 返回异常
   *      window.location.href 返回正常
   */
  const handlePush = () => {
    // router.push("testTwo");
    // router.push("testTwo?123");
    window.location.href = "http://localhost:5000/testTwo";
    // window.location.href = "http://172.20.0.196:5000/testTwo";
    // window.location.href = "/testTwo";
  };
  // 模拟pay
  const handleJump = () => {
    // window.location.href = "http://localhost:3001/demo/adyen";
    setTimeout(() => {
      window.location.href = "http://localhost:5000/testOne?pay=123";
    }, 3000);
    // window.location.href = "https://www.baidu.com";
  };

  return (
    <div>
      <div
        className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20"
        id="element-to-print"
      >
        <h1>TestOne</h1>
        <div onClick={handleAddCount}>{count}</div>
        <div onClick={handlePush}>router push</div>
        <div onClick={handleJump}>jump out</div>
      </div>
    </div>
  );
}
