import { hostContractProps } from '@app/contexts';
import type { Spread } from '@solid-primitives/destructure';
import { type Accessor, createContext, useContext } from 'solid-js';

export const HostContractContext =
  createContext<Accessor<Spread<typeof hostContractProps>>>();

const getContext = () => {
  const hostContractContext = useContext(HostContractContext);
  if (!hostContractContext) throw new Error('Host contract context not found.');
  return hostContractContext;
};

export const useHostContractContext = () => {
  const hostContractContext = getContext();
  return hostContractContext();
};
