'use strict';
const storage = self.browser instanceof Object && self.browser instanceof Element === false ? self.browser.storage : self.chrome.storage,
langs = {
  en: {
    daily: 'Daily Installs',
    close: 'No longer show',
    search: 'Search',
    searcher: 'Title | Description | Author...',
    install: 'Install',
    issue: 'New Issue',
    version: 'Version',
    updated: 'Last Updated',
    legacy: 'Legacy',
    total: 'Total Installs',
    rating: 'Ratings',
    good: 'Good',
    ok: 'Ok',
    bad: 'Bad',
    created: 'Created',
    redirect: 'Greasy Fork for adults',
    filter: 'Filter out other languages',
    dtime: 'Display Timeout',
    save: 'Save',
  },
  es: {
    daily: 'Instalaciones diarias',
    close: 'Ya no se muestra',
    search: 'Busque en',
    searcher: 'Título | Descripción | Autor...',
    install: 'Instalar',
    issue: 'Nueva edición',
    version: 'Versión',
    updated: 'Última actualización',
    legacy: 'Legado',
    total: 'Total de instalaciones',
    rating: 'Clasificaciones',
    good: 'Bueno',
    ok: 'Ok',
    bad: 'Malo',
    created: 'Creado',
    redirect: 'Greasy Fork para adultos',
    filter: 'Filtrar otros idiomas',
    dtime: 'Mostrar el tiempo de espera',
    save: 'Guardar',
  },
  ru: {
    daily: 'Ежедневные установки',
    close: 'Больше не показывать',
    search: 'Поиск',
    searcher: 'Название | Описание | Автор...',
    install: 'Установите',
    issue: 'Новый выпуск',
    version: 'Версия',
    updated: 'Последнее обновление',
    legacy: 'Наследие',
    total: 'Всего установок',
    rating: 'Рейтинги',
    good: 'Хорошо',
    ok: 'Хорошо',
    bad: 'Плохо',
    created: 'Создано',
    redirect: 'Greasy Fork для взрослых',
    filter: 'Отфильтровать другие языки',
    dtime: 'Тайм-аут отображения',
    save: 'Сохранить',
  },
  ja: {
    daily: 'デイリーインストール',
    close: '表示されなくなりました',
    search: '検索',
    searcher: 'タイトル｜説明｜著者...',
    install: 'インストール',
    issue: '新刊のご案内',
    version: 'バージョン',
    updated: '最終更新日',
    legacy: 'レガシー',
    total: '総インストール数',
    rating: 'レーティング',
    good: 'グッド',
    ok: '良い',
    bad: '悪い',
    created: '作成',
    redirect: '大人のGreasyfork',
    filter: '他の言語をフィルタリングする',
    dtime: '表示タイムアウト',
    save: '拯救',
  },
  fr: {
    daily: 'Installations quotidiennes',
    close: 'Ne plus montrer',
    search: 'Recherche',
    searcher: 'Titre | Description | Auteur...',
    install: 'Installer',
    issue: 'Nouveau numéro',
    version: 'Version',
    updated: 'Dernière mise à jour',
    legacy: 'Héritage',
    total: 'Total des installations',
    rating: 'Notations',
    good: 'Bon',
    ok: 'Ok',
    bad: 'Mauvais',
    created: 'Créé',
    redirect: 'Greasy Fork pour les adultes',
    filter: 'Filtrer les autres langues',
    dtime: `Délai d'affichage`,
    save: 'Sauvez',
  },
  zh: {
    daily: '日常安装',
    close: '不再显示',
    search: '搜索',
    searcher: '标题|描述|作者...',
    install: '安装',
    issue: '新问题',
    version: '版本',
    updated: '最后更新',
    legacy: '遗产',
    total: '总安装量',
    rating: '评级',
    good: '好的',
    ok: '好的',
    bad: '不好',
    created: '创建',
    redirect: '大人的Greasyfork',
    filter: '过滤掉其他语言',
    dtime: '显示超时',
    save: '拯救',
  },
},
Config = {
  configLocalListeners: [],
  configSyncListeners: [],
  syncDefaults: {
    cache: true,
    lang: langs[navigator.language.split('-')[0] ?? 'en'],
    filterlang: false,
    sleazyredirct: false,
    time: 10000,
    blacklist: [
      {
        enabled: true,
        regex: true,
        flags: '',
        name: 'Default 1',
        url: '(gov|cart|checkout|login|join|signin|signup|sign-up|password|reset|password_reset)',
      },
      {
        enabled: true,
        regex: true,
        flags: '',
        name: 'Default 2',
        url: '(pay|bank|money|localhost|authorize|checkout|bill|wallet|router)',
      },
    ],
    engines: [
      {
        enabled: true,
        name: 'greasyfork',
        url: 'https://greasyfork.org',
      },
      {
        enabled: true,
        name: 'sleazyfork',
        url: 'https://sleazyfork.org',
      },
      {
        enabled: false,
        name: 'openuserjs',
        url: 'https://openuserjs.org/?q=',
      },
      {
        enabled: false,
        name: 'github',
        url: 'https://github.com/search?l=JavaScript&o=desc&q="==UserScript=="+',
      },
      {
        enabled: false,
        name: 'gist',
        url: 'https://gist.github.com/search?l=JavaScript&o=desc&q="==UserScript=="+',
      },
    ]
  },
  cachedSyncConfig: null,
  cachedLocalStorage: null,
  resetToDefault,
};

function configProxy() {
  storage.onChanged.addListener((changes = storage.StorageChange, areaName) => {
    if (areaName === 'sync') {
      for (const key in changes) {
        Config.cachedSyncConfig[key] = changes[key].newValue;
      };
      for (const callback of Config.configSyncListeners) {
        callback(changes);
      };
    } else if (areaName === 'local') {
      for (const key in changes) {
        Config.cachedLocalStorage[key] = changes[key].newValue;
      };
      for (const callback of Config.configLocalListeners) {
        callback(changes);
      };
    }
  });

  const syncHandler= {
    set(prop,value) {
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
  await Promise.all([new Promise((resolve) => {
    storage.sync.get(null, function(items) {
      Config.cachedSyncConfig = items;
      resolve();
    });
  }), new Promise((resolve) => {
    storage.local.get(null, function(items) {
      Config.cachedLocalStorage = items;
      resolve();
    });
  })]);
}

async function setupConfig() {
  await fetchConfig();
  addDefaults();
  const config = configProxy();
  Config.config = config.sync;
  Config.local = config.local;
}

function addDefaults() {
  for (const key in Config.syncDefaults) {
    if(!Object.hasOwn(Config.cachedSyncConfig, key)) {
      Config.cachedSyncConfig[key] = Config.syncDefaults[key];
    };
    // if(!Object.prototype.hasOwnProperty.call(Config.cachedSyncConfig, key)) {
    //   Config.cachedSyncConfig[key] = Config.syncDefaults[key];
    // }
  };
  for (const key in Config.localDefaults) {
    if(!Object.hasOwn(Config.cachedLocalStorage, key)) {
      Config.cachedLocalStorage[key] = Config.localDefaults[key];
    };
    // if(!Object.prototype.hasOwnProperty.call(Config.cachedLocalStorage, key)) {
    //   Config.cachedLocalStorage[key] = Config.localDefaults[key];
    // }
  };
};

function resetToDefault() {
  storage.sync.set({
    ...Config.syncDefaults,
  });
};

setupConfig();

export default Config;
