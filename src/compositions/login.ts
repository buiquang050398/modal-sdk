import { useAuthStore } from '@/stores/auth'

export function authBackground() {
  const authStore = useAuthStore()

  const handleLogin = () => {
    authStore.setAuth({ accessToken: 'asd' })
  }
  const handleLogout = () => {
    authStore.setAuth({});
  }
  return { handleLogin, handleLogout }
}
