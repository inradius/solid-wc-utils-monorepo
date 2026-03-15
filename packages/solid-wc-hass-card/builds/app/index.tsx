/* @refresh reload */
import { hostContractProps } from '@app/contexts';
import App from '@app/index';
import { render } from 'solid-js/web';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to index.html?'
  );
}

render(
  (
    props: Partial<typeof hostContractProps> = {
      heading: 'Hello Development Mode',
    }
  ) => <App {...props} />,
  root!
);
