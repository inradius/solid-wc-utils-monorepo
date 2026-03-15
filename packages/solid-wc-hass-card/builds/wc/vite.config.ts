import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from '../vite.config.wc';

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    base: './',
    build: {
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        formats: ['iife'],
        name: 'SolidWCHassCard',
      },
      outDir: resolve(__dirname, '..', '..', 'dist'),
      rollupOptions: {
        external: [/\.css$/],
        output: {
          assetFileNames: '[hash][extname]',
          entryFileNames: `solid-wc-hass-card.min.js`,
        },
      },
    },
    plugins: [],
    publicDir: resolve(__dirname, '..', 'public'),
  })
);
