import type { ComponentType } from 'component-register';
import {
  HomeAssistantElement,
  HomeAssistantOptions,
  LovelaceCardConfig,
} from './types';

const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const sanitize = <T extends Record<string, unknown>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !UNSAFE_KEYS.has(key))
  ) as T;

const withHomeAssistant = (options: HomeAssistantOptions) => {
  const { cardSize = 3, customCard, defaultConfig = {} } = options;

  return <T>(ElementType: ComponentType<T>): ComponentType<T> => {
    const proto = (ElementType as CustomElementConstructor)
      .prototype as HomeAssistantElement;
    const win = window as unknown as { customCards: unknown[] } & Window;
    win.customCards = win.customCards || [];

    proto.setConfig = function (config: LovelaceCardConfig) {
      if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error('Invalid configuration');
      }
      this.config = { ...sanitize(defaultConfig), ...sanitize(config) };
    };

    proto.getCardSize = function () {
      return cardSize;
    };

    win.customCards.push(sanitize(customCard));

    return ElementType;
  };
};

export default withHomeAssistant;
