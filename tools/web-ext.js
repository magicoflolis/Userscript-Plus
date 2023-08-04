module.exports = {
  artifactsDir: './build',
  sourceDir: './tests/firefox',
  verbose: true,
  build: {
    asNeeded: false,
    overwriteDest: true,
  },
  run: {
    args: ['-devtools'],
    firefox: 'firefox',
    firefoxProfile: 'debug',
    startUrl: ['https://www.google.com'],
    watchFile: ['./tests/firefox/*']
  },
  ignoreFiles: [
    '*.web-extension-id',
    'web-ext-artifacts'
  ],
};
