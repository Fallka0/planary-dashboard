import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { Connect, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** The subpages, each its own HTML entry so it loads only its own stylesheet. */
const PAGES = ['team', 'casino', 'tournament', 'wishlist', 'account'];

/** Serves /team (no trailing slash) from team/index.html in dev and preview, as Vercel does. */
function cleanUrls(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const path = req.url?.split('?')[0].replace(/\/$/, '');
    if (path && PAGES.includes(path.slice(1))) req.url = `${path}/index.html`;
    next();
  };
  return {
    name: 'planary-clean-urls',
    configureServer: (server) => void server.middlewares.use(rewrite),
    configurePreviewServer: (server) => void server.middlewares.use(rewrite),
  };
}

export default defineConfig({
  plugins: [react(), cleanUrls()],
  server: {
    port: 5375,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(PAGES.map((page) => [page, resolve(__dirname, page, 'index.html')])),
      },
    },
  },
});
