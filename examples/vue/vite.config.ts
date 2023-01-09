import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import themeImg from '../../src'

export default defineConfig({
  plugins: [
    vue(),
    themeImg({
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
