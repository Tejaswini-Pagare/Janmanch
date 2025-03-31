// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/

// export default defineConfig({
//   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) },
//   plugins: [react()],
//   define: {
//     'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false, // Ensure this is set to false if you're using HTTP instead of HTTPS
//       },
//     },
//   },
//   optimizeDeps: {
//     include: ['redux-thunk'], // Ensures redux-thunk is pre-bundled correctly
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL),
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false, // Set to false if using HTTP instead of HTTPS
        },
      },
    },
    optimizeDeps: {
      include: ["redux-thunk"], // Ensure redux-thunk is pre-bundled correctly
    },
  };
});
