import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [react()];
  const shouldPrerender = command === 'build' && process.env.ENABLE_PRERENDER === 'true';

  if (shouldPrerender) {
    try {
      const vitePrerender = require('vite-plugin-prerender');
      const Renderer = vitePrerender.PuppeteerRenderer;
      const { applySeoToHtml } = await import('./scripts/prerender-seo.js');

      plugins.push(
        vitePrerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/about', '/services', '/portfolio', '/data-analytics-research-portfolio', '/blog', '/contact'],
          renderer: new Renderer({
            headless: true,
            renderAfterTime: 1500,
            maxConcurrentRoutes: 2,
          }),
          postProcess(renderedRoute: { route: string; html: string }) {
            renderedRoute.html = applySeoToHtml(renderedRoute.html, renderedRoute.route);
            return renderedRoute;
          },
        }),
      );
    } catch (error) {
      console.warn('[prerender] Disabled because prerender dependencies are unavailable.', error);
    }
  }

  return {
    plugins,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            sanity: ['@sanity/client', '@sanity/image-url', '@portabletext/react'],
            ui: ['lucide-react', 'react-countup'],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
