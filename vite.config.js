import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    allowedHosts: ['d638-189-39-6-23.ngrok-free.app']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
})
