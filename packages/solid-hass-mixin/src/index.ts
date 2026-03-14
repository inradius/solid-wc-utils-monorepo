import type { ComponentType } from 'component-register';

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

export interface HomeAssistantOptions {
  defaultConfig?: Record<string, unknown>;
  customCard: CustomCardEntry;
  cardSize?: number;
}

interface HomeAssistantElement extends HTMLElement {
  config?: LovelaceCardConfig;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize(): number;
}

const withHomeAssistant = (options: HomeAssistantOptions) => {
  const { defaultConfig = {}, customCard, cardSize = 3 } = options;

  return <T>(ElementType: ComponentType<T>): ComponentType<T> => {
    const proto = (ElementType as CustomElementConstructor)
      .prototype as HomeAssistantElement;
    const win = window as unknown as Window & { customCards: unknown[] };
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
