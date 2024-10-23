'use strict';
import { err } from './logger.js';

// #region Utilities
let isMob;
// const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
const getUAData = () => {
  if (typeof isMob !== 'undefined') {
    return isMob;
  }
  try {
    const { platform, mobile } = navigator.userAgentData ?? {};
    isMob =
      /Mobile|Tablet/.test(navigator.userAgent ?? '') ||
      mobile ||
      /Android|Apple/.test(platform ?? '');
  } catch (ex) {
    err({ cause: 'getUAData', message: ex.message });
    isMob = false;
  }
  return isMob;
};
const isMobile = getUAData();
/**
 * @type { import("../typings/types").hasOwn }
 */
const hasOwn = (obj, prop) => {
  if (typeof Object.hasOwn !== 'undefined') {
    return Object.hasOwn(obj, prop);
  }
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
const isString = (val) => typeof val === 'string';
/**
 * @type { import("../typings/types").objToStr }
 */
const objToStr = (obj) => {
  return Object.prototype.toString.call(obj);
};
/**
 * @type { import("../typings/types").strToURL }
 */
const strToURL = (str) => {
  try {
    str = str ?? window.location ?? 'about:blank';
    return objToStr(str).includes('URL') ? str : new URL(str);
  } catch (ex) {
    err({ cause: 'strToURL', message: ex.message });
    return window.location;
  }
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
 * @type { import("../typings/types").ael }
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
    err(ex);
  }
};
/**
 * @type { import("../typings/types").formAttrs }
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
 * @type { import("../typings/types").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    // el =
    //   tagName === 'fragment' ? document.createDocumentFragment() : document.createElement(tagName);
    el = document.createElement(tagName);
    if (!isEmpty(cname)) {
      if (isString(cname)) {
        el.className = cname;
      } else if (isObj(cname)) {
        formAttrs(el, cname);
      }
    }
    if (!isEmpty(attrs)) {
      if (isString(attrs)) {
        el.textContent = attrs;
      } else if (isObj(attrs)) {
        formAttrs(el, attrs);
      }
    }
  } catch (ex) {
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
const template = {
  data: {
    id: 0,
    bad_ratings: 0,
    good_ratings: 0,
    ok_ratings: 0,
    daily_installs: 0,
    total_installs: 0,
    name: 'NOT FOUND',
    description: 'NOT FOUND',
    version: '0.0.0',
    url: 'about:blank',
    code_url: 'about:blank',
    created_at: Date.now(),
    code_updated_at: Date.now(),
    users: [
      {
        name: '',
        url: ''
      }
    ]
  },
  merge(obj = {}) {
    for (const key in template.data) {
      if (hasOwn(obj, key)) continue;
      obj[key] = template.data[key];
    }
    return obj;
  }
};
// #endregion

export {
  isMobile,
  hasOwn,
  objToStr,
  strToURL,
  intersect,
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
  template
};
