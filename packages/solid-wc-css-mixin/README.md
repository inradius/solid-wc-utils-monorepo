# @inradius/solid-wc-css-mixin
![npm version](https://img.shields.io/npm/v/@inradius/solid-wc-css-mixin) ![CI Action](https://github.com/inradius/solid-wc-utils-monorepo/actions/workflows/ci.yml/badge.svg) ![license](https://img.shields.io/npm/l/@inradius/solid-wc-css-mixin)

A lightweight mixin for [component-register](https://www.npmjs.com/package/component-register) that allows you to inject computed or inlined CSS directly into a Web Component's **Shadow Root** using Constructable Stylesheets.

## Why use this?
When building Web Components with Solid.js (via solid-element), managing styles can be tricky. This mixin:
- **Encapsulates Styles:** Keeps your CSS scoped to the component's Shadow DOM.
- **Performance:** Uses `adoptedStyleSheets` to ensure styles are parsed once and shared efficiently.
- **DX-Friendly:** Works seamlessly with Vite’s `?inline` imports or raw CSS strings.

## Installation
```bash
npm install @inradius/solid-wc-css-mixin component-register
# or
pnpm add @inradius/solid-wc-css-mixin component-register
```

## Usage
In your main entry point where you register your component, import your CSS as a string and pass it to the mixin.

```typescript
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';
import withCSS from '@inradius/solid-wc-css-mixin';

// Import your styles (works great with Vite/Webpack inlining)
import css from './styles.css?inline';

// Your Solid component
import App from './App';

compose(
  register('my-custom-element'),
  withCSS(css), // Injects the stylesheet
  withSolid
)(App);
```

## How it works
The mixin creates a new `CSSStyleSheet` object and pushes it into the element's `adoptedStyleSheets` array. This ensures that your styles do not "leak" out into the global scope, and global styles (unless using CSS variables) do not leak in.

## Requirements
- **Browser Support:** Requires a browser that supports [Constructable Stylesheets](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet).
- **Peer Dependencies:** This package is designed to be used with `component-register`.

## License
MIT © Travis