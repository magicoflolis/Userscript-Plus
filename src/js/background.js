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

const { hermes, reqCode, isNull, isEmpty } = userjs;

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

const alang = [];
const clang = navigator.language.split('-')[0] ?? 'en';
if (navigator.languages.length > 0) {
  for (const nlang of navigator.languages) {
    const lg = nlang.split('-')[0];
    if (alang.indexOf(lg) === -1) {
      alang.push(lg);
    }
  }
}
if (!alang.includes(clang)) {
  alang.push(clang);
}

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
    const forkFN = async (data) => {
      if (!data) {
        return;
      }
      const hideData = [];
      const filterLang = data.filter((d) => {
        if (d.deleted) {
          return false;
        }
        if (cfg.filterlang) {
          const dlocal = d.locale.split('-')[0] ?? d.locale;
          if (alang.includes(dlocal)) {
            return true;
          }
          hideData.push(d);
          return false;
        }
        return true;
      });
      let finalList = filterLang;

      const hds = [];
      for (const h of hideData) {
        const txt = await reqCode(h);
        if (typeof txt !== 'string') {
          continue;
        }
        const headers = txt.match(/\/\/\s*@[\w][\s\S]+/g);
        if (isNull(headers)) {
          continue;
        }
        for (const lng of alang) {
          const findName = new RegExp(`//\\s*@name:${lng}\\s*(.*)`, 'gi').exec(headers[0]);
          const findDesc = new RegExp(`//\\s*@description:${lng}\\s*(.*)`, 'gi').exec(headers[0]);
          if (!isNull(findName)) {
            Object.assign(h, {
              name: findName[1],
              translated: true
            });
          }
          if (!isNull(findDesc)) {
            Object.assign(h, {
              description: findDesc[1],
              translated: true
            });
          }
        }
      }
      finalList = [...new Set([...hds, ...filterLang])];

      if (cfg.codePreview) {
        for (const ujs of finalList) {
          if (!ujs.code_data) {
            await reqCode(ujs);
          }
          // createjs(ujs, false);
        }
      }
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
      const data = await userjs.req(`${eURL}/scripts/by-site/${host}.json`).then(forkFN).catch(err);
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
 * @param  msg      The message itself. This is a JSON-ifiable object.
 * @param  sender       A brws.runtime.MessageSender object representing the sender of the message.
 * @param  callback  A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
 */
function onMessage(msg, sender, callback) {
  if (sender.url.includes('popup.html')) {
    if (msg.location) {
      webFetcher(msg.location).then((data) => callback(data));
    } else {
      webext.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        for (const tab of tabs) {
          const loc = new URL(tab.url);
          webFetcher(loc.host).then((data) => callback(data));
        }
      });
    }
  }

  if (msg.name) {
    if (sender.url.includes('settings.html')) {
      Config.local.handler.set(msg.name, msg.value);
      callback({
        name: msg.name,
        value: msg.value
      });
    } else {
      callback({ value: Config.cachedLocalStorage[msg.name] });
    }
  }
  return true;
}

webext.runtime.onMessage.addListener(onMessage);
