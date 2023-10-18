import { useAuthStore } from '@/stores/auth'
import type { Method } from '@/types/auth'

export function authBackground() {
  const authStore = useAuthStore()

  const handleLogin = (method?: Method) => {
    //authStore.setAuth({ accessToken: 'asd' })
    if (method) authStore.logIn(method)
  }
  const handleLogout = () => {
    authStore.setAuth({})
  }
  return { handleLogin, handleLogout }
}
