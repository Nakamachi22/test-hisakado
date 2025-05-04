// src/features/auth/useUserInfo.ts
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { AccountInfo } from "@azure/msal-browser";

export const useUserInfo = () => {
  const { accounts } = useMsal();
  const [user, setUser] = useState<AccountInfo | null>(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setUser(accounts[0]); // MSALはログイン済みユーザーの情報をここに格納
    }
  }, [accounts]);

  return user;
};
