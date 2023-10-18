<template>
  <div class="bg-slate-600 opacity-30 w-full h-[100vh] fixed top-0 left-0"></div>
  <div
    class="bg-white border-slate-700 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 
    -translate-y-1/2 w-[400px] h-[500px] flex justify-center items-center flex-col gap-3"
  >
    <button class="btn btn-primary" @click="() => handleLogin(method)">Login</button>
    <button class="btn btn-primary">Home</button>
    <button class="btn btn-primary">Send Transaction</button>
    <button class="btn btn-primary">Switch Network</button>
    <button class="btn btn-primary">Sign Message</button>
    <LoginButton></LoginButton>
  </div>
</template>
<script setup lang="ts">
import { LoginButton } from '.'
import { authBackground } from '@/compositions/login'
import { Method } from '@/types/auth'
const { handleLogin } = authBackground()
const method = Method.GOOGLE
</script>
<style scoped lang="scss"></style>
