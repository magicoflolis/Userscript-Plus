'use strict';
// eslint-disable-next-line no-unused-vars
import { dbg, log, err } from './logger.js';
import Config from './config.js';

const hermes = userjs.hermes;

const win = self ?? window;
win.Config = Config;

webext.runtime.onConnect.addListener((p) => {
  hermes.port = p;
  /**
   * Default post message to send to all connected scripts
   */
  hermes.send('Config', { cfg: Config.cachedLocalStorage });
  const cfg = Config.cachedLocalStorage;
  hermes.getPort().onMessage.addListener((root) => {
    log('Background Script: received message from content script', root);
    const r = root.msg;
    if (root.channel === 'Save') {
      if (userjs.isNull(r.value)) {
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

const formatURL = (txt) =>
    txt
      .split('.')
      .splice(-2)
      .join('.')
      .replace(/\/|https:/g, '');

const reqCode = async (obj = {}) => {
  if (obj.code_data) {
    return obj.code_data;
  }
  const txt = await userjs.req(obj.code_url, 'GET', 'text').catch(err);
  if (typeof txt !== 'string') {
    return;
  }
  if (userjs.isNull(txt.match(/\/\/\s@[\w][\s\S]+/g))) {
    return;
  }
  Object.assign(obj, {
    code_data: txt
  });
  return txt;
};

const MUJS = {
  cache: new Map()
}

const webFetcher = async (loc) => {
  const sites = [];
  const host = formatURL(loc);
  const cfg = Config.cachedLocalStorage;

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

  log('Blacklisted: ', isBlacklisted, host);
  if (isBlacklisted) {
    return log(isBlacklisted);
  }

  if (!MUJS.cache.has(host)) {
    const engineTemplate = {};
    for (const engine of cfg.engines) {
      engineTemplate[engine.name] = [];
    }
    MUJS.cache.set(host, engineTemplate);
  }

  const engines = cfg.engines.filter((e) => e.enabled);
  const cache = MUJS.cache.get(host);

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
        const headers = txt.match(/\/\/\s@[\w][\s\S]+/g);
        if (userjs.isNull(headers)) {
          continue;
        }
        for (const lng of alang) {
          const findName = new RegExp(`//\\s*@name:${lng}\\s*(.*)`, 'gi').exec(headers[0]);
          const findDesc = new RegExp(`//\\s*@description:${lng}\\s*(.*)`, 'gi').exec(
            headers[0]
          );
          if (!userjs.isNull(findName)) {
            Object.assign(h, {
              name: findName[1],
              translated: true
            });
          }
          if (!userjs.isNull(findDesc)) {
            Object.assign(h, {
              description: findDesc[1],
              translated: true
            });
          }
        }
        if (h.translated) {
          hds.push(h);
        }
      }
      finalList = [...new Set([...hds, ...filterLang])];

      for (const ujs of finalList) {
        if (cfg.codePreview && !ujs.code_data) {
          await reqCode(ujs);
        }
        // createjs(ujs, false);
      }
      cache[engine.name].push(...finalList);
      // MUJS.addForkCnt(finalList.length);
      return finalList;
    };
    const eURL = engine.url;
    const cEngine = cache[`${engine.name}`];
    if (engine.name.includes('fork')) {
      if (!userjs.isEmpty(cEngine)) {
        // for (const ujs of cEngine) {
        //   createjs(ujs, false);
        // }
        // MUJS.addForkCnt(cEngine.length);
        sites.push(...cEngine);
        continue;
      }
      const data = await userjs.req(`${eURL}/scripts/by-site/${host}.json`).then(forkFN).catch(err);
      sites.push(...data);
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
 * [handleMessage description]
 * @param  msg      The message itself. This is a JSON-ifiable object.
 * @param  sender       A brws.runtime.MessageSender object representing the sender of the message.
 * @param  response A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
 */
function handleMessage(msg, sender, response) {
  if (sender.url.includes('popup.html')) {
    if (msg.location) {
      webFetcher(msg.location).then((data) => response(data));
    } else {
      webext.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        for (const tab of tabs) {
          const loc = new URL(tab.url);
          const host = formatURL(loc.host);
          if (MUJS.cache.has(host)) {
            const cache = MUJS.cache.get(host);
            const arr = [];
            for (const v of Object.values(cache)) {
              arr.push(...v);
            }
            response(arr);
          }
        }
      });
    }
  }

  if (msg.name) {
    if (sender.url.includes('settings.html')) {
      Config.local.handler.set(msg.name, msg.value);
      response({
        name: msg.name,
        value: msg.value
      });
    } else {
      response({ value: Config.cachedLocalStorage[msg.name] });
    }
  }
  return true;
}

webext.runtime.onMessage.addListener(handleMessage);
