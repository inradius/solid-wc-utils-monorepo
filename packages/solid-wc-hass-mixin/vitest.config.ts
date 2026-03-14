import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: '@inradius/solid-wc-hass-mixin',
    },
  })
);
