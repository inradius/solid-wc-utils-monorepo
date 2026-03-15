import type { Config } from 'prettier';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import sharedConfig from '@inradius/solid-wc-utils-config/prettier';

const config: Config = {
  ...sharedConfig,
  plugins: [tailwindPlugin],
};

export default config;
