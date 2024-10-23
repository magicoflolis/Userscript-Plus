'use strict';
import { err, log, info } from './logger.js';
import { i18n$ } from './i18n.js';
import { dom, normalizeTarget, qs, qsA } from './querySelector.js';
import { reqCode, parse_meta } from './request-code.js';
import { ael, make, isBlank, isNull, isEmpty, isObj, isString, hasOwn, openInTab } from './util.js';
import { XMap } from './XMap.js';

/**
 * @type { import("../typings/types").config }
 */
let cfg = {};

const { hermes } = userjs;

// Lets highlight me :)
const authorID = 166061;
// Some UserJS I personally enjoy
const goodUserJS = [
  423001,
  376510,
  23840,
  40525,
  6456,
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js',
  'https://github.com/jesus2099/konami-command/raw/master/INSTALL-USER-SCRIPT.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.user.js'
];
const iconSVG = {
  install: {
    viewBox: '0 0 16 16',
    html: '<g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g>'
  },
  search: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill="currentColor"/></g>'
  },
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  refresh: {
    viewBox: '0 0 1024 1024',
    fill: 'currentColor',
    html: '<path d="M981.314663 554.296783a681.276879 681.276879 0 0 1-46.986468 152.746388q-105.706098 230.734238-360.983096 242.19829a593.06288 593.06288 0 0 1-228.689008-33.853939v-1.022615l-31.808709 79.979258a55.759429 55.759429 0 0 1-20.506122 22.551352 40.043451 40.043451 0 0 1-21.04434 5.382184 51.076928 51.076928 0 0 1-19.483507-5.382184 95.210839 95.210839 0 0 1-13.347817-7.158305 52.314831 52.314831 0 0 1-5.382184-4.628679L71.671707 731.908862a57.427906 57.427906 0 0 1-7.158305-21.528737 46.932646 46.932646 0 0 1 1.022615-17.438277 35.952991 35.952991 0 0 1 7.158305-13.347816 74.435608 74.435608 0 0 1 10.279972-10.279972 60.495751 60.495751 0 0 1 11.248765-7.373593 50.431066 50.431066 0 0 1 8.18092-3.606063 6.189512 6.189512 0 0 0 3.067845-1.776121l281.003839-74.866183a91.497132 91.497132 0 0 1 35.899168-2.583448 122.337047 122.337047 0 0 1 22.174599 6.404799 21.528737 21.528737 0 0 1 12.325202 12.325202 76.157907 76.157907 0 0 1 4.628679 14.854829 47.63233 47.63233 0 0 1 0 14.370431 55.167388 55.167388 0 0 1-2.04523 10.764369 10.764368 10.764368 0 0 0-1.022615 3.606063l-32.831324 79.979258a677.50935 677.50935 0 0 0 164.264262 39.505232q77.395809 7.696523 131.809692-3.606063a358.507291 358.507291 0 0 0 101.023598-36.921784 381.27393 381.27393 0 0 0 73.951211-50.753997 352.64071 352.64071 0 0 0 48.708767-55.382676 410.391547 410.391547 0 0 0 26.910921-41.550462c3.767529-7.481236 6.673908-13.616926 8.719139-18.460892zM40.885614 449.667121a685.69027 685.69027 0 0 1 63.563595-176.427998q118.0313-212.273346 374.330913-207.160271a571.803252 571.803252 0 0 1 207.160271 39.989629l33.853939-78.956643A75.619688 75.619688 0 0 1 735.187378 9.189165a37.67529 37.67529 0 0 1 15.393047-8.234742 42.303968 42.303968 0 0 1 14.854829-0.538219 47.578509 47.578509 0 0 1 13.347817 3.606064 102.907362 102.907362 0 0 1 11.302586 6.13569 49.569917 49.569917 0 0 1 6.673909 4.628678l3.067845 3.067845 154.84544 276.913379a81.970666 81.970666 0 0 1 6.13569 22.712817 46.986468 46.986468 0 0 1-1.022615 17.438277 32.293105 32.293105 0 0 1-7.696523 13.347817 69.322533 69.322533 0 0 1-10.764369 9.741753 92.142994 92.142994 0 0 1-11.302587 6.673909l-8.18092 4.09046a7.104483 7.104483 0 0 1-3.067845 1.022615l-283.049068 67.546412a112.003254 112.003254 0 0 1-46.125319-1.022615c-11.571696-3.390776-19.160576-8.019454-22.551352-13.832214a41.173709 41.173709 0 0 1-5.382184-21.04434 97.256069 97.256069 0 0 1 1.291724-17.438277 24.381295 24.381295 0 0 1 3.067845-8.234742L600.632773 296.81309a663.730958 663.730958 0 0 0-164.102797-43.057474q-77.987849-9.203535-131.809692 0a348.227319 348.227319 0 0 0-101.292707 33.853938 368.571976 368.571976 0 0 0-75.350579 49.246986 383.31916 383.31916 0 0 0-50.269601 54.360061 408.507783 408.507783 0 0 0-28.740863 41.012244A113.025869 113.025869 0 0 0 40.885614 449.667121z m0 0" fill="#ffffff" p-id="2275"></path>'
  },
  // get(type, container) {
  //   return new Promise((resolve) => {
  //     const img = new Image();
  //     img.src = webext.runtime.getURL(`/img/${type}.svg`);
  //     img.onload = () => {
  //       if (container) {
  //         container.appendChild(img);
  //       }
  //       resolve(img);
  //     }
  //   })
  // },
  load(type, container) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svgElem = document.createElementNS(xmlns, 'svg');
    for (const [k, v] of Object.entries(iconSVG[type])) {
      if (k === 'html') {
        continue;
      }
      svgElem.setAttributeNS(null, k, v);
    }
    if (isString(iconSVG[type].html)) {
      svgElem.innerHTML = iconSVG[type].html;
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};

