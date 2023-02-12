// ==UserScript==
// @name         Magic Userscript+ : Show Site All UserJS
// @name:zh      Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-TW   Magic Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// @name:ja      Magic Userscript+ : 現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// @name:ru-RU   Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @name:ru      Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @description  Show current site all UserJS, the easier way to install UserJs for Tampermonkey.
// @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-TW   顯示當前網站的所有可用UserJS(Tampermonkey)腳本,交流QQ群:104267383
// @description:ja      現在のサイトで利用可能なすべてのUserJS（Tampermonkey）スクリプトを表示します。
// @description:ru-RU   Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @description:ru      Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @author       Magic <magicoflolis@tuta.io>
// @version      5.11.20
// @icon         data:image/png;base64,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
// @downloadURL  https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @updateURL    https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @supportURL   https://github.com/magicoflolis/Userscript-Plus/issues/new
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @homepageURL  https://github.com/magicoflolis/Userscript-Plus
// @license      MIT
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @connect      github.com
// @connect      openuserjs.org
// @match        https://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_info
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   opera
// @compatible   safari
// @noframes
// @run-at       document-start
// ==/UserScript==

/**
* Injected stylesheet
* https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass
*/
const main_css = `*{scrollbar-color:#fff #2e323d;scrollbar-width:thin}@supports not (scrollbar-width: thin){* ::-webkit-scrollbar{width:1.4vw;height:3.3vh}* ::-webkit-scrollbar-track{background-color:#2e323d;border-radius:10px;margin-top:3px;margin-bottom:3px;box-shadow:inset 0 0 6px rgba(0,0,0,.3)}* ::-webkit-scrollbar-thumb{border-radius:10px;background-color:#fff;background-image:-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)}* ::-webkit-scrollbar-thumb:hover{background-color:#fff}}*:not(.mujs-iframe){background:#495060;color:#fff}magic-userjs{line-height:normal}.magicuserjs-cfg{line-height:1.5}body.webext-page,.main{font-size:14px}mujs-column,mujs-row{display:flex}mujs-column,mujs-row{gap:10px}@media screen and (max-width: 800px){mujs-column{flex-flow:row wrap}}mujs-row{flex-direction:column}magic-userjs{cursor:default}.hidden{display:none !important;z-index:-1 !important}.main{width:100%;width:-moz-available;width:-webkit-fill-available;background:#495060 !important;border:1px solid rgba(0,0,0,0);border-radius:10px;font-family:Arial,Helvetica,sans-serif}@media screen and (max-height: 450px){.main:not(.webext-page){height:100% !important;bottom:0rem !important;margin-left:0rem !important;margin-right:0rem !important;right:0rem !important}}.main.expanded{height:100% !important;bottom:0rem !important}.main:not(.webext-page){position:fixed;height:492px}.main:not(.webext-page):not(.expanded){margin-left:1rem;margin-right:1rem;right:1rem;bottom:1rem}.main:not(.webext-page):not(.expanded).auto-height{height:auto}.main:not(.hidden){z-index:100000000000000000 !important;display:flex !important;flex-direction:column !important}.count{background:rgba(0,0,0,0)}.mainframe{background:rgba(0,0,0,0);position:fixed;bottom:1rem;right:1rem}.mainframe:not(.hidden){z-index:100000000000000000 !important;display:block}.mainframe count-frame{width:2em;height:1em}count-frame{border-radius:16px;padding:0 .25em;border:2px solid rgba(0,0,0,0);font-size:16px;font-weight:400;display:inline-block;text-align:center;min-width:1em}.magicuserjs-header{order:0;display:flex;gap:10px;border-bottom:1px solid #fff;border-top-left-radius:10px;border-top-right-radius:10px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding:10px;font-size:1em;place-content:space-between}.magicuserjs-body{overflow-x:hidden;order:1}.magicuserjs-body .magicuserjs-ratings{padding:0 .25em;border:1px solid #fff;border-radius:10px}.magicuserjs-body magicuserjs-btn svg{fill:#fff;width:14px;height:14px;background:rgba(0,0,0,0)}.magicuserjs-cfg,.magicuserjs-body{border:1px solid rgba(0,0,0,0);border-bottom-left-radius:10px;border-bottom-right-radius:10px}@media screen and (max-width: 1150px){.magicuserjs-cfg{margin:0px auto 1rem auto !important}}.magicuserjs-cfg{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}@media screen and (max-height: 812px){.magicuserjs-cfg:not(.webext-page){flex-wrap:wrap;flex-direction:row !important}}.magicuserjs-cfg mujs-section>label{display:flex;justify-content:space-between}.magicuserjs-cfg mujs-section>label input[type*=number]{position:relative;border-radius:4px;border:1px solid #fff}.magicuserjs-cfg .magicuserjs-inlab{position:relative;width:38px}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]{display:none}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]:checked+label{margin-left:0;background-color:rgba(255,255,255,.568)}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]:checked+label:before{right:0px}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#greasyfork:checked+label,.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#sleazyfork:checked+label{background-color:rgba(0,183,255,.568)}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#openuserjs:checked+label{background-color:rgba(237,63,20,.568)}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#github:checked+label{background-color:rgba(36,41,47,.568)}.magicuserjs-cfg .magicuserjs-inlab label{padding:0;display:block;overflow:hidden;height:16px;border-radius:20px;border:1px solid #fff;background-color:#495060}.magicuserjs-cfg .magicuserjs-inlab label:before{content:"";display:block;width:20px;height:20px;margin:-2px;background:#fff;position:absolute;top:0;right:20px;border-radius:20px}.magicuserjs-cfg #blacklist{overflow-y:auto;background:#000;color:#fff;resize:vertical;outline:none;border-style:none;font-family:monospace}.magicuserjs-cfg #blacklist:focus{outline:none}.magicuserjs-cfg:not(.webext-page){order:2;margin:0px 25rem 1rem 25rem}table{width:100%;width:-moz-available;width:-webkit-fill-available}@media screen and (max-width: 800px){table thead>tr{display:grid;grid-auto-flow:column}}@media screen and (max-width: 500px){table thead>tr{display:none !important}}table th,table td{border-bottom:1px solid #fff}table td.magicuserjs-uframe,table td.magicuserjs-list,table td.install-btn{text-align:center}table th{position:-webkit-sticky;position:sticky;top:0}table th.mujs-header-name{width:50%}@media screen and (max-width: 800px){table th.mujs-header-name{width:auto !important}}magicuserjs-a{display:inline-block}magicuserjs-a.magicuserjs-euser{padding-left:.5rem;padding-right:.5rem}@media screen and (max-width: 800px){.frame:not(.webext-page){display:grid}.frame:not(.webext-page) magicuserjs-btn{margin-left:25%;margin-right:25%}}.frame.sf magicuserjs-a{color:#e75531 !important}.frame.sf magicuserjs-btn{background-color:#ed3f14 !important;border-color:#ed3f14 !important}.frame:not(.sf) magicuserjs-a{color:#00b7ff !important}.frame:not(.sf) magicuserjs-btn{color:#fff;background-color:#2d8cf0;border-color:#2d8cf0}.magicuserjs-name{display:grid}.magicuserjs-name span{font-size:.8em !important}mujs-btn{font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-rendering:auto;border:1px solid #fff;font-size:16px;border-radius:4px;line-height:1;padding:6px 15px}mujs-btn svg{fill:#fff;width:14px;height:14px}magicuserjs-btn{font-size:14px;border-radius:4px;font-style:normal;padding:7px 15%;font-weight:400;font-variant:normal;line-height:normal;display:block}input[type*=number],input[type*=text]{border:rgba(0,0,0,0);outline:none !important}magicuserjs-a,magicuserjs-btn,.mujs-pointer,.magicuserjs-cfg mujs-section *:not(input[type*=text],input[type*=number]),.mainbtn,.mainframe,mujs-btn{cursor:pointer !important}th,.magicuserjs-cfg *:not(input[type*=text],input[type*=number]){-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important}mujs-btn,input,.magicuserjs-homepage{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}`;

