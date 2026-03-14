import withCSS from './index';

vi.mock('component-register', () => ({
  createMixin: vi.fn((cb: unknown) => cb),
}));

describe('withCSS', () => {
  it('should return a function that wraps a component', () => {
    const mixin = withCSS('');

    expect(typeof mixin).toBe('function');
  });

  describe('mixin callback', () => {
    let mockReplaceSync: ReturnType<typeof vi.fn>;
    let mockStylesheet: Partial<CSSStyleSheet>;
    let originalCSSStyleSheet: typeof CSSStyleSheet;

    beforeEach(() => {
      mockReplaceSync = vi.fn();
      mockStylesheet = { replaceSync: mockReplaceSync };
      originalCSSStyleSheet = globalThis.CSSStyleSheet;
      globalThis.CSSStyleSheet = vi.fn(
        () => mockStylesheet
      ) as unknown as typeof CSSStyleSheet;
    });

    afterEach(() => {
      globalThis.CSSStyleSheet = originalCSSStyleSheet;
    });

    it('calls replaceSync with the given styles when adoptedStyleSheets is supported', () => {
      const renderRoot = { adoptedStyleSheets: [] as CSSStyleSheet[] };
      const element = { renderRoot };

      (withCSS('h1 { color: blue; }') as CallableFunction)({ element });

      expect(mockReplaceSync).toHaveBeenCalledWith('h1 { color: blue; }');
    });

    it('appends the new stylesheet to existing adoptedStyleSheets', () => {
      const existing = {} as CSSStyleSheet;
      const renderRoot = { adoptedStyleSheets: [existing] };
      const element = { renderRoot };

      (withCSS('.cls {}') as CallableFunction)({ element });

      expect(renderRoot.adoptedStyleSheets).toHaveLength(2);
      expect(renderRoot.adoptedStyleSheets[0]).toBe(existing);
      expect(renderRoot.adoptedStyleSheets[1]).toBe(mockStylesheet);
    });

    it('does not call replaceSync when renderRoot does not support adoptedStyleSheets', () => {
      const renderRoot = {};
      const element = { renderRoot };

      (withCSS('h1 {}') as CallableFunction)({ element });

      expect(mockReplaceSync).not.toHaveBeenCalled();
    });

    it('does not modify renderRoot when adoptedStyleSheets is not supported', () => {
      const renderRoot = {};
      const element = { renderRoot };

      (withCSS('h1 {}') as CallableFunction)({ element });

      expect(renderRoot).toEqual({});
    });

    it('returns the full options object with element', () => {
      const renderRoot = { adoptedStyleSheets: [] as CSSStyleSheet[] };
      const element = { renderRoot };
      const options = { element, extra: 'value' };

      const result = (withCSS('') as CallableFunction)(options);

      expect(result).toEqual({ ...options, element });
    });
  });
});
