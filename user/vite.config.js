import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://janmanch-cep.onrender.com',
        changeOrigin: true,
        secure: false, // Ensure this is set to false if you're using HTTP instead of HTTPS
      },
    },
  },
  optimizeDeps: {
    include: ['redux-thunk'], // Ensures redux-thunk is pre-bundled correctly
  },
});
