# @inradius/solid-wc-hass-mixin
![npm version](https://img.shields.io/npm/v/@inradius/solid-wc-hass-mixin) ![CI Action](https://github.com/inradius/solid-wc-utils-monorepo/actions/workflows/ci.yml/badge.svg) ![license](https://img.shields.io/npm/l/@inradius/solid-wc-hass-mixin)

A lightweight mixin for [component-register](https://www.npmjs.com/package/component-register) that streamlines the creation of Home Assistant Custom Cards using Solid.js.

This mixin automatically handles the boilerplate required by Home Assistant, including `setConfig`, card registration in the global window object, and the `getCardSize` method.

## Features
- **Automatic Registration:** Automatically pushes your card configuration to the Home Assistant `customCards` registry.
- **Config Handling:** Implements `setConfig` and merges your `defaultConfig` with user-provided settings.
- **TypeScript Ready:** Full type safety for Home Assistant card configurations.
- **Clean Integration:** Designed to work seamlessly with `compose` and `register`.

```bash
npm install @inradius/solid-wc-hass-mixin component-register
# or
pnpm add @inradius/solid-wc-hass-mixin component-register
```

## Usage
Use `withHomeAssistant` within your `compose` pipeline. It should wrap your final component ***before*** registration.

```typescript
import { register, compose, withSolid } from 'component-register';
import withHomeAssistant from '@inradius/solid-wc-hass-mixin';
import { MyApp } from './MyApp';

compose(
  withHomeAssistant({
    defaultConfig: {
      name: 'My Card',
      layout: 'vertical',
    },
    customCard: {
      type: 'my-custom-card',
      name: 'My Custom Card',
      description: 'A beautiful Solid.js card for Home Assistant.',
      preview: true
    },
    cardSize: 3
  }),
  register('my-custom-card'),
  withSolid
)(MyApp);
```

### Options
The `withHomeAssistant` function accepts an options object:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| customCard | CustomCardEntry | Required | The metadata used by the Home Assistant UI picker. |
| defaultConfig | Record<string, unknown> | {} | Default values for your card's YAML configuration. |
| cardSize | number | 3 | The height of the card in the Home Assistant grid. |

## How it works
1. `setConfig(config)`: Home Assistant calls this when the UI editor changes. This mixin ensures a valid config is provided and attaches it to `this.config`.
2. `getCardSize()`: Returns the specified grid height for the Home Assistant dashboard.
3. Global Registry: Adds your card to `window.customCards` so it appears in the "Add Card" dialog in the Lovelace UI.

## License
MIT