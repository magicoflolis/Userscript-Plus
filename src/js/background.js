'use strict';

import { webext, runtime } from './ext.js';
import { hermes } from './messager.js';
import { log, err, info } from './logger.js';
import Network from './network.js';
import { isBlank, isNull, isEmpty, union, loadFilters, isRegExp, isObj, formatURL } from './util.js';
import { BLANK_PAGE, template, builtinList } from './constants.js';
import storage, { DEFAULT_CONFIG } from './storage.js';
import { BaseContainer, BaseList } from './container.js';

/**
 * @type { import("../typings/types").config }
 */
let cfg = {};
const initCfg = async () => {
  const c = await storage.config.getMulti();
  if (!c) {
    await storage.config.set(DEFAULT_CONFIG);
  }
  cfg = {
    ...DEFAULT_CONFIG,
    ...c
  };
  return cfg;
};
initCfg();

class Container extends BaseContainer {
  constructor(url) {
    super(url);
  }

  checkBlacklist(str) {
    str = str || this.host;
    let blacklisted = false;
    if (/accounts*\.google\./.test(str)) {
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
}
const container = new Container();
// #region List
class List extends BaseList {
  constructor(hostname = undefined, tabId = -2) {
    super(hostname, container, cfg);
    this.build = this.build.bind(this);
    if (isEmpty(hostname)) hostname = BLANK_PAGE;
    this.engines = cfg.engines;
    this.host = hostname;
    this.tabId = tabId;
  }

  // #region Builder
  async build() {
    await initCfg();
    this.engines = cfg.engines;
    const { container, blacklisted, engines, host, tabId } = this;
    if (blacklisted || isEmpty(engines) || host === BLANK_PAGE) {
      return [];
    }
    const records = [];
    const fetchRecords = [];
    const bsFilter = loadFilters(cfg);
    const hostCache = Array.from(this);
    info('Building list', { hostCache, engines, container, list: this });
    try {
      const g = this.groupBy();
      if (isEmpty(g)) {
        const toFetch = engines.filter((engine) => !g[engine.name]);
        for (const engine of toFetch) {
          info(`Fetching from "${engine.name}" for "${host}"`);
          const respError = (error) => {
            if (!error.cause) error.cause = engine.name;
            if (error.message.startsWith('429')) {
              err(`Engine: "${engine.name}" Too many requests...`);
              return;
            }
            err(`Engine: "${engine.name}"`, error.message);
          };
          const _mujs = (d) => {
            const obj = {
              ...template,
              ...d,
              _mujs: {
                root: {},
                info: {
                  tabId,
                  engine,
                  host
                },
                code: {
                  meta: {}
                }
              }
            };
            // obj._mujs.code.request = (translate = false, code_url) => {
            //   requestUserJS.call(obj._mujs.code, translate, code_url ?? obj.code_url, obj);
            // };
            return obj;
          };
          /**
           * Prior to UserScript v7.0.0
           * @template {string} F
           * @param {F} fallback
           * @returns {F}
           */
          const toQuery = (fallback) => {
            if (engine.query) {
              return decodeURIComponent(engine.query).replace(/\{host\}/g, host);
            }
            return fallback;
          };
          /**
           * @param { import("../typings/types.d.ts").GSFork } dataQ
           */
          const forkFN = async (dataQ) => {
            if (!dataQ) {
              err('Invalid data received from the server, check internet connection');
              return;
            }
            /**
             * @type { import("../typings/types.d.ts").GSForkQuery[] }
             */
            const dq = Array.isArray(dataQ) ? dataQ : Array.isArray(dataQ.query) ? dataQ.query : [];
            const dataA = dq
              .filter(Boolean)
              .filter((d) => !d.deleted)
              .filter(bsFilter.match);
            if (isBlank(dataA)) {
              // records.push(_mujs({}));
              return;
            }
            const data = dataA.map(_mujs);
            const otherLng = [];
            /**
             * @param {import("../typings/types.d.ts").GSForkQuery} d
             * @returns {boolean}
             */
            const inUserLanguage = (d) => {
              if (userjs.pool.has(d.locale.split('-')[0] ?? d.locale)) {
                return true;
              }
              otherLng.push(d);
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
            for (const ujs of otherLng) {
              const c = await ujs._mujs.code.request(true);
              if (c.translated) {
                hds.push(ujs);
              }
            }
            finalList = union(hds, filterLang);

            for (const ujs of finalList) {
              // if (!ujs._mujs.code.data_code_block && (cfg.preview.code || cfg.preview.metadata)) {
              //   ujs._mujs.code.request().then(() => {
              //     dispatch(ujs);
              //   });
              // }
              if (!container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
            }
            records.push(...finalList);
          };
          const gitFN = async (data) => {
            try {
              if (isBlank(data.items)) {
                err('Invalid data received from the server, TODO fix this');
                return;
              }
              for (const r of data.items) {
                const ujs = _mujs({
                  id: r.repository.id ?? r.id ?? 0,
                  name: r.repository.name ?? r.name,
                  description: isEmpty(r.repository.description)
                    ? 'N/A'
                    : r.repository.description,
                  url: r.repository.html_url,
                  code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
                  page_url: `${r.repository.url}/contents/README.md`,
                  users: [
                    {
                      name: r.repository.owner.login,
                      url: r.repository.owner.html_url
                    }
                  ]
                });
                Network.req(r.repository.url, 'GET', 'json', {
                  headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${engine.token}`,
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                }).then((repository) => {
                  ujs.code_updated_at = r.commit || repository.updated_at || Date.now();
                  ujs.created_at = repository.created_at;
                  ujs.daily_installs = repository.watchers_count ?? 0;
                  ujs.good_ratings = repository.stargazers_count ?? 0;
                  if (repository.license?.name) ujs.license = repository.license.name;
                  // dispatch(ujs);
                });
                // if (!ujs._mujs.code.data_code_block && (cfg.preview.code || cfg.preview.metadata)) {
                //   ujs._mujs.code.request().then(() => {
                //     dispatch(ujs);
                //   });
                // }
                if (!container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
                records.push(ujs);
              }
            } catch (ex) {
              err(ex);
            }
          };
          let netFN;
          if (/github/gi.test(engine.name)) {
            if (isEmpty(engine.token)) {
              err(`"${engine.name}" requires a token to use`);
              continue;
            }
            netFN = Network.req(
              toQuery(
                `${engine.url}"// ==UserScript=="+${host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`
              ),
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
              .then(() => {
                Network.req('https://api.github.com/rate_limit', 'GET', 'json', {
                  headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${engine.token}`,
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                }).catch(respError);
              });
          } else {
            netFN = Network.req(
              toQuery(`${engine.url}/scripts/by-site/${host}.json?language=all`)
            ).then(forkFN);
          }
          if (netFN) {
            fetchRecords.push(netFN.catch(respError));
          }
        }
      }
      if (!isBlank(fetchRecords)) {
        await Promise.allSettled(fetchRecords);
      }
    } catch (ex) {
      err(ex);
    }
    return Array.from(this);
  }
  // #endregion
}
// #endregion

const msgCache = {};
runtime.onConnect.addListener((p) => {
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
      if (r.cfg) {
        storage.config.set(r.cfg).then(initCfg);
      } else {
        const v = isNull(r.value) ? cfg[r.prop] : r.value;
        storage.config.setOne(r.prop, v).then(initCfg);
      }
    } else if (root.channel === 'Reset') {
      storage.config.set(DEFAULT_CONFIG);
    } else if (root.channel === 'Clear') {
      const cache = Array.from(container).filter(({ _mujs }) => _mujs.info.host === r.host);
      for (const ujs of cache) container.userjsCache.delete(ujs.id);
    } else if (root.channel === 'Engine' && cfg.engines) {
      const engine = cfg.engines.find((engine) => engine.name === r.engine.name);
      for (const [k, v] of Object.entries(r.engine)) {
        engine[k] = v;
      }
      storage.config.set(cfg).then(initCfg);
    }
  });
});

const MUList = new List();
/**
 * @param {chrome.tabs.Tab} tab
 */
const setCount = (tab, tabId) => {
  let url;
  try {
    url = new URL(tab.url);
  } catch (ex) {
    err(ex);
  }
  if (url !== undefined) {
    if (!Object.is(url.origin, 'null')) {
      MUList.host = formatURL(url.host);
      MUList.tabId = tabId ?? tab.id ?? -2;
      webext.action.setBadgeText({
        text: `${Array.from(MUList).length ?? 0}`
      });
      return;
    }
  }
  webext.action.setBadgeText({
    text: '0'
  });
};

let requestId = -2;

webext.webRequest.onHeadersReceived.addListener(
  (e) => {
    if (Object.is(e.type, 'main_frame')) {
      if (cfg.autofetch && requestId !== e.requestId) {
        requestId = e.requestId;
        const loc = new URL(e.url);
        MUList.host = formatURL(loc.host);
        MUList.tabId = e.tabId ?? -2;
        MUList.build().then(() => {
          setCount(e, e.tabId)
        });
      }
    }
  },
  {
    urls: ['https://*/*']
  }
);

/**
 * [onMessage description]
 * @param  {object} message - The message itself. This is a JSON-ifiable object.
 * @param  {chrome.runtime.MessageSender} sender
 * @param  {(response: any) => void} sendResponse - A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
 */
function onMessage(message, sender, sendResponse) {
  if (sender.url.includes('popup.html')) {
    if (message.type === 'getData') {
      if (MUList.host !== message.hostname) {
        MUList.host = message.hostname ?? BLANK_PAGE;
        MUList.tabId = message.currentTab?.id ?? -2;
      };
      MUList.build().then((data) => {
        if (message.init) {
          sendResponse({ cfg, data })
        } else {
          sendResponse({ data })
        }
      });
    } else if (message.type === 'save') {
      if (message.cfg) {
        storage.config.set(message.cfg).then(initCfg);
      } else {
        const v = isNull(message.value) ? cfg[message.prop] : message.value;
        storage.config.setOne(message.prop, v).then(initCfg);
      }
    } else if (message.type === 'reset') {
      storage.config.set(DEFAULT_CONFIG);
    } else if (message.type === 'clear') {
      const cache = Array.from(container).filter(({ _mujs }) => _mujs.info.host === message.host);
      for (const ujs of cache) container.userjsCache.delete(ujs.id);
    } else if (message.type === 'engine') {
      const engine = cfg.engines.find((engine) => engine.name === message.engine.name);
      for (const [k, v] of Object.entries(message.engine)) {
        engine[k] = v;
      }
      storage.config.set(cfg).then(initCfg);
    } else if (message.location) {
      MUList.host = formatURL(message.location);
      MUList.build().then(sendResponse);
    } else {
      sendResponse({ cfg });
    }
  }
  return true;
}

function start() {
  runtime.onMessage.addListener(onMessage);

  webext.tabs.onRemoved.addListener((tabId) => {
    const cache = Array.from(container.userjsCache.values()).filter(({ _mujs }) => {
      return !isEmpty(_mujs) && _mujs.info.tabId === tabId;
    });
    for (const ujs of cache) container.userjsCache.delete(ujs.id);
  });

  webext.tabs.onCreated.addListener(setCount);

  webext.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    webext.tabs.get(tabId, setCount);
  });

  webext.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === 'complete') {
      setCount(tab, tabId);
    }
  });

  webext.action.setBadgeText({
    text: '0'
  });
}

start();
