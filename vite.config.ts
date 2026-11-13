import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { removeBunLockfiles } from './scripts/clean-bun-lock.mjs';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function autoCleanBunLockPlugin(): Plugin {
  let lastCheckedAt = 0;
  const cleanIfNeeded = (force = false) => {
    const now = Date.now();
    if (!force && now - lastCheckedAt < 2000) {
      return;
    }
    lastCheckedAt = now;
    removeBunLockfiles(rootDir);
  };

  return {
    name: 'auto-clean-bun-lock',
    configResolved() {
      cleanIfNeeded(true);
    },
    buildStart() {
      cleanIfNeeded(true);
    },
    handleHotUpdate() {
      cleanIfNeeded(true);
    },
    configureServer(server) {
      cleanIfNeeded(true);
      server.watcher?.on('all', () => {
        cleanIfNeeded(false);
      });
      server.middlewares.use((_req, _res, next) => {
        cleanIfNeeded(false);
        next();
      });
    },
  };
}

export default defineConfig(() => {
  removeBunLockfiles(rootDir);

  return {
    plugins: [autoCleanBunLockPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

