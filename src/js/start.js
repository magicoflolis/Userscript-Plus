'use strict';

import { us } from './api.js';
import {qs,qsA} from "./querySelector.js";

import fuzzy from "fuzzy.js";
import { format } from "timeago.js";
import psl from "psl";

let config = {
    api: "https://greasyfork.org/scripts/by-site/{host}.json",
    sapi: "https://sleazyfork.org/scripts/by-site/{host}.json"
  },
  cfg,
  brws = (typeof browser=="undefined"?chrome:browser),
  msg = brws.runtime.connect({name:"messenger"});

  msg.onMessage.addListener((m) => {
    cfg = m.cfg;
    us.log(cfg);
    // us.fetchURL(`https://greasyfork.org/scripts/by-site/${location.hostname}.json`).then(json => {
    //   json = json.map(item => {
    //     item.user = item.users[0];
    //     return item;
    //   });
    //   sessionStorage.setItem(host, JSON.stringify(json));
    //   callback(json);
    // })
    // us.ael(win,"load",loadConfig);
  });

const Tools = {
  timeagoFormat (time) {
    let lang = (navigator.language !== 'zh-CN') ? 'en_short' : 'zh_CN'
    return format(time, lang)
  },
  installUserJs(url) {
    let jsStr = `
    let evt = new MouseEvent("click"),
    link = document.createElement("a");
    link.href = '${url}';
    link.dispatchEvent(evt);`;
    brws.tabs.executeScript({code: jsStr});
  },
  /* Nano Templates - https://github.com/trix/nano */
  nano(template, data) {
    return template.replace(/\{([\w.]*)\}/g, (str, key) => {
      let keys = key.split("."),
      v = data[keys.shift()];
      for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
      return typeof v === "undefined" ? "" : v;
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
        fetchJS = (url) => {
          let f = fetch(url).then(r => r.json())
          f.then(json => {
            json = json.map(item => {
              item.user = item.users[0];
              return item;
            });
            bgSessionStorage.setItem(host, JSON.stringify(json));
            callback(json);
          })
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

let container = us.create("div","ivu-table-body",{
  innerHTML: `<table style="width: 857px;" cellspacing="0" cellpadding="0" border="0">
  <colgroup>
    <col width="50">
    <col width="50">
    <col width="35%">
    <col width="126">
    <col width="105">
    <col width="126">
    <col width="100">
  </colgroup>
  <tbody class="ivu-table-tbody">

  </tbody>
</table>`,
});

(() => {
  qs("#app").append(container);
})();



{/* <tr class="ivu-table-row">

</tr> */}

let itemID = 0;

Tools.getData((json) => {
  let data = json,
  originData = json,
  count = data.length;
  for (let d of data) {
    // let container = us.create("div","container"),
    // arrow = us.create("div","up-arrow"),
    // order = us.create("div","up-order"),
    // title = us.create("div","up-title"),
    // author = us.create("div","up-author"),
    // daily = us.create("div","up-daily"),
    // updated = us.create("div","up-updated"),
    // version = us.create("div","up-version"),
    // rating = us.create("div","up-raing"),
    // desc = us.create("div","up-desc"),
    // installs = us.create("div","up-installs"),
    // install = us.create("div","up-install");
    itemID+=1;
    let row = us.create("tr","ivu-table-row", {
      innerHTML: `<td class="">
      <div class="ivu-table-cell ivu-table-cell-with-expand">
        <div class="ivu-table-cell-expand"><i class="ivu-icon ivu-icon-ios-arrow-right"></i></div>
      </div>
    </td>
    <td class="ivu-table-column-center">
      <div class="ivu-table-cell"><span>${itemID}</span>
      </div>
    </td>
    <td class="">
      <div class="ivu-table-cell">
        <span title="${d.description}" style="cursor: pointer;">${d.name}</span>
      </div>
    </td>
    <td class="">
      <div class="ivu-table-cell">
        <span title="Click to access the ${d.user.name} home page" style="cursor: pointer;">${d.user.name}</span>
      </div>
    </td>
    <td class="">
      <div class="ivu-table-cell">
        <span style="cursor: pointer;">${d.daily_installs}</span></div>
    </td>
    <td class="">
      <div class="ivu-table-cell">
        <span style="cursor: pointer;">${d.created_at}</span></div>
    </td>
    <td class="ivu-table-column-center">
      <div class="ivu-table-cell">
        <div><button type="button" class="ivu-btn ivu-btn-primary ivu-btn-small" style="margin-right: 5px;">
          <i class="ivu-icon ivu-icon-ios-download-outline"></i> <span>Install</span></button></div>
      </div>
    </td>`,
    });
    container.append(row);
  }
  // us.log(data,originData,count);
})
