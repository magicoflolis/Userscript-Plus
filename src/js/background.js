'use strict'
import { dbg, log, err } from './logger.js'
import Config from './config.js'

const hermes = MU.hermes

const win = self ?? window
win.Config = Config

webext.runtime.onConnect.addListener((p) => {
  hermes.port = p
  /**
   * Default post message to send to all connected scripts
   */
  hermes.send('Config', { cfg: Config.cachedLocalStorage })
  const cfg = Config.cachedLocalStorage
  hermes.getPort().onMessage.addListener((root) => {
    log('Background Script: received message from content script', root)
    const r = root.msg
    if (root.channel === 'Save') {
      if (MU.isNull(r.params)) {
        Config.local.handler.set(r.save, cfg[r.save])
      } else {
        Config.local.handler.set(r.save, r.params)
      }
    }
    if (root.channel === 'Reset') {
      Config.resetToDefault()
    }
  })
})

const alang = [],
  clang = navigator.language.split('-')[0] ?? 'en',
  formatURL = (txt) =>
    txt
      .split('.')
      .splice(-2)
      .join('.')
      .replace(/\/|https:/g, '')

if (!MU.isEmpty(navigator.languages)) {
  for (const nlang of navigator.languages) {
    const lg = nlang.split('-')[0]
    if (alang.indexOf(lg) === -1) {
      alang.push(lg)
    }
  }
}

const cache = []
const isCached = (txt) => cache.filter((c) => Object.is(txt, c.host))

const webFetcher = (loc) => {
  const host = formatURL(loc)
  let cfg = Config.cachedLocalStorage,
    urls = [],
    sites = [],
    custom = [],
    engines = cfg.engines.filter((e) => e.enabled),
    blacklist = cfg.blacklist.filter((b) => b.enabled),
    isBlacklisted = false
  const cacheFilter = isCached(host)
  if (!MU.isEmpty(cacheFilter)) {
    dbg('Cache', cacheFilter[0].data)
    return Promise.resolve(cacheFilter[0].data)
  }
  for (const b of blacklist) {
    if (b.regex) {
      const reg = new RegExp(b.url, b.flags)
      if (!reg.test(host)) continue
      isBlacklisted = true
    }
    if (!Array.isArray(b.url)) {
      if (!host.includes(b.url)) continue
      isBlacklisted = true
    }
    for (const c of b.url) {
      if (!host.includes(c)) continue
      isBlacklisted = true
    }
  }
  log('Blacklisted: ', isBlacklisted, host)
  if (isBlacklisted) {
    return log(isBlacklisted)
  }
  for (const i of engines) {
    if (i.url.match(/fork.org/gi)) {
      if (cfg.filterlang) {
        if (alang.length > 1) {
          for (const a of alang) {
            urls.push(`${i.url}/${a}/scripts/by-site/${host}.json`)
            sites.push(
              MU.fetchURL(`${i.url}/${a}/scripts/by-site/${host}.json`),
            )
          }
          continue
        }
        urls.push(`${i.url}/${clang}/scripts/by-site/${host}.json`)
        sites.push(
          MU.fetchURL(`${i.url}/${clang}/scripts/by-site/${host}.json`),
        )
        continue
      }
      urls.push(`${i.url}/scripts/by-site/${host}.json`)
      sites.push(MU.fetchURL(`${i.url}/scripts/by-site/${host}.json`))
    } else if (i.url.match(/(openuserjs.org|github.com)/gi)) {
      urls.push(`${i.url}${host}`)
      custom.push(MU.fetchURL(`${i.url}${host}`, 'GET', 'text'))
    }
  }
  return Promise.all(sites)
    .then((data) => {
      const filterDeleted = data.filter((d) => d.filter((ujs) => !ujs.deleted)),
        joinData = [...new Set([...filterDeleted[0], ...filterDeleted[1]])],
        filterLang = joinData.filter((d) => {
          if (cfg.filterlang) {
            if (alang.length > 1) {
              let rvalue = true
              for (const a of alang) {
                if (!d.locale.includes(a)) {
                  rvalue = false
                  continue
                }
              }
              return rvalue
            } else if (!d.locale.includes(clang)) return false
          }
          return true
        })
      cache.push({
        host: host,
        data: filterLang,
      })
      dbg('Data', filterLang)
      return filterLang
      // hermes.send('Data', {
      //   list: filterLang
      // });
    })
    .catch(err)
}

webext.webRequest.onHeadersReceived.addListener(
  (e) => {
    if (Object.is(e.type, 'main_frame')) {
      const loc = new URL(e.url)
      webFetcher(loc.host)
    }
  },
  {
    urls: [
      // 'http://*/*',
      'https://*/*',
    ],
  },
)

/**
 * [handleMessage description]
 * @param  msg      The message itself. This is a JSON-ifiable object.
 * @param  sender       A brws.runtime.MessageSender object representing the sender of the message.
 * @param  response A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
 */
function handleMessage(msg, sender, response) {
  // log('Message Handler:', sender, msg);
  if (sender.url.includes('popup.html')) {
    if (msg.location) {
      webFetcher(msg.location).then((data) => response(data))
    } else {
      webext.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        for (const tab of tabs) {
          const loc = new URL(tab.url)
          const cacheFilter = isCached(formatURL(loc.host))
          if (!MU.isEmpty(cacheFilter)) {
            response(cacheFilter[0].data)
          }
        }
      })
    }
  }

  if (msg.name) {
    if (sender.url.includes('settings.html')) {
      Config.local.handler.set(msg.name, msg.value)
      response({
        name: msg.name,
        value: msg.value,
      })
    } else {
      response({ value: Config.cachedLocalStorage[msg.name] })
    }
  }
  return true
}

webext.runtime.onMessage.addListener(handleMessage)
