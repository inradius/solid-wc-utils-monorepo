import { HostContractContext } from '@app/contexts';
import { destructure } from '@solid-primitives/destructure';
import { HomeAssistant } from 'custom-card-helpers';
import { createMemo, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { defineHostContractProps } from './host-contract.utilities';

export const hostContractProps = defineHostContractProps<{
  config?: Record<string, unknown>;
  description: string;
  hass?: HomeAssistant;
  heading: string;
}>({
  config: undefined,
  description: 'A Solid.js with Tailwind web component scaffold.',
  hass: undefined,
  heading: 'Hello World',
});

export const HostContractProvider: ParentComponent<
  Partial<typeof hostContractProps>
> = (rawProps) => {
  const mergedProps = mergeProps(hostContractProps, rawProps);
  const [props, contractProps] = splitProps(mergedProps, ['children']);

  const reactiveContractProps = createMemo(() => destructure(contractProps));

  return (
    <HostContractContext.Provider value={reactiveContractProps}>
      {props.children}
    </HostContractContext.Provider>
  );
};
