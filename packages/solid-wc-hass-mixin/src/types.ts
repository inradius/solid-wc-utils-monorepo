export interface CustomCardEntry {
  [key: string]: unknown;
  description: string;
  name: string;
  preview?: boolean;
  type: string;
}

export interface HomeAssistantElement extends HTMLElement {
  config?: LovelaceCardConfig;
  getCardSize(): number;
  setConfig(config: LovelaceCardConfig): void;
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
