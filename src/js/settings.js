'use strict';
import { err } from './logger.js';
import { XMap } from './XMap.js';
import { i18n$ } from './i18n.js';
import { dom, qs } from './querySelector.js';
import { ael, make, isNull, isEmpty } from './util.js';

let cfg = {};

const { hermes } = userjs;

const renderTheme = (theme) => {
  theme = theme || cfg.theme;
  if (isEmpty(theme)) {
    return;
  }
  // if (theme === defcfg.theme) {
  //   return;
  // }
  const sty = qs('mujs-root').style;
  for (const [k, v] of Object.entries(theme)) {
    const str = `--mujs-${k}`;
    const prop = sty.getPropertyValue(str);
    if (isEmpty(v)) {
      theme[k] = prop;
    }
    if (prop === v) {
      continue;
    }
    sty.removeProperty(str);
    sty.setProperty(str, v);
  }
};

const cfgMap = new XMap();

//#region Make Config
const cfgpage = qs('form');
const makecfg = () => {
  const exBtn = make('mu-js', 'mujs-sty-flex');
  const exportCFG = make('mujs-btn', 'mujs-export', {
    textContent: i18n$('export_config'),
    dataset: {
      command: 'export-cfg'
    }
  });
  const importCFG = make('mujs-btn', 'mujs-import', {
    textContent: i18n$('import_config'),
    dataset: {
      command: 'import-cfg'
    }
  });
  const exportTheme = make('mujs-btn', 'mujs-export', {
    textContent: i18n$('export_theme'),
    dataset: {
      command: 'export-theme'
    }
  });
  const importTheme = make('mujs-btn', 'mujs-import', {
    textContent: i18n$('import_theme'),
    dataset: {
      command: 'import-theme'
    }
  });
  exBtn.append(importCFG, importTheme, exportCFG, exportTheme);
  cfgpage.append(exBtn);

  const makerow = (desc, type = null, nm, attrs = {}) => {
    desc = desc ?? i18n$('no_license');
    nm = nm ?? i18n$('no_license');
    const sec = make('mujs-section', 'mujs-cfg-section', {
      style: nm === 'cache' ? 'display: none;' : ''
    });
    const lb = make('label');
    const divDesc = make('mu-js', 'mujs-cfg-desc', {
      textContent: desc
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
    if (!cfgMap.has(nm)) {
      cfgMap.set(nm, inp);
    }
    if (type === 'checkbox') {
      const inlab = make('mu-js', 'mujs-inlab');
      const la = make('label', '', {
        onclick() {
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
          inp.dataset.engine = i.name;
          ael(inp, 'change', (evt) => {
            // MUJS.unsaved = true;
            // MUJS.rebuild = true;
            i.enabled = evt.target.checked;
            hermes.send('Save', {
              prop: 'engines',
              value: cfg.engines
            });
          });
        }
      } else {
        inp.checked = cfg[nm];
        ael(inp, 'change', (evt) => {
          // MUJS.unsaved = true;
          // if (/filterlang/i.test(nm)) {
          //   MUJS.rebuild = true;
          // }
          cfg[nm] = evt.target.checked;
          hermes.send('Save', {
            prop: nm,
            value: cfg[nm]
          });
        });
      }
    } else {
      lb.append(inp);
    }
    return inp;
  };
  makerow('Sync with GM', 'checkbox', 'cache');
  makerow(i18n$('redirect'), 'checkbox', 'sleazyredirect');
  makerow(i18n$('filter'), 'checkbox', 'filterlang');
  makerow(i18n$('preview_code'), 'checkbox', 'codePreview');
  for (const inp of [
    makerow('Recommend author', 'checkbox', 'recommend-author'),
    makerow('Recommend scripts', 'checkbox', 'recommend-others')
  ]) {
    const nm = inp.dataset.name === 'recommend-author' ? 'author' : 'others';
    inp.checked = cfg.recommend[nm];
    ael(inp, 'change', (evt) => {
      // MUJS.unsaved = true;
      cfg.recommend[nm] = evt.target.checked;
      hermes.send('Save', {
        prop: 'recommend',
        value: cfg.recommend
      });
    });
  }
  makerow('Greasy Fork', 'checkbox', 'greasyfork');
  makerow('Sleazy Fork', 'checkbox', 'sleazyfork');
  makerow('Open UserJS', 'checkbox', 'openuserjs');
  makerow('GitHub API', 'checkbox', 'github');
  const ghAPI = cfg.engines.find((c) => c.name === 'github');
  const ghToken = makerow('GitHub API (Token)', 'text', 'github', {
    defaultValue: '',
    value: ghAPI.token ?? '',
    placeholder: 'Paste Access Token'
    // onchange(evt) {
    //   MUJS.unsaved = true;
    //   MUJS.rebuild = true;
    //   if (isNull(legacyMsg)) {
    //     ghAPI.token = evt.target.value;
    //   }
    // }
  });
  ghToken.dataset.engine = 'github-token';
  cfgMap.set('github-token', ghToken);
  makerow(`${i18n$('dtime')} (ms)`, 'number', 'time', {
    defaultValue: 10000,
    value: cfg.time,
    min: 0,
    step: 500,
    onbeforeinput(evt) {
      if (evt.target.validity.badInput) {
        dom.cl.add(evt.target, 'mujs-invalid');
        dom.prop(savebtn, 'disabled', true);
      } else {
        dom.cl.remove(evt.target, 'mujs-invalid');
        dom.prop(savebtn, 'disabled', false);
      }
    },
    oninput(evt) {
      // MUJS.unsaved = true;
      const t = evt.target;
      if (t.validity.badInput || (t.validity.rangeUnderflow && t.value !== '-1')) {
        dom.cl.add(t, 'mujs-invalid');
        dom.prop(savebtn, 'disabled', true);
      } else {
        dom.cl.remove(t, 'mujs-invalid');
        dom.prop(savebtn, 'disabled', false);
        cfg.time = isEmpty(t.value) ? cfg.time : parseFloat(t.value);
      }
    }
  });

  const cbtn = make('mu-js', 'mujs-sty-flex');
  const savebtn = make('mujs-btn', 'save', {
    textContent: i18n$('save'),
    dataset: {
      command: 'save'
    },
    disabled: false
  });
  const resetbtn = make('mujs-btn', 'reset', {
    textContent: i18n$('reset'),
    dataset: {
      command: 'reset'
    }
  });
  const blacklist = make('textarea', '', {
    dataset: {
      name: 'blacklist'
    },
    rows: '10',
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
          dom.prop(savebtn, 'disabled', false);
        } else {
          dom.cl.add(evt.target, 'mujs-invalid');
          dom.prop(savebtn, 'disabled', true);
        }
      }
    }
  });
  const theme = make('textarea', '', {
    dataset: {
      name: 'theme'
    },
    rows: '10',
    autocomplete: false,
    spellcheck: false,
    wrap: 'soft',
    value: JSON.stringify(cfg.theme, null, ' '),
    oninput(evt) {
      let isvalid = true;
      try {
        cfg.theme = JSON.parse(evt.target.value);
        isvalid = true;
        renderTheme(JSON.parse(evt.target.value));
      } catch (ex) {
        err(ex);
        isvalid = false;
      } finally {
        if (isvalid) {
          dom.cl.remove(evt.target, 'mujs-invalid');
          dom.prop(savebtn, 'disabled', false);
        } else {
          dom.cl.add(evt.target, 'mujs-invalid');
          dom.prop(savebtn, 'disabled', true);
        }
      }
    }
  });
  cfgMap.set('blacklist', blacklist);
  cfgMap.set('theme', theme);
  cbtn.append(resetbtn, savebtn);
  cfgpage.append(blacklist, theme, cbtn);
};
//#endregion

/**
 * @type {chrome.runtime.Port | browser.runtime.Port | null}
 */
const p = hermes.getPort();
p.onMessage.addListener((root = {}) => {
  const m = root.msg;
  if (root.channel === 'Config' && isEmpty(cfg)) {
    cfg = m.cfg || cfg;
    makecfg();
  }
});
