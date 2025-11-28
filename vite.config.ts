import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, './src/api'),
      app: path.resolve(__dirname, './src/app'),
      assets: path.resolve(__dirname, './src/assets'),
      lang: path.resolve(__dirname, './src/lang'),
      models: path.resolve(__dirname, './src/models'),
      header: path.resolve(__dirname, './src/components/header'),
      content: path.resolve(__dirname, './src/components/content'),
    },
  },
})
