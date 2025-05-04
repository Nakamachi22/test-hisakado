import "./globals.css";
import { CustomMsalProvider } from "@/features/auth/msal-provider"; // ← 変更
import { ReactNode } from "react";
import Header from "./components/Header";

export const metadata = {
  title: "営業支援システム",
  description: "Outlook連携付き",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <CustomMsalProvider>
          <Header/>
          {children}
        </CustomMsalProvider>
      </body>
    </html>
  );
}
