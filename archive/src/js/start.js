'use strict';
import { runtime } from './ext.js';
import { err,info,log } from './logger.js';
import { us } from './api.js';
// runtime.onMessage.addListener(onMessage);
const msg = runtime.connect({name:'messenger'}),
win = self ?? window,
doc = win.document;
let config = {};
const inject = async (src,type) => {
  let elm;
  try {
    return await new Promise((resolve, reject) => {
      if (!doc) { reject(`Load error for ${src}`) };
      if(type.match(/script/g)) {
        elm = us.make('script','injected', {
          async: true,
          src: runtime.getURL(src)
        });
      } else {
        elm = us.make('link','css', {
          href: runtime.getURL(src),
          rel: 'stylesheet'
        });
      };
      elm.onload = () => resolve(elm);
      elm.onerror = () => reject(`Load error for ${src}`);
      (doc.head || doc.documentElement || doc).appendChild(elm);
    });
  } catch (msg) {
    return err(msg);
  }
};


msg.onMessage.addListener((m) => {
  if(!m) return;
  if(m.cfg) {
    config = m.cfg ?? config;
    log('Config:',config);
    if(doc.readyState === 'complete') {
      inject('web_accessible_resources/magic-userjs.user.js','script');
    } else {
      win.onload = () => {
        inject('web_accessible_resources/magic-userjs.user.js','script');
      };
    };
  };
});
