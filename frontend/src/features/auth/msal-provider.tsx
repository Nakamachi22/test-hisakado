"use client"; // ← 重要

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import  msalConfig  from "@/lib/auth/msalConfig";

const pca = new PublicClientApplication(msalConfig);

export const CustomMsalProvider = ({ children }: { children: React.ReactNode }) => {
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
};