(() => {
const win = window,
/**
 * Object is Null
 * @param {Object} obj - Object
 * @returns {boolean} Returns if statement true or false
 */
isNull = obj => (Object.is(obj,null) || Object.is(obj,undefined)),
/**
 * Object is Blank
 * @param {(Object|Object[]|string)} obj - Array, object or string
 * @returns {boolean} Returns if statement true or false
 */
isBlank = obj => typeof obj === 'string' && Object.is(obj.trim(),'') || typeof obj === 'object' && Object.is(Object.keys(obj).length,0),
/**
 * Object is Empty
 * @param {(Object|Object[]|string)} obj - Array, object or string
 * @returns {boolean} Returns if statement true or false
 */
isEmpty = obj => isNull(obj) || isBlank(obj);
class Timeout {
  constructor() {
    this.ids = [];
  }
  set = (delay, reason) => {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        isNull(reason) ? resolve() : reject(reason);
        this.clear(id);
      }, delay);
      this.ids.push(id);
    });
  };
  clear = (...ids) => {
    this.ids = this.ids.filter(id => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      };
      return true;
    });
  };
};
class MUError extends Error {
  /**
   * @param {string} fnName - (Optional) Function name
   * @param {...string} params - Extra error parameters
   */
  constructor(fnName = 'AFError',...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MUError)
    } else {
      this.stack = (new Error).stack
    };
    this.fn = `[${fnName}]`;
    const dt = new Date(Date.now());
    this.date = `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}]`;
    this.name = this.constructor.name;
  };
};

