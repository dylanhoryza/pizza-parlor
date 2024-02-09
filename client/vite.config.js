import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true,
    proxy: {
      '/api': {
        target: isProduction ? 'https://pizza-parlor-cd2s.onrender.com' : 'http://localhost:3001',
        changeOrigin: true,
        
      },
    }
  }
})
