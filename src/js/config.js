'use strict';

const storage = webext.storage;
const Config = {
  configLocalListeners: [],
  configSyncListeners: [],
  syncDefaults: {
    // cache: true,
    codePreview: false,
    // autoexpand: false,
    filterlang: false,
    sleazyredirect: false,
    // time: 10000,
    blacklist: [
      {
        enabled: true,
        regex: true,
        flags: '',
        name: 'Blacklist 1',
        url: '(gov|cart|checkout|login|join|signin|signup|sign-up|password|reset|password_reset)'
      },
      {
        enabled: true,
        regex: true,
        flags: '',
        name: 'Blacklist 2',
        url: '(pay|bank|money|localhost|authorize|checkout|bill|wallet|router)'
      },
      {
        enabled: true,
        regex: false,
        flags: '',
        name: 'Blacklist 3',
        url: 'https://home.bluesnap.com'
      },
      {
        enabled: true,
        regex: false,
        flags: '',
        name: 'Blacklist 4',
        url: ['zalo.me', 'skrill.com']
      }
    ],
    engines: [
      {
        enabled: true,
        name: 'greasyfork',
        url: 'https://greasyfork.org'
      },
      {
        enabled: false,
        name: 'sleazyfork',
        url: 'https://sleazyfork.org'
      },
      {
        enabled: false,
        name: 'openuserjs',
        url: 'https://openuserjs.org/?q='
      },
      {
        enabled: false,
        name: 'github',
        url: 'https://api.github.com/search/code?q=',
        token: ''
      }
    ],
    theme: {
      'even-row': '',
      'odd-row': '',
      'even-err': '',
      'odd-err': '',
      'background-color': '',
      'gf-color': '',
      'sf-color': '',
      'border-b-color': '',
      'gf-btn-color': '',
      'sf-btn-color': '',
      'sf-txt-color': '',
      'txt-color': '',
      'chck-color': '',
      'chck-gf': '',
      'chck-git': '',
      'chck-open': '',
      placeholder: '',
      'position-top': '',
      'position-bottom': '',
      'position-left': '',
      'position-right': '',
      'font-family': ''
    },
    recommend: {
      author: true,
      others: true
    }
  },
  cachedSyncConfig: {},
  /**
   * @type { import("../typings/types").config }
   */
  cachedLocalStorage: {},
  resetToDefault
};

function configProxy() {
  storage.onChanged.addListener((changes = storage.StorageChange, areaName) => {
    if (areaName === 'sync') {
      for (const key in changes) {
        Config.cachedSyncConfig[key] = changes[key].newValue;
      }
      for (const callback of Config.configSyncListeners) {
        callback(changes);
      }
    } else if (areaName === 'local') {
      for (const key in changes) {
        Config.cachedLocalStorage[key] = changes[key].newValue;
      }
      for (const callback of Config.configLocalListeners) {
        callback(changes);
      }
    }
  });

  const syncHandler = {
    set(prop, value) {
      Config.cachedSyncConfig[prop] = value;
      storage.sync.set({
        [prop]: value
      });
      return true;
    },
    get(obj, prop) {
      const data = Config.cachedSyncConfig[prop];
      return obj[prop] || data;
    },
    deleteProperty(prop) {
      storage.sync.remove(prop);
      return true;
    }
  };

  const localHandler = {
    set(prop, value) {
      Config.cachedLocalStorage[prop] = value;
      storage.local.set({
        [prop]: value
      });
      return true;
    },
    get(obj, prop) {
      const data = Config.cachedLocalStorage[prop];
      return obj[prop] || data;
    },
    deleteProperty(prop) {
      storage.local.remove(prop);
      return true;
    }
  };
  return {
    sync: new Proxy({ handler: syncHandler }, syncHandler),
    local: new Proxy({ handler: localHandler }, localHandler)
  };
}

async function fetchConfig() {
  await Promise.all([
    new Promise((resolve) => {
      storage.sync.get(null, function (items) {
        Config.cachedSyncConfig = items;
        resolve();
      });
    }),
    new Promise((resolve) => {
      storage.local.get(null, function (items) {
        Config.cachedLocalStorage = items;
        resolve();
      });
    })
  ]);
}

async function setupConfig() {
  await fetchConfig();
  for (const key in Config.syncDefaults) {
    if (!Object.hasOwn(Config.cachedSyncConfig, key)) {
      Config.cachedSyncConfig[key] = Config.syncDefaults[key];
    }
    if (!Object.hasOwn(Config.cachedLocalStorage, key)) {
      Config.cachedLocalStorage[key] = Config.syncDefaults[key];
    }
  }
  const config = configProxy();
  Config.config = config.sync;
  Config.local = config.local;
}

function resetToDefault() {
  Config.cachedLocalStorage = Config.syncDefaults;
  Config.cachedSyncConfig = Config.syncDefaults;
  storage.local.set({
    ...Config.syncDefaults
  });
  storage.sync.set({
    ...Config.syncDefaults
  });
  return Config;
}

setupConfig();

export default Config;
