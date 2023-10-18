import { createApp } from "vue";
import { createPinia } from 'pinia'
import { authStore } from './stores/auth';
import './assets/main.css';
import App from "./App.vue";
//import { LoginButtonPlugin } from '@brendan_bui/wallet-modal'

const pinia = createPinia();
const app = createApp(App)
// app.use(LoginButtonPlugin)
pinia.use(authStore);
app.use(pinia);
app.mount("#app");
