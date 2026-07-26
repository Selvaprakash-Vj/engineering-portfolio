import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Local builds and previews stay at /. GitHub Actions uses --mode github
  // and publishes the project site below /engineering-portfolio/.
  base: mode === 'github' ? '/engineering-portfolio/' : '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
  },
}))
