import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Auth } from '@/types'
import { ethers } from 'ethers'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, type IProvider } from '@web3auth/base'
import { Method } from '@/types/auth'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'

export const authStore = () => {
  const auth = reactive<Auth>({ isAuth: false })
  const provider = ref<ethers.providers.Web3Provider | undefined>(undefined)
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x182B9',
    displayName: 'Bora Testnet',
    blockExplorer: 'https://scope.boraportal.cc/',
    ticker: 'BGAS',
    tickerName: 'Bora',
    rpcTarget: 'https://public-node.api.boraportal.cc/bora/testnet'
  }
  // const chainConfig = {
  //   chainNamespace: CHAIN_NAMESPACES.EIP155,
  //   chainId: '0x1',
  //   displayName: 'Ethereum Mainnet',
  //   blockExplorer: 'https://etherscan.io',
  //   ticker: 'ETH',
  //   tickerName: 'Ethereum',
  //   rpcTarget: 'https://mainnet.infura.io/v3/'
  // }
  const clientId =
    'BOd7XumvApbF490TQ0MJvFiOzHFOh335h_DS0Y4bbJ9ufKqW2El9_YqVQ1kSQ9OJqMty_4LYY8AkQ1eFuhzGOAE'
  const clientIdGoogle = '72842004839-8l3l8ioie3k25i9qjk5tnsa4qeh27eju.apps.googleusercontent.com'
  const web3Auth = new Web3AuthNoModal({
    clientId,
    chainConfig,
    web3AuthNetwork: 'sapphire_devnet',
    useCoreKitKey: false
  })
  const web3AuthProvider = ref<IProvider | null>(null)
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig }
  })
  const openloginAdapter = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      clientId,
      loginConfig: {
        google: {
          name: 'google-connector',
          verifier: 'brendan-bui-test',
          typeOfLogin: 'google',
          clientId: clientIdGoogle
        }
      },
      uxMode: 'popup'
    }
  })
  web3Auth.configureAdapter(openloginAdapter)

  const setProvider = (newProvider: any) => {
    provider.value = newProvider
  }

  const setAuth = async ({ accessToken }: { accessToken?: string }) => {
    const getListAccounts = async () => {
      if (!provider.value) {
        alert('Please install Metamask')
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

  const logIn = async (method: Method) => {
    await web3Auth.init()

    switch (method) {
      case Method.GOOGLE:
        web3AuthProvider.value = await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: Method.GOOGLE
        })
        break
      case Method.FACEBOOK:
        web3AuthProvider.value = await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: Method.FACEBOOK
        })
        break
      case Method.DISCORD:
        web3AuthProvider.value = await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: Method.DISCORD
        })
        break
      default:
        break
    }
    console.log(web3AuthProvider)
  }

  return { auth, provider, setProvider, setAuth, logIn }
}

export const useAuthStore = defineStore('auth', authStore)
