import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/auth': 'http://localhost:8000',
      '/googleAuth': 'http://localhost:8000',
      '/facebookAuth': 'http://localhost:8000',
      '/settings': 'http://localhost:8000',
      '/user': 'http://localhost:8000',
      '/api': 'http://localhost:8000',
      '/uploads': 'http://localhost:8000',
    },
  },
});
