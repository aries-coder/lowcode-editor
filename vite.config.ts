import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import tailwindCSS from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindCSS(), vueJSX()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