const main = qs('mujs-main');
const cfgpage = qs('form');
const footer = qs('.mujs-footer');
const rateContainer = qs('.rate-container');

const table = qs('table');
const tabbody = qs('tbody');
const tabhead = qs('thead');

const urlBar = qs('.mujs-url-bar');
const btncfg = qs('mujs-btn.settings');
const btngreasy = qs('mujs-btn.greasy');
const btnissue = qs('mujs-btn.issue');
const btnhome = qs('mujs-btn.github');

const toolbar = qs('mujs-toolbar');

const promptElem = make('mujs-row', 'mujs-prompt');
main.append(promptElem);

const makeTHead = (rows) => {
  const tr = make('tr');
  for (const r of normalizeTarget(rows)) {
    const tparent = make('th', r.class ?? '', r);
    tr.append(tparent);
  }
  tabhead.append(tr);
  table.append(tabhead, tabbody);
};
makeTHead([
  {
    class: 'mujs-header-name',
    textContent: i18n$('name')
  },
  {
    textContent: i18n$('createdby')
  },
  {
    textContent: i18n$('daily_installs')
  },
  {
    textContent: i18n$('updated')
  },
  {
    textContent: i18n$('install')
  }
]);

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
const rebuildCfg = () => {
  for (const engine of cfg.engines) {
    if (cfgMap.has(engine.name)) {
      const inp = cfgMap.get(engine.name);
      inp.checked = engine.enabled;
      if (engine.name === 'github') {
        const txt = cfgMap.get('github-token');
        dom.prop(txt, 'value', engine.token);
      }
    }
  }
  for (const [k, v] of Object.entries(cfg)) {
    if (typeof v === 'boolean') {
      if (cfgMap.has(k)) {
        const inp = cfgMap.get(k);
        if (inp.type === 'checkbox') {
          inp.checked = v;
        } else {
          dom.prop(inp, 'value', v);
        }
      }
    }
  }
  dom.prop(cfgMap.get('blacklist'), 'value', JSON.stringify(cfg.blacklist, null, ' '));
  dom.prop(cfgMap.get('theme'), 'value', JSON.stringify(cfg.theme, null, ' '));
  renderTheme(cfg.theme);
};
const getHost = (str = '') => {
  return str.split('.').splice(-2).join('.');
};
const ContainerHandler = class {
  constructor() {
    this.showError = this.showError.bind(this);
    // this.cleanup = this.cleanup.bind(this);
    this.setHost(window.top.document.location.href);
    this.cache = new XMap();
    this.userjsCache = new XMap();
    this.unsaved = false;
    this.isBlacklisted = false;
    this.rebuild = false;

    this.counters = {
      total: 0
    };
  }

  setHost(link) {
    try {
      this.webpage = new URL(link);
    } catch (ex) {
      err(ex, { cause: 'ContainerHandler' });
      this.webpage = window.location;
    }
    this.host = getHost(this.webpage.hostname);
  }

  checkBlacklist(str) {
    str = str || this.host;
    let blacklisted = false;
    for (const b of cfg.blacklist.filter((b) => b.enabled)) {
      if (b.regex === true) {
        const reg = new RegExp(b.url, b.flags);
        if (!reg.test(str)) continue;
        blacklisted = true;
      }
      if (Array.isArray(b.url)) {
        for (const c of b.url) {
          if (!str.includes(c)) continue;
          blacklisted = true;
        }
      }
      if (!str.includes(b.url)) continue;
      blacklisted = true;
    }
    if (blacklisted) {
      this.showError('Blacklisted');
    }
    this.isBlacklisted = blacklisted;
    return blacklisted;
  }

  updateCounter(count, engine) {
    this.counters[engine.name] += count;
    this.counters.total += count;
    this.updateCounters();
  }

  updateCounters() {
    for (const [k, v] of Object.entries(this.counters)) {
      if (k === 'total') {
        continue;
      }
      if (qs(`count-frame[data-counter="${k}"]`)) {
        dom.text(qs(`count-frame[data-counter="${k}"]`), v);
      }
    }
    webext.browserAction.setBadgeText({
      text: `${this.counters.total}`
    });
    document.title = `Magic UserJS+ (${this.counters.total})`;
  }

  makePrompt(txt, dataset = {}, usePrompt = true) {
    if (qs('.prompt', promptElem)) {
      for (const elem of qsA('.prompt', promptElem)) {
        if (elem.dataset.prompt) {
          elem.remove();
        }
      }
    }
    const el = make('mu-js', 'prompt', {
      dataset: {
        prompt: txt
      }
    });
    const elHead = make('mu-js', 'prompt-head', {
      innerHTML: `${iconSVG.load('refresh')} ${txt}`
    });
    el.append(elHead);
    if (usePrompt) {
      const elPrompt = make('mu-js', 'prompt-body', { dataset });
      const elYes = make('mujs-btn', 'prompt-confirm', {
        innerHTML: 'Confirm',
        dataset: {
          command: 'prompt-confirm'
        }
      });
      const elNo = make('mujs-btn', 'prompt-deny', {
        innerHTML: 'Deny',
        dataset: {
          command: 'prompt-deny'
        }
      });
      elPrompt.append(elYes, elNo);
      el.append(elPrompt);
    }
    promptElem.append(el);
  }

  save() {
    this.unsaved = false;
    // MU.storage.setValue('Config', cfg);
    info('Saved:', cfg);
  }

  showError(...ex) {
    err(...ex);
    const error = make('mu-js', 'error');
    let str = '';
    for (const e of ex) {
      str += `${isString(e) ? e : `${e.message} ${e.stack}`}\n`;
    }
    error.appendChild(document.createTextNode(str));
    footer.append(error);
  }

  refresh() {
    urlBar.placeholder = i18n$('newTab');
    this.counters.total = 0;
    for (const engine of cfg.engines) {
      this.counters[engine.name] = 0;
    }
    this.updateCounters();
    dom.prop([tabbody, rateContainer, footer], 'innerHTML', '');
  }
};
const MUJS = new ContainerHandler();

