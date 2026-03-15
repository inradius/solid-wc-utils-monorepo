import { render } from '@solidjs/testing-library';
import { Component } from 'solid-js';
import { useHostContractContext } from './host-contract.context';
import { HostContractProvider } from './host-contract.provider';

const HostProviderTest: Component = () => {
  const { description, heading } = useHostContractContext();

  return (
    <div>
      <p data-testid="host-contract-title">{heading()}</p>
      <p data-testid="host-contract-description">{description()}</p>
    </div>
  );
};

describe('<HostContractProvider />', () => {
  it('should initialize the host contract with default props', () => {
    const { getByTestId, unmount } = render(() => (
      <HostContractProvider>
        <HostProviderTest />
      </HostContractProvider>
    ));
    expect(getByTestId('host-contract-title')).toHaveTextContent('Hello World');
    expect(getByTestId('host-contract-description')).toHaveTextContent(
      'A Solid.js with Tailwind web component scaffold.'
    );
    unmount();
  });

  it('should initialize the host contract with custom props', () => {
    const { getByTestId, unmount } = render(() => (
      <HostContractProvider
        description="A custom description."
        heading="Custom Title"
      >
        <HostProviderTest />
      </HostContractProvider>
    ));
    expect(getByTestId('host-contract-title')).toHaveTextContent(
      'Custom Title'
    );
    expect(getByTestId('host-contract-description')).toHaveTextContent(
      'A custom description.'
    );
    unmount();
  });

  it('should throw an error when context is used without provider', () => {
    expect(() => render(() => <HostProviderTest />)).toThrowError(
      'Host contract context not found.'
    );
  });
});
