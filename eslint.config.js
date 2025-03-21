import { defineConfig } from 'eslint/config';

import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      'space-before-blocks': ['error', 'always']
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.es2024
    }
  },
  {
    files: ['src/js/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions
      }
    }
  },
  {
    files: ['src/UserJS/main.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        main_css: 'readonly',
        translations: 'writable',
        userjs: 'writable',
        ...globals.browser,
        ...globals.greasemonkey
      }
    }
  },
  {
    files: ['src/UserJS/header.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        code: 'readonly',
        metadata: 'readonly',
        languageList: 'readonly',
        ...globals.browser
      }
    },
    rules: {
      quotes: 'off',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['tools/*.js', 'utils/**/*.js'],
    languageOptions: {
      globals: globals.node
    }
  }
]);
