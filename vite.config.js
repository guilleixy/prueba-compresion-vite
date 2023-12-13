import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteCompressionPlugin from 'vite-plugin-compression';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),

  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactRouter: ['react-router-dom'],
          reactSpringThree: ['@react-spring/three'],
          reactThreeDrei: ['@react-three/drei'],
          reactThreeFiber: ['@react-three/fiber'],
          emailjs: ['@emailjs/browser'],
          reactHelmet: ['react-helmet'],
          reactTooltip: ['react-tooltip'],
          reactVerticalTimelineComponent: ['react-vertical-timeline-component'],
        },
      },
      plugins: [
        ViteCompressionPlugin({
          verbose: true,
          disable: false,
          threshold: 10240, // Archivos mayores a 10 KB serán comprimidos
          algorithm: 'gzip',
          ext: '.gzip',
          rename: true,
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