let langs = {
  en: {
    daily: 'Daily Installs',
    close: 'Close',
    filterA: 'Filter',
    max: 'Maximize',
    min: 'Minimize',
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
    filterA: 'Filtro',
    max: 'Maximizar',
    min: 'Minimizar',
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
    filterA: 'Фильтр',
    max: 'Максимизировать',
    min: 'Минимизировать',
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
    filterA: 'フィルター',
    max: '最大化',
    min: 'ミニマム',
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
    filterA: 'Filtre',
    max: 'Maximiser',
    min: 'Minimiser',
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
    // eslint-disable-next-line quotes
    dtime: `Délai d'affichage`,
    save: 'Sauvez',
  },
  zh: {
    daily: '日常安装',
    close: '不再显示',
    filterA: '过滤器',
    max: '最大化',
    min: '最小化',
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
alang = [],
clang = navigator.language.split('-')[0] ?? 'en',
lang = langs[clang],
isGM = typeof GM !== 'undefined',
defcfg = {
  cache: true,
  autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  time: 10000,
  blacklist: [
    {
      enabled: true,
      regex: true,
      flags: '',
      name: 'Blacklist 1',
      url: '(gov|cart|checkout|login|join|signin|signup|sign-up|password|reset|password_reset)',
    },
    {
      enabled: true,
      regex: true,
      flags: '',
      name: 'Blacklist 2',
      url: '(pay|bank|money|localhost|authorize|checkout|bill|wallet|router)',
    },
    {
      enabled: true,
      regex: false,
      flags: '',
      name: 'Blacklist 3',
      url: 'https://home.bluesnap.com',
    },
    {
      enabled: true,
      regex: false,
      flags: '',
      name: 'Blacklist 4',
      url: [
        'zalo.me',
        'skrill.com'
      ],
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
cfg = {},
urls = [],
sitegfcount = 0,
sitesfcount = 0,
MU = {
  /**
   * Get Value
   * @param {string} key - Key to get the value of
   * @param {Object} def - Fallback default value of key
   * @returns {Object} Value or default value of key
   * @link https://violentmonkey.github.io/api/gm/#gm_getvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  async getValue(key,def = {}) {
    try {
      return await new Promise((resolve) => {
        const params = JSON.stringify(def ?? {});
        if (isGM) {
          resolve(JSON.parse(GM_getValue(key, params)));
        } else {
          resolve(localStorage.getItem(`MUJS${key}`) ? JSON.parse(localStorage.getItem(`MUJS${key}`)) : def);
        };
      });
    } catch (ex) {
      err(ex);
      return def;
    }
  },
  /**
   * Get info of script
   * @returns {Object} Script info
   * @link https://violentmonkey.github.io/api/gm/#gm_info
   */
  info() {
    return isGM ? GM_info : {
      script: {
        updateURL: '',
        version: 'Bookmarklet'
      }
    }
  },
  /**
   * Open a new window
   * @param {string} url - URL of webpage to open
   * @param {object} params - GM parameters
   * @returns {object} GM_openInTab object with Window object as a fallback
   * @link https://violentmonkey.github.io/api/gm/#gm_openintab
   * @link https://developer.mozilla.org/docs/Web/API/Window/open
   */
  openInTab(url, params = {
    active: true,
    insert: true,
  }, features) {
    if(!isGM && isBlank(params)) {
      params = '_blank';
    };
    if(features) {
      return win.open(url, params, features);
    };
    return isGM ? GM_openInTab(url, params) : win.open(url, params);
  },
  /**
   * Set value
   * @param {string} key - Key to set the value of
   * @param {Object} v - Value of key
   * @returns {Promise} Saves key to either GM managed storage or webpages localstorage
   * @link https://violentmonkey.github.io/api/gm/#gm_setvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  setValue(key,v) {
    return new Promise((resolve) => {
      v = typeof v !== 'string' ? JSON.stringify(v ?? {}) : v;
      if(isGM && cfg.cache) {
        resolve( GM_setValue(key,v) );
      } else {
        resolve( win.localStorage.setItem(`MUJS${key}`,v) );
      };
    });
  },
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   * @param {string} url - The URL to fetch
   * @param {string} method - Fetch method
   * @param {string} responseType - Response type
   * @param {Object} extras - Fetch parameters
   * @param {boolean} forcefetch - Force use fetch API
   * @returns {*} Fetch results
   * @link https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
   */
  fetchURL(url,method = 'GET',responseType = 'json',extras = {},forcefetch) {
    return new Promise((resolve, reject) => {
      if(isGM && !forcefetch) {
        GM_xmlhttpRequest({
          method: method,
          url,
          responseType,
          ...extras,
          onerror: e => reject(e),
          onload: (r) => {
            if(r.status !== 200) reject(`${r.status} ${url}`);
            if(responseType.match(/basic/gi)) resolve(r);
            resolve(r.response);
          },
        });
      } else {
        fetch(url, {
          method: method,
          ...extras,
        }).then((response) => {
          if(!response.ok) reject(response);
          if(responseType.match(/json/gi)) {
            resolve(response.json());
          } else if(responseType.match(/text/gi)) {
            resolve(response.text());
          } else if(responseType.match(/blob/gi)) {
            resolve(response.blob());
          };
          resolve(response);
        }).catch(handleError);
      };
    });
  },
};

const doc = document,
/**
 * preventDefault + stopPropagation
 * @param {Object} e - Selected Element
 */
halt = (e) => {
  e.preventDefault();
  e.stopPropagation();
},
/**
 * setTimeout w/ Promise
 * @param {number} ms - Timeout in milliseconds (ms)
 * @returns {Promise} Promise object
 */
delay = ms => new Promise(resolve => setTimeout(resolve, ms)),
/**
 * Add Event Listener
 * @param {Object} root - Selected Element
 * @param {string} event - root Event Listener
 * @param {Function} callback - Callback function
 * @param {Object} [options={}] - (Optional) Options
 * @returns {Object} Returns selected Element
 */
ael = (root, event, callback, options = {}) => {
  try {
    let isMobile = () => {
      let a = navigator.userAgent || win.opera;
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4));
    };
    root = (root || doc || doc.documentElement);
    if(isMobile()) {
      if(event === 'click') {
        event = 'mouseup';
        root.addEventListener('touchstart', callback);
        root.addEventListener('touchend', callback);
      };
    };
    if(event === 'fclick') {event = 'click'};
    return root.addEventListener(event, callback, {...options});
  } catch(ex) {
    handleError(ex);
  };
},
/**
 * Prefix for document.querySelectorAll()
 * @param {Object} element - Elements for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelectorAll(element)
 */
qsA = (element, root) => {
  root = root ?? doc ?? doc.body;
  return root.querySelectorAll(element);
},
/**
 * Prefix for document.querySelector()
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
qs = (element, root) => {
  root = root ?? doc ?? doc.body;
  return root.querySelector(element);
},
/**
 * Prefix for document.querySelector() w/ Promise
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
query = async (element, root) => {
  root = root ?? doc ?? doc.body;
  while(isNull(root.querySelector(element))) {
    await new Promise(resolve=>requestAnimationFrame(resolve))
  };
  return root.querySelector(element);
},
/**
 * Create/Make Element
 * @param {Object} element - Element to create
 * @param {string} cname - (Optional) Element class name
 * @param {Object} [attrs={}] - (Optional) Element attributes
 * @returns {Object} Returns created Element
 */
make = (element, cname, attrs = {}) => {
  let el;
  try {
    el = doc.createElement(element);
    if(!isEmpty(cname)) {
      el.className = cname;
    };
    if(!isEmpty(attrs)) {
      for (const key in attrs) {
        el[key] = attrs[key];
      };
    };
    return el;
  } catch(ex) {handleError(ex)}
},
iconSVG = {
  cfg: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="#ffffff"></path> </g></svg>',
  close: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" fill="#ffffff"></path></g></svg>',
  filter: '<svg viewBox="0 0 24 24"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="#ffffff"/> </g></svg>',
  fsClose: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z" fill="#ffffff"></path> <path d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z" fill="#ffffff"></path> <path d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z" fill="#ffffff"></path> <path d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z" fill="#ffffff"></path></g></svg>',
  fsOpen: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z" fill="#ffffff"></path> <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z" fill="#ffffff"></path> <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z" fill="#ffffff"></path> <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z" fill="#ffffff"></path></g></svg>',
  fullscreen: '<svg viewBox="0 0 96 96"><g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g></svg>',
  gf: '<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>',
  gh: '<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
  hide: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5L21 10.5C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="#ffffff"></path></g></svg>',
  install: '<svg viewBox="0 0 16 16"><g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g></svg>',
  issue: '<svg viewBox="0 0 24 24"><path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/></svg>',
  nav: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="#ffffff"></path> <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="#ffffff"></path> <path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="#ffffff"></path> </g></svg>',
  plus: '<svg viewBox="0 0 24 24"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="#ffffff"/> </g></svg>',
  search: '<svg viewBox="0 0 24 24"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill="#ffffff"/> </g></svg>',
},
container = make('main-userjs','mujs-primary'),
ifram = make('iframe','mujs-iframe', {
  src: 'about:blank',
  style: 'position: fixed; bottom: 1rem; right: 1rem; height: 525px; width: 90%; margin-left: 1rem; margin-right: 1rem; z-index: 100000000000000020 !important;'
});

function main() {
  const injCon = container.attachShadow instanceof Function ? container.shadowRoot : ifram.contentDocument.body;
  let unsaved = false,
  isBlacklisted = false,
  seen = new Set(),
  switchRows = true,
  thisHost = location.hostname.split('.').splice(-2).join('.');
  const save = () => {
    try {
      MU.setValue('Config', cfg);
      unsaved = false;
      log('Saved:',cfg);
    } catch(e) {err(e)};
  },
  timeout = new Timeout(),
  timeoutFrame = async () => {
    if(typeof cfg.time === 'number' && !isNaN(cfg.time)) {
      timeout.clear(...timeout.ids);
      await timeout.set(isBlacklisted ? cfg.time/2 : cfg.time);
      container.remove();
      ifram.remove();
      return timeout.clear(...timeout.ids);
    }
  },
  sh = elem => injCon.querySelector(elem),
  shA = elem => injCon.querySelectorAll(elem),
  table = make('table'),
  tabbody = make('tbody'),
  tabhead = make('thead'),
  makeTHead = (rows = []) => {
    let tr = make('tr');
    for(let r of rows) {
      let tparent = make('th', r.class ?? '', r);
      tr.append(tparent);
    };
    tabhead.append(tr);
    table.append(tabhead, tabbody);
  },
  showError = (msg) => {
    err(msg);
    let txt = make('mujs-row','error', {
      innerHTML: msg
    });
    for(let u of urls) {
      let dwnbtn = make('a','magicuserjs-urls', {
        href: u,
        target: '_blank',
        rel: 'noopener',
        innerHTML: u
      });
      txt.append(dwnbtn);
    };
    if(sh('.magicuserjs-body')) {
      sh('.magicuserjs-body').prepend(txt);
    };
  },
  sortRowBy = (cellIndex) => {
    const rows = Array.from(tabbody.rows);
    rows.sort((tr1, tr2) => {
      const t1cell = tr1.cells[cellIndex],
      t2cell = tr2.cells[cellIndex],
      tr1Text = (t1cell.firstElementChild ?? t1cell).textContent,
      tr2Text = (t2cell.firstElementChild ?? t2cell).textContent,
      t1pDate = Date.parse(tr1Text),
      t2pDate = Date.parse(tr2Text);
      if(!Number.isNaN(t1pDate) && !Number.isNaN(t2pDate)) {
        return new Date(t1pDate) - new Date(t2pDate);
      };
      if(Number(tr1Text) && Number(tr2Text)) {
        return tr1Text - tr2Text;
      };
      return tr1Text.localeCompare(tr2Text);
    });
    if(switchRows) {
      rows.reverse()
    };
    switchRows = !switchRows;
    tabbody.append(...rows);
  },
  createjs = (ujs, issleazy) => {
    let eframe = make('td', 'install-btn'),
    uframe = make('td','magicuserjs-uframe'),
    fdaily = make('td','magicuserjs-list', {
      innerHTML: ujs.daily_installs,
    }),
    fupdated = make('td','magicuserjs-list', {
      innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at)),
    }),
    fname = make('td','magicuserjs-name'),
    ftitle = make('magicuserjs-a','magicuserjs-homepage', {
      title: ujs.name,
      innerHTML: ujs.name,
      onclick: (e) => {
        halt(e);
        MU.openInTab(ujs.url);
      }
    }),
    fver = make('magic-userjs','magicuserjs-list', {
      innerHTML: `${lang.version}: ${ujs.version}`,
    }),
    fcreated = make('magic-userjs','magicuserjs-list', {
      innerHTML: `${lang.created}: ${new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.created_at))}`,
    }),
    fmore = make('mujs-column','magicuserjs-list hidden', {
      style: 'margin-top: 3px;',
    }),
    ftotal = make('magic-userjs','magicuserjs-list', {
      innerHTML: `${lang.total}: ${ujs.total_installs}`,
    }),
    fratings = make('magic-userjs','magicuserjs-list', {
      title: lang.rating,
      innerHTML: `${lang.rating}:`,
    }),
    fgood = make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
      title: lang.good,
      innerHTML: ujs.good_ratings,
      style: 'border-color: rgb(51, 155, 51); background-color: #339b331a; color: #339b33;',
    }),
    fok = make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
      title: lang.ok,
      innerHTML: ujs.ok_ratings,
      style: 'border-color: rgb(155, 155, 0); background-color: #9b9b001a; color: #9b9b00;',
    }),
    fbad = make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
      title: lang.bad,
      innerHTML: ujs.bad_ratings,
      style: 'border-color: red; background-color: #9b33331a; color: red;',
    }),
    fdesc = make('magic-userjs','magicuserjs-list', {
      style: 'cursor: pointer; margin-top: 3px;',
      title: ujs.description,
      innerHTML: ujs.description,
      onclick: (e) => {
        halt(e);
        if(fmore.classList.contains('hidden')) {
          fmore.classList.remove('hidden');
        } else {
          fmore.classList.add('hidden');
        }
        },
    }),
    fdwn = make('magicuserjs-btn','install', {
      title: `${lang.install} { ${ujs.name} }`,
      innerHTML: `${iconSVG.install} ${lang.install}`,
      onclick: (e) => {
        halt(e);
        MU.openInTab(ujs.code_url);
      },
    });
    for(let u of ujs.users) {
      let user = make('magicuserjs-a','magicuserjs-euser', {
        innerHTML: u.name,
        onclick: (e) => {
          halt(e);
          MU.openInTab(u.url);
        },
      });
      uframe.append(user);
    };
    eframe.append(fdwn);
    fmore.append(ftotal,fratings,fgood,fok,fbad,fver,fcreated);
    fname.append(ftitle,fdesc,fmore);
    let tr = make('tr', `frame ${issleazy ? 'sf' : ''}`);
    for(let e of [fname,uframe,fdaily,fupdated,eframe]) {
      tr.append(e);
    };
    tabbody.append(tr);

  };
  if(!isEmpty(navigator.languages)) {
    for(let nlang of navigator.languages) {
      let lg = nlang.split('-')[0];
      if(alang.indexOf(lg) === -1) {
        alang.push(lg);
      };
    };
  };
  try {
    if(/greasyfork\.org/.test(doc.location.hostname) && cfg.sleazyredirect) {
      let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
      qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
    };
    let rebuild = false,
    siteujs = [],
    main = make('magic-userjs','main hidden'),
    usercss = make('style', 'primary-stylesheet', {innerHTML: main_css,}),
    tbody = make('magic-userjs','magicuserjs-body'),
    header = make('magic-userjs','magicuserjs-header'),
    cfgpage = make('mujs-row','magicuserjs-cfg hidden'),
    makerow = (desc,type,nm,attrs = {}) => {
      let sec = make('mujs-section','', {
        style: !isGM && nm === 'cache' ? 'display: none;' : ''
      }),
      lb = make('label'),
      divDesc = make('magic-userjs','', {
        innerHTML: desc,
      }),
      inp = make('input','', {
        type: type,
        id: nm,
        name: nm,
        ...attrs
      });
      if(type === 'checkbox') {
        let inlab = make('magic-userjs','magicuserjs-inlab'),
        la = make('label','', {
          onclick: () => inp.click()
        });
        inlab.append(inp,la);
        lb.append(divDesc,inlab);
        if(nm.match(/((greasy|sleazy)fork|openuserjs|gi(thub|st))/gi)) {
          for(let i of cfg.engines) {
            if(i.name === nm) {
              inp.checked = i.enabled;
              ael(inp,'change', (e) => {
                unsaved = true;
                i.enabled = e.target.checked;
                rebuild = true;
              });
            };
          };
        } else {
          inp.checked = cfg[nm];
          if(nm.match(/(autoexpand|sleazyredirect)/gi)) {
            ael(inp,'change', (e) => {
              unsaved = true;
              cfg[nm] = e.target.checked;
            });
          } else {
            ael(inp,'change', (e) => {
              unsaved = true;
              cfg[nm] = e.target.checked;
              rebuild = true;
            });
          };
        };
      } else {
        lb.append(divDesc,inp);
      };
      sec.append(lb);
      cfgpage.append(sec);
      return inp;
    },
    countframe = make('mujs-column'),
    gfcountframe = make('magic-userjs', 'counterframe'),
    sfcountframe = make('magic-userjs', 'counterframe'),
    gfcounter = make('count-frame','count', {
      title: 'https://greasyfork.org + https://sleazyfork.org',
      style: 'background: #00b7ff;'
    }),
    sfcounter = make('count-frame','count', {
      title: 'https://openuserjs.org',
      style: 'background: #ed3f14;'
    }),
    buildlist = async (host) => {
      try {
        if(isEmpty(host)) {
          host = thisHost;
        };
        const template = {
          bad_ratings: 0,
          good_ratings: 0,
          ok_ratings: 0,
          daily_installs: 0,
          total_installs: 0,
          name: 'Not found',
          description: 'Not found',
          version: '0.0.0',
          url: 'about:blank',
          code_url: 'about:blank',
          created_at: Date.now(),
          code_updated_at: Date.now(),
          users: [
            {
              name: '',
              url: '',
            }
          ]
        };
        let sites = [],
        custom = [],
        engines = cfg.engines.filter(e => e.enabled);
        for(let i of engines) {
          if(i.url.match(/fork.org/gi)) {
            if(cfg.filterlang) {
              if(alang.length > 1) {
                for(let a of alang) {
                  urls.push(`${i.url}/${a}/scripts/by-site/${host}.json`);
                  sites.push(MU.fetchURL(`${i.url}/${a}/scripts/by-site/${host}.json?page=1`),);
                };
                continue;
              };
              urls.push(`${i.url}/${clang}/scripts/by-site/${host}.json`);
              sites.push(MU.fetchURL(`${i.url}/${clang}/scripts/by-site/${host}.json?page=1`),);
              continue;
            };
            urls.push(`${i.url}/scripts/by-site/${host}.json`);
            sites.push(MU.fetchURL(`${i.url}/scripts/by-site/${host}.json`),);
          } else if(i.url.match(/(openuserjs.org|github.com)/gi)) {
            urls.push(`${i.url}${host}`);
            custom.push(MU.fetchURL(`${i.url}${host}`,'GET','text'),);
          };
        };
        info('Fetching data',host);

        if(!isBlank(sites)) {
          let hideData = [];
          let data = await Promise.all(sites).catch((e) => {throw new MUError('Data',e)}),
          joinData = [...new Set([...data[0], ...data[1]])],
          filterDeleted = joinData.filter(ujs => !ujs.deleted),
          filterLang = cfg.filterlang ? filterDeleted.filter((d) => {
            let dlocal = d.locale.split('-')[0] ?? d.locale;
            if(alang.length > 1) {
              for(let a of alang) {
                if(dlocal.includes(a)) {
                  return true;
                };
              };
            } else if(dlocal.includes(clang)) {
              return true;
            };
            hideData.push(d);
            return false;
          }) : filterDeleted,
          finalList = filterLang;

          if(!isBlank(hideData)) {
            let hds = [];
            for(let h of hideData) {
              let txt = await MU.fetchURL(h.code_url,'GET','text');
              let headers = txt.match(/\/\/\s@[\w][\s\S]+/gi) || [];
              if(headers.length > 0) {
                let regName = new RegExp(`// @name:${clang}\\s+.+`,'gi'),
                findName = headers[0].match(regName) || [];

                if(isEmpty(findName)) {
                  continue;
                };
                let cReg = new RegExp(`// @name:${clang}\\s+`,'gi'),
                cutName = findName[0].replace(cReg, '');
                Object.assign(h, {
                  name: cutName
                });

                let regDesc = new RegExp(`// @description:${clang}\\s+.+`,'gi'),
                findDesc = headers[0].match(regDesc) || [];
                if(isEmpty(findDesc)) {
                  continue;
                };
                let dReg = new RegExp(`// @description:${clang}\\s+`,'gi'),
                cutDesc = findDesc[0].replace(dReg, '');
                Object.assign(h, {
                  description: cutDesc
                });
                hds.push(h);
              };
            };
            finalList = [...new Set([...hds, ...filterLang])];
          };

          for(let ujs of finalList) {
            siteujs.push(
              {
                url: ujs,
                sleazy: false,
              },
            );
            sitegfcount++;
          };
          for(let ujs of siteujs) {
            createjs(ujs.url,ujs.sleazy);
          };
        } else {
          showError('Error occured while loading UserJS for this webpage')
        };
        gfcounter.innerHTML = sitegfcount;
        mainbtn.innerHTML = sitesfcount + sitegfcount;
        if(!isBlank(custom)) {
          let customRecords = [];
          let c = await Promise.all(custom).catch((e) => {throw new MUError('Custom',e)}),
          parser = new DOMParser(),
          htmlDocument = parser.parseFromString(c,'text/html'),
          selected = htmlDocument.documentElement;
          if(qs('.col-sm-8 .tr-link',selected)) {
            for(let i of qsA('.col-sm-8 .tr-link',selected)) {
              await query('.script-version',i);
              let fixurl = qs('.tr-link-a',i).href.replace(new RegExp(doc.location.origin, 'gi'),'https://openuserjs.org'),
              layout = {
                name: qs('.tr-link-a',i).textContent,
                description: qs('p',i).textContent,
                version: qs('.script-version',i).textContent,
                url: fixurl,
                code_url: `${fixurl.replace(new RegExp('/scripts', 'gi'),'/install')}.user.js`,
                total_installs: qs('td:nth-child(2) p',i).textContent,
                created_at: qs('td:nth-child(4) time',i).getAttribute('datetime'),
                code_updated_at: qs('td:nth-child(4) time',i).getAttribute('datetime'),
                users: [
                  {
                    name: qs('.inline-block a',i).textContent,
                    url: qs('.inline-block a',i).href,
                  }
                ]
              };
              for(const key in template) {
                if(!Object.hasOwn(layout, key)) {
                  layout[key] = template[key];
                };
              };
              createjs(layout, true);
              customRecords.push(layout);
              sitesfcount++;
              sfcounter.innerHTML = sitesfcount;
            };
          };
          if(qs('.repo-list-item',selected)) {
            for(let r of qsA('.repo-list-item',selected)) {
              let layout = {},
              fixurl = qs('a',r).href.replace(new RegExp(doc.location.origin, 'gi'),'https://github.com');
              layout = Object.assign(layout, {
                name: qs('a',r).textContent,
                description: qs('p.mb-1',r).textContent.trim(),
                url: fixurl,
                code_url: fixurl,
                code_updated_at: qs('relative-time.no-wrap',r).getAttribute('datetime'),
                total_installs:  qs('a.Link--muted:nth-child(1)',r) ? qs('a.Link--muted:nth-child(1)',r).textContent : 0,
                users: [{
                  name: qs('a',r).href.match(/\/[\w\d-]+\//gi)[0].replaceAll('/',''),
                  url: `https://github.com${qs('a',r).href.match(/\/[\w\d-]+\//gi)}`,
                }]
              });
              for (const key in template) {
                if(!Object.hasOwn(layout, key)) {
                  layout[key] = template[key];
                };
              };
              createjs(layout, true);
              customRecords.push(layout);
              sitesfcount++;
              sfcounter.innerHTML = sitesfcount;
            };
          };
          if(qs('div.gist-snippet',selected)) {
            for(let g of qsA('div.gist-snippet',selected)) {
              if(qs('span > a:nth-child(2)',g).textContent.includes('.user.js')) {
                let layout = {},
                fixurl = qs('span > a:nth-child(2)',g).href.replace(new RegExp(doc.location.origin, 'gi'),'https://gist.github.com');
                layout = Object.assign(layout, {
                  url: fixurl,
                  code_url: `${fixurl}/raw/${qs('span > a:nth-child(2)',g).textContent}`,
                  created_at: qs('time-ago.no-wrap',g).getAttribute('datetime'),
                  users: [{
                    name: qs('span > a[data-hovercard-type]',g).textContent,
                    url: qs('span > a[data-hovercard-type]',g).href.replace(new RegExp(doc.location.origin, 'gi'),'https://gist.github.com'),
                  }]
                });
                for(let i of qsA('.file-box table tr .blob-code',g)) {
                  let txt = i.textContent,
                  headers = txt.match(/\/\/\s@[\w][\s\S]+/gi) || [];
                  if(headers.length > 0) {
                    let crop = headers[0].split(/\/\/\s@(name|description|author|version)\s+/gi);
                    if(headers[0].includes('@name') && !headers[0].includes('@namespace')) {
                      layout = Object.assign(layout, {
                        name: crop[2].trim(),
                      });
                    };
                    if(headers[0].includes('@description')) {
                      layout = Object.assign(layout, {
                        description: crop[2].trim(),
                      });
                    };
                    if(headers[0].includes('@version')) {
                      layout = Object.assign(layout, {
                        version: crop[2].trim(),
                      });
                    };
                  }
                };
                for (const key in template) {
                  if(!Object.hasOwn(layout, key)) {
                    layout[key] = template[key];
                  };
                };
                createjs(layout, true);
                customRecords.push(layout);
                sitesfcount++;
                sfcounter.innerHTML = sitesfcount;
              };
            };
          };
          seen.add({
            host: host,
            data: siteujs,
            custom: customRecords,
            gfcount: sitegfcount,
            sfcount: sitesfcount,
          });
          sfcounter.innerHTML = sitesfcount;
          mainbtn.innerHTML = sitesfcount + sitegfcount;
        } else {
          seen.add({
            host: host,
            data: siteujs,
            gfcount: sitegfcount,
            sfcount: sitesfcount,
          });
        };
        if(isBlank(sites) && isBlank(custom)) showError('No available UserJS for this webpage');

        sortRowBy(2);

      } catch(ex) {
        showError(ex);
      };
    },
    preBuild = (site) => {
      let bhref = site ?? win.top.document.location.href,
      blacklist = cfg.blacklist.filter(b => b.enabled);
      siteujs = [];
      urls = [];
      sitegfcount = 0;
      sitesfcount = 0;
      tabbody.innerHTML = '';
      if(sh('.error')) {
        sh('.error').remove();
      };
      gfcounter.innerHTML = sitegfcount;
      sfcounter.innerHTML = sitesfcount;
      mainbtn.innerHTML = sitegfcount;
      for(let b of blacklist) {
        if(b.regex) {
          let reg = new RegExp(b.url,b.flags),
          testurl = reg.test(bhref);
          if(!testurl) continue;
          isBlacklisted = true;
        };
        if(!Array.isArray(b.url)) {
          if(!bhref.includes(b.url)) continue;
          isBlacklisted = true;
        };
        for(let c of b.url) {
          if(!bhref.includes(c)) continue;
          isBlacklisted = true;
        };
      };
      if(isBlacklisted) {
        urls.push(bhref);
        showError('Blacklisted');
        return timeoutFrame();
      };
      if(isEmpty(site)) {
        site = thisHost;
      };
      if(seen.size > 0) {
        for(let s of seen) {
          if(Object.is(s.host,site)) {
            if(s.data) {
              for(let ujs of s.data) {
                createjs(ujs.url, ujs.sleazy);
              };
            };
            if(s.custom) {
              for(let ujs of s.custom) {
                createjs(ujs, true);
              };
            };
            gfcounter.innerHTML = s.gfcount;
            sfcounter.innerHTML = s.sfcount;
            mainbtn.innerHTML = s.sfcount + s.gfcount;
            return;
          }
        };
      };

      return buildlist(site);
    },
    //#region Make Config
    makecfg = () => {
      makerow('Sync with GM','checkbox','cache');
      makerow('Auto Fullscreen','checkbox','autoexpand', {
        onchange: (e) => {
          if(e.target.checked) {
            btnfullscreen.classList.add('expanded');
            main.classList.add('expanded');
            btnfullscreen.innerHTML = fcclose;
          } else {
            btnfullscreen.classList.remove('expanded');
            main.classList.remove('expanded');
            btnfullscreen.innerHTML = fcopen;
          };
        },
      });
      makerow(lang.redirect,'checkbox','sleazyredirect');
      makerow(lang.filter,'checkbox','filterlang');
      makerow('Greasy Fork','checkbox','greasyfork');
      makerow('Sleazy Fork','checkbox','sleazyfork');
      makerow('Open UserJS','checkbox','openuserjs');
      makerow('GitHub','checkbox','github');
      makerow('Gist (GitHub)','checkbox','gist');
      let rtime = makerow(`${lang.dtime} (ms)`,'number','time', {
        defaultValue: 10000,
        value: cfg.time,
        min: 0,
        step: 500,
        onbeforeinput: (e) => {
          if(e.target.validity.badInput) {
            e.target.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
          } else {
            e.target.setAttribute('style','');
          }
        },
        oninput: (e) => {
          unsaved = true;
          let t = e.target;
          if(t.validity.badInput || t.validity.rangeUnderflow && t.value !== '-1') {
            t.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
          } else {
            t.setAttribute('style','');
            cfg.time = isEmpty(t.value) ? cfg.time : parseFloat(t.value);
          }
        }
      });
      let isvalid = true,
      txta = make('textarea','tarea', {
        name: 'blacklist',
        id: 'blacklist',
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft',
        value: JSON.stringify(cfg.blacklist, null, ' '),
        oninput: (e) => {
          try {
            cfg.blacklist = JSON.parse(e.target.value);
            if(!isvalid) {
              isvalid = true;
              e.target.setAttribute('style','');
            };
          } catch(ex) {
            isvalid = false;
            err(ex);
          };
        },
      }),
      cbtn = make('magic-userjs', 'b', {
        style: 'display: flex'
      }),
      savebtn = make('mujs-btn', 'save', {
        style: 'margin: auto;',
        innerHTML: lang.save,
        onclick: (e) => {
          halt(e);
          if(rtime.validity.badInput || rtime.validity.rangeUnderflow && rtime.value !== '-1') {
            return rtime.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
          };
          if(!isvalid) {
            return txta.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
          };
          save();
          if(rebuild) {
            seen.clear();
            rebuild = false;
            preBuild();
          };
          if(/greasyfork\.org/.test(doc.location.hostname) && cfg.sleazyredirect) {
            let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
            qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
          };
        },
      }),
      resetbtn = make('mujs-btn', 'reset', {
        style: 'margin: auto;',
        innerHTML: 'Reset',
        onclick: (e) => {
          halt(e);
          MU.setValue('Config');
          unsaved = true;
          cfg = defcfg;
          txta.value = JSON.stringify(cfg.blacklist, null, ' ');
          for(let i of cfg.engines) {
            if(sh(`#${i.name}`)) {
              sh(`#${i.name}`).checked = i.enabled;
            };
          };
          for(let i of shA('.magicuserjs-inlab input[type="checkbox"]')) {
            if(!i.name.match(/((greasy|sleazy)fork|openuserjs|gi(thub|st))/gi)) {
              i.checked = cfg[i.name];
            };
          };
        },
      });
      cbtn.append(savebtn,resetbtn);
      cfgpage.append(txta,cbtn);
    },
    //#endregion
    fcopen = iconSVG.fsOpen,
    fcclose = iconSVG.fsClose,
    btnHide = make('mujs-btn','hide-list', {
      title: lang.min,
      innerHTML: iconSVG.hide,
      onclick: (e) => {
        halt(e);
        main.classList.add('hidden');
        mainframe.classList.remove('hidden');
        timeoutFrame();
      }
    }),
    btnfullscreen = make('mujs-btn','fullscreen', {
      title: lang.max,
      innerHTML: iconSVG.fullscreen,
      onclick: (e) => {
        halt(e);
        if(btnfullscreen.classList.contains('expanded')) {
          btnfullscreen.classList.remove('expanded');
          main.classList.remove('expanded');
          btnfullscreen.innerHTML = fcopen;
          return;
        };
        btnfullscreen.classList.add('expanded');
        main.classList.add('expanded');
        btnfullscreen.innerHTML = fcclose;
      }
    }),
    mainframe = make('magic-userjs','mainframe', {
      onclick: (e) => {
        e.preventDefault();
        timeout.clear(...timeout.ids);
        main.classList.remove('hidden');
        mainframe.classList.add('hidden');
        if(cfg.autoexpand) {
          btnfullscreen.classList.add('expanded');
          main.classList.add('expanded');
          btnfullscreen.innerHTML = fcclose;
        };
      }
    }),
    mainbtn = make('count-frame','mainbtn', {
      innerHTML: '0',
    }),
    fsearch = make('mujs-btn','hidden'),
    ssearch = make('mujs-btn','hidden'),
    filterList = make('input','searcher', {
      style: 'width: 170px;',
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: lang.searcher,
      oninput: (e) => {
        e.preventDefault();
        let v = e.target.value;
        if(!isEmpty(v)) {
          let reg = new RegExp(v,'gi');
          for(let ujs of shA('.frame')) {
            let m = ujs.children[0],
            n = ujs.children[1],
            final = m.textContent.match(reg) || n.textContent.match(reg) || [];
            if(final.length === 0) {
              ujs.classList.add('hidden');
            } else {
              ujs.classList.remove('hidden');
            };
          };
        } else {
          for(let ujs of shA('.frame')) {
            ujs.classList.remove('hidden')
          };
        };
      },
    }),
    filterBtn = make('mujs-btn','filter', {
      title: lang.filterA,
      innerHTML: iconSVG.filter,
      onclick: (e) => {
        e.preventDefault();
        fsearch.classList.toggle('hidden');
      }
    }),
    siteSearcher = make('input','searcher', {
      style: 'width: 100px;',
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: thisHost,
      onchange: (e) => {
        e.preventDefault();
        preBuild(e.target.value);
      },
    }),
    siteSearchbtn = make('mujs-btn','search', {
      title: lang.search,
      innerHTML: iconSVG.search,
      onclick: (e) => {
        e.preventDefault();
        ssearch.classList.toggle('hidden');
      }
    }),
    closebtn = make('mujs-btn','close', {
      title: lang.close,
      innerHTML: iconSVG.close,
      onclick: async (e) => {
        halt(e);
        container.remove();
        ifram.remove();
      }
    }),
    btnframe = make('mujs-column'),
    btnHandles = make('mujs-column', 'btn-handles'),
    btncfg = make('mujs-btn','settings', {
      title: 'Settings',
      innerHTML: iconSVG.cfg,
      onclick: (e) => {
        e.preventDefault();
        if(sh('.saveerror')) {
          sh('.saveerror').remove();
        };
        if(unsaved) {
          let txt = make('mujs-row','saveerror', {
            innerHTML: 'Unsaved changes'
          });
          tbody.prepend(txt);
          delay(10000).then(() => txt.remove());
        };
        if(cfgpage.classList.contains('hidden')) {
          cfgpage.classList.remove('hidden');
          tbody.classList.add('hidden');
          main.classList.add('auto-height');
          if(ifram) {
            ifram.setAttribute('style','height: 100%;');
          };
        } else {
          cfgpage.classList.add('hidden');
          tbody.classList.remove('hidden');
          main.classList.remove('auto-height');
          if(ifram) {
            ifram.setAttribute('style','');
          };
        };
        rebuild = false;
      },
    }),
    btnhome = make('mujs-btn','github hidden', {
      title: `GitHub (v${MU.info().script.version.includes('.') || MU.info().script.version.includes('Book') ? MU.info().script.version : MU.info().script.version.slice(0,5)})`,
      innerHTML: iconSVG.gh,
      onclick: (e) => {
        halt(e);
        MU.openInTab('https://github.com/magicoflolis/Userscript-Plus');
      }
    }),
    btnissue = make('mujs-btn','issue hidden', {
      title: lang.issue,
      innerHTML: iconSVG.issue,
      onclick: (e) => {
        e.preventDefault();
        MU.openInTab('https://github.com/magicoflolis/Userscript-Plus/issues/new');
      }
    }),
    btngreasy = make('mujs-btn','greasy hidden', {
      title: 'Greasy Fork',
      innerHTML: iconSVG.gf,
      onclick: (e) => {
        e.preventDefault();
        MU.openInTab('https://greasyfork.org/scripts/421603');
      }
    }),
    btnnav = make('mujs-btn','nav', {
      title: 'Navigation',
      innerHTML: iconSVG.nav,
      onclick: (e) => {
        halt(e);
        if(btngreasy.classList.contains('hidden')) {
          btnissue.classList.remove('hidden');
          btnhome.classList.remove('hidden');
          btngreasy.classList.remove('hidden');
        } else {
          btnissue.classList.add('hidden');
          btnhome.classList.add('hidden');
          btngreasy.classList.add('hidden');
        };
      }
    });
    gfcountframe.append(gfcounter);
    sfcountframe.append(sfcounter);
    countframe.append(gfcountframe,sfcountframe);
    fsearch.append(filterList);
    ssearch.append(siteSearcher);
    btnHandles.append(btnHide,btnfullscreen,closebtn);
    btnframe.append(fsearch,filterBtn,ssearch,siteSearchbtn,btncfg,btnissue,btnhome,btngreasy,btnnav,btnHandles);
    header.append(countframe,btnframe);
    tbody.append(table);
    makeTHead([
      {
        class: 'mujs-header-name',
        textContent: 'Name'
      },
      {
        textContent: 'Created by',
      },
      {
        textContent: lang.daily,
      },
      {
        textContent: lang.updated,
      },
      {
        textContent: lang.install,
      },
    ]);
    for (const th of tabhead.rows[0].cells) {
      if(th.textContent === lang.install) continue;
      th.classList.add('mujs-pointer');
      ael(th, 'click', () => {
        sortRowBy(th.cellIndex);
      });
    };
    main.append(header,tbody,cfgpage);
    mainframe.append(mainbtn);
    injCon.append(usercss,mainframe,main);
    makecfg();
    preBuild();
    timeoutFrame();
    ael(win,'beforeunload', () => {
      container.remove();
      ifram.remove();
    });
  } catch(ex) {handleError(ex)}
};

