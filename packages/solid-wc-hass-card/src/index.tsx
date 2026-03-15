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
    console.log(
      'Solid.js HACS Web Component v__VERSION__',
      config && config(),
      hass && hass()
    );
  });

  return (
    <div class="flex p-2">
      <div class="grow rounded-lg shadow-sm">
        <div class="relative overflow-hidden rounded-lg bg-white shadow-lg md:shadow-xl">
          <div class="relative z-10 px-3 pt-8 pb-10 text-center">
            <h4 class="text-sm leading-tight text-gray-500 uppercase">
              {heading()}
            </h4>
            <h3 class="my-3 text-2xl leading-tight font-semibold text-gray-700">
              {description()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: Component<Partial<typeof hostContractProps>> = (props) => (
  <HostContractProvider {...props}>
    <AppCore />
  </HostContractProvider>
);

export default App;
