import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@inradius/solid-wc-utils-config/vitest.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: '@inradius/solid-wc-css-mixin',
    },
  })
);