function containerInject() {
  try {
    info('Injecting Container...');
    if(container.attachShadow instanceof Function) {
      doc.body.append(container);
      container.attachShadow({mode: 'open'});
      return main();
    };
    ael(ifram, 'load', () => {
      ifram.contentDocument.documentElement.classList.add('mujs-iframe');
      ifram.contentDocument.body.classList.add('mujs-iframe');
      main();
    });
    doc.body.append(ifram);
  } catch(ex) {handleError(ex)}
};

async function stateChange(event) {
  const evt = event.target ?? doc;
  if(Object.is(evt.readyState,'complete')) {
    containerInject();
  };
};

async function setupConfig() {
  try {
    cfg = await MU.getValue('Config',defcfg);
    for (const key in defcfg) {
      if(!Object.hasOwn(cfg, key)) {
        cfg[key] = defcfg[key];
      } else if (key === 'lang') {
        for (const keyl in defcfg[key]) {
          if(!Object.hasOwn(cfg[key], keyl)) {
            cfg[key][keyl] = defcfg[key][keyl];
          };
        };
      } else if (key === 'engines') {
        for (const key2 in defcfg[key]) {
          if(!Object.hasOwn(cfg[key], key2)) {
            cfg[key][key2] = defcfg[key][key2];
          };
        };
      } else if (key === 'blacklist') {
        for (const key3 in defcfg[key]) {
          if(!Object.hasOwn(cfg[key], key3)) {
            cfg[key][key3] = defcfg[key][key3];
          };
        };
      }
    };
    dbg('Config:',cfg);
    if(Object.is(doc.readyState,'complete')) {
      containerInject();
    } else {
      ael(doc,'readystatechange',stateChange);
    };
  } catch(ex) {
    handleError(ex)
  };
};
//#region Console
function dbg(...msg) {
  const dt = new Date(Date.now());
  return console.log('[%cAF%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}]`, ...msg);
};
function err(...msg) {
  return console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg);
};
/**
 * Displays error messages in webpage
 * @param {Object|string} error - Error Object or message
 */
// TODO expand upon function
function handleError(error) {
  const emsg = error.fn ? `${error.fn} ERROR: ${error.message}` : error;
  return err(emsg);
};
function info(...msg) {
  return console.info('[%cUserJS%c] %cINF', 'color: rgb(29, 155, 240);', '', 'color: rgb(0, 186, 124);', ...msg);
};
function log(...msg) {
  return console.log('[%cUserJS%c] %cLOG', 'color: rgb(29, 155, 240);', '', 'color: rgb(219, 160, 73);', ...msg);
};
//#endregion

if(!win.frameElement) {
  setupConfig();
};

})();
