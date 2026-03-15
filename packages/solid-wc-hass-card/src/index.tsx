import {
  hostContractProps,
  HostContractProvider,
  useHostContractContext,
} from '@app/contexts';
import { Component, createEffect } from 'solid-js';
import './index.css';

const AppCore: Component = () => {
  const { config, description, hass, heading } = useHostContractContext();

  createEffect(() => {
    console.log('Home Assistant', config && config(), hass && hass());
  });

  return (
    <div class="text-[#555555]">
      <h1>{heading()}</h1>
      <p>{description()}</p>
    </div>
  );
};

const App: Component<Partial<typeof hostContractProps>> = (props) => (
  <HostContractProvider {...props}>
    <AppCore />
  </HostContractProvider>
);

export default App;
