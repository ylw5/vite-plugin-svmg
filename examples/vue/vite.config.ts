import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svmg from 'vite-plugin-svmg'

export default defineConfig({
  plugins: [
    vue(),
    svmg({
      color: {
        root: {
          white: '#1d1d1d',
        },
        dark: {
          white: '#ffffff',
        },
      },
    }),
  ],
})
