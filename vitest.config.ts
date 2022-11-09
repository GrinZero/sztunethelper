import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    alias: {
      '@renderer': 'src/renderer/src',
      '@api': 'src/main/api',
      '@sdk': 'src/main/sdk',
      '@controllers': 'src/main/controllers',
      '@db': 'src/main/db'
    }
  }
})
