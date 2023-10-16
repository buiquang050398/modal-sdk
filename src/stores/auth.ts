import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Auth } from '@/types'
import { ethers } from 'ethers'

export const authStore = () => {
  const auth = reactive<Auth>({ isAuth: false })
  const provider = ref<ethers.providers.Web3Provider | undefined>(undefined)

  const setProvider = (newProvider: any) => {
    provider.value = newProvider
  }

  const setAuth = async ({ accessToken }: { accessToken?: string }) => {
    const getListAccounts = async () => {
      if (!provider.value) {
        alert("Please install Metamask");
        return ['']
      }
      const listAccounts = await provider.value.listAccounts()
      if (listAccounts.length > 0) {
        return listAccounts
      }
      return await provider.value.send('eth_requestAccounts', [])
    }
    if (!accessToken) {
      auth.isAuth = false
      auth.accountId = undefined
      auth.accessToken = accessToken
      return
    }
    auth.isAuth = true
    auth.accessToken = accessToken
    setProvider(
      (window as any).ethereum
        ? new ethers.providers.Web3Provider((window as any).ethereum, 'any')
        : undefined
    )
    const accounts = await getListAccounts()
    auth.accountId = accounts[0]
  }

  return { auth, provider, setProvider, setAuth }
};

export const useAuthStore = defineStore('auth', authStore);
