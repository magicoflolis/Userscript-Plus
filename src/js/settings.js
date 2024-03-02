'use strict';
import { err, log } from './logger.js';
// eslint-disable-next-line no-unused-vars
import { dom, qs } from './querySelector.js';
let cfg = {};

const make = userjs.make;
const ael = userjs.ael;
const isNull = userjs.isNull;

const lang = (txt) => webext.i18n.getMessage(txt);

const cfgpage = qs('form');
const makecfg = () => {
  const makerow = (desc = 'Placeholder', type = null, nm = 'Placeholder', attrs = {}) => {
    const sec = make('mujs-section', 'mujs-cfg-section');
    const lb = make('label');
    const divDesc = make('mu-js', 'mujs-cfg-desc', {
      innerHTML: desc
    });
    lb.append(divDesc);
    sec.append(lb);
    cfgpage.append(sec);
    if (isNull(type)) {
      return lb;
    }
    const inp = make('input', 'mujs-cfg-input', {
      type,
      dataset: {
        name: nm
      },
      ...attrs
    });
    if (type === 'checkbox') {
      const inlab = make('mu-js', 'mujs-inlab');
      const la = make('label', '', {
        click() {
          inp.dispatchEvent(new MouseEvent('click'));
        }
      });
      inlab.append(inp, la);
      lb.append(inlab);
      if (nm.includes('-')) {
        return inp;
      }
      if (/(greasy|sleazy)fork|openuserjs|gi(thub|st)/gi.test(nm)) {
        for (const i of cfg.engines) {
          if (i.name !== nm) continue;
          inp.checked = i.enabled;
          ael(inp, 'change', (evt) => {
            i.enabled = evt.target.checked;
            userjs.hermes.send('Save', {
              prop: 'engines',
              value: cfg.engines,
            });
          });
        }
      } else {
        inp.checked = cfg[nm];
        ael(inp, 'change', (evt) => {
          // if (/filterlang/i.test(nm)) {
          //   MUJS.rebuild = true;
          // }
          cfg[nm] = evt.target.checked;

          userjs.hermes.send('Save', {
            prop: nm,
            value: cfg[nm],
          });
        });
      }
    } else {
      lb.append(inp);
    }
    return inp;
  };
  makerow(lang('redirect'), 'checkbox', 'sleazyredirect');
  makerow(lang('filter'), 'checkbox', 'filterlang');
  makerow('Preview code', 'checkbox', 'codePreview');
  for (const inp of [
    makerow('Recommend author', 'checkbox', 'recommend-author'),
    makerow('Recommend scripts', 'checkbox', 'recommend-others')
  ]) {
    const nm = inp.dataset.name === 'recommend-author' ? 'author' : 'others';
    inp.checked = cfg.recommend[nm];
    ael(inp, 'change', (evt) => {
      cfg.recommend[nm] = evt.target.checked;
      userjs.hermes.send('Save', {
        prop: 'recommend',
        value: cfg.recommend,
      });
    });
  }
  makerow('Greasy Fork', 'checkbox', 'greasyfork');
  makerow('Sleazy Fork', 'checkbox', 'sleazyfork');
  makerow('Open UserJS', 'checkbox', 'openuserjs');
  makerow('GitHub API', 'checkbox', 'github');
  const ghAPI = cfg.engines.find((c) => c.name === 'github');
  makerow('GitHub API (Token)', 'text', 'github', {
    defaultValue: '',
    value: ghAPI.token ?? '',
    placeholder: 'Paste Access Token',
    // onchange(evt) {
    //   MUJS.rebuild = true;
    //   if (isNull(legacyMsg)) {
    //     ghAPI.token = evt.target.value;
    //   }
    // }
  });

  const cbtn = make('mu-js', 'mujs-sty-flex');
  const resetbtn = make('mujs-btn', 'reset', {
    innerHTML: lang('reset'),
    dataset: {
      command: 'reset'
    }
  });
  const txta = make('textarea', 'tarea', {
    dataset: {
      name: 'blacklist'
    },
    rows: '33',
    autocomplete: false,
    spellcheck: false,
    wrap: 'soft',
    value: JSON.stringify(cfg.blacklist, null, ' '),
    oninput(evt) {
      let isvalid = true;
      try {
        cfg.blacklist = JSON.parse(evt.target.value);
        isvalid = true;
      } catch (ex) {
        err(ex);
        isvalid = false;
      } finally {
        if (isvalid) {
          dom.cl.remove(evt.target, 'mujs-invalid');
        } else {
          dom.cl.add(evt.target, 'mujs-invalid');
        }
      }
    }
  });
  cbtn.append(resetbtn);
  cfgpage.append(txta, cbtn);
};


userjs.hermes.getPort().onMessage.addListener((root = {}) => {
  const m = root.msg;
  log('Settings',root);
  if (root.channel === 'Config' && userjs.isEmpty(cfg)) {
    cfg = m.cfg || cfg;
    makecfg();
  }
});
