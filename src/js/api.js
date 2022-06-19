'use strict';

let win = self ?? window,
doc = win.document;

export const us = {
  ael(elm,event,callback){
    elm = elm ?? doc;
    if(typeof screen.orientation === 'undefined' || (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)) {
      if(event === "click") {
        elm.addEventListener("mouseup", callback);
        elm.addEventListener("touchstart", callback);
        elm.addEventListener("touchend", callback);
      }
    } else {
      return elm.addEventListener(event, callback);
    }
  },
  /** Waits until args return true */
  async check(args) {
    while (args === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return args;
  },
  /** Can create various elements */
  create(element,cname,attrs = {}) {
    let el = doc.createElement(element);
    cname ? (el.className = cname) : false;
    if(attrs) {
      for (let key in attrs) {
        el[key] = attrs[key];
        // // keys
        // alert( key );  // name, age, isAdmin
        // // values for the keys
        // alert( attrs[key] ); // John, 30, true
      }
    }

    return el;
  },
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  err(...error) {
    console.error('[%cUserJS%c] %cERROR', 'color: rgb(237,63,20);', '', 'color: rgb(249, 24, 128);', ...error);
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  html: doc.documentElement,
  async fe(elements,callback) {
    try {
      return await new Promise((resolve, reject) => {
        elements = elements ?? reject(new Error(`Element(s) not found ${elements})`));
        this.qa(elements).then(e => resolve(e.forEach(callback)))
      });
    } catch (error) {
      return this.err(error.message);
    }
  },
  async fetchURL(url) {
    let f = await fetch(url),
    response = await f.json();
    return response;
  },
  halt(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  info(...message){
    console.info('[%cUserJS%c] %cINF', 'color: rgb(237,63,20);', '', 'color: rgb(0, 186, 124);', ...message);
  },
  inject(src) {
    let s;
    s = this.create("script","Injected","text/javascript");
    s.innerHTML = src;
    (doc.head || this.html || doc).appendChild(s);
    this.log(`Injected: ${s.innerHTML}`);
    if(s) {
      s.remove();
    }
  },
  log(...message) {
    console.log('[%cUserJS%c] %cDBG', 'color: rgb(237,63,20);', '', 'color: rgb(255, 212, 0);', ...message);
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
    while ( root.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return root.querySelector(selector);
  },
  /** If element exists then querySelectorAll */
  async qa(selector,root) {
    try {
      return await new Promise((resolve, reject) => {
        root = root ?? doc;
        if (root.querySelector(selector) === null) {
          reject(new Error(`Element(s) not found ${root}.querySelector(${selector})`));
        } else {
          resolve(root.querySelectorAll(selector));
        }
      });
    } catch (error) {
      return this.err(error.message);
    }
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  setItem(key,value) {
    return localStorage.setItem(key,value);
  },
};
