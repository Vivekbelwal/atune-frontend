import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite configuration optimized for Node.js 22
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],

  // Resolve paths using Node.js path module (Node.js 22 compatible)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Optimize build for modern browsers
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Optimize chunks for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },

  // Server configuration
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
    // Proxy configuration if needed
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    },
  },

  // Optimize for production
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'antd',
      '@ant-design/icons',
    ],
  },

  // Enable Node.js 22 features
  esbuild: {
    target: 'esnext',
    supported: {
      'top-level-await': true,
    },
  },
});
