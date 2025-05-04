// src/features/auth/useAccessToken.ts

'use client';

import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

export const useAccessToken = (): { accessToken: string | null } => {
    const { instance, accounts } = useMsal()
    const [accessToken, setAccessToken] = useState<string | null>(null)
  
    useEffect(() => {
      const getToken = async () => {
        if (accounts.length === 0) return
  
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ['Mail.Read'],
            account: accounts[0],
          })
          setAccessToken(response.accessToken)
        } catch (error) {
          console.error(error)
        }
      }
  
      getToken()
    }, [accounts, instance])
  
    return { accessToken }
  }
  