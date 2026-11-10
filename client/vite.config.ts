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
      // 'prompt': bản mới chờ người học bấm "Tải lại" (UpdateToast), không tự tải lại giữa bài.
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Tin Học Cùng Mochi',
        short_name: 'Tin Học Mochi',
        description: 'Học tin học văn phòng từ con số 0 cùng mèo Mochi: chuột, bàn phím, Word, Excel, PowerPoint và AI.',
        lang: 'vi',
        theme_color: '#8FE3CF',
        background_color: '#FFF9F2',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,json}'],
      },
    }),
  ],
  // Một instance ProseMirror duy nhất cho cả TipTap (client) lẫn reducer Word
  // (shared). Hai instance khác nhau sẽ ném "Invalid content for node doc".
  resolve: { dedupe: ['@tiptap/pm', 'prosemirror-model', 'prosemirror-state', 'prosemirror-transform', 'prosemirror-view'] },
  server: { port: 5174 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
