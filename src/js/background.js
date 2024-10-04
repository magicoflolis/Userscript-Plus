'use strict';
// eslint-disable-next-line no-unused-vars
import { dbg, log, err, info } from './logger.js';
import Config from './config.js';

const win = self ?? window;
const MUJS = {
  cache: new Map()
};

win.MUJS = MUJS;
win.Config = Config;

const { hermes, reqCode, isBlank, isNull, isEmpty, language } = userjs;

const msgCache = {};
webext.runtime.onConnect.addListener((p) => {
  hermes.port = p;
  const cfg = Config.cachedLocalStorage ?? {};
  /**
   * Default post message to send to all connected scripts
   */
  Object.assign(msgCache, { cfg });
  hermes.send('Config', msgCache);
  // hermes.send('Config', { cfg: Config.cachedLocalStorage });
  hermes.getPort().onMessage.addListener((root) => {
    log('Background Script: received message from content script', root);
    const r = root.msg;
    if (root.channel === 'Save') {
      if (isNull(r.value)) {
        Config.local.handler.set(r.prop, cfg[r.prop]);
      } else {
        Config.local.handler.set(r.prop, r.value);
      }
    }
    if (root.channel === 'Reset') {
      Config.resetToDefault();
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

const webFetcher = async (loc) => {
  if (isBlank(loc)) {
    return [];
  }
  const cfg = Config.cachedLocalStorage ?? {};
  const sites = [];
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

  log('Blacklisted:', isBlacklisted, host);
  if (isBlacklisted) {
    return;
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
  const cache = MUJS.cache.get(host);

  info('Building list', { cache, engines, allCache: MUJS.cache });

  for (const engine of engines) {
    const forkFN = async (dataQ) => {
      if (!dataQ) {
        err('Invalid data received from the server, check internet connection');
        return;
      }
      const dq = Array.isArray(dataQ) ? dataQ : Array.isArray(dataQ.query) ? dataQ.query : [];
      const data = dq.filter((d) => !d.deleted);
      if (isBlank(data)) {
        return;
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

      // if (cfg.codePreview) {
      //   for (const ujs of finalList) {
      //     if (!ujs.code_data) {
      //       await reqCode(ujs);
      //     }
      //   }
      // }
      cache[engine.name].push(...finalList);
      // MUJS.addForkCnt(finalList.length);
      return finalList;
    };
    const eURL = engine.url;
    const cEngine = cache[`${engine.name}`];
    if (!isEmpty(cEngine)) {
      sites.push({
        engine,
        data: userjs.normalizeTarget(cEngine),
        host
      });
      continue;
    }
    if (engine.name.includes('fork')) {
      const data = await userjs.req(`${eURL}/scripts/by-site/${host}.json?language=all`).then(forkFN).catch(err);
      sites.push({
        engine,
        data,
        host
      });
    }
  }
  return sites;
};

webext.webRequest.onHeadersReceived.addListener(
  (e) => {
    if (Object.is(e.type, 'main_frame')) {
      const loc = new URL(e.url);
      webFetcher(loc.host);
    }
  },
  {
    urls: [
      // 'http://*/*',
      'https://*/*'
    ]
  }
);
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
      webext.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        for (const tab of tabs) {
          const loc = new URL(tab.url);
          webFetcher(loc.host).then((data) => sendResponse(data));
        }
      });
    }
  }

  if (message.name) {
    if (sender.url.includes('settings.html')) {
      Config.local.handler.set(message.name, message.value);
      sendResponse({
        name: message.name,
        value: message.value
      });
    } else {
      sendResponse({ value: Config.cachedLocalStorage[message.name] });
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
}
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
}

webext.tabs.onActivated.addListener((activeInfo) => {
  webext.tabs.get(activeInfo.tabId, updateCount);
});

webext.tabs.onUpdated.addListener((tabId) => {
  webext.tabs.get(tabId, updateCount);
});