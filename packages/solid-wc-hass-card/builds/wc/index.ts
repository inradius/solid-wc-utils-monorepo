import { HACS_DEMO_WC } from '@app/constants';
import { hostContractProps } from '@app/contexts';
import App from '@app/index';
import { compose, register } from 'component-register';
import { withSolid } from 'solid-element';
import withCSS from '@inradius/solid-wc-css-mixin';
import withHomeAssistant from '@inradius/solid-wc-hass-mixin';
import css from '@dist/dev/index.css?inline';

compose(
  withHomeAssistant({
    cardSize: 2,
    customCard: {
      description: 'A beautiful Solid.js card for Home Assistant.',
      name: 'My Solid.js Demo Card',
      preview: true,
      type: HACS_DEMO_WC,
    },
    defaultConfig: {
      layout: 'vertical',
      name: 'My Solid.js Demo Card',
    },
  }),
  register(HACS_DEMO_WC, hostContractProps),
  withCSS(css),
  withSolid
)(App);
