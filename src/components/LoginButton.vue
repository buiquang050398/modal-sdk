<script lang="ts" setup>
import { authBackground } from '@/compositions/login';
import { useAuthStore } from '@/stores/auth';
import { ref, inject } from 'vue'

const props = defineProps<{
  customImg?: string
}>()

const img = inject('specialUploadImage') as string

const imgVal = props.customImg ?? img
const imgSRC = ref(imgVal)
const { handleLogin, handleLogout } = authBackground()
const authStore = useAuthStore()
</script>

<template>
  <div class="image-uploader">
    <div class="your-file">
      <img :src="imgSRC" alt="" srcset="" />
    </div>
    <div v-if="authStore.auth.isAuth">
      Account Id: 
      {{ authStore.auth.accountId }}
    </div>
    <button v-if="authStore.auth.isAuth" @click="handleLogout">Logout</button>
    <button v-else @click="handleLogin">Login</button>
  </div>
</template>
<style>
.image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  width: 55%;
  background-color: eggshell;
  margin: 0 auto;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.your-file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

img {
  width: 25%;
}
</style>
