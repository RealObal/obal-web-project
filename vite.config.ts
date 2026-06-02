import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [react()];

  // Skip prerendering on Vercel (Chrome not available in serverless environment)
  if (command === 'build' && !process.env.VERCEL) {
    const vitePrerender = require('vite-plugin-prerender');
    const Renderer = vitePrerender.PuppeteerRenderer;
    const { applySeoToHtml } = await import('./scripts/prerender-seo.js');

    plugins.push(
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/about', '/services', '/portfolio', '/blog', '/contact'],
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
  }

  return {
    plugins,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
