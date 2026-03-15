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
    <div class="w-full md:w-1/3 px-2">
      <div class="rounded-lg shadow-sm mb-4">
        <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
          <div class="px-3 pt-8 pb-10 text-center relative z-10">
            <h4 class="text-sm uppercase text-gray-500 leading-tight">
              {heading()}
            </h4>
            <h3 class="text-2xl text-gray-700 font-semibold leading-tight my-3">
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
