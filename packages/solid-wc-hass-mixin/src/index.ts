import type { ComponentType } from 'component-register';

export interface CustomCardEntry {
  description: string;
  name: string;
  preview?: boolean;
  type: string;
}

export interface HomeAssistantOptions {
  cardSize?: number;
  customCard: CustomCardEntry;
  defaultConfig?: Record<string, unknown>;
}

export interface LovelaceCardConfig {
  [key: string]: unknown;
  type: string;
}

interface HomeAssistantElement extends HTMLElement {
  config?: LovelaceCardConfig;
  getCardSize(): number;
  setConfig(config: LovelaceCardConfig): void;
}

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