class Tabs {
  constructor() {
    this.Tab = new XMap();
    this.blank = 'about:blank';
    this.protocal = 'mujs:';
    this.protoReg = new RegExp(`${this.protocal}(.+)`);
    this.el = {
      add: make('mujs-addtab', '', {
        textContent: '+',
        dataset: {
          command: 'new-tab'
        }
      }),
      head: make('mujs-tabs')
    };
    this.el.head.append(this.el.add);
    toolbar.append(this.el.head);
  }
  hasTab(...params) {
    for (const p of params) {
      if (!this.Tab.has(p)) {
        return false;
      }
      const content = normalizeTarget(this.Tab.get(p)).filter((t) => p === t.dataset.host);
      if (isBlank(content)) {
        return false;
      }
    }
    return true;
  }
  storeTab(host) {
    const h = host ?? this.blank;
    if (!this.Tab.has(h)) {
      this.Tab.set(h, new Set());
    }
    return this.Tab.get(h);
  }
  cache(host, ...tabs) {
    const h = host ?? this.blank;
    const tabCache = this.storeTab(h);
    for (const t of normalizeTarget(tabs)) {
      if (tabCache.has(t)) {
        continue;
      }
      tabCache.add(t);
    }
    this.Tab.set(h, tabCache);
    return tabCache;
  }
  mujs(host) {
    if (!host.startsWith(this.protocal)) {
      return;
    }
    const type = host.match(this.protoReg)[1];
    if (type === 'settings') {
      dom.cl.remove([cfgpage], 'hidden');
      dom.cl.add(table, 'hidden');
      urlBar.placeholder = i18n$('search_placeholder');
    }
  }
  active(tab, build = true) {
    for (const t of normalizeTarget(tab, false)) {
      dom.cl.add([cfgpage], 'hidden');
      dom.cl.remove(table, 'hidden');
      dom.cl.remove(qsA('mujs-tab', this.el.head), 'active');
      dom.cl.add(t, 'active');
      if (!build) {
        continue;
      }
      const host = t.dataset.host ?? this.blank;
      if (host === this.blank) {
        MUJS.refresh();
      } else if (host.startsWith(this.protocal)) {
        this.mujs(host);
      } else {
        buildlist(host);
      }
    }
  }
  /** @param { HTMLElement } tab */
  close(tab) {
    for (const t of normalizeTarget(tab, false)) {
      const host = t.dataset.host;
      if (MUJS.cache.has(host)) {
        MUJS.cache.delete(host);
      }
      if (dom.cl.has(t, 'active')) {
        MUJS.refresh();
      }
      const sibling = t.previousElementSibling ?? t.nextElementSibling;
      if (sibling) {
        if (sibling.dataset.command !== 'new-tab') {
          this.active(sibling);
        }
      }
      if (this.Tab.has(host)) {
        this.Tab.delete(host);
      }
      t.remove();
    }
  }
  create(host = undefined) {
    if (isString(host)) {
      if (host.startsWith(this.protocal) && this.hasTab(host)) {
        this.active(this.Tab.get(host));
        return;
      }
      const content = normalizeTarget(this.storeTab(host)).filter((t) => host === t.dataset.host);
      if (!isEmpty(content)) {
        return;
      }
    }
    const tab = make('mujs-tab', '', {
      dataset: {
        command: 'switch-tab'
      },
      style: `order: ${this.el.head.childElementCount};`
    });
    const tabClose = make('mu-js', '', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    const tabHost = make('mujs-host');
    tab.append(tabHost, tabClose);
    this.el.head.append(tab);
    this.active(tab, false);
    this.cache(host, tab);
    if (isNull(host)) {
      MUJS.refresh();
      // urlBar.placeholder = i18n$('newTab');
      tab.dataset.host = this.blank;
      tabHost.title = i18n$('newTab');
      tabHost.textContent = i18n$('newTab');
    } else if (host.startsWith(this.protocal)) {
      const type = host.match(this.protoReg)[1];
      tab.dataset.host = host || MUJS.host;
      tabHost.title = type || tab.dataset.host;
      tabHost.textContent = tabHost.title;
      this.mujs(host);
    } else {
      tab.dataset.host = host || MUJS.host;
      tabHost.title = host || MUJS.host;
      tabHost.textContent = tabHost.title;
    }
    return tab;
  }
}
const tab = new Tabs();

const template = {
  id: 0,
  bad_ratings: 0,
  good_ratings: 0,
  ok_ratings: 0,
  daily_installs: 0,
  total_installs: 0,
  name: 'NOT FOUND',
  description: 'NOT FOUND',
  version: '0.0.0',
  url: 'about:blank',
  code_url: 'about:blank',
  created_at: Date.now(),
  code_updated_at: Date.now(),
  users: [
    {
      name: '',
      url: ''
    }
  ]
};
const mkList = (txt = '', obj = {}) => {
  if (!obj.root || !obj.type) {
    return;
  }
  const { root, type } = obj;
  const list = obj.list ?? [];
  const appliesTo = make('mu-js', 'mujs-list', {
    textContent: `${txt}: `
  });
  const applyList = make('mu-js', 'mujs-grants');
  const ujsURLs = make('mujs-column', 'mujs-list', {
    dataset: {
      el: 'matches',
      type
    }
  });
  ujsURLs.append(appliesTo, applyList);
  root.append(ujsURLs);
  if (isEmpty(list)) {
    const elem = make('mujs-a', '', {
      textContent: i18n$('listing_none')
    });
    applyList.append(elem);
    if (type === 'antifeatures') {
      dom.cl.add(ujsURLs, 'hidden');
    }
    return;
  }
  for (const c of list) {
    if (isObj(c)) {
      const elem = make('mujs-a', '', {
        textContent: c.text
      });
      if (c.domain) {
        elem.dataset.command = 'open-tab';
        elem.dataset.webpage = `https://${c.text}`;
      }
      applyList.append(elem);
    } else {
      const elem = make('mujs-a', '', {
        textContent: c
      });
      applyList.append(elem);
    }
  }
  if (type === 'antifeatures') {
    dom.cl.remove(ujsURLs, 'hidden');
  }
};
const toLocaleDate = (str = '') => {
  return new Intl.DateTimeFormat(navigator.language).format(new Date(str));
};
// #region Create UserJS
const createjs = (ujs, engine) => {
  for (const key in template) {
    if (hasOwn(ujs, key)) {
      continue;
    }
    ujs[key] = template[key];
  }
  // Lets not add this UserJS to the list
  if (ujs.id === 421603) {
    return;
  }
  if (!MUJS.userjsCache.has(ujs.id)) {
    MUJS.userjsCache.set(ujs.id, ujs);
  }
  const eframe = make('td', 'install-btn');
  const uframe = make('td', 'mujs-uframe');
  const fdaily = make('td', 'mujs-list', {
    textContent: ujs.daily_installs
  });
  const fupdated = make('td', 'mujs-list', {
    textContent: toLocaleDate(ujs.code_updated_at)
  });
  const fname = make('td', 'mujs-name');
  const fmore = make('mujs-column', 'mujs-list hidden', {
    dataset: {
      el: 'more-info'
    }
  });
  const fBtns = make('mujs-column', 'mujs-list hidden');
  const jsInfo = make('mujs-row', 'mujs-list');
  const jsInfoB = make('mujs-row', 'mujs-list');
  const ratings = make('mujs-column', 'mujs-list');
  const ftitle = make('mujs-a', 'mujs-homepage', {
    textContent: ujs.name,
    title: ujs.url,
    dataset: {
      command: 'open-tab',
      webpage: ujs.url
    }
  });
  const fver = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('version_number')}: ${ujs.version}`
  });
  const fcreated = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('created_date')}: ${toLocaleDate(ujs.created_at)}`
  });
  const flicense = make('mu-js', 'mujs-list', {
    title: ujs.license ?? i18n$('no_license'),
    textContent: `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`,
    style:
      'text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: fit-content; max-width: 20em;'
  });
  const ftotal = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('total_installs')}: ${ujs.total_installs}`
  });
  const fratings = make('mu-js', 'mujs-list', {
    title: i18n$('ratings'),
    textContent: `${i18n$('ratings')}:`
  });
  const fgood = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('good'),
    textContent: ujs.good_ratings,
    dataset: {
      el: 'good'
    }
  });
  const fok = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('ok'),
    textContent: ujs.ok_ratings,
    dataset: {
      el: 'ok'
    }
  });
  const fbad = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('bad'),
    textContent: ujs.bad_ratings,
    dataset: {
      el: 'bad'
    }
  });
  const fdesc = make('mu-js', 'mujs-list mujs-pointer', {
    title: ujs.description,
    textContent: ujs.description,
    dataset: {
      command: 'list-description'
    }
  });
  const sIcon = ujs.code_url.endsWith('.user.css') ? '🧾' : ujs.code_url.endsWith('.user.js') ? '🐵' : '💾';
  const scriptInstall = make('mu-jsbtn', 'install', {
    // innerHTML: `${iconSVG.load('install')} ${i18n$('install')}`,
    innerHTML: `${sIcon} ${i18n$('install')}`,
    title: `${i18n$('install')} "${ujs.name}"`,
    dataset: {
      command: 'install-script',
      userjs: ujs.code_url
    }
  });
  const scriptDownload = make('mu-jsbtn', '', {
    innerHTML: `${iconSVG.load('install')} ${i18n$('saveFile')}`,
    dataset: {
      command: 'download-userjs',
      userjs: ujs.id,
      userjsName: ujs.name
    }
  });
  const tr = make('tr', 'frame', {
    dataset: {
      scriptId: ujs.id
    }
  });
  const codeArea = make('textarea', 'code-area hidden', {
    dataset: {
      name: 'code'
    },
    rows: '10',
    autocomplete: false,
    spellcheck: false,
    wrap: 'soft'
  });
  const loadCode = make('mu-jsbtn', '', {
    innerHTML: `${iconSVG.load('search')} ${i18n$('preview_code')}`,
    dataset: {
      command: 'load-userjs',
      userjs: ujs.id
    }
  });
  if (engine) {
    tr.dataset.engine = engine;
    if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
      tr.dataset.good = 'upsell';
    }
  }
  for (const u of ujs.users) {
    const user = make('mujs-a', '', {
      innerHTML: u.name,
      title: u.url,
      dataset: {
        command: 'open-tab',
        webpage: u.url
      }
    });
    if (cfg.recommend.author && u.id === authorID) {
      tr.dataset.author = 'upsell';
      dom.prop(user, 'innerHTML', `${u.name} ${iconSVG.load('verified')}`);
    }
    uframe.append(user);
  }
  if (engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.id)) {
    tr.dataset.good = 'upsell';
  }
  eframe.append(scriptInstall);
  ratings.append(fratings, fgood, fok, fbad);
  jsInfo.append(ftotal, ratings, fver, fcreated);
  mkList('Size', {
    list: ujs.code_size,
    type: 'size',
    root: jsInfo
  });

  jsInfoB.append(flicense);
  mkList(i18n$('antifeatures'), {
    list: ujs.antifeatures,
    type: 'antifeatures',
    root: jsInfoB
  });
  mkList(i18n$('applies_to'), {
    list: ujs.code_match,
    type: 'match-urls',
    root: jsInfoB
  });
  mkList('@grant', {
    list: ujs.code_grant,
    type: 'grants',
    root: jsInfoB
  });
  fmore.append(jsInfo, jsInfoB);
  fBtns.append(scriptDownload, loadCode);
  fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

  if (ujs.code_data) {
    codeArea.value = ujs.code_data;
  }

  for (const e of [fname, uframe, fdaily, fupdated, eframe]) {
    tr.append(e);
  }
  tabbody.append(tr);
};
// #endregion
const doInstallProcess = (installLink) => {
  const queryOptions = { active: true, currentWindow: true };
  webext.tabs.query(queryOptions, (tabs) => {
    webext.tabs.update(tabs[0].id, { url: installLink });
  });
};
ael(main, 'click', async (evt) => {
  try {
    /** @type { HTMLElement } */
    const target = evt.target.closest('[data-command]');
    if (!target) {
      return;
    }
    const prmpt = /prompt-/.test(target.dataset.command);
    let dataset = target.dataset;
    let cmd = dataset.command;
    let prmptChoice = false;
    if (prmpt) {
      dataset = target.parentElement.dataset;
      cmd = dataset.command;
      prmptChoice = /confirm/.test(target.dataset.command);
      target.parentElement.parentElement.remove();
    }
    if (cmd === 'install-script' && dataset.userjs) {
      let installCode = dataset.userjs;
      if (!prmpt && dataset.userjs.endsWith('.user.css')) {
        MUJS.makePrompt(i18n$('prmpt_css'), dataset);
        return;
      } else if (prmpt !== prmptChoice) {
        installCode = dataset.userjs.replace(/\.user\.css$/, '.user.js');
      }
      doInstallProcess(installCode);
    } else if (cmd === 'open-tab' && dataset.webpage) {
      openInTab(dataset.webpage);
    } else if (cmd === 'navigation') {
      if (dom.cl.has(btngreasy, 'hidden')) {
        dom.cl.remove([btncfg, btngreasy, btnhome, btnissue], 'hidden');
      } else {
        dom.cl.add([btncfg, btngreasy, btnhome, btnissue], 'hidden');
      }
    } else if (cmd === 'list-description') {
      const arr = [];
      const ignoreTags = new Set(['TD', 'MUJS-A', 'MU-JS']);
      for (const node of target.parentElement.childNodes) {
        if (ignoreTags.has(node.tagName)) {
          continue;
        }
        if (node.tagName === 'TEXTAREA' && isEmpty(node.value)) {
          continue;
        }
        arr.push(node);
      }
      if (target.nextElementSibling) {
        arr.push(target.nextElementSibling);
        if (target.nextElementSibling.nextElementSibling) {
          arr.push(target.nextElementSibling.nextElementSibling);
        }
      }
      if (dom.cl.has(arr[0], 'hidden')) {
        dom.cl.remove(arr, 'hidden');
      } else {
        dom.cl.add(arr, 'hidden');
      }
    } else if (cmd === 'show-filter') {
      dom.cl.toggle(qs('.mujs-fltlist').parentElement, 'hidden');
    } else if (cmd === 'save') {
      if (!dom.prop(target, 'disabled')) {
        MUJS.save();
        // sleazyRedirect();
        if (MUJS.rebuild) {
          MUJS.cache.clear();
          buildlist();
        }
        MUJS.unsaved = false;
        MUJS.rebuild = false;
      }
    } else if (cmd === 'reset') {
      // cfg = defcfg;
      MUJS.unsaved = true;
      MUJS.rebuild = true;
      rebuildCfg();
    } else if (cmd === 'settings') {
      if (MUJS.unsaved) {
        MUJS.showError('Unsaved changes');
      }
      tab.create('mujs:settings');
      MUJS.rebuild = false;
    } else if (cmd === 'new-tab') {
      tab.create();
    } else if (cmd === 'switch-tab') {
      tab.active(target);
    } else if (cmd === 'close-tab' && target.parentElement) {
      tab.close(target.parentElement);
    } else if (cmd === 'download-userjs') {
      if (!MUJS.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const dataUserJS = MUJS.userjsCache.get(+dataset.userjs);
      const txt = await reqCode(dataUserJS);
      if (typeof txt !== 'string') {
        return;
      }
      const makeUserJS = new Blob([txt], { type: 'text/plain' });
      const dlBtn = make('a', 'mujs_Downloader');
      dlBtn.href = URL.createObjectURL(makeUserJS);
      dlBtn.download = `${dataset.userjsName ?? dataset.userjs}.user.js`;
      dlBtn.click();
      URL.revokeObjectURL(dlBtn.href);
      dlBtn.remove();
    } else if (cmd === 'load-userjs') {
      if (!MUJS.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const codeArea = qs('textarea', target.parentElement.parentElement);
      if (!isEmpty(codeArea.value)) {
        dom.cl.toggle(codeArea, 'hidden');
        return;
      }
      const dataUserJS = MUJS.userjsCache.get(+dataset.userjs);
      const txt = await reqCode(dataUserJS);
      if (typeof txt !== 'string') {
        return;
      }
      codeArea.value = txt;
      dom.cl.remove(codeArea, 'hidden');

      const apTo = (name, elem) => {
        if (isEmpty(dataUserJS[name])) {
          const el = make('mujs-a', '', {
            textContent: i18n$('listing_none')
          });
          elem.append(el);
          if (name === 'antifeatures') {
            dom.cl.add(elem, 'hidden');
          }
        } else {
          for (const c of dataUserJS[name]) {
            if (isObj(c)) {
              const el = make('mujs-a', '', {
                textContent: c.text
              });
              if (c.domain) {
                el.dataset.command = 'open-tab';
                el.dataset.webpage = `https://${c.text}`;
              }
              elem.append(el);
            } else {
              const el = make('mujs-a', '', {
                textContent: c
              });
              elem.append(el);
            }
          }
          if (name === 'antifeatures') {
            dom.cl.remove(elem, 'hidden');
          }
        }
      };
      const matchElem = qs(
        '[data-type="match-urls"] > .mujs-grants',
        target.parentElement.parentElement
      );
      const grantElem = qs(
        '[data-type="grants"] > .mujs-grants',
        target.parentElement.parentElement
      );
      const afElem = qs(
        '[data-type="antifeatures"] > .mujs-grants',
        target.parentElement.parentElement
      );
      const sizeElem = qs('[data-type="size"] > .mujs-grants', target.parentElement.parentElement);
      dom.prop([matchElem, grantElem, afElem, sizeElem], 'innerHTML', '');
      apTo('code_match', matchElem);
      apTo('code_grant', grantElem);
      apTo('antifeatures', afElem);
      apTo('code_size', sizeElem);
    } else if (/export-/.test(cmd)) {
      const str = JSON.stringify(cmd === 'export-cfg' ? cfg : cfg.theme, null, ' ');
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
      const dlBtn = make('a', 'mujs-exporter', {
        href: URL.createObjectURL(blob),
        download: `Magic_Userscript_${cmd === 'export-cfg' ? 'config' : 'theme'}.json`
      });
      dlBtn.click();
      URL.revokeObjectURL(dlBtn.href);
    } else if (/import-/.test(cmd)) {
      if (qs('input', target.parentElement)) {
        qs('input', target.parentElement).click();
        return;
      }
      const inpJSON = make('input', 'hidden', {
        type: 'file',
        accept: '.json',
        onchange: (evt) => {
          try {
            [...evt.target.files].forEach((file) => {
              const reader = new FileReader();
              reader.readAsText(file);
              reader.onload = () => {
                const result = JSON.parse(reader.result);
                if (result.blacklist) {
                  log(`Imported config: { ${file.name} }`, result);
                  cfg = result;
                  MUJS.unsaved = true;
                  MUJS.rebuild = true;
                  rebuildCfg();
                  MUJS.save();
                  // sleazyRedirect();
                  MUJS.cache.clear();
                  buildlist();
                  MUJS.unsaved = false;
                  MUJS.rebuild = false;
                } else {
                  log(`Imported theme: { ${file.name} }`, result);
                  cfg.theme = result;
                  renderTheme(cfg.theme);
                }
                inpJSON.remove();
              };
              reader.onerror = () => {
                MUJS.showError(reader.error);
                inpJSON.remove();
              };
            });
          } catch (ex) {
            MUJS.showError(ex);
            inpJSON.remove();
          }
        }
      });
      target.parentElement.append(inpJSON);
      inpJSON.click();
    }
  } catch (ex) {
    MUJS.showError(ex);
  }
});
ael(main, 'auxclick', (evt) => {
  if (evt.button !== 1) {
    return;
  }
  /** @type { HTMLElement } */
  const target = evt.target.closest('[data-command]');
  if (!target) {
    return;
  }
  const dataset = target.dataset;
  const cmd = dataset.command;
  if (cmd === 'switch-tab' || cmd === 'close-tab') {
    tab.close(target);
  } else if (cmd === 'new-tab') {
    tab.create();
  }
});
renderTheme(cfg.theme);
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );
for (const th of tabhead.rows[0].cells) {
  if (dom.text(th) === i18n$('install')) continue;
  dom.cl.add(th, 'mujs-pointer');
  ael(th, 'click', () => {
    /** [Stack Overflow Reference](https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/53880407#53880407) */
    Array.from(tabbody.querySelectorAll('tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
      .forEach((tr) => tabbody.appendChild(tr));
  });
}
ael(urlBar, 'input', (evt) => {
  evt.preventDefault();
  if (urlBar.placeholder === i18n$('newTab')) {
    return;
  }
  const val = evt.target.value;
  if (isEmpty(val)) {
    dom.cl.remove(qsA('tr[data-engine]', tabbody), 'hidden');
    return;
  }
  const reg = new RegExp(val, 'gi');
  const finds = new Set();
  const userjsCache = MUJS.userjsCache;
  for (const [k, v] of userjsCache) {
    const elem = qs(`tr[data-script-id="${k}"]`, tabbody);
    if (!elem) {
      continue;
    }
    if (finds.has(elem)) {
      continue;
    }
    if (v.name && v.name.match(reg)) {
      finds.add(elem);
    }
    if (v.description && v.description.match(reg)) {
      finds.add(elem);
    }
    if (v.code_data) {
      const meta = parse_meta(v.code_data);
      for (const key of Object.keys(meta)) {
        if (/name|desc/i.test(key) && key.match(reg)) {
          finds.add(elem);
        }
      }
    }
  }
  dom.cl.add(qsA('tr[data-engine]', tabbody), 'hidden');
  dom.cl.remove([...finds], 'hidden');
});
ael(urlBar, 'change', (evt) => {
  evt.preventDefault();
  const val = evt.target.value;
  if (urlBar.placeholder === i18n$('newTab') && qs('mujs-tab.active', toolbar)) {
    const tabElem = qs('mujs-tab.active', toolbar);
    const tabHost = qs('mujs-host', tabElem);
    if (val.startsWith('mujs:')) {
      tab.close(tabElem);
      if (tab.hasTab(val)) {
        tab.active(tab.Tab.get(val));
      } else {
        tab.create(val);
      }
      return;
    } else if (val === '*') {
      tabElem.dataset.host = val;
      tabHost.title = '<All Sites>';
      tabHost.textContent = '<All Sites>';
      buildlist(val);
      return;
    }
    const value = getHost(val);
    if (MUJS.checkBlacklist(value)) {
      MUJS.showError(`Host blacklisted "${value}"`);
      return;
    }
    tabElem.dataset.host = value;
    tabHost.title = value;
    tabHost.textContent = value;
    buildlist(value);
    return;
  }
});

async function buildlist(host = undefined) {
  try {
    if (isEmpty(host)) {
      host = MUJS.host;
    }
    if (MUJS.checkBlacklist(host)) {
      return;
    }
    if (!qs(`mujs-tab[data-host="${host}"]`)) {
      tab.create(host);
    }
    MUJS.refresh();
    webext.runtime.sendMessage(
      {
        location: host
      },
      (data) => {
        if (isEmpty(data)) {
          return;
        }
        for (const tabData of data) {
          const { engine, host } = tabData;
          if (!qs(`mujs-tab[data-host="${host}"]`)) {
            tab.create(host);
          }
          for (const ujs of tabData.data) {
            createjs(ujs, engine.name);
          }
          MUJS.updateCounter(tabData.data.length, engine);
        }
        urlBar.placeholder = i18n$('search_placeholder');
        urlBar.value = '';
      }
    );
  } catch (ex) {
    err(ex);
  }
}

//#region Make Config
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
    placeholder: 'Paste Access Token',
    onchange(evt) {
      MUJS.unsaved = true;
      MUJS.rebuild = true;
      ghAPI.token = evt.target.value;
      hermes.send('Save', {
        prop: 'engines',
        value: cfg.engines
      });
    }
  });
  ghToken.dataset.engine = 'github-token';
  cfgMap.set('github-token', ghToken);

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

