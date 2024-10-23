'use strict';

/**
 * @typedef { object } userjs
 */

// if (typeof userjs === 'undefined') {
//   let userjs = (self.userjs = {});
// }

if (typeof userjs === 'object' && userjs.isNull instanceof Function === false) {
  const win = self ?? window;
  const doc = win.document;
  const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
  /**
   * Object is typeof `Element`
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isElem = (obj) => {
    /** @type { string } */
    const s = Object.prototype.toString.call(obj);
    return s.includes('Element');
  };
  /**
   * Object is typeof `Function`
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isFN = (obj) => {
    /** @type { string } */
    const s = Object.prototype.toString.call(obj);
    return s.includes('Function');
  };
  /**
   * Object is typeof `object` / JSON Object
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isObj = (obj) => {
    /** @type { string } */
    const s = Object.prototype.toString.call(obj);
    return s.includes('Object');
  };
  /**
   * Object is `null` or `undefined`
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isNull = (obj) => {
    return Object.is(obj, null) || Object.is(obj, undefined);
  };
  /**
   * Object is Blank
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isBlank = (obj) => {
    return (
      (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
      ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
      (Array.isArray(obj) && Object.is(obj.length, 0)) ||
      (isObj(obj) && Object.is(Object.keys(obj).length, 0))
    );
  };
  /**
   * Object is Empty
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isEmpty = (obj) => {
    return isNull(obj) || isBlank(obj);
  };
  /**
   * @template T
   * @param { T } target
   * @param { boolean } toQuery
   * @param { Element | Document | undefined } root
   * @returns { T[] }
   */
  const normalizeTarget = (target, toQuery = true, root) => {
    if (Object.is(target, null) || Object.is(target, undefined)) {
      return [];
    }
    if (Array.isArray(target)) {
      return target;
    }
    if (typeof target === 'string') {
      return toQuery ? Array.from((root || document).querySelectorAll(target)) : [target];
    }
    if (isElem(target)) {
      return [target];
    }
    return Array.from(target);
  };
  /**
   * Add Event Listener
   * @template { HTMLElement } E
   * @template { keyof HTMLElementEventMap } K
   * @param { E } el
   * @param { K } event
   * @param { (this: E, ev: HTMLElementEventMap[K]) => any } callback
   * @param { boolean | AddEventListenerOptions } options
   */
  const ael = (el, event, callback, options = {}) => {
    try {
      for (const elem of normalizeTarget(el)) {
        if (!elem) {
          continue;
        }
        if (isMobile && event === 'click') {
          elem.addEventListener('touchstart', callback);
          return;
        }
        if (event === 'fclick') {
          event = 'click';
        }
        elem.addEventListener(event, callback, options);
      }
    } catch (ex) {
      console.error(ex);
    }
  };
  /**
   * Form Attributes of Element
   * @template { keyof HTMLElementTagNameMap } K
   * @param { K } elem
   * @param { keyof HTMLElement } attr
   */
  const formAttrs = (elem, attr = {}) => {
    for (const key in attr) {
      if (typeof attr[key] === 'object') {
        formAttrs(elem[key], attr[key]);
      } else if (isFN(attr[key])) {
        if (key === 'container') {
          key();
          continue;
        }
        if (/^on/.test(key)) {
          elem[key] = attr[key];
          continue;
        }
        ael(elem, key, attr[key]);
      } else if (key === 'class') {
        elem.className = attr[key];
      } else {
        elem[key] = attr[key];
      }
    }
  };
  /**
   * Make Element
   * @template { keyof HTMLElementTagNameMap } K
   * @param { K } tagName
   * @param { string } cname
   * @param { keyof HTMLElement } attrs
   * @returns { HTMLElementTagNameMap[K] }
   */
  const make = (tagName, cname, attrs = {}) => {
    let el = null;
    try {
      el = document.createElement(tagName);
      if (typeof cname === 'string' && !isEmpty(cname)) {
        el.className = cname;
      }
      if (!isEmpty(attrs)) {
        formAttrs(el, attrs);
      }
    } catch (ex) {
      console.error(ex);
    }
    return el;
  };
  /**
   * setTimeout w/ Promise
   * @param { number } timeout - Timeout in milliseconds (ms)
   * @returns { Promise<void> } Promise object
   */
  const delay = (timeout = 5000) => new Promise((resolve) => setTimeout(resolve, timeout));
  const Network = {
    /**
     * Fetch a URL with fetch API as fallback
     *
     * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
     * @link https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
     * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
     * @param { RequestInfo | URL } url - The URL to fetch
     * @param { Request['method'] } method - Fetch method
     * @param { 'buffer' | 'json' | 'text' | 'blob' | 'document' } responseType - Response type
     * @param { RequestInit } data - Fetch parameters
     * @returns { Promise<Response> } Fetch results
     */
    async req(url, method = 'GET', responseType = 'json', data = {}) {
      if (isEmpty(url)) {
        throw new Error('"url" parameter is empty');
      }
      method = Network.bscStr(method, false);
      responseType = Network.bscStr(responseType);
      const params = {
        method,
        ...data
      };
      return await new Promise((resolve, reject) => {
        /**
         * @param { Response } response
         * @returns { Response | Document }
         */
        const fetchResp = (response_1) => {
          if (!response_1.ok) reject(response_1);
          const check = (str_2 = 'text') => {
            return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
          };
          if (responseType.match(/buffer/i)) {
            resolve(check('arrayBuffer'));
          } else if (responseType.match(/json/i)) {
            resolve(check('json'));
          } else if (responseType.match(/text/i)) {
            resolve(check('text'));
          } else if (responseType.match(/blob/i)) {
            resolve(check('blob'));
          } else if (responseType.match(/formdata/i)) {
            resolve(check('formData'));
          } else if (responseType.match(/clone/i)) {
            resolve(check('clone'));
          } else if (responseType.match(/document/i) && isFN(response_1.text)) {
            const domParser = new DOMParser();
            const respTxt = response_1.text();
            if (respTxt instanceof Promise) {
              respTxt.then((txt) => {
                const doc = domParser.parseFromString(txt, 'text/html');
                resolve(doc);
              });
            } else {
              const doc = domParser.parseFromString(respTxt, 'text/html');
              resolve(doc);
            }
          } else {
            resolve(response_1);
          }
        };
        fetch(url, params).then(fetchResp).catch(reject);
      });
    },
    format(bytes, decimals = 2) {
      if (Number.isNaN(bytes)) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${Network.sizes[i]}`;
    },
    sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    /**
     * @template { string } S
     * @param { S } str
     * @param { boolean } lowerCase
     * @returns { S }
     */
    bscStr(str = '', lowerCase = true) {
      const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
      return txt.replaceAll(/\W/g, '');
    }
  };
  // const i18n$ = (...args) => {
  //   const arr = [];
  //   for (const arg of args) {
  //     arr.push(webext.i18n.getMessage(arg));
  //   }
  //   return arr.length !== 1 ? arr : arr[0];
  // };

  class Timeout {
    constructor() {
      this.ids = [];
    }

    set(delay, reason) {
      return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
          isNull(reason) ? resolve() : reject(reason);
          this.clear(id);
        }, delay);
        this.ids.push(id);
      });
    }

    clear(...ids) {
      this.ids = this.ids.filter((id) => {
        if (ids.includes(id)) {
          clearTimeout(id);
          return false;
        }
        return true;
      });
    }
  }
  class MUError extends Error {
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
  }

  userjs.error = MUError;
  userjs.isMobile = isMobile;
  userjs.Timeout = Timeout;
  userjs.isElem = isElem;
  userjs.isFN = isFN;
  userjs.isObj = isObj;
  userjs.isNull = isNull;
  userjs.isBlank = isBlank;
  userjs.isEmpty = isEmpty;
  userjs.ael = ael;
  userjs.formAttrs = formAttrs;
  userjs.make = make;
  userjs.delay = delay;
  userjs.normalizeTarget = normalizeTarget;

  Object.assign(userjs, {
    makeImage(imgSrc = '', attrs = {}, cname) {
      const img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = imgSrc;
      if (!isEmpty(cname)) {
        img.className = cname;
      }
      if (!isEmpty(attrs)) {
        for (const key in attrs) {
          img[key] = attrs[key];
        }
      }
      return img;
    },
    halt(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    injScript(text, remove = true) {
      const inj = make('script', 'mu-injected', {
        type: 'text/javascript',
        innerHTML: text
      });
      (doc.head || doc.documentElement || doc).appendChild(inj);
      if (!remove) {
        return inj;
      }
      delay(1000).then(() => inj.remove());
    },
    /**
     * @param {Node} element
     * @param {MutationCallback} callback
     * @param {MutationObserverInit} options
     */
    observe(element, callback, options = { subtree: true, childList: true }) {
      const observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
    },
    /**
     * @param {string} url - URL of webpage to open
     * @param {object} params - GM parameters
     */
    openInTab(url, params = {}) {
      params = Object.is(params, {}) ? '_blank' : params;
      return win.open(url, params);
    }
  });
}
