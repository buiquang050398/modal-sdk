<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref, inject } from 'vue'

const props = defineProps<{
  customImg?: string
}>()

const img = inject('specialUploadImage') as string

const imgVal = props.customImg ?? img
const imgSRC = ref(imgVal)
const authStore = useAuthStore()
</script>

<template>
  <div class="tw-bg-slate-300">
    <button class="btn btn-primary">Get Info</button>
    <div v-if="authStore.auth.isAuth">
      Account Id:
      {{ authStore.auth.accountId }}
    </div>
  </div>
</template>
<style></style>
