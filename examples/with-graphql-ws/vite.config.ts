import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    middlewareMode: true,
  },
  build: {
    target: 'esnext',
  },
  plugins: [react()],
})
