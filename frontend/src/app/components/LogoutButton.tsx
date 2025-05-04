// src/components/LogoutButton.tsx
"use client";

import { useMsal } from "@azure/msal-react";

export default function LogoutButton() {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return <button onClick={handleLogout}>ログアウト</button>;
}
