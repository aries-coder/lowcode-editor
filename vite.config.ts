import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindCSS from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
