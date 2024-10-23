'use strict';
import { log, err, info } from './logger.js';
import { i18n$ } from './i18n.js';
// import Config from './config.js';
import Network from './network.js';
import { reqCode } from './request-code.js';
import { language } from './language.js';
import { isBlank, isNull, isEmpty, normalizeTarget, template } from './util.js';
import { XMap } from './XMap.js';
import storage, { storageByPrefix } from './storage.js';

const MUJS = {
  cache: new XMap()
};

window.MUJS = MUJS;
window.Config = storage;
window.storageByPrefix = storageByPrefix;

/**
 * @type { import("../typings/types").config }
 */
const cfg = {};
/**
 * @type { import("../typings/types").config }
 */
const DEFAULT_CONFIG = {
  // cache: true,
  codePreview: false,
  // autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  // time: 10000,
  blacklist: [
    {
      enabled: true,
      regex: true,
      flags: '',
      name: 'Blacklist 1',
      url: '(gov|cart|checkout|login|join|signin|signup|sign-up|password|reset|password_reset)'
    },
    {
      enabled: true,
      regex: true,
      flags: '',
      name: 'Blacklist 2',
      url: '(pay|bank|money|localhost|authorize|checkout|bill|wallet|router)'
    },
    {
      enabled: true,
      regex: false,
      flags: '',
      name: 'Blacklist 3',
      url: 'https://home.bluesnap.com'
    },
    {
      enabled: true,
      regex: false,
      flags: '',
      name: 'Blacklist 4',
      url: ['zalo.me', 'skrill.com']
    }
  ],
  engines: [
    {
      enabled: true,
      name: 'greasyfork',
      url: 'https://greasyfork.org'
    },
    {
      enabled: false,
      name: 'sleazyfork',
      url: 'https://sleazyfork.org'
    },
    {
      enabled: false,
      name: 'openuserjs',
      url: 'https://openuserjs.org/?q='
    },
    {
      enabled: false,
      name: 'github',
      url: 'https://api.github.com/search/code?q=',
      token: ''
    }
  ],
  theme: {
    'even-row': '',
    'odd-row': '',
    'even-err': '',
    'odd-err': '',
    'background-color': '',
    'gf-color': '',
    'sf-color': '',
    'border-b-color': '',
    'gf-btn-color': '',
    'sf-btn-color': '',
    'sf-txt-color': '',
    'txt-color': '',
    'chck-color': '',
    'chck-gf': '',
    'chck-git': '',
    'chck-open': '',
    placeholder: '',
    'position-top': '',
    'position-bottom': '',
    'position-left': '',
    'position-right': '',
    'font-family': ''
  },
  recommend: {
    author: true,
    others: true
  }
};

const initCfg = async () => {
  const c = await storage.config.getMulti();
  if (!c) {
    await storage.config.set(DEFAULT_CONFIG);
  }
  Object.assign(cfg, c);
  return cfg;
};
initCfg();

const { hermes } = userjs;

const msgCache = {};
webext.runtime.onConnect.addListener((p) => {
  hermes.port = p;
  /**
   * Default post message to send to all connected scripts
   */
  Object.assign(msgCache, { cfg });
  hermes.send('Config', msgCache);
  hermes.getPort().onMessage.addListener((root) => {
    log('Background Script: received message from content script', root);
    const r = root.msg;
    if (root.channel === 'Save') {
      const v = isNull(r.value) ? cfg[r.prop] : r.value;
      storage.config.setOne(r.prop, v);
    }
    if (root.channel === 'Reset') {
      storage.config.set(DEFAULT_CONFIG);
    }
  });
});

// Unsupport webpages for each engine
const unsupported = {
  greasyfork: ['pornhub.com'],
  sleazyfork: ['pornhub.com'],
  openuserjs: [],
  github: []
};

const formatURL = (txt) =>
  txt
    .split('.')
    .splice(-2)
    .join('.')
    .replace(/\/|https:/g, '');

/**
 * @param {chrome.tabs.Tab} tab
 * @returns {string}
 */
const getTabUrl = (tab) => tab.pendingUrl || tab.url || '';
// const queryOptions = { active: true, lastFocusedWindow: true };
const queryOptions = { active: true, currentWindow: true };

