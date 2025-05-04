// src/app/page.tsx
"use client";

import { useUserInfo } from "@/features/auth/useUserInfo";
import { useFetchMails } from "@/features/mail/hooks/useFetchMails";
import {MailList} from "@/app/components/dashbord/MailList"
import { useMsal } from "@azure/msal-react";

export default function HomePage() {
  const user = useUserInfo();
  const { instance, accounts } = useMsal();
  const accessToken = sessionStorage.getItem("accessToken"); // 必要に応じてuseEffectで更新してもOK
  const { loading, error, fetchMails } = useFetchMails(accessToken);

  return (
    <>
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">営業支援システムへようこそ</h1>
        {user ? (
          <p className="text-lg">こんにちは、{user.name ?? user.username} さん！</p>
        ) : (
          <p className="text-lg text-gray-600">ログインして始めましょう。</p>
        )}
      </div>
      <div>
        <button onClick={fetchMails}>📩 メールを取得</button>
        {loading ? <p>読み込み中...</p> : <MailList />}
        {error && <p style={{ color: "red" }}>❌ エラー: {error}</p>}
      </div>
    </>

  );
}
