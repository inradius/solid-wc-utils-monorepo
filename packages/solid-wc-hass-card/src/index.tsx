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
    <ha-card>
      <div class="flex p-2">
        <div class="grow rounded-lg">
          <div class="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800">
            <div class="relative z-10 px-3 pt-8 pb-10 text-center">
              <h4 class="text-sm leading-tight text-gray-500 uppercase dark:text-white">
                {heading()}
              </h4>
              <h3 class="my-3 text-2xl leading-tight font-semibold text-gray-700 dark:text-white">
                {description()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </ha-card>
  );
};

const App: Component<Partial<typeof hostContractProps>> = (props) => (
  <HostContractProvider {...props}>
    <AppCore />
  </HostContractProvider>
);

export default App;