// class Website {
//   constructor(e) {
//     this.engine = e.engine ?? {};
//     this.data = e.data ?? [];
//     this.host = e.host ?? 'about:blank';
//     this.link = e.link ?? 'about:blank';
//   }

//   setData(v) {
//     this.data = v ?? [];
//   }
// }

// class Engine {
//   constructor(host, engine) {
//     this.host = host ?? 'about:blank';
//     this.engine = engine ?? {};
//     this.data = [];
//   }

//   setEngine(engine) {
//     this.engine = engine;
//     return this;
//   }

//   setHost(host) {
//     if (host !== this.host) {
//       this.host = host;
//     }
//     return this;
//   }

//   async getData() {
//     if (isEmpty(this.host) || this.host === 'about:blank') {
//       return []
//     }
//     const engine = this.engine;
//     /**
//      * @param { import("../typings/types").GSFork } dataQ
//      */
//     const forkFN = async (dataQ) => {
//       if (!dataQ) {
//         err('Invalid data received from the server, check internet connection');
//         return [];
//       }
//       /**
//        * @type { import("../typings/types").GSForkQuery[] }
//        */
//       const dq = Array.isArray(dataQ) ? dataQ : Array.isArray(dataQ.query) ? dataQ.query : [];
//       const data = dq.filter((d) => !d.deleted);
//       if (isBlank(data)) {
//         return [];
//       }
//       const hideData = [];
//       const inUserLanguage = (d) => {
//         const dlocal = d.locale.split('-')[0] ?? d.locale;
//         if (language.cache.includes(dlocal)) {
//           return true;
//         }
//         hideData.push(d);
//         return false;
//       };
//       const filterLang = data.filter((d) => {
//         if (cfg.filterlang && !inUserLanguage(d)) {
//           return false;
//         }
//         return true;
//       });

//       let finalList = filterLang;
//       const hds = [];
//       for (const ujs of hideData) {
//         await reqCode(ujs, true);
//         if (ujs.translated) {
//           hds.push(ujs);
//         }
//       }
//       finalList = [...new Set([...hds, ...filterLang])];

//       this.data.push(...finalList);
//       return finalList;
//     };
//     const gitFN = async (data) => {
//       const records = [];
//       try {
//         if (isBlank(data.items)) {
//           err('Invalid data received from the server, TODO fix this');
//           return;
//         }
//         for (const r of data.items) {
//           const ujs = template.merge({
//             name: r.name,
//             description: isEmpty(r.repository.description)
//               ? i18n$('no_license')
//               : r.repository.description,
//             url: r.html_url,
//             code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
//             code_updated_at: r.commit || Date.now(),
//             total_installs: r.score,
//             users: [
//               {
//                 name: r.repository.owner.login,
//                 url: r.repository.owner.html_url
//               }
//             ]
//           });
//           if (cfg.codePreview && !ujs.code_data) {
//             await reqCode(ujs);
//           }
//           records.push(ujs);
//         }
//         this.data.push(...records);
//       } catch (ex) {
//         err(ex);
//       }
//       return records;
//     };
//     if (engine.name.includes('fork')) {
//       await Network.req(`${engine.url}/scripts/by-site/${this.host}.json?language=all`)
//         .then(forkFN)
//         .catch(err);
//     } else if (/github/gi.test(engine.name)) {
//       if (isEmpty(engine.token)) {
//         err(`"${engine.name}" requires a token to use`);
//         return;
//       }
//       await Network.req(
//         `${engine.url}"// ==UserScript=="+${this.host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`,
//         'GET',
//         'json',
//         {
//           headers: {
//             Accept: 'application/vnd.github+json',
//             Authorization: `Bearer ${engine.token}`,
//             'X-GitHub-Api-Version': '2022-11-28'
//           }
//         }
//       )
//         .then(gitFN)
//         .catch(err);
//     }
//     return this.data;
//   }
// }
// const eng = new Engine();

// const cac = new Map();

