'use strict';
import { runtime } from './ext.js';
import { log } from './logger.js';
import { us } from './api.js';
import Config from './config.js';

const win = self ?? window;

win.US = Config;

us.check(Config).then((c) => {
  let messenger;
  const connected = (p) => {
    messenger = p;
    messenger.postMessage({cfg: c.cachedLocalStorage});
    messenger.onMessage.addListener((r) => {
      log('Background Script: received message from content script',r);
      if(r.delete) {
        c.local.handler.deleteProperty(r.delete);
      };
      if(r.save) {
        log('Background Script: saving...',r.save);
        if(r.params) {
          c.local.handler.set(r.save,r.params);
          log('Background Script: ',r.save,r.params);
        } else {
          c.local.handler.set(r.save,c.cachedLocalStorage[r.save]);
          log('Background Script: ',c.cachedLocalStorage[r.save]);
        };
      };
    });
  },
  /**
  * [handleMessage description]
  * @param  request      The message itself. This is a JSON-ifiable object.
  * @param  sender       A runtime.MessageSender object representing the sender of the message.
  * @param  callback     A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
  */
  // eslint-disable-next-line no-unused-vars
  handleMessage = (request, sender, callback) => {
    log(sender);
    if(!sender.url.includes('options.html')) {
     return Promise.resolve({
       value: c.cachedLocalStorage[request.name]
     });
    } else {
     c.local.handler.set(request.name,request.value);
     return Promise.resolve({
      name: request.name,
      value: request.value
     });
    };
  };
  // const currentTab = {};
  // let tabHostname = '';
  // async function init() {
  //   const [ tab ] = await brws.tabs.query({ active: true });
  //   if ( tab instanceof Object === false ) { return true; }
  //   Object.assign(currentTab, tab);
  //   let url;
  //   try {
  //     url = new URL(currentTab.url);
  //     tabHostname = url.hostname || '';
  //   } catch(ex) {
  //     err(ex)
  //   };
  //   log(tabHostname,currentTab);
  // };
  // async function tryInit() {
  //   try {
  //     await init();
  //   } catch(ex) {
  //     setTimeout(tryInit, 100);
  //   }
  // };
  // tryInit();
  runtime.onConnect.addListener(connected);
  runtime.onMessage.addListener(handleMessage);
});

// const countApi = 'https://greasyfork.org/scripts/by-site.json',
// adultAPI = 'https://sleazyfork.org/scripts/by-site.json';
