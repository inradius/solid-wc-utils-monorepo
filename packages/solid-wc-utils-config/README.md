# @inradius/solid-wc-utils-config
![npm version](https://img.shields.io/npm/v/@inradius/solid-wc-utils-config) ![CI Action](https://github.com/inradius/solid-wc-utils-monorepo/actions/workflows/ci.yml/badge.svg) ![license](https://img.shields.io/npm/l/@inradius/solid-wc-utils-config)

A shared base configuration for Solid.js Web Component applications.

## Installation
```bash
npm install -D @inradius/solid-wc-utils-config eslint prettier typescript
# or
pnpm add -D @inradius/solid-wc-utils-config eslint prettier typescript
```

## Usage
In your applications root eslint and prettier configuration files, import the shared configurations.

```typescript
// eslint.config.ts
export { default } from '@inradius/solid-wc-utils-config/eslint';
```

```typescript
// prettier.config.ts
export { default } from '@inradius/solid-wc-utils-config/prettier';
```

## Extending the configurations
You can extend the shared configurations by importing and spreading them, as the configurations are TypeScript exported default objects.

```typescript
// prettier.config.ts
import type { Config } from 'prettier';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import sharedConfig from '@inradius/solid-wc-utils-config/prettier';

const config: Config = {
  ...sharedConfig,
  plugins: [tailwindPlugin],
};

export default config;
```

### Vitest
A shared Vitest base configuration is also available:

```typescript
// vitest.config.ts
import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@inradius/solid-wc-utils-config/vitest.base';

export default mergeConfig(baseConfig, defineConfig({
  // your overrides here
}));
```

## What's included

All ESLint plugins are bundled as dependencies — consumers do not need to install them individually:

- `@eslint/js`
- `eslint-config-prettier`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import-x`
- `eslint-plugin-perfectionist`
- `eslint-plugin-solid`
- `globals`
- `typescript-eslint`

> **Note:** The ESLint config includes `eslint-plugin-solid`, making it opinionated toward Solid.js projects.

> **⚠️ ESLint 10 compatibility:** `eslint-plugin-solid` depends on `@typescript-eslint/utils@8.x`,
> which does not yet support ESLint 10. This package pins its ESLint peer dependency to **^9.20.0**
> until upstream support lands. Track progress in
> [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid) and
> [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint).

## Requirements

- **Node.js** `^20.19.0 || >=22`
- **ESLint** `^9.20.0`
- **Prettier** `^3.0.0`
- **TypeScript** `^5.0.0`

## License
MIT