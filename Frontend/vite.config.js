import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginalAssets: false,
      filter: (file) => file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html'),
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginalAssets: false,
      filter: (file) => file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html'),
    }),
  ],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React + router
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router-dom/')) {
            return 'vendor-router';
          }

          // Redux/toolkit
          if (id.includes('node_modules/@reduxjs/toolkit/') || id.includes('node_modules/react-redux/')) {
            return 'vendor-redux';
          }

          // Charts only used in educator dashboard
          if (id.includes('node_modules/recharts/')) {
            return 'vendor-charts';
          }

          // Heavy UI/utility deps
          if (id.includes('node_modules/axios/')) return 'vendor-axios';
          if (id.includes('node_modules/react-toastify/')) return 'vendor-toastify';
          if (id.includes('node_modules/react-spinners/')) return 'vendor-spinners';

          // Icon libs
          if (id.includes('node_modules/lucide-react/')) return 'vendor-icons-lucide';
          if (id.includes('node_modules/react-icons/')) return 'vendor-icons-react';

          // Default vendor bucket
          if (id.includes('node_modules/')) return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})

