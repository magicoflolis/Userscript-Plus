'use strict';

import { webext } from './ext.js';
import { err } from './logger.js';

// #region Utilities
const userjs = {};
const getUAData = () => {
  if (userjs.isMobile !== undefined) {
    return userjs.isMobile;
  }
  try {
    if (navigator) {
      const { userAgent, userAgentData } = navigator;
      const { platform, mobile } = userAgentData ? Object(userAgentData) : {};
      userjs.isMobile =
        /Mobile|Tablet/.test(userAgent ? String(userAgent) : '') ||
        Boolean(mobile) ||
        /Android|Apple/.test(platform ? String(platform) : '');
    } else {
      userjs.isMobile = false;
    }
  } catch (ex) {
    userjs.isMobile = false;
    ex.cause = 'getUAData';
    err(ex);
  }
  return userjs.isMobile;
};
const isMobile = getUAData();
const isString = (val) => typeof val === 'string';
/**
 * @type { import("../typings/types").objToStr }
 */
const objToStr = (obj) => {
  return Object.prototype.toString.call(obj);
};
/**
 * @template {string | URL} S
 * @param {S} str
 */
const strToURL = (str) => {
  let url;
  try {
    url = objToStr(str).includes('URL') ? str : new URL(str);
  } catch (ex) {
    ex.cause = 'strToURL';
    err(ex);
  }
  if (url !== undefined) {
    return url
  }
  return str;
};
/**
 * @type { import("../typings/types").isRegExp }
 */
const isRegExp = (obj) => {
  const s = objToStr(obj);
  return s.includes('RegExp');
};
/**
 * @type { import("../typings/types").isElem }
 */
const isElem = (obj) => {
  const s = objToStr(obj);
  return s.includes('Element');
};
/**
 * @type { import("../typings/types").isObj }
 */
const isObj = (obj) => {
  const s = objToStr(obj);
  return s.includes('Object');
};
/**
 * @type { import("../typings/types").isFN }
 */
const isFN = (obj) => {
  const s = objToStr(obj);
  return s.includes('Function');
};
/**
 * @type { import("../typings/types").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("../typings/types").isBlank }
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
 * @type { import("../typings/types").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @type { import("../typings/types").normalizeTarget }
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
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options = {}) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (!elem) {
        continue;
      }
      if (isMobile && type === 'click') {
        elem.addEventListener('touchstart', listener, options);
        continue;
      }
      elem.addEventListener(type, listener, options);
    }
  } catch (ex) {
    ex.cause = 'ael';
    err(ex);
  }
};
/**
 * @type { import("../typings/types.d.ts").formAttrs }
 */
const formAttrs = (elem, attr = {}) => {
  if (!elem) {
    return elem;
  }
  for (const key in attr) {
    if (typeof attr[key] === 'object') {
      formAttrs(elem[key], attr[key]);
    } else if (isFN(attr[key])) {
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
  return elem;
};
/**
 * @type { import("../typings/types.d.ts").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    el = document.createElement(tagName);
    if (!isEmpty(cname)) {
      if (typeof cname === 'string') {
        el.className = cname;
      } else if (isObj(cname)) {
        formAttrs(el, cname);
      }
    }
    if (!isEmpty(attrs)) {
      if (typeof attrs === 'string') {
        el.textContent = attrs;
      } else if (isObj(attrs)) {
        formAttrs(el, attrs);
      }
    }
  } catch (ex) {
    ex.cause = 'make';
    err(ex);
  }
  return el;
};
/**
 * @param { string } url - URL of webpage to open
 * @param { object } params - GM parameters
 * @returns { Promise<chrome.tabs.Tab | browser.tabs.Tab> }
 */
const openInTab = async (url) => {
  const newTab = await webext.tabs.create({ url });
  return newTab;
};
const union = (...arr) => [...new Set(arr.flat())];
const loadFilters = (cfg) => {
  /** @type {Map<string, import("../typings/types.d.ts").Filters >} */
  const pool = new Map();
  const handles = {
    pool,
    enabled() {
      return [...pool.values()].filter((o) => o.enabled);
    },
    refresh() {
      if (!Object.is(pool.size, 0)) pool.clear();
      for (const [key, value] of Object.entries(cfg.filters)) {
        if (!pool.has(key))
          pool.set(key, {
            ...value,
            reg: new RegExp(value.regExp, value.flag),
            keyReg: new RegExp(key.trim().toLocaleLowerCase(), 'gi'),
            valueReg: new RegExp(value.name.trim().toLocaleLowerCase(), 'gi')
          });
      }
      return this;
    },
    get(str) {
      return [...pool.values()].find((v) => v.keyReg.test(str) || v.valueReg.test(str));
    },
    /**
     * @param { import("../typings/types.d.ts").GSForkQuery } param0
     */
    match({ name, users }) {
      const p = handles.enabled();
      if (Object.is(p.length, 0)) return true;
      for (const v of p) {
        if ([{ name }, ...users].find((o) => o.name.match(v.reg))) return false;
      }
      return true;
    }
  };
  for (const [key, value] of Object.entries(cfg.filters)) {
    if (!pool.has(key))
      pool.set(key, {
        ...value,
        reg: new RegExp(value.regExp, value.flag),
        keyReg: new RegExp(key.trim().toLocaleLowerCase(), 'gi'),
        valueReg: new RegExp(value.name.trim().toLocaleLowerCase(), 'gi')
      });
  }
  return handles.refresh();
};
/**
 * @param {string} txt
 */
const formatURL = (txt) =>
  txt
    .split('.')
    .splice(-2)
    .join('.')
    .replace(/\/|https:/g, '');
const matchesFromHostnames = (hostnames) => {
  const out = [];
  for (const hn of hostnames) {
    if (hn === '*' || hn === 'all-urls') {
      out.length = 0;
      out.push('<all_urls>');
      break;
    }
    out.push(`*://*.${hn}/*`);
  }
  return out;
};
/**
 * @param {string[]} origins
 */
const hostnamesFromMatches = (origins) => {
  const out = [];
  for (const origin of origins) {
    if (origin === '<all_urls>') {
      out.push('all-urls');
      continue;
    }
    const match = /^\*:\/\/(?:\*\.)?([^/]+)\/\*/.exec(origin);
    if (match === null) {
      continue;
    }
    out.push(match[1]);
  }
  return out;
};
/**
 * @param {string} hn
 */
const normalizedHostname = (hn) => {
  return hn.replace(/^www\./, '');
};
/**
 * @param {string} str
 */
const decode = (str) => {
  try {
    if (decodeURI(str) !== decodeURIComponent(str)) {
      return decode(decodeURIComponent(str));
    }
  } catch (ex) {
    err(ex);
  }
  return str;
};
// #endregion

export {
  decode,
  formatURL,
  objToStr,
  strToURL,
  isRegExp,
  isElem,
  isObj,
  isFN,
  isNull,
  isBlank,
  isEmpty,
  isString,
  normalizeTarget,
  ael,
  formAttrs,
  make,
  openInTab,
  union,
  loadFilters,
  matchesFromHostnames,
  hostnamesFromMatches,
  normalizedHostname
};
