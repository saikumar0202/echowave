/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths, so the build works from a GitHub Pages sub-path.
  base: './',
  plugins: [react()],
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
