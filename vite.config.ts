import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({isSsrBuild}) => ({
  plugins:[react()],
  build:{copyPublicDir:!isSsrBuild,rollupOptions:isSsrBuild?{}:{output:{manualChunks:{react:['react','react-dom','react-router-dom'],sanity:['@sanity/client','@sanity/image-url','@portabletext/react'],ui:['lucide-react','react-countup']}}}},
  optimizeDeps:{exclude:['lucide-react']},
}));