const webFetcher = async (loc, tabId = -2, link) => {
  if (isBlank(loc)) {
    return [];
  }
  const host = formatURL(loc);

  let isBlacklisted = false;
  for (const b of cfg.blacklist.filter((b) => b.enabled)) {
    if (b.regex === true) {
      const reg = new RegExp(b.url, b.flags);
      if (!reg.test(host)) continue;
      isBlacklisted = true;
    }
    if (Array.isArray(b.url)) {
      for (const c of b.url) {
        if (!host.includes(c)) continue;
        isBlacklisted = true;
      }
    }
    if (!host.includes(b.url)) continue;
    isBlacklisted = true;
  }

  // log('Blacklisted:', isBlacklisted, host);
  if (isBlacklisted) {
    return [];
  }

  if (!MUJS.cache.has(host)) {
    const engineTemplate = {};
    for (const engine of cfg.engines) {
      engineTemplate[engine.name] = [];
    }
    MUJS.cache.set(host, engineTemplate);
  }

  const isSupported = (name) => {
    for (const [k, v] of Object.entries(unsupported)) {
      if (k !== name) {
        continue;
      }
      if (v.includes(host)) {
        return false;
      }
    }
    return true;
  };
  const engines = cfg.engines.filter((e) => e.enabled && isSupported(e.name));
  if (isEmpty(engines)) {
    return [];
  }
  const cache = MUJS.cache.get(host);
  const sites = [];

  info('Building list', { cfg, cache, engines, allCache: MUJS.cache, sites });


  // for (const engine of engines) {
  //   if (!isEmpty(cache[`${engine.name}`])) {
  //     sites.push({
  //       engine,
  //       data: normalizeTarget(cache[`${engine.name}`]),
  //       host,
  //       link
  //       // tab
  //     });
  //     continue;
  //   }
  //   eng.setHost(host).setEngine(engine);
  //   await eng.getData();
  // }
  // log(eng.data);

  for (const engine of engines) {
    if (!isEmpty(cache[`${engine.name}`])) {
      sites.push({
        engine,
        data: normalizeTarget(cache[`${engine.name}`]),
        host,
        link
        // tab
      });
      continue;
    }
    const engineArr = cache[engine.name];
    /**
     * @param { import("../typings/types").GSFork } dataQ
     */
    const forkFN = async (dataQ) => {
      if (!dataQ) {
        err('Invalid data received from the server, check internet connection');
        return [];
      }
      /**
       * @type { import("../typings/types").GSForkQuery[] }
       */
      const dq = Array.isArray(dataQ) ? dataQ : Array.isArray(dataQ.query) ? dataQ.query : [];
      const data = dq.filter((d) => !d.deleted);
      if (isBlank(data)) {
        return [];
      }
      const hideData = [];
      const inUserLanguage = (d) => {
        const dlocal = d.locale.split('-')[0] ?? d.locale;
        if (language.cache.includes(dlocal)) {
          return true;
        }
        hideData.push(d);
        return false;
      };
      const filterLang = data.filter((d) => {
        if (cfg.filterlang && !inUserLanguage(d)) {
          return false;
        }
        return true;
      });

      let finalList = filterLang;
      const hds = [];
      for (const ujs of hideData) {
        await reqCode(ujs, true);
        if (ujs.translated) {
          hds.push(ujs);
        }
      }
      finalList = [...new Set([...hds, ...filterLang])];

      // for (const ujs of finalList) {
      //   if (!cac.has(ujs.id)) {
      //     cac.set(ujs.id, {
      //       ...ujs,
      //       mujs: {
      //         engine,
      //         host,
      //         timestamp: Date.now(),
      //       }
      //     })
      //   }
      // }

      engineArr.push(...finalList);
      return finalList;
    };
    const gitFN = async (data) => {
      const records = [];
      try {
        if (isBlank(data.items)) {
          err('Invalid data received from the server, TODO fix this');
          return;
        }
        for (const r of data.items) {
          const ujs = template.merge({
            name: r.name,
            description: isEmpty(r.repository.description)
              ? i18n$('no_license')
              : r.repository.description,
            url: r.html_url,
            code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
            code_updated_at: r.commit || Date.now(),
            total_installs: r.score,
            users: [
              {
                name: r.repository.owner.login,
                url: r.repository.owner.html_url
              }
            ]
          });
          if (cfg.codePreview && !ujs.code_data) {
            await reqCode(ujs);
          }
          // createjs(ujs, engine.name);
          records.push(ujs);
        }
        engineArr.push(...records);
      } catch (ex) {
        err(ex);
      }
      return records;
    };
    if (engine.name.includes('fork')) {
      const data = await Network.req(`${engine.url}/scripts/by-site/${host}.json?language=all`)
        .then(forkFN)
        .catch(err);
      sites.push({
        engine,
        data,
        host,
        link
        // tab
      });
    } else if (/github/gi.test(engine.name)) {
      if (isEmpty(engine.token)) {
        err(`"${engine.name}" requires a token to use`);
        continue;
      }
      const data = await Network.req(
        `${engine.url}"// ==UserScript=="+${host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`,
        'GET',
        'json',
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${engine.token}`,
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )
        .then(gitFN)
        .catch(err);
      sites.push({
        engine,
        data,
        host,
        link
        // tab
      });
    }
  }
  if (tabId > -1) {
    webext.tabs.get(tabId, updateCount);
  }
  // log(cac);
  return sites;
};

let requestId = -2;
// let isRedirect = false;

webext.webRequest.onHeadersReceived.addListener(
  (e) => {
    if (Object.is(e.type, 'main_frame')) {
      // log(e, isRedirect);
      if (requestId !== e.requestId) {
        requestId = e.requestId;
        const loc = new URL(e.url);
        webFetcher(loc.host, e.tabId, e.url);
      }
    }
  },
  {
    urls: [
      // 'http://*/*',
      'https://*/*'
    ]
  }
);
// webext.webRequest.onBeforeRedirect.addListener(
//   (e) => {
//     if (Object.is(e.type, 'main_frame')) {
//       log(e);
//       if (requestId === e.requestId) {
//         isRedirect = true;
//         requestId = -2;
//       }
//       // if (requestId !== e.requestId) {
//       //   log(e);
//       //   requestId = e.requestId;
//       //   const loc = new URL(e.url);
//       //   webFetcher(loc.host, e.tabId);
//       // }
//     }
//   },
//   {
//     urls: [
//       // 'http://*/*',
//       'https://*/*'
//     ]
//   }
// );

/**
 * [onMessage description]
 * @param  {*} message - The message itself. This is a JSON-ifiable object.
 * @param  {chrome.runtime.MessageSender} sender
 * @param  {(response: any) => void} sendResponse - A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
 */
function onMessage(message, sender, sendResponse) {
  if (sender.url.includes('popup.html')) {
    if (message.location) {
      webFetcher(message.location).then((data) => sendResponse(data));
    } else {
      webext.tabs.query(queryOptions, (tabs) => {
        const tab = tabs[0];
        const loc = new URL(getTabUrl(tab));
        webFetcher(loc.host, tab.id, getTabUrl(tab)).then((data) => sendResponse(data));
      });
    }
  }

  if (message.name) {
    if (sender.url.includes('settings.html')) {
      storage.config.setOne(message.name, message.value);
      sendResponse({
        name: message.name,
        value: message.value
      });
    } else {
      sendResponse({ value: cfg[message.name] });
    }
  }
  return true;
}

webext.runtime.onMessage.addListener(onMessage);

const tc = (tab) => {
  const loc = new URL(tab.url);
  const host = formatURL(loc.host);
  return {
    loc,
    host,
    cache: MUJS.cache.get(host)
  };
};
const updateCount = (tab) => {
  const { cache } = tc(tab);
  let cnt = 0;
  if (cache) {
    for (const v of Object.values(cache)) {
      cnt += v.length;
    }
  }
  webext.browserAction.setBadgeText({
    text: `${cnt}`
  });
};

// webext.tabs.onCreated.addListener((tab) => {
//   updateCount(tab);
// });

webext.tabs.onActivated.addListener((activeInfo) => {
  const { tabId } = activeInfo;
  webext.tabs.get(tabId, updateCount);
  // if (currentTab.tabId !== tabId) {
  //   currentTab.tabId = tabId;
  // }
  // log('onActivated', currentTab);
});

webext.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updateCount(tab);
  // if (changeInfo.status === 'complete') {
  //   if (currentTab.tabId !== tabId) {
  //     currentTab.tabId = tabId;
  //     currentTab.url = getTabUrl(tab);
  //   }
  // }
});
