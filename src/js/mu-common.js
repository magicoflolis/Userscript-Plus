'use strict';
if (typeof MU === 'undefined') {
  // eslint-disable-next-line no-unused-vars
  let MU = (self.MU = {});
}

if (typeof MU === 'object' && MU.isNull instanceof Function === false) {
  let win = self ?? window,
    doc = win.document;

  Object.assign(MU, {
    Timeout: class Timeout {
      constructor() {
        this.ids = [];
      }
      set = (delay, reason) =>
        new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            Object.is(reason, undefined) ? resolve() : reject(reason);
            this.clear(id);
          }, delay);
          this.ids.push(id);
        });
      wrap = (promise, delay, reason) =>
        Promise.race([promise, this.set(delay, reason)]);
      clear = (...ids) => {
        this.ids = this.ids.filter((id) => {
          if (ids.includes(id)) {
            clearTimeout(id);
            return false;
          }
          return true;
        });
      };
    },
    error: class MUError extends Error {
      /**
       * @param {string} fnName - (Optional) Function name
       * @param {...string} params - Extra error parameters
       */
      constructor(fnName = 'muError', ...params) {
        super(...params);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, MUError);
        } else {
          this.stack = new Error().stack;
        }
        this.fn = `[${fnName}]`;
        this.name = this.constructor.name;
      }
    },
    /**
     * Object is Null
     * @param {Object} obj - Object
     * @returns {boolean} Returns if statement true or false
     */
    isNull(obj) {
      return Object.is(obj, null) || Object.is(obj, undefined);
    },
    /**
     * Object is Blank
     * @param {(Object|Object[]|string)} obj - Array, Set, Object or String
     * @returns {boolean} Returns if statement true or false
     */
    isBlank(obj) {
      return typeof obj === 'string' && Object.is(obj.trim(),'') ||
      obj instanceof Set && Object.is(obj.size,0) ||
      Array.isArray(obj) && Object.is(obj.length,0) ||
      obj instanceof Object && typeof obj.entries !== 'function' && Object.is(Object.keys(obj).length,0);
    },
    /**
     * Object is Empty
     * @param {(Object|Object[]|string)} obj - Array, object or string
     * @returns {boolean} Returns if statement true or false
     */
    isEmpty(obj) {
      return this.isNull(obj) || this.isBlank(obj);
    },
    ael(elm, event, callback) {
      elm = elm ?? doc;
      let isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile && event === 'click') {
        if (event === 'click') {
          event = 'mouseup';
          elm.addEventListener('touchstart', callback);
          elm.addEventListener('touchend', callback);
        }
      }
      if (event === 'fclick') {
        event = 'click';
      }
      return elm.addEventListener(event, callback);
    },
    /** Can make various elements */
    make(element, cname, attrs = {}) {
      let el = doc.createElement(element);
      if (!this.isEmpty(cname)) {
        el.className = cname;
      }
      if (attrs) {
        for (let key in attrs) {
          if (key === 'onclick') {
            this.ael(el, 'click', attrs[key]);
          } else {
            el[key] = attrs[key];
          }
        }
      }
      return el;
    },
    makeImage(imgSrc = '', attrs = {}, cname) {
      let img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = imgSrc;
      if (!this.isEmpty(cname)) {
        img.className = cname;
      }
      if (!this.isEmpty(attrs)) {
        for (let key in attrs) {
          img[key] = attrs[key];
        }
      }
      return img;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async fetchURL(url, method = 'GET', responseType = 'json', params = {}) {
      return await new Promise((resolve, reject) => {
        fetch(url, {
          method: method,
          ...params,
        })
          .then((response) => {
            if (!response.ok) reject(response);
            if (responseType.includes('json')) {
              resolve(response.json());
            } else if (responseType.includes('text')) {
              resolve(response.text());
            } else if (responseType.includes('blob')) {
              resolve(response.blob());
            }
            resolve(response);
          })
          .catch((r) => {
            return console.error(
              '[%cUserJS%c] %cERROR',
              'color: rgb(29, 155, 240);',
              '',
              'color: rgb(249, 24, 128);',
              r
            );
          });
      });
    },
    halt(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    html: doc.documentElement,
    injScript(text, remove = true) {
      let inj = this.make('script', 'mu-injected', {
        type: 'text/javascript',
        innerHTML: text,
      });
      (doc.head || doc.documentElement || doc).appendChild(inj);
      if (!remove) {
        return inj;
      }
      this.delay(1000).then(() => inj.remove());
    },
    /**
     * @param {Node} element
     * @param {MutationCallback} callback
     * @param {MutationObserverInit} options
     */
    observe(element, callback, options = { subtree: true, childList: true }) {
      let observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
    },
    /**
    * @param {string} url - URL of webpage to open
    * @param {object} params - GM parameters
    */
    openInTab(url,params = {}) {
      params = Object.is(params,{}) ? '_blank' : params;
      return win.open(url, params);
    },
    // page: {
    //   webpage: null,
    //   findPage: function () {
    //     let list = {};
    //     if (doc.location.origin.includes('pornhub')) {
    //       this.webpage = list.ph;
    //     } else if (doc.location.origin.includes('redtube')) {
    //       this.webpage = list.rt;
    //     } else if (doc.location.origin.includes('tube8')) {
    //       this.webpage = list.t8;
    //     } else if (doc.location.origin.includes('thumbzilla')) {
    //       this.webpage = list.tz;
    //     } else if (doc.location.origin.includes('youporn')) {
    //       this.webpage = list.yp;
    //     } else if (doc.location.origin.includes('onlyfans')) {
    //       this.webpage = list.ofs;
    //     }
    //     if (this.webpage === null) {
    //       return null;
    //     }
    //     return this.webpage;
    //   },
    //   getPage: function () {
    //     return this.webpage !== null ? this.webpage : this.findPage();
    //   },
    // },
  });
}

// clearModalCookie();
