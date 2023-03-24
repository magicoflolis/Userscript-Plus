'use strict';

const win = self ?? window,
doc = win.document,
us = {
  estr(str) {
    return Object.is(str,null) || Object.is(str,undefined) || typeof str === 'string' && Object.is(str.trim(),'')
  },
  ael(elm,event,callback) {
    elm = elm ?? doc;
    if(typeof screen.orientation === 'undefined' || (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)) {
      if(event === 'click') {
        elm.addEventListener('mouseup', callback);
        elm.addEventListener('touchstart', callback);
        elm.addEventListener('touchend', callback);
      }
    };
    return elm.addEventListener(event, callback);
  },
  /** Waits until args return true */
  async check(args) {
    while (this.estr(args)) {
      await new Promise(resolve => requestAnimationFrame(resolve) )
    };
    return args;
  },
  /** Can make various elements */
  make(elm,cname,attrs = {}) {
    let el = doc.createElement(elm);
    if(cname || !this.estr(cname)) {
      el.className = `mujs-${cname}`;
    };
    if(attrs) {
      for (let key in attrs) {
        el[key] = attrs[key];
      };
    };
    return el;
  },
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  fetchURL(url,method = 'GET',responseType = 'json',params = {}) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        ...params,
      }).then((response) => {
        if(!response.ok) reject(response);
        if(responseType.match(/json/gi)) {
          resolve(response.json());
        } else if(responseType.match(/text/gi)) {
          resolve(response.text());
        } else if(responseType.match(/blob/gi)) {
          resolve(response.blob());
        };
        resolve(response);
      }).catch(reason => console.info(reason));
    });
  },
  fetchFile(path,responseType = 'text') {
    return new Promise((resolve, reject) => {
      fetch(path).then((response) => {
        if(!response.ok) reject(response);
        if(responseType.match(/json/gi)) {
          resolve(response.json());
        } else if(responseType.match(/text/gi)) {
          resolve(response.text());
        } else if(responseType.match(/blob/gi)) {
          resolve(response.blob());
        };
        resolve(response);
      }).catch(reason => console.info(reason));
    });
  },
  halt(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  inject(src) {
    let s = this.make('script','injected', {
      type: 'text/javascript',
      innerHTML: src,
    });
    (doc.head || doc.documentElement || doc).appendChild(s);
    if(s) {
      s.remove();
    };
  },
  /**
  * @param {Node} element
  * @param {MutationCallback} callback
  * @param {MutationObserverInit} options
  */
  observe(element, callback, options = {subtree:true,childList:true}) {
    let observer = new MutationObserver(callback);
    callback([], observer);
    observer.observe(element, options);
    return observer;
  },
  /** Waits until element exists */
  async query(selector,root) {
    root = root ?? doc;
    while(this.estr(root.querySelector(selector))) {
      await new Promise(resolve => requestAnimationFrame(resolve))
    };
    return root.querySelector(selector);
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  setItem(key,value) {
    return localStorage.setItem(key,value);
  },
};

export { us };
