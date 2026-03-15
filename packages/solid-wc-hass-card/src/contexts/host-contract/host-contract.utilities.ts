/**
 * Define the allowed host contract props for the web component.
 * Prevents using HTML global attributes as property names.
 * @param props
 * @returns
 */
export const defineHostContractProps = <T extends Record<string, unknown>>(
  props: {
    [K in keyof T]: K extends
      | 'accesskey'
      | 'class'
      | 'contenteditable'
      | 'dir'
      | 'draggable'
      | 'hidden'
      | 'id'
      | 'lang'
      | 'part'
      | 'role'
      | 'slot'
      | 'spellcheck'
      | 'style'
      | 'tabindex'
      | 'title'
      | 'translate'
      ? never
      : K extends `data-${string}`
        ? never
        : K extends `aria-${string}`
          ? never
          : T[K];
  } & T
): T => props;
