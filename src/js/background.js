'use strict';

import Config from './config.js';
import { us } from './api.js';

const win = self ?? window;

win.US = Config;

let brws = (typeof browser=="undefined"?chrome:browser);

us.check(Config).then((c) => {
  let messenger;
  function connected(p) {
    messenger = p;
    messenger.postMessage({cfg: c.cachedLocalStorage});
    // eslint-disable-next-line no-unused-vars
    messenger.onMessage.addListener((r) => {
      us.log("Background Script: received message from content script",r);
      if(r.delete) {
        c.local.handler.deleteProperty(r.delete);
      };
      if(r.save) {
        us.log("Background Script: saving...",r.save);
        if(r.params) {
          c.local.handler.set(r.save,r.params);
          us.log("Background Script: ",r.save,r.params);
        } else {
          c.local.handler.set(r.save,c.cachedLocalStorage[r.save]);
          us.log("Background Script: ",c.cachedLocalStorage[r.save]);
        };
      };
    });
  }
  brws.runtime.onConnect.addListener(connected);
  /**
  * [handleMessage description]
  * @param  request      The message itself. This is a JSON-ifiable object.
  * @param  sender       A runtime.MessageSender object representing the sender of the message.
  * @param  sendResponse A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
  */
  // eslint-disable-next-line no-unused-vars
  function handleMessage(request, sender, sendResponse) {
   us.log(sender);
   if(!sender.url.includes("options.html")) {
    return Promise.resolve({
      value: c.cachedLocalStorage[request.name]
    });
   } else {
    c.local.handler.set(request.name,request.value);
    return Promise.resolve({
     name: request.name,
     value: request.value
    });
   }
  }

  brws.runtime.onMessage.addListener(handleMessage);
});

const countApi = "https://greasyfork.org/scripts/by-site.json",
  adultAPI = "https://sleazyfork.org/scripts/by-site.json",
  getCurrentTabUrl = async (callback) => {
    try {
      let queryInfo = {
        active: true,
        currentWindow: true,
      };
      brws.tabs.query(queryInfo, (tabs) => {
        let tab = tabs[0],
        url = tab.url;
        console.assert(typeof url == "string", "tab.url should be a string");
        callback(url);
      });
    } catch (e) {
      us.err(e);
      brws.browserAction.setBadgeText({
        text: "err",
      });
      return callback(url);
    }
  },
  getUrlHost = (url) => {
    let a = us.create("a",null,{href: url});
    let mainHost = psl.get(a.hostname) || a.hostname.split(".").splice(-2).join(".");
    return mainHost;
  },
  changeBadge = (cData) => {
    getCurrentTabUrl((url) => {
      let host = getUrlHost(url),
        count = cData[host];
      count = count > 50 ? 50 : count;
      sessionStorage.setItem("host", host);
      (count) ? brws.browserAction.setBadgeText({
        text: count.toString(),
      }) : brws.browserAction.setBadgeText({
        text: "",
      });
    });
  },
  countBadge = async (api) => {
    await new Promise((reject) => {
      try {
        fetch(api).then((r) => {
          r.json().then((data) => {
            brws.tabs.onUpdated.addListener(() => {
              changeBadge(data);
            });
            brws.tabs.onActivated.addListener(() => {
              changeBadge(data);
            });
          });
        });
      } catch (error) {
        reject(error);
      }
    })
  };
  countBadge(countApi);
  countBadge(adultAPI);
