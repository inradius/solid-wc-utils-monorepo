import { hostContractProps } from '@app/contexts';
import App from '@app/index';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';
import withCSS from '@inradius/solid-wc-css-mixin';
import withHomeAssistant from '@inradius/solid-wc-hass-mixin';
import css from '@dist/dev/index.css?inline';

compose(
  withHomeAssistant({
    cardSize: 3,
    customCard: {
      description: 'A beautiful Solid.js card for Home Assistant.',
      name: 'My Custom Solid.js Card',
      preview: true,
      type: 'solid-wc-hass-card',
    },
    defaultConfig: {
      layout: 'vertical',
      name: 'My Solid.js Card',
    },
  }),
  register('solid-wc-hass-card', hostContractProps),
  withCSS(css),
  withSolid
)(App);
