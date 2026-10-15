import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind 4 is a Vite plugin now — no tailwind.config.js and no PostCSS file.
  // The design tokens live in src/index.css under @theme instead.
  plugins: [react(), tailwindcss()],
})
