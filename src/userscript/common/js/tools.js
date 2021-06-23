/* global parent, Event, sessionStorage */

import timeago from 'timeago.js'
import fuzzy from 'fuzzy.js'
import psl from 'psl'

let config = {
  cacheKey: 'jae_fetch_userjs_cache',
  countKey: 'jae_fetch_userjs_count',
  host: psl.get(window.location.hostname) || window.location.hostname.split('.').splice(-2).join('.'),
  api: 'https://greasyfork.org/scripts/by-site/{host}.json',
  sapi: 'https://sleazyfork.org/scripts/by-site/{host}.json'
}

export default {
  timeagoFormat (time) {
    let lang = (navigator.language === 'zh-CN') ? 'zh_CN' : 'en_short'
    return timeago(null, lang).format(time)
  },
  installUserJs (uri) {
    let evt = parent.document.createEvent('MouseEvents'),
    link = parent.document.createElement('a');
    evt.initEvent('click', true, true)
    link.href = uri
    link.dispatchEvent(evt)
  },
  dispatchEvent (eventName) {
    parent.document.getElementById('jae_userscript_box').dispatchEvent(new Event(eventName))
  },
  /* Nano Templates - https://github.com/trix/nano */
  nano (template, data) {
    return template.replace(/\{([\w.]*)\}/g, function (str, key) {
      let keys = key.split('.')
      let v = data[keys.shift()]
      for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]]
      return (typeof v !== 'undefined' && v !== null) ? v : ''
    })
  },
  getJSON (url, retry = 3) {
    new Promise((resolve, reject) => {
      try {
        parent.window.GmAjax({
          method: 'GET',
          url,
          onload: ({ status, response }) => {
            let json = JSON.parse(response.responseText)
            (status === 200) ? resolve(json) : (retry === 0) ? reject(`${status} ${url}`) : false;
          }
        })
        // parent.window.GmAjax({
        //   method: 'GET',
        //   url: url,
        //   onload: (res) => {
        //     let json = JSON.parse(res.responseText)
        //     callback(json)
        //   }
        // })
      } catch (error) {
        reject(error)
    }
    })
  },
  getData (callback) {
    let data = sessionStorage.getItem(config.cacheKey);
    (data) ? (data = JSON.parse(data),callback(data)) : (
      this.getJSON(this.nano(config.sapi, {host: config.host}), (json) => {
        json = json.map((item) => {
          item.user = item.users[0]
          return item
        })
        sessionStorage.setItem(config.cacheKey, JSON.stringify(json))
        callback(json)
      }),
      this.getJSON(this.nano(config.api, {host: config.host}), (json) => {
        json = json.map((item) => {
          item.user = item.users[0]
          return item
        })
        sessionStorage.setItem(config.cacheKey, JSON.stringify(json))
        callback(json)
      })
    )
  },

  getCount () {
    let count = sessionStorage.getItem(config.countKey)
    return count >= 50 ? 50 : count
  },

  searcher (data, query) {
    let rt = []
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      let max = null
      let frt = null
      for (let key of ['name', 'description', 'user']) {
        key === "user" ? (frt = fuzzy(item["user"]["name"], query)) : (frt = fuzzy(item[key], query));
        max === null ? (max = frt) : max.score < frt.score ? (max = frt) : false;
      }
      rt.push({
        item,
        'score': max.score
      })
    }
    rt = rt.filter((a) => a.score !== 0).sort((a, b) => b.score - a.score).map((a) => a.item)
    return rt
  },

  isZH () {
    let nlang = navigator.language.toLowerCase()
    nlang === "zh" ? (nlang = "zh-cn") : false
    return nlang.search("zh-") === 0
  }
}
