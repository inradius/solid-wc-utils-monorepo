import * as sortImports from '@trivago/prettier-plugin-sort-imports';
import type { Config } from 'prettier';

const config: Config = {
  importOrder: [
    ',^node:(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@?\\w',
    '^@inradius/(.*)$',
    '^[./]',
    '^[./].*\\.css$',
  ],
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    'classProperties',
    'decorators-legacy',
    'jsx',
    'typescript',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: [sortImports],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};

export default config;
