import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    watch: true,
    environment: 'jsdom',
    coverage: {

      reporter: ['text', 'lcov']

    },
  },
  
  plugins: [vue()],
  resolve:{
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".vue",
      ".scss",
    ],
    alias:{
      '@': path.resolve(__dirname, './src'),
      
      
    }
  }
})

