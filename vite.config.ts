import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: resolve('./out')
  },
  base: process.env.NODE_ENV === 'development' ? '/' : '/sztunethelper/',
  plugins: [react()],
  root: './src/renderer',
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src')
    }
  },
  define: {
    'process.env': {}
  }
})
