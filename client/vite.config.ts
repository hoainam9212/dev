/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // registered from main.tsx so the native (Capacitor) app can skip it
      injectRegister: null,
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Nihongo Sensei',
        short_name: 'Nihongo',
        description: 'Học tiếng Nhật toàn diện N5–N1 cùng mèo Sakura',
        lang: 'vi',
        theme_color: '#FFB7C5',
        background_color: '#FFF8F0',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // Network first: always show the latest lessons when online; cached copy only offline/slow.
            // (CacheFirst kept serving outdated lesson files forever after a content update.)
            urlPattern: ({ url }) => url.pathname.startsWith('/content/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'content-v2',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
          {
            urlPattern: ({ url }) => url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'fonts', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    }),
  ],
  server: { port: 5173, proxy: { '/api': 'http://localhost:8787' } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
