import { useState } from "react";
import { Mail } from "@/types/mail";

export const useFetchMails = (accessToken: string | null) => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMails = async () => {
    if (!accessToken) {
      setError("アクセストークンが見つかりません。");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch_openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      setMails(data.mails); // ← Azure Functions で `{ mails: [...] }` の形式を返す必要あり
    } catch (e: any) {
      setError(e.message || "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return { mails, loading, error, fetchMails };
};
