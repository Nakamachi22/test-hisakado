// src/components/Header.tsx
"use client";

import { useUserInfo } from "@/features/auth/useUserInfo";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const user = useUserInfo();

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow">
      <h1 className="text-lg font-bold">営業支援システム</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4 text-sm text-gray-600">{user.username}</span>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
