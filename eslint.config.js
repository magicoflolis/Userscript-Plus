import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

const repoGlobals = {
  MU: 'writable',
  userjs: 'writable',
  boxCSS: 'readonly',
  main_css: 'readonly',
  custom_width: 'readonly',
  jaeFetchUserJSFrame: 'readonly',
  sleazyfork_redirect: 'readonly',
  webext: 'readonly',
  brws: 'readonly'
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
      globals: {
        ...repoGlobals,
        ...globals.browser,
        ...globals.webextensions
      },
      parserOptions
    },
    rules
  },
  {
    // files: ['**/*.js'],
    // ignores: ['src/UserJS/header.js', 'src/languages.js', 'dist/**/*.js'],
    files: ['src/UserJS/main.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        languageList: 'readonly',
        ...repoGlobals,
        ...globals.browser,
        ...globals.greasemonkey
      },
      parserOptions
    },
    rules
  },
  {
    files: ['tools/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...repoGlobals,
        ...globals.node
      },
      parserOptions
    },
    rules
  }
];
