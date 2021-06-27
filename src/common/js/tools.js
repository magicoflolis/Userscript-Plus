import fuzzy from "fuzzy.js";
import { format } from "timeago.js";

let config = {
    api: "https://greasyfork.org/scripts/by-site/{host}.json",
    sapi: "https://sleazyfork.org/scripts/by-site/{host}.json"
  },
  brws = typeof browser === "undefined" ? chrome : browser;
export default {
  timeagoFormat (time) {
    let lang = (navigator.language !== 'zh-CN') ? 'en_short' : 'zh_CN'
    return format(time, lang)
  },
  installUserJs(uri) {
    let jsStr = `
    let evt = parent.document.createEvent('MouseEvents'),
    link = parent.document.createElement('a');
    evt.initEvent('click', true, true);
    link.href = '${uri}'
    link.dispatchEvent(evt) `;
    brws.tabs.executeScript(null, { code: jsStr });
  },
  /* Nano Templates - https://github.com/trix/nano */
  nano(template, data) {
    return template.replace(/\{([\w.]*)\}/g, (str, key) => {
      let keys = key.split("."),
      v = data[keys.shift()];
      for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
      return typeof v !== "undefined" && v !== null ? v : "";
    });
  },

  get currentTab() {
    return new Promise((resolve, reject) => {
      try {
        let queryInfo = {
          active: true,
          currentWindow: true
        };
        brws.tabs.query(queryInfo, tabs => {
          let tab = tabs[0];
          resolve(tab);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  get sessionStorage() {
    return new Promise((resolve, reject) => {
      try {
        brws.runtime.getBackgroundPage(bg => {
          resolve(bg.sessionStorage);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  get host() {
    return new Promise((resolve, reject) => {
      try {
        this.currentTab.then(tab => {
          let a = document.createElement("a");
          a.href = tab.url;
          let mainHost = psl.get(a.hostname) || a.hostname.split(".").splice(-2).join(".");
          resolve(mainHost);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getData(callback) {
    this.sessionStorage.then(bgSessionStorage => {
      this.host.then(host => {
        let data = bgSessionStorage.getItem(host),
        fetchJS = (api) => {
          fetch(api).then(r => {
            r.json().then(json => {
              json = json.map(item => {
                item.user = item.users[0];
                return item;
              });
              bgSessionStorage.setItem(host, JSON.stringify(json));
              callback(json);
            });
          });
        };
        (data) ? (data = JSON.parse(data),callback(data)) : (
        fetchJS(this.nano(config.api, {host: host})),
        fetchJS(this.nano(config.sapi, {host: host}))
        );
      });
    });
  },

  searcher(data, query) {
    let rt = [];
    for (let i = 0; i < data.length; i++) {
      let max,frt,item = data[i];
      for (let key of ["name", "description", "user"]) {
        key === "user" ? (frt = fuzzy(item["user"]["name"], query)) : (frt = fuzzy(item[key], query));
        max ?? (max = frt);
        max.score < frt.score ? (max = frt) : false;
      }
      rt.push({
        item,
        score: max.score
      });
    }
    rt = rt.filter(a => a.score !== 0).sort((a, b) => b.score - a.score).map(a => a.item);
    return rt;
  },

  isZH() {
    let nlang = navigator.language.toLowerCase();
    nlang === "zh" ? (nlang = "zh-cn") : false;
    return nlang.search("zh-") === 0;
  }
};