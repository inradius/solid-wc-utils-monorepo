import type { ComponentType } from 'component-register';
import {
  HomeAssistantElement,
  HomeAssistantOptions,
  LovelaceCardConfig,
} from './types';

const withHomeAssistant = (options: HomeAssistantOptions) => {
  const { cardSize = 3, customCard, defaultConfig = {} } = options;

  return <T>(ElementType: ComponentType<T>): ComponentType<T> => {
    const proto = (ElementType as CustomElementConstructor)
      .prototype as HomeAssistantElement;
    const win = window as unknown as { customCards: unknown[] } & Window;
    win.customCards = win.customCards || [];

    proto.setConfig = function (config: LovelaceCardConfig) {
      if (!config) {
        throw new Error('Invalid configuration');
      }
      this.config = { ...defaultConfig, ...config };
    };

    proto.getCardSize = function () {
      return cardSize;
    };

    win.customCards.push({ ...customCard });

    return ElementType;
  };
};

export default withHomeAssistant;
