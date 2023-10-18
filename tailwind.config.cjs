/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
    prefix: ""
  }
}

