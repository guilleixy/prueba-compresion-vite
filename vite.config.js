import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteCompressionPlugin from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        ViteCompressionPlugin({
          verbose: true,
          disable: false,
          threshold: 10240, // Archivos mayores a 10 KB serán comprimidos
          algorithm: 'gzip',
          ext: '.gz',
        }),
      ],
    },
  },
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    exclude: ['']
  },
  base: '/',
})
