// src/lib/auth/msalInstance.ts
import { PublicClientApplication } from "@azure/msal-browser";
import msalConfig from "./msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
