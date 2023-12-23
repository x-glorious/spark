import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    // rollup 配置
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            'react',
            'react-router-dom',
            'react-dom',
            'react-icons',
            'react-intl',
          ],
          three: ['three'],
          chakra: ['@chakra-ui/react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 22333,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
