import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react-markdown',
      'remark-math',
      'rehype-katex',
      'katex',
      'remark-gfm'
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
