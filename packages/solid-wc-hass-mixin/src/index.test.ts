import withHomeAssistant from './index';
import type { LovelaceCardConfig } from './types';
import type { ComponentType } from 'component-register';

type CustomWindow = { customCards: unknown[] } & Window;

interface HomeAssistantElement extends HTMLElement {
  config?: LovelaceCardConfig;
  getCardSize(): number;
  setConfig(config: LovelaceCardConfig): void;
}

describe('withHomeAssistant', () => {
  beforeEach(() => {
    (window as unknown as CustomWindow).customCards = [];
  });

  it('should return a function that wraps a component', () => {
    const mixin = withHomeAssistant({
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
    });

    expect(typeof mixin).toBe('function');
  });

  it('should register the card in window.customCards', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    expect((window as unknown as CustomWindow).customCards).toHaveLength(1);
    expect((window as unknown as CustomWindow).customCards[0]).toEqual({
      description: 'A test card',
      name: 'Test Card',
      type: 'test-card',
    });
  });

  it('should add setConfig method to prototype', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    expect(TestElement.prototype).toHaveProperty('setConfig');
    expect(
      typeof (TestElement.prototype as unknown as HomeAssistantElement)
        .setConfig
    ).toBe('function');
  });

  it('should add getCardSize method to prototype', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      cardSize: 5,
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    expect(TestElement.prototype).toHaveProperty('getCardSize');
    const size = (
      TestElement.prototype as unknown as HomeAssistantElement
    ).getCardSize();
    expect(size).toBe(5);
  });

  it('should use default cardSize of 3 if not provided', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    const size = (
      TestElement.prototype as unknown as HomeAssistantElement
    ).getCardSize();
    expect(size).toBe(3);
  });

  it('should merge defaultConfig with provided config in setConfig', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
      defaultConfig: {
        layout: 'vertical',
        name: 'Default Name',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    customElements.define('test-merge-config', TestElement);
    const instance = document.createElement(
      'test-merge-config'
    ) as unknown as HomeAssistantElement;
    instance.setConfig({ name: 'Custom Name', type: 'test-card' });

    expect(instance.config).toEqual({
      layout: 'vertical',
      name: 'Custom Name',
      type: 'test-card',
    });
  });

  it('should throw error if config is not provided to setConfig', () => {
    class TestElement extends HTMLElement {}

    const mixin = withHomeAssistant({
      customCard: {
        description: 'A test card',
        name: 'Test Card',
        type: 'test-card',
      },
    });

    mixin(TestElement as ComponentType<unknown>);

    customElements.define('test-throw-error', TestElement);
    const instance = document.createElement(
      'test-throw-error'
    ) as unknown as HomeAssistantElement;

    expect(() =>
      instance.setConfig(null as unknown as LovelaceCardConfig)
    ).toThrow('Invalid configuration');
  });
});