const locSearch = location.search;

const p = hermes.getPort();
p.onMessage.addListener((root = {}) => {
  const m = root.msg;
  if (root.channel === 'Config' && isEmpty(cfg)) {
    cfg = m.cfg || cfg;
    for (const engine of cfg.engines) {
      MUJS.counters[engine.name] = 0;
      if (!engine.enabled) {
        continue;
      }
      const counter = make('count-frame', '', {
        dataset: {
          counter: engine.name
        },
        title: engine.url,
        textContent: '0'
      });
      qs('.counter-container').append(counter);
    }
    makecfg();
    if (/mujs=/.test(locSearch)) {
      if (/settings/.test(locSearch)) {
        tab.create('mujs:settings');
      }
    }
  }
});

function primaryFN(data) {
  try {
    if (isEmpty(data)) {
      tab.create();
      return;
    }
    for (const tabData of data) {
      const { engine, host } = tabData;
      if (MUJS.checkBlacklist(host)) {
        continue;
      }
      if (!qs(`mujs-tab[data-host="${host}"]`)) {
        tab.create(host);
        if (tabData.link) {
          MUJS.setHost(tabData.link);
        }
      }
      if (tabData.data) {
        for (const ujs of tabData.data) {
          createjs(ujs, engine.name);
        }
        MUJS.updateCounter(tabData.data.length, engine);
      }
    }
    urlBar.placeholder = i18n$('search_placeholder');
    urlBar.value = '';
  } catch (ex) {
    err(ex);
  }
}
if (!/mujs=/.test(locSearch)) {
  webext.runtime.sendMessage({}, primaryFN);
}
