import { JSX } from 'solid-js';

type CustomElement<T extends HTMLElement> = JSX.HTMLAttributes<T> | Partial<T>;

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'ha-card': CustomElement<HTMLElement>;
    }
  }
}
