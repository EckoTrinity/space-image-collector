import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // Merges CSS into the JS file
  ],
  build: {
    lib: {
      entry: './src/widget.jsx', // The file we just made
      name: 'CosmicWidget',
      fileName: 'cosmic-widget',
    },
    rollupOptions: {
      external: [],
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"' // Fixes some React errors in standalone builds
  }
});