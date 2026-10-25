import { copyFileSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves 404.html for unknown paths; make it the app shell so deep links
// like /porfolio/work load the SPA and React Router takes over.
const spaFallback = () => ({
  name: 'spa-404-fallback',
  apply: 'build',
  closeBundle() {
    copyFileSync(path.resolve(import.meta.dirname, 'dist/index.html'), path.resolve(import.meta.dirname, 'dist/404.html'))
  },
})

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // Project site: https://ptan2505.github.io/porfolio/ (dev server stays at "/"; `vite preview` mirrors Pages)
  base: command === 'build' || isPreview ? '/porfolio/' : '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
}))
