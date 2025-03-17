import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    historyApiFallback: true, // Asegura que las rutas funcionan con React Router
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
