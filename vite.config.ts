import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/uploads': {
        target: 'https://demo.altairattic.net/altair-attic/api/public',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, ''),
      },
      '/api': {
        target: 'https://demo.altairattic.net/altair-attic/api/public',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'gsap', 'lucide-react'],
        },
      },
    },
  },
});
