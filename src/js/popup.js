'use strict';

import { webext, runtime, sendMessage } from './ext.js';
import { err, log, info } from './logger.js';
import { i18n$, language } from './i18n.js';
import { dom, qs, qsA } from './querySelector.js';
import { ParseUserJS } from './request-code.js';
import Network from './network.js';
import {
  ael,
  make,
  isNull,
  isEmpty,
  isElem,
  isObj,
  openInTab,
  strToURL,
  isRegExp,
  loadFilters,
  formatURL,
  normalizedHostname
} from './util.js';
import { builtinList, template, BLANK_PAGE, badUserJS, authorID, goodUserJS } from './constants.js';
import { DEFAULT_CONFIG } from './storage.js';
import { BaseContainer, BaseList } from './container.js';

/******************************************************************************/
/**
 * @type { import("../typings/types").config }
 */
let cfg = {};
/******************************************************************************/

/**
 * @type { chrome.tabs.Tab | browser.tabs.Tab }
 */
const currentTab = {};
const tabURL = new URL(runtime.getURL('/'));

/******************************************************************************/

const params = new URLSearchParams(location.search);
//#region Icon SVGs
const iconSVG = {
  close: 'fa-solid fa-xmark',
  code: 'fa-solid fa-code',
  collapse: 'fa-solid fa-compress',
  download: 'fa-solid fa-file-arrow-down',
  expand: 'fa-solid fa-arrow-up-right-from-square', // fa-expand
  gear: 'fa-solid fa-gear',
  github: 'fa-brands fa-github',
  globe: 'fa-solid fa-globe',
  install: 'fa-solid fa-download',
  issue: 'fa-solid fa-bug',
  minus: 'fa-solid fa-minus',
  nav: 'fa-solid fa-bars',
  pager: 'fa-solid fa-pager',
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  refresh: 'fa-solid fa-rotate-right',
  load(type, container) {
    let svgElem;
    if (typeof iconSVG[type] === 'string') {
      svgElem = make('i', iconSVG[type], {
        id: `mujs_${type ?? 'Unknown'}`
      });
    } else {
      svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      for (const [k, v] of Object.entries(iconSVG[type])) {
        if (k === 'html') {
          continue;
        }
        svgElem.setAttributeNS(null, k, v);
      }
      try {
        if (typeof iconSVG[type].html === 'string') {
          svgElem.innerHTML = iconSVG[type].html;
          dom.attr(svgElem, 'id', `mujs_${type ?? 'Unknown'}`);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (ex) {
        /* empty */
      }
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};
//#endregion
const cfgMap = new Map();
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
  // dom.prop(cfgMap.get('blacklist'), 'value', JSON.stringify(cfg.blacklist, null, ' '));
  for (const [k, v] of Object.entries(cfg.theme)) {
    dom.prop(cfgMap.get(k), 'value', v);
  }
  container.renderTheme(cfg.theme);
};
const Counter = {
  cnt: {
    total: {
      count: 0
    }
  },
  set(engine) {
    if (!this.cnt[engine.name]) {
      const counter = make('count-frame', engine.enabled ? '' : 'hidden', {
        dataset: {
          counter: engine.name
        },
        title: engine.query ? decodeURIComponent(engine.query) : engine.url,
        textContent: '0'
      });
      this.cnt[engine.name] = {
        root: counter,
        count: 0
      };
      return counter;
    }
    return this.cnt[engine.name].root;
  },
  update(count, engine) {
    this.cnt[engine.name].count += count;
    this.cnt.total.count += count;
    this.updateAll();
  },
  updateAll() {
    for (const v of Object.values(this.cnt)) dom.text(v.root, v.count);
    webext.action.setBadgeText({
      text: `${this.cnt.total.count}`
    });
    document.title = `Magic UserJS+ (${this.cnt.total.count})`;
  },
  reset() {
    for (const [k, v] of Object.entries(this.cnt)) {
      dom.text(v.root, 0);
      v.count = 0;
      const engine = cfg.engines.find((engine) => k === engine.name);
      if (engine) {
        dom.cl[engine.enabled ? 'remove' : 'add'](v.root, 'hidden');
      }
    }
    webext.action.setBadgeText({
      text: '0'
    });
    document.title = 'Magic UserJS+ (0)';
  }
};
// #region Container
class Container extends BaseContainer {
  constructor(url) {
    super(url);
    this.refresh = this.refresh.bind(this);
    this.showError = this.showError.bind(this);

    this.webpage = strToURL(url);
    this.host = this.getHost(this.webpage.host);
    this.domain = this.getDomain(this.webpage.host);

    this.unsaved = false;
    this.isBlacklisted = false;
    this.rebuild = false;

    this.root = qs('mujs-root');

    this.init();
  }
  // #region init
  init() {
    try {
      this.mainbtn = make('count-frame', 'mainbtn', {
        textContent: '0'
      });
      this.promptElem = make('mujs-row', 'mujs-prompt');

      this.urlBar = qs('.mujs-url-bar');
      this.rateContainer = qs('.rate-container');
      this.footer = qs('.mujs-footer');
      this.countframe = qs('.counter-container');
      this.toolbar = qs('mujs-toolbar');
      this.table = qs('table');
      this.tabhead = qs('thead');
      this.cfgpage = qs('.mujs-cfg');
      this.main = qs('mujs-main');
      this.tabbody = qs('tbody');
      this.btnframe = qs('.btn-frame');

      this.btnfullscreen = make('mujs-btn', 'fullscreen', {
        title: i18n$('max'),
        innerHTML: iconSVG.load('expand'),
        dataset: {
          command: 'fullscreen'
        }
      });
      this.btnHandles = make('mujs-column', 'btn-handles');
      this.btncfg = make('mujs-btn', 'settings hidden', {
        title: 'Settings',
        innerHTML: iconSVG.load('gear'),
        dataset: {
          command: 'settings'
        }
      });
      this.btnhome = make('mujs-btn', 'github hidden', {
        title: 'GitHub',
        innerHTML: iconSVG.load('github'),
        dataset: {
          command: 'open-tab',
          webpage: 'https://github.com/magicoflolis/Userscript-Plus'
        }
      });
      this.btnissue = make('mujs-btn', 'issue hidden', {
        innerHTML: iconSVG.load('issue'),
        title: i18n$('issue'),
        dataset: {
          command: 'open-tab',
          webpage: 'https://github.com/magicoflolis/Userscript-Plus/issues'
        }
      });
      this.btngreasy = make('mujs-btn', 'greasy hidden', {
        title: 'Greasy Fork',
        innerHTML: iconSVG.load('globe'),
        dataset: {
          command: 'open-tab',
          webpage: 'https://greasyfork.org/scripts/421603'
        }
      });
      this.btnnav = make('mujs-btn', 'nav', {
        title: 'Navigation',
        innerHTML: iconSVG.load('nav'),
        dataset: {
          command: 'navigation'
        }
      });
      if (params.size === 0) {
        this.btnHandles.append(this.btnfullscreen);
      }

      this.toolbar.append(this.btnHandles);
      this.btnframe.append(this.btnhome, this.btngreasy, this.btnissue, this.btncfg, this.btnnav);
      this.main.append(this.promptElem);

      const { host, refresh, cache, table } = this;
      class Tabs {
        /**
         * @param { HTMLElement } root
         */
        constructor(root) {
          /**
           * @type { Set<HTMLElement> }
           */
          this.pool = new Set();
          this.blank = BLANK_PAGE;
          this.protocal = 'mujs:';
          this.protoReg = new RegExp(`${this.protocal}(.+)`, 'i');
          this.el = {
            add: make('mujs-addtab', {
              textContent: '+',
              dataset: {
                command: 'new-tab'
              }
            }),
            head: make('mujs-tabs'),
            root
          };
          this.el.head.append(this.el.add);
          this.el.root.append(this.el.head);
          this.custom = () => {};
        }
        /**
         * @param {string} hostname
         */
        getTab(hostname) {
          return [...this.pool].find(({ dataset }) => hostname === dataset.host);
        }
        getActive() {
          return [...this.pool].find((tab) => tab.classList.contains('active'));
        }
        /**
         * @param {string} hostname
         */
        intFN(hostname) {
          const p = this.protoReg.exec(hostname);
          if (!p) {
            return;
          }
          if (p[1] === 'settings') {
            dom.cl.remove(cfgpage, 'hidden');
            dom.cl.add(table, 'hidden');
            urlBar.placeholder = 'Search settings';
          }
        }
        /**
         * @param {HTMLElement} tab
         * @param {boolean} [build]
         */
        active(tab, build = true) {
          if (!this.pool.has(tab)) this.pool.add(tab);
          dom.cl.add([table, cfgpage], 'hidden');
          dom.cl.remove([...this.pool], 'active');
          dom.cl.add(tab, 'active');
          if (!build) {
            dom.cl.remove(table, 'hidden');
            return;
          }
          const host = tab.dataset.host ?? this.blank;
          if (host === this.blank) {
            dom.cl.add(cfgpage, 'hidden');
            dom.cl.remove(table, 'hidden');
            refresh();
          } else if (host.startsWith(this.protocal)) {
            this.intFN(host);
          } else {
            dom.cl.add(cfgpage, 'hidden');
            dom.cl.remove(table, 'hidden');
            this.custom(host);
          }
        }
        /** @param { HTMLElement } tab */
        close(tab) {
          if (this.pool.has(tab)) this.pool.delete(tab);
          const host = tab.dataset.host;
          if (cfg.clearTabCache && cache.has(host)) {
            cache.delete(host);
            sendMessage({
              type: 'clear',
              host
            });
          }
          if (tab.classList.contains('active')) refresh();
          const sibling = tab.nextElementSibling ?? tab.previousElementSibling;
          if (sibling) {
            if (sibling.dataset.command !== 'new-tab') {
              this.active(sibling);
            }
          }
          tab.remove();
        }
        /**
         * @param {string} [hostname]
         */
        create(hostname = undefined) {
          if (typeof hostname === 'string') {
            const createdTab = this.getTab(hostname);
            if (this.protoReg.test(hostname) && createdTab) {
              this.active(createdTab);
              return;
            }
          }
          const tab = make('mujs-tab', {
            dataset: {
              command: 'switch-tab'
            },
            style: `order: ${this.el.head.childElementCount};`
          });
          const tabClose = make('mu-js', {
            dataset: {
              command: 'close-tab'
            },
            title: i18n$('close'),
            textContent: 'X'
          });
          const tabHost = make('mujs-host');
          const p = this.protoReg.exec(hostname);
          tab.append(tabHost, tabClose);
          this.el.head.append(tab);
          this.active(tab, false);
          if (isNull(hostname)) {
            refresh();
            tab.dataset.host = this.blank;
            tabHost.title = i18n$('newTab');
            tabHost.textContent = i18n$('newTab');
          } else if (p) {
            tab.dataset.host = hostname || host;
            tabHost.title = p[1] || tab.dataset.host;
            tabHost.textContent = tabHost.title;
            this.intFN(hostname);
          } else {
            tab.dataset.host = hostname || host;
            tabHost.title = hostname || host;
            tabHost.textContent = tabHost.title;
          }
          return tab;
        }
      }
      this.Tabs = new Tabs(this.toolbar);

      const makeTHead = (rows = []) => {
        const tr = make('tr');
        for (const r of rows) {
          const tparent = make('th', r.class ?? '', r);
          tr.append(tparent);
        }
        this.tabhead.append(tr);
        this.table.append(this.tabhead, this.tabbody);
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

      const tabbody = this.tabbody;
      const getCellValue = (tr, idx) =>
        tr.children[idx].dataset.value || tr.children[idx].textContent;
      const comparer = (idx, asc) => (a, b) =>
        ((v1, v2) =>
          v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
            ? v1 - v2
            : v1.toString().localeCompare(v2))(
          getCellValue(asc ? a : b, idx),
          getCellValue(asc ? b : a, idx)
        );
      for (const th of this.tabhead.rows[0].cells) {
        if (dom.text(th) === i18n$('install')) continue;
        dom.cl.add(th, 'mujs-pointer');
        ael(th, 'click', () => {
          /** [Stack Overflow Reference](https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/53880407#53880407) */
          Array.from(tabbody.querySelectorAll('tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
            .forEach((tr) => tabbody.appendChild(tr));
        });
      }
      return true;
    } catch (ex) {
      err(ex);
    }
    return false;
  }
  initFn() {
    Counter.cnt.total.root = this.mainbtn;
    for (const engine of cfg.engines) this.countframe.append(Counter.set(engine));
  }
  // #endregion
  setHost(link) {
    this.webpage = strToURL(link);
    this.host = this.getHost(this.webpage.host);
    this.domain = this.getDomain(this.webpage.host);
  }
  checkBlacklist(str) {
    str = str || this.host;
    let blacklisted = false;
    if (/accounts*\.google\./.test(this.webpage.host)) {
      blacklisted = true;
    }
    const blacklist = cfg.blacklist ?? [];
    for (const b of blacklist) {
      if (typeof b === 'string') {
        if (b.startsWith('userjs-')) {
          const r = /userjs-(\w+)/.exec(b)[1];
          const biList = builtinList[r];
          if (isRegExp(biList)) {
            if (!biList.test(str)) continue;
            blacklisted = true;
          } else if (isObj(biList) && biList.host === this.host) {
            blacklisted = true;
          }
        }
      } else if (isObj(b)) {
        if (!b.enabled) {
          continue;
        }
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
    }
    this.isBlacklisted = blacklisted;
    return this.isBlacklisted;
  }
  getInfo(url) {
    const webpage = strToURL(url || this.webpage);
    const host = this.getHost(webpage.host);
    const domain = this.getDomain(webpage.host);
    return {
      domain,
      host,
      webpage
    };
  }
  /**
   * @template { string } S
   * @param { S } str
   */
  getHost(str = '') {
    return str.split('.').splice(-2).join('.');
  }
  /**
   * @template { string } S
   * @param { S } str
   */
  getDomain(str = '') {
    return str.split('.').at(-2) ?? BLANK_PAGE;
  }
  renderTheme(theme) {
    theme = theme || cfg.theme || DEFAULT_CONFIG.theme;
    if (theme === DEFAULT_CONFIG.theme) {
      return;
    }
    const sty = this.root.style;
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
  }
  makePrompt(txt) {
    if (qs('.prompt', this.promptElem)) {
      for (const elem of qsA('.prompt', this.promptElem)) {
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
    const elPrompt = make('mu-js', 'prompt-body');
    const elClose = make('mujs-btn', 'prompt-deny', {
      textContent: i18n$('close')
    });

    ael(elClose, 'click', () => {
      el.remove();
    });
    elPrompt.append(elClose);
    el.append(elHead, elPrompt);
    this.promptElem.append(el);
    return el;
  }
  save() {
    this.unsaved = false;
    sendMessage({
      type: 'save',
      cfg
    });
    info('Saved:', cfg);
  }
  /**
   * @template {string | Error} E
   * @param {...E} ex
   */
  showError(...ex) {
    err(...ex);
    const error = make('mu-js', 'error');
    let str = '';
    for (const e of ex) {
      str += `${typeof e === 'string' ? e : `${e.cause ? `[${e.cause}] ` : ''}${e.message}${e.stack ? ` ${e.stack}` : ''}`}\n`;
      if (isObj(e)) {
        if (e.notify) {
          dom.cl.add(this.mainframe, 'error');
        }
      }
    }
    error.appendChild(document.createTextNode(str));
    this.footer.append(error);
  }
  refresh() {
    this.urlBar.placeholder = i18n$('newTab');
    Counter.reset();
    dom.cl.remove(this.toElem(), 'hidden');
    dom.cl.remove(qsA('mujs-section[data-name]', this.cfgpage), 'hidden');
    dom.prop([this.tabbody, this.rateContainer, this.footer], 'innerHTML', '');
  }
}
const container = new Container(window.top.document.location.href);
// #endregion
const { urlBar, tabbody, cfgpage, main, Tabs, showError } = container;
container.Tabs.custom = (host) => {
  MUList.host = host;
  MUList.build();
};

const mkList = (txt = '', obj = {}) => {
  if (!obj.root || !obj.type) {
    return;
  }
  const { root, type } = obj;
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

  const list = obj.list ?? [];
  if (isEmpty(list)) {
    const elem = make('mujs-a', '', {
      textContent: i18n$('listing_none')
    });
    applyList.append(elem);
    dom.cl.add(ujsURLs, 'hidden');
    return;
  }
  for (const c of list) {
    if (typeof c === 'string' && c.startsWith('http')) {
      const elem = make('mujs-a', '', {
        textContent: c,
        dataset: {
          command: 'open-tab',
          webpage: c
        }
      });
      applyList.append(elem);
    } else if (isObj(c)) {
      if (type === 'resource') {
        for (const [k, v] of Object.entries(c)) {
          const elem = make('mujs-a', '', {
            textContent: k ?? 'ERROR'
          });
          if (v.startsWith('http')) {
            elem.dataset.command = 'open-tab';
            elem.dataset.webpage = v;
          }
          applyList.append(elem);
        }
      } else {
        const elem = make('mujs-a', '', {
          textContent: c.text
        });
        if (c.domain) {
          elem.dataset.command = 'open-tab';
          elem.dataset.webpage = `https://${c.text}`;
        }
        applyList.append(elem);
      }
    } else {
      const elem = make('mujs-a', '', {
        textContent: c
      });
      applyList.append(elem);
    }
  }
};
// #region Create UserJS
/**
 * @param { import("../typings/types.d.ts").GSForkQuery } ujs
 * @param { string } engine
 */
const createjs = (ujs, engine) => {
  const a = [
    ujs.deleted === true,
    ujs.id === 421603, // Lets not add this UserJS to the list
    badUserJS.includes(ujs.id),
    badUserJS.includes(ujs.url)
  ].find((t) => t === true);
  if (a) {
    return;
  }
  if (!container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
  const eframe = make('td', 'install-btn');
  const uframe = make('td', 'mujs-uframe');
  const fdaily = make('td', 'mujs-list', {
    textContent: ujs.daily_installs,
    dataset: {
      name: 'daily_installs'
    }
  });
  const fupdated = make('td', 'mujs-list', {
    textContent: language.toDate(ujs.code_updated_at),
    dataset: {
      name: 'code_updated_at',
      value: new Date(ujs.code_updated_at).toISOString()
    }
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
    textContent: `${i18n$('created_date')}: ${language.toDate(ujs.created_at)}`,
    dataset: {
      name: 'created_at',
      value: new Date(ujs.created_at).toISOString()
    }
  });
  const flicense = make('mu-js', 'mujs-list', {
    title: ujs.license ?? i18n$('no_license'),
    textContent: `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`,
    dataset: {
      name: 'license'
    }
  });
  const ftotal = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`,
    dataset: {
      name: 'total_installs'
    }
  });
  const fratings = make('mu-js', 'mujs-list', {
    title: i18n$('ratings'),
    textContent: `${i18n$('ratings')}:`
  });
  const fgood = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('good'),
    textContent: ujs.good_ratings,
    dataset: {
      name: 'good_ratings',
      el: 'good'
    }
  });
  const fok = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('ok'),
    textContent: ujs.ok_ratings,
    dataset: {
      name: 'ok_ratings',
      el: 'ok'
    }
  });
  const fbad = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('bad'),
    textContent: ujs.bad_ratings,
    dataset: {
      name: 'bad_ratings',
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
  const scriptInstall = make('mu-jsbtn', 'install', {
    innerHTML: `${iconSVG.load('install')} ${i18n$('install')}`,
    title: `${i18n$('install')} "${ujs.name}"`,
    dataset: {
      command: 'install-script',
      userjs: ujs.code_url
    }
  });
  const scriptDownload = make('mu-jsbtn', {
    innerHTML: `${iconSVG.load('download')} ${i18n$('saveFile')}`,
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
  const loadCode = make('mu-jsbtn', {
    innerHTML: `${iconSVG.load('code')} ${i18n$('preview_code')}`,
    dataset: {
      command: 'load-userjs',
      userjs: ujs.id
    }
  });
  const loadMetadata = make('mu-jsbtn', {
    innerHTML: `${iconSVG.load('code')} Metadata`,
    dataset: {
      command: 'load-header',
      userjs: ujs.id
    }
  });
  tr.dataset.engine = engine;
  if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
    tr.dataset.good = 'upsell';
  }
  for (const u of ujs.users) {
    const user = make('mujs-a', {
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
  if (cfg.recommend.others && goodUserJS.includes(ujs.id)) {
    tr.dataset.good = 'upsell';
  }
  eframe.append(scriptInstall);
  ratings.append(fratings, fgood, fok, fbad);
  jsInfo.append(ftotal, ratings, fver, fcreated);
  mkList(i18n$('code_size'), {
    list: ujs._mujs.code.code_size,
    type: 'code_size',
    root: jsInfo
  });

  jsInfoB.append(flicense);
  const data_meta = ujs._mujs.code?.data_meta ?? {};
  mkList(i18n$('antifeatures'), {
    list: data_meta.antifeatures ?? [],
    type: 'antifeatures',
    root: jsInfoB
  });
  mkList(i18n$('applies_to'), {
    list: ujs._mujs.code?.data_names ?? [],
    type: 'data_names',
    root: jsInfoB
  });
  mkList('@grant', {
    list: data_meta.grant ?? [],
    type: 'grant',
    root: jsInfoB
  });
  mkList('@require', {
    list: data_meta.require,
    type: 'require',
    root: jsInfoB
  });
  mkList('@resource', {
    list: isNull(data_meta.resource) ? [] : [data_meta.resource],
    type: 'resource',
    root: jsInfoB
  });
  fmore.append(jsInfo, jsInfoB);
  fBtns.append(scriptDownload, loadCode, loadMetadata);
  fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

  const loadPage = make('mu-jsbtn', {
    innerHTML: `${iconSVG.load('pager')} Page`,
    dataset: {
      command: 'load-page',
      userjs: ujs.id
    }
  });
  fBtns.append(loadPage);

  if (ujs._mujs.code?.translated) tr.classList.add('translated');

  for (const e of [fname, uframe, fdaily, fupdated, eframe]) tr.append(e);
  ujs._mujs.root = tr;
  return ujs._mujs.root;
};
// #endregion
const applyTo = (ujs, name, elem, root) => {
  const n = ujs._mujs.code[name] ?? ujs._mujs.code.data_meta[name];
  if (isEmpty(n)) {
    const el = make('mujs-a', {
      textContent: i18n$('listing_none')
    });
    elem.append(el);
    return;
  }
  dom.prop(elem, 'innerHTML', '');
  dom.cl.remove(root, 'hidden');
  if (isObj(n)) {
    if (name === 'resource') {
      for (const [k, v] of Object.entries(n)) {
        const el = make('mujs-a', {
          textContent: k ?? 'ERROR'
        });
        if (v.startsWith('http')) {
          el.dataset.command = 'open-tab';
          el.dataset.webpage = v;
        }
        elem.append(el);
      }
    } else {
      const el = make('mujs-a', {
        textContent: n.text
      });
      if (n.domain) {
        el.dataset.command = 'open-tab';
        el.dataset.webpage = `https://${n.text}`;
      }
      elem.append(el);
    }
  } else if (typeof n === 'string') {
    const el = make('mujs-a', {
      textContent: n
    });
    elem.append(el);
  } else {
    for (const c of n) {
      if (typeof c === 'string' && c.startsWith('http')) {
        const el = make('mujs-a', {
          textContent: c,
          dataset: {
            command: 'open-tab',
            webpage: c
          }
        });
        elem.append(el);
      } else if (isObj(c)) {
        const el = make('mujs-a', {
          textContent: c.text
        });
        if (c.domain) {
          el.dataset.command = 'open-tab';
          el.dataset.webpage = `https://${c.text}`;
        }
        elem.append(el);
      } else {
        const el = make('mujs-a', {
          textContent: c
        });
        elem.append(el);
      }
    }
  }
};
const doInstallProcess = (installLink) => {
  if (typeof currentTab.id === 'number') {
    webext.tabs.update(currentTab.id, { url: installLink });
  }
};
const doDownloadProcess = (details) => {
  if (!details.url) {
    return;
  }
  const a = make('a');
  a.href = details.url;
  a.setAttribute('download', details.filename || '');
  a.setAttribute('type', 'text/plain');
  a.dispatchEvent(new MouseEvent('click'));
};

// #region List
class List extends BaseList {
  constructor(hostname = undefined) {
    super(hostname, container, cfg);
    this.build = this.build.bind(this);
    this.sortRecords = this.sortRecords.bind(this);
  }

  // #region Builder
  async build(results) {
    try {
      const { engines, container, host } = this;
      if (isEmpty(engines)) {
        for (const e of cfg.engines.filter((engine) => engine.enabled)) {
          showError(`Engine: "${e.name}" unsupported on "${host}"`);
        }
        return;
      }
      if (container.checkBlacklist(host)) {
        showError(`Blacklisted "${host}"`);
        return;
      }
      container.refresh();
      if (!results) {
        const { data } = await sendMessage({
          type: 'getData',
          currentTab,
          hostname: host
        });
        results = data;
      }
      for (const ujs of results ?? []) {
        // translate = false, code_url
        ujs._mujs.code.request = async (code_url) => {
          if (ujs._mujs.code.data_code_block) {
            return ujs._mujs.code;
          }
          const p = new ParseUserJS();
          await p.request(code_url ?? ujs.code_url);
          // await p.request(translate, code_url ?? ujs.code_url, ujs);
          for (const [k, v] of Object.entries(p)) {
            ujs._mujs.code[k] = v;
          }
          return ujs._mujs.code;
        };
        createjs(ujs, ujs._mujs.info.engine.name);
      }
      urlBar.placeholder = i18n$('search_placeholder');
      urlBar.value = '';
      this.sortRecords();
    } catch (ex) {
      showError(ex);
    }
  }

  sortRecords() {
    const arr = Array.from(this);
    for (const ujs of arr.flat().sort((a, b) => {
      const sortType = cfg.autoSort ?? 'daily_installs';
      return b[sortType] - a[sortType];
    })) {
      if (isElem(ujs._mujs.root)) tabbody.append(ujs._mujs.root);
    }
    for (const [name, value] of Object.entries(this.groupBy(arr))) {
      Counter.update(value.length, { name });
    }
  }
  // #endregion
}
const MUList = new List();
// #endregion

container.renderTheme();

// #region Main event handlers
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
    if (prmpt) {
      dataset = target.parentElement.dataset;
      cmd = dataset.command;
      if (/prompt-install/.test(target.dataset.command)) {
        doInstallProcess(target.dataset.code_url);
        target.parentElement.parentElement.parentElement.remove();
      } else if (/prompt-download/.test(target.dataset.command)) {
        target.parentElement.parentElement.parentElement.remove();
      } else {
        target.parentElement.parentElement.remove();
      }
      return;
    }
    if (cmd === 'install-script') {
      if (!container.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const dataUserJS = container.userjsCache.get(+dataset.userjs);
      if (dataUserJS.code_urls.length > 1) {
        const list = make('mujs-list', {
          style: 'display: flex; flex-direction: column;'
        });
        for (const ujs of dataUserJS.code_urls) {
          const a = make('mujs-a', {
            title: ujs.code_url,
            textContent: ujs.name,
            dataset: {
              command: 'prompt-install',
              code_url: ujs.code_url
            }
          });
          list.append(a);
        }
        container.makePrompt(`Multiple detected: ${list.outerHTML}`, dataset, false);
      } else {
        doInstallProcess(dataUserJS.code_url);
      }
    } else if (cmd === 'open-tab' && dataset.webpage) {
      openInTab(dataset.webpage);
    } else if (cmd === 'fullscreen') {
      const tab = container.Tabs.getActive();
      openInTab(`${location.href}?host=${tab.dataset.host}`);
    } else if (cmd === 'navigation') {
      for (const e of qsA('mujs-btn', target.parentElement)) {
        if (dom.cl.has(e, 'nav')) continue;
        if (dom.cl.has(e, 'hidden')) {
          dom.cl.remove(e, 'hidden');
        } else {
          dom.cl.add(e, 'hidden');
        }
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
    } else if (cmd === 'save') {
      if (!dom.prop(target, 'disabled')) {
        container.save();
        if (container.rebuild) {
          container.cache.clear();
          MUList.build();
        }
        container.unsaved = false;
        container.rebuild = false;
      }
    } else if (cmd === 'reset') {
      sendMessage({ type: 'reset' });
      cfg = DEFAULT_CONFIG;
      container.unsaved = true;
      container.rebuild = true;
      rebuildCfg();
    } else if (cmd === 'settings') {
      if (container.unsaved) {
        showError('Unsaved changes');
      }
      Tabs.create('mujs:settings');
      container.rebuild = false;
    } else if (cmd === 'new-tab') {
      Tabs.create();
    } else if (cmd === 'switch-tab') {
      Tabs.active(target);
    } else if (cmd === 'close-tab' && target.parentElement) {
      Tabs.close(target.parentElement);
    } else if (cmd === 'download-userjs') {
      if (!container.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const dataUserJS = container.userjsCache.get(+dataset.userjs);

      if (dataUserJS.code_urls.length > 1) {
        const list = make('mujs-list', {
          style: 'display: flex; flex-direction: column;'
        });
        for (const ujs of dataUserJS.code_urls) {
          const a = make('mujs-a', {
            title: ujs.code_url,
            textContent: ujs.name,
            dataset: {
              command: 'prompt-download',
              code_url: ujs.code_url
            }
          });
          list.append(a);
        }
        container.makePrompt(`Multiple detected: ${list.outerHTML}`, dataset, false);
      } else {
        const code_obj = await dataUserJS._mujs.code.request();
        if (typeof code_obj.code === 'string')
          doDownloadProcess({
            url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(code_obj.code),
            filename: `${dataUserJS.name}${/\.user\.css$/.test(dataUserJS.code_url) ? '.user.css' : '.user.js'}`
          });
      }
    } else if (cmd === 'load-userjs' || cmd === 'load-header') {
      if (!container.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const codeArea = qs('textarea', target.parentElement.parentElement);
      if (!isEmpty(codeArea.value) && cmd === codeArea.dataset.load) {
        dom.cl.toggle(codeArea, 'hidden');
        return;
      }
      codeArea.dataset.load = cmd;
      const dataUserJS = container.userjsCache.get(+dataset.userjs);
      const code_obj = await dataUserJS._mujs.code.request();
      if (typeof code_obj.data_code_block !== 'string') {
        codeArea.value = 'An error occured';
        return;
      }
      codeArea.value = cmd === 'load-userjs' ? code_obj.data_code_block : code_obj.data_meta_block;
      dom.cl.remove(codeArea, 'hidden');
      for (const e of qsA('mujs-column[data-el="matches"]', target.parentElement.parentElement)) {
        applyTo(dataUserJS, e.dataset.type, qs('.mujs-grants', e), e);
      }
    } else if (cmd === 'load-page') {
      if (!container.userjsCache.has(+dataset.userjs)) {
        return;
      }
      let pageArea = qs('mujs-page', target.parentElement.parentElement);
      if (!pageArea) {
        pageArea = make('mujs-page');
        target.parentElement.parentElement.append(pageArea);
        const dataUserJS = container.userjsCache.get(+dataset.userjs);
        const engine = dataUserJS._mujs.info.engine;
        let pageURL;
        if (engine.name.includes('fork')) {
          const current = navigator.language.split('-')[0] ?? 'en';
          pageURL = dataUserJS.url.replace(
            /\/scripts/,
            `/${/^(zh|fr|es)/.test(current) ? navigator.language : current}/scripts`
          );
        } else if (engine.name.includes('github')) {
          const page_url = await Network.req(dataUserJS.page_url, 'GET', 'json', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${engine.token}`,
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }).catch(() => {
            return {};
          });
          if (!page_url.download_url) {
            return;
          }
          const page = await Network.req(page_url.download_url, 'GET', 'text');
          const shadow = pageArea.attachShadow({ mode: 'closed' });
          const div = make('div', {
            innerHTML: page
          });
          shadow.append(div);
          return;
        } else {
          pageURL = dataUserJS.url;
        }
        if (!pageURL) {
          return;
        }
        const page = await Network.req(pageURL, 'GET', 'document');
        const getContent = () => {
          let content = 'An error occured';
          const h = new URL(dataUserJS.url);
          const root = qs('.user-content', page.documentElement);
          for (const e of qsA('[href]', root)) {
            e.target = '_blank';
            e.style = 'pointer-events: auto;';
            if (e.href.startsWith('/')) {
              e.href = `${h.origin}${e.href}`;
            }
          }
          for (const e of qsA('img[src]', root)) {
            e.style =
              'max-width: 25em; max-height: 25em; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;';
          }
          if (root) {
            content = root.innerHTML;
          } else {
            content = 'No additional info available';
          }
          return content;
        };
        const shadow = pageArea.attachShadow({ mode: 'closed' });
        const div = make('div', {
          style: 'pointer-events: none;',
          innerHTML: getContent()
        });
        shadow.append(div);
        return;
      }
      if (!dom.cl.has(pageArea, 'hidden')) {
        dom.cl.add(pageArea, 'hidden');
        return;
      }
      dom.cl.remove(pageArea, 'hidden');
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
                  container.unsaved = true;
                  container.rebuild = true;
                  rebuildCfg();
                  container.save();
                  container.cache.clear();
                  MUList.build();
                  container.unsaved = false;
                  container.rebuild = false;
                } else {
                  log(`Imported theme: { ${file.name} }`, result);
                  cfg.theme = result;
                  container.renderTheme(cfg.theme);
                }
                inpJSON.remove();
              };
              reader.onerror = () => {
                showError(reader.error);
                inpJSON.remove();
              };
            });
          } catch (ex) {
            showError(ex);
            inpJSON.remove();
          }
        }
      });
      target.parentElement.append(inpJSON);
      inpJSON.click();
    }
  } catch (ex) {
    showError(ex);
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
    Tabs.close(target);
  } else if (cmd === 'new-tab') {
    Tabs.create();
  }
});
ael(main, 'updateditem', (evt) => {
  /**
   * @type {import("../typings/types.d.ts").GSForkQuery}
   */
  const ujs = evt.detail;
  if (!ujs._mujs) return;
  for (const elem of qsA('[data-name]', ujs._mujs.root)) {
    const name = elem.dataset.name;
    if (name === 'code') {
      if (ujs._mujs.code.data_code_block) {
        if (cfg.preview.code && !cfg.preview.metadata) {
          elem.value = ujs._mujs.code.data_code_block;
        } else if (cfg.preview.metadata && !cfg.preview.code) {
          elem.value = ujs._mujs.code.data_meta_block;
        } else {
          elem.value = `${ujs._mujs.code.META_START_COMMENT}${ujs._mujs.code.data_meta_block}${ujs._mujs.code.META_END_COMMENT}${ujs._mujs.code.data_code_block}`;
        }
      }
      continue;
    }
    if (!ujs[name]) continue;
    if (name === 'license') {
      dom.attr(elem, 'title', ujs.license ?? i18n$('no_license'));
      dom.text(elem, `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`);
    } else if (name === 'code_updated_at') {
      dom.text(elem, language.toDate(ujs.code_updated_at));
      elem.dataset.value = new Date(ujs.code_updated_at).toISOString();
    } else if (name === 'created_date') {
      dom.text(elem, `${i18n$('created_date')}: ${language.toDate(ujs.created_at)}`);
      elem.dataset.value = new Date(ujs.created_at).toISOString();
    } else if (name === 'total_installs') {
      dom.text(elem, `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`);
    } else {
      dom.text(elem, ujs[name]);
    }
  }
  if (ujs._mujs.code.data_code_block) {
    for (const e of qsA('mujs-column[data-el="matches"]', ujs._mujs.root)) {
      applyTo(ujs, e.dataset.type, qs('.mujs-grants', e), e);
    }
  }
  if (container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
});
ael(urlBar, 'input', (evt) => {
  evt.preventDefault();
  if (urlBar.placeholder === i18n$('newTab')) {
    return;
  }
  /**
   * @type { string }
   */
  const val = evt.target.value;
  const section = qsA('mujs-section[data-name]', cfgpage);
  if (isEmpty(val)) {
    dom.cl.remove(container.toElem(), 'hidden');
    dom.cl.remove(section, 'hidden');
    return;
  }
  const finds = new Set();
  if (!dom.cl.has(cfgpage, 'hidden')) {
    const reg = new RegExp(val, 'gi');
    for (const elem of section) {
      if (!isElem(elem)) {
        continue;
      }
      if (finds.has(elem)) {
        continue;
      }
      if (dom.text(elem).match(reg)) {
        finds.add(elem);
      }
    }
    dom.cl.add(section, 'hidden');
    dom.cl.remove([...finds], 'hidden');
    return;
  }
  const cacheValues = Array.from(container).filter(({ _mujs }) => {
    return !finds.has(_mujs.root);
  });
  /**
   * @param {RegExpMatchArray} regExp
   * @param {keyof import("../typings/types.d.ts").GSForkQuery} key
   */
  const ezQuery = (regExp, key) => {
    const q_value = val.replace(regExp, '');
    const reg = new RegExp(q_value, 'gi');
    for (const v of cacheValues) {
      let k = v[key];
      if (typeof k === 'number') {
        k = `${v[key]}`;
      }
      if (k && k.match(reg)) {
        finds.add(v._mujs.root);
      }
    }
  };
  if (val.match(/^(code_url|url):/)) {
    ezQuery(/^(code_url|url):/, 'code_url');
  } else if (val.match(/^(author|users?):/)) {
    const parts = /^[\w_]+:(.+)/.exec(val);
    if (parts) {
      const reg = new RegExp(parts[1], 'gi');
      for (const v of cacheValues.filter((v) => !isEmpty(v.users))) {
        for (const user of v.users) {
          for (const value of Object.values(user)) {
            if (typeof value === 'string' && value.match(reg)) {
              finds.add(v._mujs.root);
            } else if (typeof value === 'number' && `${value}`.match(reg)) {
              finds.add(v._mujs.root);
            }
          }
        }
      }
    }
  } else if (val.match(/^(locale|i18n):/)) {
    ezQuery(/^(locale|i18n):/, 'locale');
  } else if (val.match(/^id:/)) {
    ezQuery(/^id:/, 'id');
  } else if (val.match(/^license:/)) {
    ezQuery(/^license:/, 'license');
  } else if (val.match(/^name:/)) {
    ezQuery(/^name:/, 'name');
  } else if (val.match(/^description:/)) {
    ezQuery(/^description:/, 'description');
  } else if (val.match(/^(search_engine|engine):/)) {
    const parts = /^[\w_]+:(\w+)/.exec(val);
    if (parts) {
      const reg = new RegExp(parts[1], 'gi');
      for (const { _mujs } of cacheValues) {
        if (!_mujs.info.engine.name.match(reg)) {
          continue;
        }
        finds.add(_mujs.root);
      }
    }
  } else if (val.match(/^filter:/)) {
    const parts = /^\w+:(.+)/.exec(val);
    if (parts) {
      const bsFilter = loadFilters(cfg);
      const filterType = bsFilter.get(parts[1].trim().toLocaleLowerCase());
      if (filterType) {
        const { reg } = filterType;
        for (const { name, users, _mujs } of cacheValues) {
          if ([{ name }, ...users].find((o) => o.name.match(reg))) {
            continue;
          }
          finds.add(_mujs.root);
        }
      }
    }
  } else if (val.match(/^recommend:/)) {
    for (const { url, id, users, _mujs } of cacheValues) {
      if (
        users.find((u) => u.id === authorID) ||
        goodUserJS.includes(url) ||
        goodUserJS.includes(id)
      ) {
        finds.add(_mujs.root);
      }
    }
  } else {
    const reg = new RegExp(val, 'gi');
    for (const v of cacheValues) {
      if (v.name && v.name.match(reg)) finds.add(v._mujs.root);
      if (v.description && v.description.match(reg)) finds.add(v._mujs.root);
      if (v._mujs.code.data_meta) {
        for (const key of Object.keys(v._mujs.code.data_meta)) {
          if (/name|desc/i.test(key) && key.match(reg)) finds.add(v._mujs.root);
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
  const tabElem = Tabs.getActive();
  if (urlBar.placeholder === i18n$('newTab') && tabElem) {
    const tabHost = tabElem.firstElementChild;
    const host = formatURL(normalizedHostname(val));
    if (Tabs.protoReg.test(val)) {
      const createdTab = Tabs.getTab(val);
      Tabs.close(tabElem);
      if (createdTab) {
        Tabs.active(createdTab);
      } else {
        Tabs.create(val);
      }
      evt.target.placeholder = i18n$('search_placeholder');
      evt.target.value = '';
    } else if (host === '*') {
      tabElem.dataset.host = host;
      tabHost.title = '<All Sites>';
      tabHost.textContent = '<All Sites>';
      MUList.host = host;
      MUList.build();
    } else if (container.checkBlacklist(host)) {
      showError(`Blacklisted "${host}"`);
    } else {
      tabElem.dataset.host = host;
      tabHost.title = host;
      tabHost.textContent = host;
      MUList.host = host;
      MUList.build();
    }
  }
});
// #endregion

Tabs.custom = (host) => {
  MUList.host = host;
  MUList.build();
};

// #region Make Config
const makecfg = () => {
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
  cbtn.append(resetbtn, savebtn);

  const makesection = (name, tag) => {
    tag = tag ?? i18n$('no_license');
    name = name ?? i18n$('no_license');
    const sec = make('mujs-section', {
      dataset: {
        name: tag
      }
    });
    const lb = make('label', {
      dataset: {
        command: tag
      }
    });
    const divDesc = make('mu-js', {
      textContent: name
    });
    ael(sec, 'click', (evt) => {
      /** @type { HTMLElement } */
      const target = evt.target.closest('[data-command]');
      if (!target) {
        return;
      }
      const cmd = target.dataset.command;
      if (cmd === tag) {
        const a = qsA(`[data-${tag}]`, sec);
        if (dom.cl.has(a, 'hidden')) {
          dom.cl.remove(a, 'hidden');
        } else {
          dom.cl.add(a, 'hidden');
        }
      }
    });

    lb.append(divDesc);
    sec.append(lb);
    cfgpage.append(sec);
    return sec;
  };
  const sections = {
    general: makesection('General', 'general'),
    load: makesection('Automation', 'load'),
    list: makesection('List', 'list'),
    filters: makesection('List Filters', 'filters'),
    blacklist: makesection('Blacklist (WIP)', 'blacklist'),
    engine: makesection('Search Engines', 'engine'),
    theme: makesection('Theme Colors', 'theme'),
    exp: makesection('Import / Export', 'exp')
  };
  const makeRow = (text, value, type = 'checkbox', tag = 'general', attrs = {}) => {
    const lb = make('label', 'sub-section hidden', {
      textContent: text,
      dataset: {
        [tag]: text
      }
    });
    cfgMap.set(text, value);
    if (type === 'select') {
      const inp = make('select', {
        dataset: {
          [tag]: text
        },
        ...attrs
      });
      for (const selV of Object.keys(template)) {
        if (selV === 'deleted' || selV === 'users') continue;
        const o = make('option', {
          value: selV,
          textContent: selV
        });
        inp.append(o);
      }
      inp.value = cfg[value];
      lb.append(inp);
      if (sections[tag]) {
        sections[tag].append(lb);
      }
      return lb;
    }
    const inp = make('input', {
      type,
      dataset: {
        [tag]: text
      },
      ...attrs
    });

    if (tag === 'engine') {
      inp.dataset.name = value;
    }

    if (sections[tag]) {
      sections[tag].append(lb);
    }

    if (type === 'checkbox') {
      const inlab = make('mu-js', 'mujs-inlab');
      const la = make('label', {
        onclick() {
          inp.dispatchEvent(new MouseEvent('click'));
        }
      });
      inlab.append(inp, la);
      lb.append(inlab);

      const nm = /^(\w+)-(.+)/.exec(value);
      if (nm) {
        if (nm[1] === 'filters') {
          inp.checked = cfg[nm[1]][nm[2]].enabled;
        } else {
          inp.checked = cfg[nm[1]][nm[2]];
        }
      } else {
        inp.checked = cfg[value];
      }
      ael(inp, 'change', (evt) => {
        container.unsaved = true;
        if (/filterlang/i.test(value)) {
          container.rebuild = true;
        }
        if (nm) {
          if (nm[1] === 'filters') {
            cfg[nm[1]][nm[2]].enabled = evt.target.checked;
          } else {
            cfg[nm[1]][nm[2]] = evt.target.checked;
          }
        } else {
          cfg[value] = evt.target.checked;
        }
        sendMessage({
          type: 'save',
          cfg
        });
      });

      if (tag === 'engine') {
        const engine = cfg.engines.find((engine) => engine.name === value);
        if (engine) {
          inp.checked = engine.enabled;
          inp.dataset.engine = engine.name;
          ael(inp, 'change', (evt) => {
            container.unsaved = true;
            container.rebuild = true;
            engine.enabled = evt.target.checked;
            sendMessage({
              type: 'engine',
              engine
            });
          });

          if (engine.query) {
            const d = DEFAULT_CONFIG.engines.find((e) => e.name === engine.name);
            const urlInp = make('input', {
              type: 'text',
              defaultValue: '',
              value: decodeURIComponent(engine.query) ?? '',
              placeholder: decodeURIComponent(d.query) ?? '',
              dataset: {
                name: nm,
                engine: engine.name
              },
              onchange(evt) {
                container.unsaved = true;
                container.rebuild = true;
                try {
                  engine.query = encodeURIComponent(new URL(evt.target.value).toString());
                  sendMessage({
                    type: 'engine',
                    engine
                  });
                } catch (ex) {
                  err(ex);
                }
              }
            });
            lb.append(urlInp);
          }
          if (engine.name === 'github') {
            const ghToken = make('input', {
              type: 'text',
              defaultValue: '',
              value: engine.token ?? '',
              placeholder: 'Paste Access Token',
              dataset: {
                engine: 'github-token'
              },
              onchange(evt) {
                container.unsaved = true;
                container.rebuild = true;
                engine.token = evt.target.value;
                sendMessage({
                  type: 'engine',
                  engine
                });
              }
            });
            lb.append(ghToken);
            cfgMap.set('github-token', ghToken);
          }
        }
      }
    } else {
      if (type === 'text') {
        inp.defaultValue = '';
        inp.value = value ?? '';
        inp.placeholder = value ?? '';
      }

      lb.append(inp);
    }

    return lb;
  };
  makeRow(i18n$('redirect'), 'sleazyredirect');

  makeRow(i18n$('auto_fetch'), 'autofetch', 'checkbox', 'load');
  makeRow('Clear on Tab close', 'clearTabCache', 'checkbox', 'load');

  makeRow(i18n$('default_sort'), 'autoSort', 'select', 'list');
  makeRow(i18n$('filter'), 'filterlang', 'checkbox', 'list');
  makeRow(i18n$('preview_code'), 'preview-code', 'checkbox', 'list');
  makeRow(i18n$('preview_metadata'), 'preview-metadata', 'checkbox', 'list');
  makeRow(i18n$('recommend_author'), 'recommend-author', 'checkbox', 'list');
  makeRow(i18n$('recommend_others'), 'recommend-others', 'checkbox', 'list');

  for (const [k, v] of Object.entries(cfg.filters)) {
    makeRow(v.name, `filters-${k}`, 'checkbox', 'filters');
  }

  makeRow('Greasy Fork', 'greasyfork', 'checkbox', 'engine');
  makeRow('Sleazy Fork', 'sleazyfork', 'checkbox', 'engine');
  // makeRow('Open UserJS', 'openuserjs', 'checkbox', 'engine');
  makeRow('GitHub API', 'github', 'checkbox', 'engine');

  for (const [k, v] of Object.entries(cfg.theme)) {
    const lb = make('label', 'hidden', {
      textContent: k,
      dataset: {
        theme: k
      }
    });
    const inp = make('input', {
      type: 'text',
      defaultValue: '',
      value: v ?? '',
      placeholder: v ?? '',
      dataset: {
        theme: k
      },
      onchange(evt) {
        let isvalid = true;
        try {
          const val = evt.target.value;
          const sty = container.root.style;
          const str = `--mujs-${k}`;
          const prop = sty.getPropertyValue(str);
          if (isEmpty(val)) {
            cfg.theme[k] = DEFAULT_CONFIG.theme[k];
            sty.removeProperty(str);
            return;
          }
          if (prop === val) {
            return;
          }
          sty.removeProperty(str);
          sty.setProperty(str, val);
          cfg.theme[k] = val;
          sendMessage({
            type: 'save',
            cfg
          });
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
    cfgMap.set(k, inp);
    lb.append(inp);
    sections.theme.append(lb);
  }
  const createList = (key, v = '', disabled = false, type = 'String') => {
    let txt = key;
    if (typeof key === 'string') {
      if (key.startsWith('userjs-')) {
        disabled = true;
        const s = key.substring(7);
        txt = `Built-in "${s}"`;
        v = builtinList[s];
      }
    } else {
      if (!key.enabled) {
        return;
      }
    }

    if (isRegExp(v)) {
      v = v.toString();
      type = 'RegExp';
    } else {
      v = JSON.stringify(v);
      type = 'Object';
    }

    const lb = make('label', 'hidden', {
      textContent: txt,
      dataset: {
        blacklist: key
      }
    });
    const inp = make('input', {
      type: 'text',
      defaultValue: '',
      value: v ?? '',
      placeholder: v ?? '',
      dataset: {
        blacklist: key
      },
      onchange(evt) {
        let isvalid = true;
        try {
          const val = evt.target.value;
          if (isEmpty(val)) {
            return;
          }
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
    const selType = make('select', {
      disabled,
      dataset: {
        blacklist: key
      }
    });
    if (disabled) {
      inp.readOnly = true;
      const o = make('option', {
        value: type,
        textContent: type
      });
      selType.append(o);
    } else {
      for (const selV of ['String', 'RegExp', 'Object']) {
        const o = make('option', {
          value: selV,
          textContent: selV
        });
        selType.append(o);
      }
    }
    selType.value = type;
    lb.append(inp, selType);
    sections.blacklist.append(lb);
  };
  for (const key of cfg.blacklist) {
    createList(key);
  }

  const transfers = {
    export: {
      cfg: make('mujs-btn', 'mujs-export sub-section hidden', {
        textContent: i18n$('export_config'),
        dataset: {
          command: 'export-cfg',
          exp: 'export-cfg'
        }
      }),
      theme: make('mujs-btn', 'mujs-export sub-section hidden', {
        textContent: i18n$('export_theme'),
        dataset: {
          command: 'export-theme',
          exp: 'export-theme'
        }
      })
    },
    import: {
      cfg: make('mujs-btn', 'mujs-import sub-section hidden', {
        textContent: i18n$('import_config'),
        dataset: {
          command: 'import-cfg',
          exp: 'import-cfg'
        }
      }),
      theme: make('mujs-btn', 'mujs-import sub-section hidden', {
        textContent: i18n$('import_theme'),
        dataset: {
          command: 'import-theme',
          exp: 'import-theme'
        }
      })
    }
  };
  for (const value of Object.values(transfers)) {
    for (const v of Object.values(value)) {
      sections.exp.append(v);
    }
  }

  cfgpage.append(cbtn);
};
// #endregion

async function init() {
  const [tab] = await webext.tabs.query({
    active: true,
    currentWindow: true
  });
  const data = [];
  if (tab instanceof Object === false) {
    return true;
  }
  Object.assign(currentTab, tab);
  let url;
  try {
    url = new URL(currentTab.url);
    tabURL.href = url.href || '';
  } catch (ex) {
    err(ex);
  }

  if (url !== undefined) {
    const hostname = formatURL(normalizedHostname(tabURL.hostname));
    const response = await sendMessage({
      init: true,
      type: 'getData',
      currentTab,
      hostname
    });
    if (response instanceof Object) {
      Object.assign(cfg, response.cfg ?? DEFAULT_CONFIG);
      if (Array.isArray(response.data)) {
        data.push(...response.data);
      }
      container.initFn();
      makecfg();
      MUList.cfg = cfg;
      MUList.engines = cfg.engines;
      if (params.has('mujs', 'settings')) {
        Tabs.create('mujs:settings');
      } else if (params.has('host')) {
        const host = params.get('host');
        Tabs.create(host);
        if (!host.startsWith(Tabs.protocal)) {
          MUList.host = host;
          MUList.build(data);
        }
      } else if (!url.origin.startsWith('https://')) {
        Tabs.create();
      } else {
        Tabs.create(hostname);
        MUList.host = hostname;
        MUList.build(data);
      }
    }
  }
}
async function tryInit() {
  try {
    await init();
  } catch {
    setTimeout(tryInit, 100);
  }
}

tryInit();
