import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { Connect, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** The subpages, each its own HTML entry so it loads only its own stylesheet. */
const PAGES = ['team', 'casino', 'tournament', 'wishlist', 'account', 'impressum', 'datenschutz'];

/**
 * Serves /team (no trailing slash) from team/index.html, and unknown paths with
 * 404.html and a 404 status, in dev and preview, the way Vercel does.
 */
function cleanUrls(): Plugin {
  const handler = (
    isKnownFile: (path: string) => boolean,
    notFound: (url: string) => Promise<string>,
  ): Connect.NextHandleFunction => (req, res, next) => {
    const [rawPath, query = ''] = (req.url ?? '/').split('?');
    const path = rawPath.replace(/\/$/, '') || '/';
    if (path === '/') return next();
    if (PAGES.includes(path.slice(1))) {
      req.url = `${path}/index.html${query ? `?${query}` : ''}`;
      return next();
    }
    const internal = path.startsWith('/@') || path.startsWith('/src/') || path.startsWith('/node_modules/');
    if (internal || isKnownFile(path)) return next();
    notFound(req.url ?? '/').then((html) => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
    }, next);
  };
  let outDir = 'dist';
  let root = process.cwd();
  return {
    name: 'planary-clean-urls',
    configResolved(config) {
      root = config.root;
      outDir = resolve(config.root, config.build.outDir);
    },
    configureServer: (server) =>
      void server.middlewares.use(
        handler(
          (p) => existsSync(join(root, p)) || existsSync(join(root, 'public', p)),
          (url) => server.transformIndexHtml(url, readFileSync(join(root, '404.html'), 'utf-8')),
        ),
      ),
    configurePreviewServer: (server) =>
      void server.middlewares.use(
        handler(
          (p) => existsSync(join(outDir, p)),
          async () => readFileSync(join(outDir, '404.html'), 'utf-8'),
        ),
      ),
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), cleanUrls()],
  server: {
    port: 5375,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notfound: resolve(__dirname, '404.html'),
        ...Object.fromEntries(PAGES.map((page) => [page, resolve(__dirname, page, 'index.html')])),
      },
    },
  },
});
