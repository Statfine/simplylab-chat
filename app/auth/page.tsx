"use client"; // This is a client component
import { useEffect } from "react";
import { Base64 } from "js-base64";
import * as jose from "jose";
import useGoogleAuthPrompt, {
  cancelGoogleAuthPrompt,
} from "../hooks/useGoogleAuthPrompt";

/**
 * https://blog.csdn.net/m0_62332650/article/details/135949290
 */
export default function Auth() {
  useGoogleAuthPrompt();

  useEffect(() => {
    // const jwt =
    //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzYjQ5NTE2MmFmMGM4N2NjN2E1MTY4NjI5NDA5NzA0MGRhZjNiNDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDM4NDA0NDYyOTI2LXVtNDFrczRtMjlxM3ExdnV2b3ZmdGllYm9tZXNhcWkxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAzODQwNDQ2MjkyNi11bTQxa3M0bTI5cTNxMXZ1dm92ZnRpZWJvbWVzYXFpMS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMTI2MDA2NDk5NDgzNDgzMTU1NCIsImVtYWlsIjoic2hhb2ppYTc3N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzEyNjM2NDI3LCJuYW1lIjoi6YK15L2zIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0ozcnZEYVFfcjhpLXE2Y2VmUF9uTWZVOHB3dG1wLTBZX1JoVlRFcVFLalR4M0Y0alE9czk2LWMiLCJnaXZlbl9uYW1lIjoi5L2zIiwiZmFtaWx5X25hbWUiOiLpgrUiLCJpYXQiOjE3MTI2MzY3MjcsImV4cCI6MTcxMjY0MDMyNywianRpIjoiZjc5ZjU0YTMyYmI3MWI2NGQ3Y2VhZTQwN2I2MGNiOTBhM2FmZjJiZCJ9.ZR2k2drTocx3b4uordyDkEuk608n3X8Hh5Ohhfc4G8NwKqmXQk-wDpYAt3fJwFou2oiuvfI18xnYxPLD1XDvCRYAlrPY4An7NnxKDfvrA1Er4TkgQZ1-60_-wWEV4mP9iygTrPdGQCfQ4p16XxLESvFOHBgmQEpNY50EnocZiM0wtzYRIsMaIaJhvEvVm2aRd9H81B1X7IEPUT6_RrCPAOsfs-kcIX77Ftqhe4fXD0KLQ23p2NaOCqkpgz9qIv71fsbUQGqe12Xd_r0hnrSy1iBZ7pW4Nx_QzjTG2zWKRBy4P6RQj9_CzlSqDiPcIS1eCrqqpSZD57mlxTHLsKMrtA";
    // // const jwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi5L2z6YK1IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lzUVlHWmFEQnJJOGtwQWRkV1JQMm81bXFRcmpPaDBjanFDQllwcWJJbD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yZWVsc2hvcnQtMjZjNmMiLCJhdWQiOiJyZWVsc2hvcnQtMjZjNmMiLCJhdXRoX3RpbWUiOjE3MTI3MzQ2OTgsInVzZXJfaWQiOiJGcWdBU2M3TndRY0JWY0hnZWNxbEdzT1c3STYzIiwic3ViIjoiRnFnQVNjN053UWNCVmNIZ2VjcWxHc09XN0k2MyIsImlhdCI6MTcxMjczNDY5OCwiZXhwIjoxNzEyNzM4Mjk4LCJlbWFpbCI6InNoYW9qaWFAY3JhenltYXBsZXN0dWRpby5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDA3NDYzMzQyNzEzNzYzNjczNiJdLCJlbWFpbCI6WyJzaGFvamlhQGNyYXp5bWFwbGVzdHVkaW8uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Yx_e3A55-IycJ5SXmJkP55cf1pJ7sYDrBJXWyJ-ID9AF73b4AonRfCdS9Q-7-mWBTlk6GqfBfVGOZt5qqV9qWmjLlvtPUGCYpKw_v9TS--AP92MVZlBK42E0RoE9s2pSxq-89jTiuCL486hhAtHnBa2pKyjxzidfmzwRPA36RCasJNocVxsa3YxsyoIO1qXPybsW6AHSQIHbTDa5gFKKEZqXYPateU4ARWNjS081xEnrcozj0tVIs_hjpcl4gfXtyHt3QLTaN43oZ_UV92tlrEn6AUU8YHy3qnsNhoW8T_zkyv1hdCTpwaPskCuSKpalDcuVrA7z-ihJI4ROxbbFuQ';
    // const claims = jose.decodeJwt(jwt)
    // console.log(claims)
    // initAuth();
  }, []);

  const initAuth = () => {
    const clientId =
      "1038404462926-um41ks4m29q3q1vuvovftiebomesaqi1.apps.googleusercontent.com";
    const script = document.createElement("script");
    const handleGoogleSignIn = (response: any) => {
      // 处理Google登录成功的响应
      console.log("Google登录成功", response);
      // const responsePayload = decodeJwtResponse(response.credential);
      const claims = jose.decodeJwt(response.credential);
      console.log(claims);
    };
    const initializeGoogleSignIn = (client_id: string) => {
      (window as any).google.accounts.id.initialize({
        client_id,
        cancel_on_tap_outside: false, // 控制是否在提示之外进行点击时取消提示(关闭一键登录弹窗)，默认true
        auto_select: false, // 开启自动登录功能，默认false
        callback: handleGoogleSignIn, // 验证成功回调
        intermediate_iframe_close_callback: () => {
          console.log(
            "当用户通过点按一键式界面中的“X”按钮手动关闭一键快捷功能"
          );
        },
      });
      // 渲染“使用 Google 帐号登录”按钮
      // (window as any).google.accounts.id.renderButton(
      //   document.getElementById("google-login-button"),
      //   {
      //     theme: "outline",
      //     size: "large",
      //     text: "login_with",
      //     shape: "rectangular",
      //   }
      // );
      // 启用一键登录提示(弹窗)功能
      (window as any).google.accounts.id.prompt(
        (promptMomentNotification: any) => {
          console.log(
            "===>getMomentType",
            promptMomentNotification.getMomentType()
          );
          console.log(
            "===>isDisplayed",
            promptMomentNotification.isDisplayed()
          );
          console.log(
            "===>getNotDisplayedReason",
            promptMomentNotification.getNotDisplayedReason()
          );
        }
      );
    };
    if (!(window as any).google) {
      script.src = "https://accounts.google.com/gsi/client"; // 加载客户端库
      script.async = true;
      script.onload = () => initializeGoogleSignIn(clientId);
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn(clientId);
    }
  };

  return (
    <div style={{ height: "100vh", background: "yellow" }}>
      <div id="google-login-button"></div>
      <div onClick={cancelGoogleAuthPrompt}>Cancel</div>
    </div>
  );
}
