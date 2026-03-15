import { resolve } from 'node:path';
import solidPlugin from 'vite-plugin-solid';
import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@inradius/solid-wc-utils-config/vitest.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [solidPlugin({ hot: false })],
    resolve: {
      alias: { '@app': resolve(__dirname, 'src') },
    },
    test: {
      coverage: {
        exclude: ['builds/**/*', 'src/constants/index.ts'],
      },
      name: '@inradius/solid-wc-hass-card',
    },
  })
);
