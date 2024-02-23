'use strict'
import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    // files: ['**/*.js'],
    ignores: [
      'src/UserJS/header.js',
      // 'src/**/header.js',
      'src/languages.js',
      'tools/*.js',
      'dist/**/*.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        MU: 'writable',
        boxCSS: 'readonly',
        main_css: 'readonly',
        custom_width: 'readonly',
        jaeFetchUserJSFrame: 'readonly',
        sleazyfork_redirect: 'readonly',
        webext: 'readonly',
        brws: 'readonly',
        // ...globals.node,
        // ...globals.nodeBuiltin,
        ...globals.browser,
        ...globals.greasemonkey,
        ...globals.webextensions,
      },
      parserOptions: {
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: true,
          arrowFunctions: true,
          modules: true
        }
      },
    },
    rules: {
      'keyword-spacing': ['error', { before: true }],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: false },
      ],
      'space-before-blocks': ['error', 'always'],
    },
    // rules: {
    //   'keyword-spacing': ['error', { before: true }],
    //   'prefer-const': ['error', { destructuring: 'all' }],
    //   'prefer-promise-reject-errors': 'error',
    //   'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    //   'no-var': 'error',
    //   quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    //   'space-before-blocks': ['error', 'always'],
    // },
  },
]
