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

  class LanguageHandler {
    constructor() {
      this.current = (navigator.language ?? 'en').split('-')[0] ?? 'en';
      this.cache = [];

      const languages = navigator.languages ?? [];
      for (const nlang of languages) {
        const lg = nlang.split('-')[0];
        if (this.cache.indexOf(lg) === -1) {
          this.cache.push(lg);
        }
      }

      if (!this.cache.includes(this.current)) {
        this.cache.push(this.current);
      }
    }
  }
  const language = new LanguageHandler();
  // const i18n$ = (...args) => {
  //   const arr = [];
  //   for (const arg of args) {
  //     arr.push(webext.i18n.getMessage(arg));
  //   }
  //   return arr.length !== 1 ? arr : arr[0];
  // };

  const META_START_COMMENT = '// ==UserScript==';
  const META_END_COMMENT = '// ==/UserScript==';
  const TLD_EXPANSION = ['com', 'net', 'org', 'de', 'co.uk'];
  const APPLIES_TO_ALL_PATTERNS = [
    'http://*',
    'https://*',
    'http://*/*',
    'https://*/*',
    'http*://*',
    'http*://*/*',
    '*',
    '*://*',
    '*://*/*',
    'http*'
  ];
  /**
   * @param { string } code
   */
  const get_meta_block = (code) => {
    if (isEmpty(code)) {
      return null;
    }
    const start_block = code.indexOf(META_START_COMMENT);
    if (isNull(start_block)) {
      return null;
    }
    const end_block = code.indexOf(META_END_COMMENT, start_block);
    if (isNull(end_block)) {
      return null;
    }
    return code.substring(start_block + META_START_COMMENT.length, end_block);
  };
  /**
   * @param { string } code
   */
  const parse_meta = (code) => {
    if (isEmpty(code)) {
      return null;
    }
    const meta = {};
    const meta_block = get_meta_block(code);
    const meta_block_map = new Map();
    for (const meta_line of meta_block.split('\n')) {
      const meta_match = meta_line.match(/\/\/\s+@([a-zA-Z:-]+)\s+(.*)/);
      if (isNull(meta_match)) {
        continue;
      }
      const key = meta_match[1].trim();
      const value = meta_match[2].trim();
      if (!meta_block_map.has(key)) {
        meta_block_map.set(key, []);
      }
      const meta_map = meta_block_map.get(key);
      meta_map.push(value);
      meta_block_map.set(key, meta_map);
    }
    for (const [key, value] of meta_block_map) {
      if (value.length > 1) {
        meta[key] = value;
      } else {
        meta[key] = value[0];
      }
    }
    return meta;
  };
  const intersect = (a = [], b = []) => {
    for (const v of a) {
      if (b.includes(v)) {
        return true;
      }
    }
    for (const v of b) {
      if (a.includes(v)) {
        return true;
      }
    }
    return false;
  };
  /**
   * @template { string } S
   * @param { S } code
   * @returns { S[] }
   */
  const calculate_applies_to_names = (code) => {
    if (isEmpty(code)) {
      return null;
    }
    const meta = parse_meta(code);
    let patterns = [];
    for (const [k, v] of Object.entries(meta)) {
      if (/include|match/.test(k)) {
        if (Array.isArray(v)) {
          patterns = patterns.concat(v);
        } else {
          patterns = patterns.concat([v]);
        }
      }
    }
    if (isEmpty(patterns)) {
      return [];
    }
    if (intersect(patterns, APPLIES_TO_ALL_PATTERNS)) {
      return [];
    }
    const name_set = new Set();
    const addObj = (obj) => {
      if (name_set.has(obj)) {
        return;
      }
      name_set.add(obj);
    };
    for (let p of patterns) {
      try {
        const original_pattern = p;
        let pre_wildcards = [];
        if (p.match(/^\/(.*)\/$/)) {
          pre_wildcards = [p];
        } else {
          let m = p.match(/^\*(https?:.*)/i);
          if (!isNull(m)) {
            p = m[1];
          }
          p = p
            .replace(/^\*:/i, 'http:')
            .replace(/^\*\/\//i, 'http://')
            .replace(/^http\*:/i, 'http:')
            .replace(/^(https?):([^/])/i, '$1://$2');
          m = p.match(/^([a-z]+:\/\/)\*\.?([a-z0-9-]+(?:.[a-z0-9-]+)+.*)/i);
          if (!isNull(m)) {
            p = m[1] + m[2];
          }
          m = p.match(/^\*\.?([a-z0-9-]+\.[a-z0-9-]+.*)/i);
          if (!isNull(m)) {
            p = `http://${m[1]}`;
          }
          m = p.match(/^http\*(?:\/\/)?\.?((?:[a-z0-9-]+)(?:\.[a-z0-9-]+)+.*)/i);
          if (!isNull(m)) {
            p = `http://${m[1]}`;
          }
          m = p.match(/^([a-z]+:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)*\.))\*(.*)/);
          if (!isNull(m)) {
            if (m[2].match(/A([0-9]+\.){2,}z/)) {
              p = `${m[1]}tld${m[3]}`;
              pre_wildcards = [p.split('*')[0]];
            } else {
              pre_wildcards = [p];
            }
          } else {
            pre_wildcards = [p];
          }
        }
        for (const pre_wildcard of pre_wildcards) {
          try {
            const uri = new URL(pre_wildcard);
            if (isNull(uri.host)) {
              addObj({ text: original_pattern, domain: false, tld_extra: false });
            } else if (!uri.host.includes('.') && uri.host.includes('*')) {
              addObj({ text: original_pattern, domain: false, tld_extra: false });
            } else if (uri.host.endsWith('.tld')) {
              for (let i = 0; i < TLD_EXPANSION.length; i++) {
                const tld = TLD_EXPANSION[i];
                addObj({
                  text: uri.host.replace(/tld$/i, tld),
                  domain: true,
                  tld_extra: i != 0
                });
              }
            } else if (uri.host.endsWith('.')) {
              addObj({
                text: uri.host.slice(0, -1),
                domain: true,
                tld_extra: false
              });
            } else {
              addObj({
                text: uri.host,
                domain: true,
                tld_extra: false
              });
            }
            // eslint-disable-next-line no-unused-vars
          } catch (error) {
            addObj({ text: original_pattern, domain: false, tld_extra: false });
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    }
    return [...name_set];
  };
  const reqCode = async (obj = {}, translate = false) => {
    if (obj.code_data) {
      return obj.code_data;
    }
    /** @type { string } */
    const code = await Network.req(obj.code_url, 'GET', 'text');
    if (typeof code !== 'string') {
      return;
    }
    Object.assign(obj, {
      code_data: code,
      code_meta: {},
      code_size: [Network.format(code.length)],
      code_match: [],
      code_grant: [],
      antifeatures: []
    });
    const grantSet = new Set();
    const afSet = new Set();
    const meta = parse_meta(code);
    const applies_to_names = calculate_applies_to_names(code);

    if (translate) {
      for (const lng of language.cache) {
        if (meta[`name:${lng}`]) {
          Object.assign(obj, {
            name: meta[`name:${lng}`],
            translated: true
          });
        }
        if (meta[`description:${lng}`]) {
          Object.assign(obj, {
            description: meta[`description:${lng}`],
            translated: true
          });
        }
      }
    }

    for (const [key, value] of Object.entries(meta)) {
      if (/grant/.test(key)) {
        for (const v of normalizeTarget(value, false)) {
          if (grantSet.has(v)) {
            continue;
          }
          grantSet.add(v);
        }
      } else if (/antifeature/.test(key)) {
        for (const v of normalizeTarget(value, false)) {
          if (afSet.has(v)) {
            continue;
          }
          afSet.add(v);
        }
      }
    }
    Object.assign(obj, {
      code_meta: meta,
      code_match: applies_to_names,
      code_grant: [...grantSet],
      antifeatures: [...afSet]
    });
    return code;
  };

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
  userjs.req = Network.req;
  userjs.get_meta_block = get_meta_block;
  userjs.parse_meta = parse_meta;
  userjs.intersect = intersect;
  userjs.calculate_applies_to_names = calculate_applies_to_names;
  userjs.reqCode = reqCode;
  userjs.normalizeTarget = normalizeTarget;
  userjs.language = language;

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
