import { resolve } from 'node:path';
import devtools from 'solid-devtools/vite';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from '../vite.config';

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    ...(env.mode !== 'production' && {
      plugins: [devtools()],
    }),
    build: {
      emptyOutDir: true,
      outDir: resolve(__dirname, '..', 'dist'),
    },
  })
);
