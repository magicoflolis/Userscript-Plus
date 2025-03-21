export default {
  verbose: false,
  artifactsDir: './build',
  sourceDir: './build/firefox',
  ignoreFiles: [
    '*.web-extension-id',
    'web-ext-artifacts'
  ],
  build: {
    asNeeded: false,
    overwriteDest: true,
  },
  run: {
    devtools: true,
    firefox: 'deved',
    firefoxProfile: 'UserJS',
    target: ['firefox-desktop'],
    startUrl: ['https://www.google.com'],
    watchFile: ['./build/firefox']
  }
};
