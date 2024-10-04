module.exports = {
  artifactsDir: './build',
  sourceDir: './build/firefox',
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
    watchFile: ['./build/firefox/*']
  },
  ignoreFiles: [
    '*.web-extension-id',
    'web-ext-artifacts'
  ],
};
