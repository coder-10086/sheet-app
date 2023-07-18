import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/V2': {
        target: 'https://appcs.jbysoft.com',
        changeOrigin: true,
      },
      '/V3': {
        target: 'https://appcs.jbysoft.com',
        changeOrigin: true,
      },
      '/SXDY': {
        target: 'https://appcs.jbysoft.com',
        changeOrigin: true,
      },
    },
  },
})
