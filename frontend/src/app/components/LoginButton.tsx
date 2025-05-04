"use client";

import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const LoginButton = () => {
  const { instance } = useMsal();

  const login = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["User.Read", "Mail.Read"], // 必要に応じて調整
      });

      const account = loginResponse.account;
      if (account) {
        const tokenResponse = await instance.acquireTokenSilent({
          account,
          scopes: ["User.Read", "Mail.Read"],
        });

        // ✅ accessTokenをsessionStorageに保存
        sessionStorage.setItem("accessToken", tokenResponse.accessToken);
        console.log("✅ accessTokenを保存しました");
      }
    } catch (error) {
      // トークンの取得に失敗した場合（例：期限切れなど）
      if (error instanceof InteractionRequiredAuthError) {
        const tokenResponse = await instance.acquireTokenPopup({
          scopes: ["User.Read", "Mail.Read"],
        });

        sessionStorage.setItem("accessToken", tokenResponse.accessToken);
        console.log("✅ accessTokenを保存しました（fallback）");
      } else {
        console.error("❌ 認証エラー:", error);
      }
    }
  };

  return (
    <button
      onClick={login}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
    >
      Microsoftでログイン
    </button>
  );
};

export default LoginButton;
