import baseConfig from '@inradius/solid-wc-utils-config/vitest.base';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: '@inradius/solid-wc-hass-mixin',
    },
  })
);
