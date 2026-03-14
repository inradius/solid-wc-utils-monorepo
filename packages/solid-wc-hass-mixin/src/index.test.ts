import type { ComponentType } from 'component-register';

import withHomeAssistant from './index';
import type { LovelaceCardConfig } from './index';

interface HomeAssistantElement extends HTMLElement {
  config?: LovelaceCardConfig;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize(): number;
}

type CustomWindow = Window & { customCards: unknown[] };

describe('withHomeAssistant', () => {
  beforeEach(() => {
    (window as unknown as CustomWindow).customCards = [];
  });

  it('should return a function that wraps a component', () => {
    const mixin = withHomeAssistant({
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
    });

    expect(typeof mixin).toBe('function');
  });

  it('should register the card in window.customCards', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    expect((window as unknown as CustomWindow).customCards).toHaveLength(1);
    expect((window as unknown as CustomWindow).customCards[0]).toEqual({
      type: 'test-card',
      name: 'Test Card',
      description: 'A test card',
    });
  });

  it('should add setConfig method to prototype', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    expect(TestElement.prototype).toHaveProperty('setConfig');
    expect(typeof (TestElement.prototype as unknown as HomeAssistantElement).setConfig).toBe('function');
  });

  it('should add getCardSize method to prototype', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
      cardSize: 5,
    });

    mixin(TestElement as ComponentType<unknown>);

    expect(TestElement.prototype).toHaveProperty('getCardSize');
    const size = (TestElement.prototype as unknown as HomeAssistantElement).getCardSize();
    expect(size).toBe(5);
  });

  it('should use default cardSize of 3 if not provided', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    const size = (TestElement.prototype as unknown as HomeAssistantElement).getCardSize();
    expect(size).toBe(3);
  });

  it('should merge defaultConfig with provided config in setConfig', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      defaultConfig: {
        name: 'Default Name',
        layout: 'vertical',
      },
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    customElements.define('test-merge-config', TestElement);
    const instance = document.createElement('test-merge-config') as unknown as HomeAssistantElement;
    instance.setConfig({ type: 'test-card', name: 'Custom Name' });

    expect(instance.config).toEqual({
      name: 'Custom Name',
      layout: 'vertical',
      type: 'test-card',
    });
  });

  it('should throw error if config is not provided to setConfig', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        type: 'test-card',
        name: 'Test Card',
        description: 'A test card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    customElements.define('test-throw-error', TestElement);
    const instance = document.createElement('test-throw-error') as unknown as HomeAssistantElement;

    expect(() => instance.setConfig(null as unknown as LovelaceCardConfig)).toThrow('Invalid configuration');
  });
});
