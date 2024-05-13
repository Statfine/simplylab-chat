import { useCallback, useEffect } from "react";
import * as jose from "jose";

interface IGoogleAuthProps {
  onGoogleSignInSucBack?: (data?: any) => void;
}

interface IInitializeResponse {
  credential: string;
  select_by: string;
}

interface ICredential {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

const GOOGLE_AUTH_CLIENT_ID =
  "1038404462926-um41ks4m29q3q1vuvovftiebomesaqi1.apps.googleusercontent.com"; // 个人

/**
 * 自动登录场景
 * 当用户退出您的网站时，您需要调用 google.accounts.id.disableAutoSelect 方法，以在 Cookie 中记录状态。这样可以防止用户体验死循环
 */
export const logOutGoogleDisableAutoSelect = () => {
  if (!(window as any).google)
    (window as any).google.accounts.id.disableAutoSelect();
};
/**取消一键式流程 */
export const cancelGoogleAuthPrompt = () => {
  if ((window as any).google) (window as any).google.accounts.id.cancel();
};

/**
 * chrome手动关闭可在第三方登录中开启，其它浏览器不行
 *
 * FedCM
 *  FedCM有无会导致登录时的显示不用 https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid?hl=zh-cn#one-tap-using-fedcm
 *  Chrome 108 中已提供 FedCM。  一定比例的用户将使用 FedCM API。
 */
function useGoogleAuthPrompt(props?: IGoogleAuthProps) {
  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = useCallback(() => {
    const script = document.createElement("script");
    if (!(window as any).google) {
      script.src = "https://accounts.google.com/gsi/client"; // 加载客户端库
      script.async = true;
      script.onload = () => initializeGoogleSignIn(GOOGLE_AUTH_CLIENT_ID);
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn(GOOGLE_AUTH_CLIENT_ID);
    }
  }, []);

  /** 初始化并提示(弹窗) */
  const initializeGoogleSignIn = useCallback((client_id: string) => {
    (window as any).google.accounts.id.initialize({
      client_id,
      cancel_on_tap_outside: false, // 控制是否在提示之外进行点击时取消提示(关闭一键登录弹窗)，默认true
      auto_select: false, // 开启自动登录功能，默认false
      callback: handleGoogleSignIn, // 验证成功回调
    });

    // 启用一键登录提示(弹窗)功能
    (window as any).google.accounts.id.prompt(
      (promptMomentNotification: any) => {
        // 开启FedCM 以下方法无效
        console.log("===>isDisplayed", promptMomentNotification.isDisplayed());
        console.log(
          "===>getNotDisplayedReason",
          promptMomentNotification.getNotDisplayedReason()
        );
      }
    );
  }, []);

  /** 处理Google登录成功的响应  */
  const handleGoogleSignIn = useCallback((response: IInitializeResponse) => {
    console.log("Google登录成功", response);
    // 解码： 此字段是作为 base64 编码的 JSON Web 令牌 (JWT) 字符串形式的 ID 令牌
    const claims: ICredential = jose.decodeJwt(response.credential);
    console.log(claims);
    const params = {
      uname: claims.name, //	用户名
      sid: 3, //	登录类型0游客1苹果2FB3谷歌
      openid: claims.sub, //	平台ID，登录相关
      pic: claims.picture, //	头像地址
      email: claims.email, //用户邮箱
    };
    if (props?.onGoogleSignInSucBack) props?.onGoogleSignInSucBack(params);
  }, []);
}

/**
 * google 一键快捷登录
 */
export default useGoogleAuthPrompt;
