'use strict';
import { err, log } from './logger.js';
// eslint-disable-next-line no-unused-vars
import { qs } from './querySelector.js';
let config = {};

async function main() {
  try {
    const ff = qs('form');
    const grab = await MU.fetchURL('form.html', 'GET', 'text');
    ff.innerHTML = grab;
    for (let prop in config) {
      if(prop in ff.elements) {
        ff.elements[prop].type == 'checkbox'
          ? (ff.elements[prop].checked = config[prop])
          : (ff.elements[prop].value = config[prop]);
        if(prop === 'blacklist') {
          ff.elements[prop].value = JSON.stringify(config[prop], null, ' ')
        }
      }
    };
    for(let e of config.engines) {
      if(e.name in ff.elements) {
        ff.elements[e.name].checked = e.enabled;
      }
    };
    MU.ael(ff, 'change', (e) => {
      let $el = /** @type {HTMLInputElement} */ (e.target);
      let isEngine = config.engines.filter((en) => {
        return en.name === $el.name
      });
      if(MU.isEmpty(isEngine)) {
        $el.type == 'checkbox'
        ? (config[$el.name] = $el.checked)
        : (config[$el.name] = $el.value);
        MU.hermes.send('Save', {
          save: $el.name,
          params: config[$el.name],
        });
      } else {
        config.engines[$el.name] = $el.checked;
        MU.hermes.send('Save', {
          save: $el.name,
          params: config.engines[$el.name],
        });
      };
    });
    MU.ael(qs('.reset'), 'click', () => {
      MU.hermes.send('Reset', { });
    });
  } catch (ex) {
    err(ex)
  }
}

MU.hermes.getPort().onMessage.addListener((root = {}) => {
  const m = root.msg;
  log('Settings',root);
  if (root.channel === 'Config' && MU.isEmpty(config)) {
    config = m.cfg || config;
    main();
  }
});
