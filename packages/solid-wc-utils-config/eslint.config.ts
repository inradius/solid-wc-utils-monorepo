import type { Linter } from 'eslint';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import solid from 'eslint-plugin-solid/configs/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['coverage', 'dist', 'node_modules']),
  perfectionist.configs['recommended-alphabetical'],
  eslint.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
  } as unknown as Linter.Config,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      'import-x': importPlugin,
    },
    rules: {
      'import-x/no-duplicates': 'error',
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },
  },
  {
    rules: {
      'perfectionist/sort-imports': 'off',
    },
  },
  prettier,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.turbo/**',
    ],
  }
);
