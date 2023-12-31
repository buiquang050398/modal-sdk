import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/wallet.ts'),
      name: 'Wallet Modal',
      fileName: 'wallet-modal'
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      crypto: 'empty-module',
      assert: 'empty-module',
      http: 'empty-module',
      https: 'empty-module',
      os: 'empty-module',
      url: 'empty-module',
      zlib: 'empty-module',
      stream: 'empty-module',
      _stream_duplex: 'empty-module',
      _stream_passthrough: 'empty-module',
      _stream_readable: 'empty-module',
      _stream_writable: 'empty-module',
      _stream_transform: 'empty-module'
    }
  },
  define: {
    global: 'globalThis'
  }
})
