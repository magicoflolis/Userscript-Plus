'use strict';

const SafeAnimationFrame = class {
  constructor(callback) {
    this.fid = this.tid = undefined;
    this.callback = callback;
  }
  start(delay) {
    if (delay === undefined) {
      if (this.fid === undefined) {
        this.fid = requestAnimationFrame(() => {
          this.onRAF();
        });
      }
      if (this.tid === undefined) {
        this.tid = setTimeout(() => {
          this.onSTO();
        }, 20000);
      }
      return;
    }
    if (this.fid === undefined && this.tid === undefined) {
      this.tid = setTimeout(() => {
        this.macroToMicro();
      }, delay);
    }
  }
  clear() {
    if (this.fid !== undefined) {
      cancelAnimationFrame(this.fid);
      this.fid = undefined;
    }
    if (this.tid !== undefined) {
      clearTimeout(this.tid);
      this.tid = undefined;
    }
  }
  macroToMicro() {
    this.tid = undefined;
    this.start();
  }
  onRAF() {
    if (this.tid !== undefined) {
      clearTimeout(this.tid);
      this.tid = undefined;
    }
    this.fid = undefined;
    this.callback();
  }
  onSTO() {
    if (this.fid !== undefined) {
      cancelAnimationFrame(this.fid);
      this.fid = undefined;
    }
    this.tid = undefined;
    this.callback();
  }
};
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
 * @template T
 * @param { T } target
 * @param { Element } root
 * @param { boolean } toQuery
 * @returns { T[] }
 */
const normalizeTarget = (target, root = document, toQuery = true) => {
  if (Object.is(target, null) || Object.is(target, undefined)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from(root.querySelectorAll(target)) : [target];
  }
  if (isElem(target)) {
    return [target];
  }
  return Array.from(target);
};

const makeEventHandler = (selector, callback) => {
  return function (event) {
    const dispatcher = event.currentTarget;
    if (
      dispatcher instanceof HTMLElement === false ||
      typeof dispatcher.querySelectorAll !== 'function'
    ) {
      return;
    }
    const receiver = event.target;
    const ancestor = receiver.closest(selector);
    if (ancestor === receiver && ancestor !== dispatcher && dispatcher.contains(ancestor)) {
      callback.call(receiver, event);
    }
  };
};

class dom {
  static attr(target, attr, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem.getAttribute(attr);
      }
      if (value === null) {
        elem.removeAttribute(attr);
      } else {
        elem.setAttribute(attr, value);
      }
    }
  }

  static clone(target) {
    return normalizeTarget(target)[0].cloneNode(true);
  }

  static create(a) {
    if (typeof a === 'string') {
      return document.createElement(a);
    }
  }

  static text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  }

  static remove(target) {
    for (const elem of normalizeTarget(target)) {
      elem.remove();
    }
  }

  // target, type, callback, [options]
  // target, type, subtarget, callback, [options]

  static on(target, type, subtarget, callback, options) {
    if (typeof subtarget === 'function') {
      options = callback;
      callback = subtarget;
      subtarget = undefined;
      if (typeof options === 'boolean') {
        options = { capture: true };
      }
    } else {
      callback = makeEventHandler(subtarget, callback);
      if (options === undefined || typeof options === 'boolean') {
        options = { capture: true };
      } else {
        options.capture = true;
      }
    }
    const targets =
      target instanceof Window || target instanceof Document ? [target] : normalizeTarget(target);
    for (const elem of targets) {
      elem.addEventListener(type, callback, options);
    }
  }

  static off(target, type, callback, options) {
    if (typeof callback !== 'function') {
      return;
    }
    if (typeof options === 'boolean') {
      options = { capture: true };
    }
    const targets =
      target instanceof Window || target instanceof Document ? [target] : normalizeTarget(target);
    for (const elem of targets) {
      elem.removeEventListener(type, callback, options);
    }
  }

  static click(target) {
    for (const elem of normalizeTarget(target)) {
      elem.dispatchEvent(new MouseEvent('click'));
    }
  }
}

dom.cl = class {
  static add(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(name);
      }
    }
  }

  static remove(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(name);
      }
    }
  }

  static toggle(target, name, state) {
    let r;
    for (const elem of normalizeTarget(target)) {
      r = elem.classList.toggle(name, state);
    }
    return r;
  }

  static has(target, name) {
    for (const elem of normalizeTarget(target)) {
      if (elem.classList.contains(name)) {
        return true;
      }
    }
    return false;
  }
};

/******************************************************************************/

/**
 * Prefix for `document.querySelectorAll()`
 * @template { Element } E
 * @param { string } selectors - Elements for query selection
 * @param { E } root - Root selector Element
 * @returns { NodeListOf<E> }
 */
const qsA = (selectors, root) => {
  try {
    return (root || document).querySelectorAll(selectors);
  } catch (ex) {
    console.error(ex);
  }
  return [];
};
/**
 * Prefix for `document.querySelector()`
 * @template { Element } E
 * @param { string } selector - Element for query selection
 * @param { E } root - Root selector Element
 * @returns { E | null }
 */
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    console.error(ex);
  }
  return null;
};
/**
 * Prefix for `document.querySelector()` w/ Promise
 * @template { Element } E
 * @param { string } selector - Element for query selection
 * @param { E } root - Root selector Element
 * @returns { Promise<E | null> }
 */
const query = async (selector, root) => {
  let el = null;
  try {
    el = root || document;
    while (el.querySelector(selector) === null) {
      // await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => {
        const queryTimer = new SafeAnimationFrame(resolve);
        queryTimer.start(1);
      });
    }
    return el.querySelector(selector);
  } catch (ex) {
    console.error(ex);
  }
  return el;
};

export { dom, normalizeTarget, qs, qsA, query, SafeAnimationFrame };
