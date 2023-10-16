import type { App } from "vue";
import { LoginButton } from "./components";
import { authStore } from './stores/auth';
import { authBackground } from './compositions/login';

const LoginButtonPlugin = {
  install: (app: App, options: { img: string } = { img: "" }) => {
    app.component("LoginButton", LoginButton);
    app.provide("specialUploadImage", options.img);
  },
};

export { LoginButton, LoginButtonPlugin, authStore, authBackground };
