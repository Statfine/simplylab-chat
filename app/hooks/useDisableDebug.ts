import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const isProd = process.env.NODE_ENV === "production";

function useDisableDebug() {
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const canUseDeveloperTools =
        !isProd ||
        searchParams.get("developer_tools") === "1" ||
        localStorage.getItem("developer_tools") === "1";
      if (canUseDeveloperTools) return;
      disableMenu();
      debuggerFunc();
    } catch (error) {}
  }, []);

  /** 无限 debugger  1s一次 */
  const debuggerFunc = () => {
    setInterval(() => {
      debugger;
    }, 1000);
  };

  /** 禁止打开控制台 */
  const disableMenu = () => {
    document.oncontextmenu = function () {
      return false;
    };

    document.addEventListener("keydown", function (event) {
      // 禁用 F12
      if (event.keyCode == 123) {
        event.preventDefault();
        return false;
      }
      // 禁用 ctrl+shift+i,
      if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        event.preventDefault();
        return false;
      }
      // 禁用 option + command + i
      if (event.altKey && event.metaKey && event.keyCode == 73) {
        event.preventDefault();
        return false;
      }
      // 禁用 Shift+F10
      if (event.shiftKey && event.keyCode == 121) {
        event.preventDefault();
        return false;
      }
    });
  };
}

/**
 * 非正式环境；链接携带参数developer_tools=1；localStorage设置developer_tools: 1 不做禁止
 * 禁止调试
 *   1. 禁止打开控制台(禁止右键&F12&组合键)
 *   2. 无限debugger，通过定时器打开控制台后循环执行debugger
 */
export default useDisableDebug;
