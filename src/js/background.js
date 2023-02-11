'use strict';
import { dbg, log } from './logger.js';
import Config from './config.js';

const hermes = MU.hermes;

const win = self ?? window;
win.Config = Config;

webext.runtime.onConnect.addListener((p) => {
  hermes.port = p;
  /**
   * Default post message to send to all connected scripts
   */
  hermes.send('Config', { cfg: Config.cachedLocalStorage });
  let cfg = Config.cachedLocalStorage;
  hermes.getPort().onMessage.addListener((root) => {
    log('Background Script: received message from content script', root);
    const r = root.msg;
    if (root.channel === 'Save') {
      if (MU.isNull(r.params)) {
        Config.local.handler.set(r.save, cfg[r.save]);
      } else {
        Config.local.handler.set(r.save, r.params);
      }
    };
    if (root.channel === 'Reset') {
      Config.resetToDefault();
    }
    // if (r.delete) {
    //   Config.local.handler.deleteProperty(r.delete);
    // }
  });
});
let alang = [],
  clang = navigator.language.split('-')[0] ?? 'en',
  formatURL = txt => txt.split('.').splice(-2).join('.').replace(/\/|https:/g, '');;

if(!MU.isEmpty(navigator.languages)) {
  for(let nlang of navigator.languages) {
    let lg = nlang.split('-')[0];
    if(alang.indexOf(lg) === -1) {
      alang.push(lg);
    };
  };
};

let cache = [];
let host = '';
let isCached = txt => cache.filter(c => Object.is(txt,c.host));

webext.webRequest.onHeadersReceived.addListener(
  (e) => {
    if (Object.is(e.type, 'main_frame')) {
      host = formatURL(e.url);
      let cfg = Config.cachedLocalStorage,
        testCache = isCached(host),
        urls = [],
        sites = [],
        custom = [],
        engines = cfg.engines.filter(e => e.enabled),
        blacklist = cfg.blacklist.filter((b) => b.enabled),
        isBlacklisted = false;
      for (let b of blacklist) {
        if (b.regex) {
          let reg = new RegExp(b.url, b.flags),
            testurl = reg.test(host);
          if (!testurl) continue;
          isBlacklisted = true;
        }
        if (!Array.isArray(b.url)) {
          if (!host.includes(b.url)) continue;
          isBlacklisted = true;
        }
        for (let c of b.url) {
          if (!host.includes(c)) continue;
          isBlacklisted = true;
        }
      }
      log('Blacklisted: ', isBlacklisted, host);
      if (isBlacklisted) {
        return log(isBlacklisted);
      };
      if(!MU.isEmpty(testCache)) {
        return;
      };

      for(let i of engines) {
        if(i.url.match(/fork.org/gi)) {
          if(cfg.filterlang) {
            if(alang.length > 1) {
              for(let a of alang) {
                urls.push(`${i.url}/${a}/scripts/by-site/${host}.json`);
                sites.push(MU.fetchURL(`${i.url}/${a}/scripts/by-site/${host}.json`),);
              };
              continue;
            };
            urls.push(`${i.url}/${clang}/scripts/by-site/${host}.json`);
            sites.push(MU.fetchURL(`${i.url}/${clang}/scripts/by-site/${host}.json`),);
            continue;
          };
          urls.push(`${i.url}/scripts/by-site/${host}.json`);
          sites.push(MU.fetchURL(`${i.url}/scripts/by-site/${host}.json`),);
        } else if(i.url.match(/(openuserjs.org|github.com)/gi)) {
          urls.push(`${i.url}${host}`);
          custom.push(MU.fetchURL(`${i.url}${host}`,'GET','text'),);
        };
      };
      Promise.all(sites).then((data) => {
        let filterDeleted = data.filter(d => d.filter(ujs => !ujs.deleted)),
        joinData = [...new Set([...filterDeleted[0], ...filterDeleted[1]])],
        filterLang = joinData.filter((d) => {
          if(cfg.filterlang) {
            if(alang.length > 1) {
              let rvalue = true;
              for(let a of alang) {
                if(!d.locale.includes(a)) {
                  rvalue = false;
                  continue;
                };
              };
              return rvalue;
            } else if(!d.locale.includes(clang)) return false;
          };
          return true;
        });
        cache.push({
          host: host,
          data: filterLang
        });
        dbg(filterLang);
        // hermes.send('Data', {
        //   list: filterLang
        // });
      }).catch((e) => {throw new MU.error('Data',e)});
    }
  },
  {
    urls: [
      // 'http://*/*',
      'https://*/*',
    ],
  }
);
/**
 * [handleMessage description]
 * @param  msg      The message itself. This is a JSON-ifiable object.
 * @param  sender       A brws.runtime.MessageSender object representing the sender of the message.
 * @param  response A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
 */
function handleMessage(msg, sender, response) {
  // log('Message Handler:', sender, msg);

  if (sender.url.includes('popup.html')) {
    webext.tabs.query({ currentWindow: true, active: true }).then((tab) => {
      let c = isCached(formatURL(tab[0].url));
      if(!MU.isEmpty(c)) {
        response(c[0].data);
      };
    });
  };

  if (msg.name) {
    if (sender.url.includes('settings.html')) {
      Config.local.handler.set(msg.name, msg.value);
      response({
        name: msg.name,
        value: msg.value,
      });
    } else {
      response({ value: Config.cachedLocalStorage[msg.name] });
    }
  }
  return true;
}

webext.runtime.onMessage.addListener(handleMessage);
