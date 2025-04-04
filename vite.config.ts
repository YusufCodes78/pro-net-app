import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"src"),
      "@assets": path.resolve(__dirname, "assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/"),
    emptyOutDir: true,
  },
  base: process.env.VITE_BASE_PATH || "/pro-net-app",
})
