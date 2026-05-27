import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: 'all',
    // SPA fallback: serve index.html for all non-asset requests so that
    // direct navigation to /menu, /favorites, etc. works without a 404.
    historyApiFallback: true,
  },
})
