'use strict';

import { isEmpty, isFN } from './util.js';
import { BLANK_PAGE, engineUnsupported } from './constants.js';
import { webext } from './ext.js';

const MUJS_ORIGIN = webext.runtime.getURL('').replace(/\/$/, '');

export class BaseContainer {
  constructor() {
    this.toElem = this.toElem.bind(this);
    this.cache = new Map();
    /**
     * @type { Map<number, import("../typings/types.d.ts").GSForkQuery[]> }
     */
    this.userjsCache = new Map();
  }

  checkBlacklist() {
    return true;
  }

  toElem() {
    return Array.from(this).map(({ _mujs }) => {
      return _mujs.root;
    });
  }

  *[Symbol.iterator]() {
    const arr = Array.from(this.userjsCache.values()).filter(({ _mujs }) => {
      return !isEmpty(_mujs) && _mujs.info.engine.enabled;
    });
    for (const userjs of arr) {
      yield userjs;
    }
  }
}

export class BaseList {
  intEngines;
  intHost;
  constructor(hostname = undefined, container = new BaseContainer(), cfg = {}) {
    this.groupBy = this.groupBy.bind(this);
    this.container = container;
    this.intEngines = cfg.engines ?? [];
    this.host = hostname;
  }

  setEngines(engines = []) {
    const { host } = this;
    return engines.filter((e) => {
      if (!e.enabled) {
        return false;
      }
      const v = engineUnsupported[e.name] ?? [];
      if (v.includes(host)) {
        return false;
      }
      return true;
    });
  }

  set engines(engines) {
    this.intEngines = this.setEngines(engines);
  }

  get engines() {
    return this.intEngines;
  }

  set host(hostname) {
    if (!MUJS_ORIGIN.includes(hostname)) {
      this.intHost = hostname ?? BLANK_PAGE;
    } else if (isEmpty(this.intHost)) {
      this.intHost = BLANK_PAGE
    }

    if (!this.container.cache.has(hostname)) {
      const engineTemplate = {};
      for (const engine of this.engines) {
        engineTemplate[engine.name] = [];
      }
      this.container.cache.set(hostname, engineTemplate);
    }
    this.blacklisted = this.container.checkBlacklist(hostname);
    this.intEngines = this.setEngines(this.engines);
  }

  get host() {
    return this.intHost;
  }

  groupBy() {
    const arr = Array.from(this);
    const callback = ({ _mujs }) => _mujs.info.engine.name;
    if (isFN(Object.groupBy)) {
      return Object.groupBy(arr, callback);
    }
    /** [Object.groupBy polyfill](https://gist.github.com/gtrabanco/7c97bd41aa74af974fa935bfb5044b6e) */
    return arr.reduce((acc = {}, ...args) => {
      const key = callback(...args);
      acc[key] ??= [];
      acc[key].push(args[0]);
      return acc;
    }, {});
  }

  *[Symbol.iterator]() {
    const { intHost, engines } = this;
    const arr = Array.from(this.container).filter(
      ({ _mujs }) =>
        _mujs.info.host === intHost &&
        engines.find((engine) => engine.enabled && engine.name === _mujs.info.engine.name)
    );
    for (const userjs of arr) {
      yield userjs;
    }
  }
}
