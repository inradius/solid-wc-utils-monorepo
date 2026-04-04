import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from '../vite.config.app';

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    build: {
      outDir: resolve(__dirname, '..', '..', 'dist', 'app'),
    },
    publicDir: resolve(__dirname, '..', 'public'),
  })
);
