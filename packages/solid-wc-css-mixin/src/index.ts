import { createMixin } from 'component-register';

const withCSS = (styles: string) =>
  createMixin((options) => {
    const { element } = options;
    const stylesheet = new CSSStyleSheet();
    if ('adoptedStyleSheets' in element.renderRoot) {
      stylesheet.replaceSync(styles);
      element.renderRoot.adoptedStyleSheets = [
        ...element.renderRoot.adoptedStyleSheets,
        stylesheet,
      ];
    }
    return { ...options, element };
  });

export default withCSS;
