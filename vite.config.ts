/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const DAY = 60 * 60 * 24;

export default defineConfig({
  // Relative asset paths, so the build works from a GitHub Pages sub-path.
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon-32x32.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'EchoWave',
        short_name: 'EchoWave',
        description: 'Discover, search and stream music.',
        start_url: './',
        scope: './',
        display: 'standalone',
        theme_color: '#0d0e10',
        background_color: '#0d0e10',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png}'],
        // Audio is deliberately not cached: files are large and use range requests.
        // Route matchers are copied into the service worker as source, so they
        // must not reference anything outside themselves.
        runtimeCaching: [
          {
            // Cover art and profile photos, served from many Audius content nodes.
            urlPattern: ({ url }) => /\/content\/.+\/(150x150|480x480|1000x1000)\.jpg$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'artwork',
              expiration: { maxEntries: 400, maxAgeSeconds: 30 * DAY },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Icon font and web fonts.
            urlPattern: ({ url }) => ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com'].includes(url.hostname),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-cdn',
              expiration: { maxEntries: 40, maxAgeSeconds: 365 * DAY },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Music data: fresh when online, last copy when offline.
            // Audio streams (/stream) are excluded.
            urlPattern: ({ url }) => url.hostname === 'api.audius.co'
              && /^\/v1\/(tracks|users|playlists)\//.test(url.pathname) && !url.pathname.endsWith('/stream'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'music-api',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 300, maxAgeSeconds: 7 * DAY },
            },
          },
          {
            urlPattern: ({ url }) => url.hostname === 'lrclib.net',
            handler: 'CacheFirst',
            options: {
              cacheName: 'lyrics',
              expiration: { maxEntries: 300, maxAgeSeconds: 30 * DAY },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern' },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    css: false,
  },
});
