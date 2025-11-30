import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/WebLavirix/' // <--- PENTING UNTUK DEPLOY KE GITHUB PAGES
})
