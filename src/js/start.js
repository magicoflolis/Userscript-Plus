'use strict';
import { log } from './logger.js';
// import { qs, qsA } from './querySelector.js';

let messenger = MU.hermes.getPort();
let config = {},
  win = self ?? window,
  doc = win.document;

function loadSetup() {
  log(config);
}

messenger.onMessage.addListener((root = {}) => {
  const m = root.msg;
  log('Start',root);
  if (root.channel === 'Config' && MU.isEmpty(config)) {
    config = m.cfg || config;
    if (Object.is(doc.readyState, 'interactive')) {
      loadSetup();
    } else {
      MU.ael(doc, 'readystatechange', (event) => {
        const evt = event.target ?? doc;
        if (Object.is(evt.readyState, 'interactive')) {
          loadSetup();
        }
      });
    }
  }
});
