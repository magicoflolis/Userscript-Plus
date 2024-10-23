import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

const userJSGlobals = {
  code: 'readonly',
  metadata: 'readonly',
  main_css: 'readonly',
  languageList: 'readonly',
  translations: 'readonly',
  userjs: 'writable',
  ...globals.es2023,
  ...globals.browser,
  ...globals.greasemonkey
};
const webextGlobals = {
  MU: 'writable',
  sleazyfork_redirect: 'readonly',
  webext: 'readonly',
  brws: 'readonly',
  userjs: 'writable',
  ...globals.es2023,
  ...globals.browser,
  ...globals.webextensions
};
const parserOptions = {
  allowImportExportEverywhere: false,
  ecmaFeatures: {
    globalReturn: true,
    arrowFunctions: true,
    modules: true
  }
};
const rules = {
  'keyword-spacing': ['error', { before: true }],
  'no-var': 'error',
  'prefer-const': ['error', { destructuring: 'all' }],
  'prefer-promise-reject-errors': 'error',
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  'space-before-blocks': ['error', 'always']
};

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/js/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: webextGlobals,
      parserOptions
    },
    rules
  },
  {
    files: ['src/UserJS/main.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: userJSGlobals,
      parserOptions
    },
    rules
  },
  {
    files: ['src/UserJS/header.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: userJSGlobals,
      parserOptions
    },
    rules: {
      ...rules,
      quotes: 'off',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['tools/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2021,
        ...globals.node
      },
      parserOptions
    },
    rules
  }
];
