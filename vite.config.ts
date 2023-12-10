import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 22333
  },
  plugins: [react()],
})
