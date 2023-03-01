import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: resolve('./out')
    },
    base: mode === 'development' ? '/' : '/sztunethelper/',
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
  }
})
