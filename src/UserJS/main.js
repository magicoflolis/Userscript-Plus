let userjs = (self.userjs = {});
let cfg = {};
let lang = {};
let legacyMsg = null;
// Skip text/plain documents.
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}

const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
const Supports = {
  gm: typeof GM !== 'undefined'
  // uwin: typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
};
//#region Console
const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cUserJS%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cUserJS%c] %cERROR',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  let alertBrowser = false;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex) {
      alertBrowser = true;
      break;
    }
  }
  if (isMobile || alertBrowser) {
    alert(...msg);
  }
};
const info = (...msg) => {
  console.info(
    '[%cUserJS%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};
// eslint-disable-next-line no-unused-vars
const log = (...msg) => {
  console.log(
    '[%cUserJS%c] %cLOG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(219, 160, 73);',
    ...msg
  );
};
//#endregion
const MU = {};
const hasOwn = Object.hasOwn || Object.prototype.hasOwnProperty.call;
/**
 * Object is typeof `Element`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isElem = (obj) => {
  // const s = /** @type { string } */ (Object.prototype.toString.call(obj));
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
 * @template B
 * @param { {} } objA
 * @param { B } objB
 * @returns { B }
 */
const setObj = (objA = {}, objB = {}) => {
  objA = objA || {};
  objB = objB || {};
  for (const [key, value] of Object.entries(objA)) {
    if (!hasOwn(objB, key)) {
      objB[key] = value;
    } else if (typeof value === 'object') {
      setObj(value, objB[key]);
    }
  }
  return objB;
};
/**
 * @template T
 * @param { T } target
 * @param { Element } root
 * @param { boolean } toQuery
 * @returns { T[] }
 */
const normalizeTarget = (target, root = document, toQuery = true) => {
  if (isNull(target)) {
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

  static prop(target, prop, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem[prop];
      }
      elem[prop] = value;
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
class Language {
  static get cache() {
    return Language.list[cfg.language] ?? Language.list[Language.navLang];
  }

  static navLang = navigator.language.split('-')[0] ?? 'en';

  static list = {
    en: {
      legacy: 'PLEASE RESET YOUR CONFIG!',
      createdby: 'Created by',
      name: 'Name',
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
      total: 'Total Installs',
      rating: 'Ratings',
      good: 'Good',
      ok: 'Ok',
      bad: 'Bad',
      created: 'Created',
      redirect: 'Greasy Fork for adults',
      filter: 'Filter out other languages',
      dtime: 'Display Timeout',
      save: 'Save'
    },
    es: {
      legacy: 'PLEASE RESET YOUR CONFIG!',
      createdby: 'Created by',
      name: 'Name',
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
      total: 'Total de instalaciones',
      rating: 'Clasificaciones',
      good: 'Bueno',
      ok: 'Ok',
      bad: 'Malo',
      created: 'Creado',
      redirect: 'Greasy Fork para adultos',
      filter: 'Filtrar otros idiomas',
      dtime: 'Mostrar el tiempo de espera',
      save: 'Guardar'
    },
    ru: {
      legacy: 'PLEASE RESET YOUR CONFIG!',
      createdby: 'Created by',
      name: 'Name',
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
      total: 'Всего установок',
      rating: 'Рейтинги',
      good: 'Хорошо',
      ok: 'Хорошо',
      bad: 'Плохо',
      created: 'Создано',
      redirect: 'Greasy Fork для взрослых',
      filter: 'Отфильтровать другие языки',
      dtime: 'Тайм-аут отображения',
      save: 'Сохранить'
    },
    ja: {
      legacy: 'PLEASE RESET YOUR CONFIG!',
      createdby: 'Created by',
      name: 'Name',
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
      total: '総インストール数',
      rating: 'レーティング',
      good: 'グッド',
      ok: '良い',
      bad: '悪い',
      created: '作成',
      redirect: '大人のGreasyfork',
      filter: '他の言語をフィルタリングする',
      dtime: '表示タイムアウト',
      save: '拯救'
    },
    fr: {
      createdby: 'Created by',
      name: 'Name',
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
      total: 'Total des installations',
      rating: 'Notations',
      good: 'Bon',
      ok: 'Ok',
      bad: 'Mauvais',
      created: 'Créé',
      redirect: 'Greasy Fork pour les adultes',
      filter: 'Filtrer les autres langues',
      dtime: "Délai d'affichage",
      save: 'Sauvez'
    },
    zh: {
      legacy: 'PLEASE RESET YOUR CONFIG!',
      createdby: 'Created by',
      name: 'Name',
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
      total: '总安装量',
      rating: '评级',
      good: '好的',
      ok: '好的',
      bad: '不好',
      created: '创建',
      redirect: '大人的Greasyfork',
      filter: '过滤掉其他语言',
      dtime: '显示超时',
      save: '拯救'
    },
    nl: {
      legacy: 'PLEASE RESET YOUR CONFIG!',
      createdby: 'Created by',
      name: 'Name',
      daily: 'Dagelijkse Installaties',
      close: 'Sluit',
      filterA: 'Filter',
      max: 'Maximaliseer',
      min: 'Minimaliseer',
      search: 'Zoek',
      searcher: 'Titel | Beschrijving | Auteur...',
      install: 'Installeer',
      issue: 'Nieuw Issue',
      version: 'Versie',
      updated: 'Laatste Update',
      total: 'Totale Installaties',
      rating: 'Beoordeling',
      good: 'Goed',
      ok: 'Ok',
      bad: 'Slecht',
      created: 'Aangemaakt',
      redirect: 'Greasy Fork voor volwassenen',
      filter: 'Filter andere talen',
      dtime: 'Weergave timeout',
      save: 'Opslaan'
    }
  };
}
class Task {
  static queue(func, timeout = 5000) {
    if (typeof requestIdleCallback === 'undefined') {
      return setTimeout(func, 1);
    }
    return requestIdleCallback(func, { timeout });
  }

  /**
   * requestIdleCallback or setTimeout w/ Promise
   * @param {number} timeout - Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise object
   */
  static delay(timeout = 5000) {
    return new Promise((resolve) => Task.queue(resolve, timeout));
  }

  static drop(id) {
    if (typeof cancelIdleCallback === 'undefined') {
      return clearTimeout(id);
    }
    return cancelIdleCallback(id);
  }

  static timeout(timeout = 5000) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  static requestAFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
const alang = [];
const defcfg = {
  injection: 'interactive',
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
      enabled: true,
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
  ]
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
      if (isMobile && event === 'click') {
        // event = 'mouseup';
        elem.addEventListener('touchstart', callback);
        // elem.addEventListener('touchend', callback);
        return;
      }
      if (event === 'fclick') {
        event = 'click';
      }
      elem.addEventListener(event, callback, options);
    }
  } catch (ex) {
    err(ex);
  }
};
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
    err(ex);
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
    err(ex);
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
    while (isNull(el.querySelector(selector))) {
      await Task.requestAFrame();
    }
    return el.querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return el;
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
    err(ex);
  }
  return el;
};
/**
 * Inject CSS (Cascading Style Sheet Document) into `document.head`
 * @param { string } css - CSS to inject
 * @param { string } name - (optional) Name of stylesheet `mph-`
 * @param { * } root - (optional) Custom `document.head` path
 * @return { HTMLStyleElement | null } Style element
 */
const loadCSS = (css, name = 'CSS', root = document) => {
  /** @type {Element} */
  let el;
  try {
    if (typeof css !== 'string') {
      throw new Error('[loadCSS] "css" must be a typeof "String"');
    }
    if (typeof name !== 'string') {
      throw new Error('[loadCSS] "name" must be a typeof "String"');
    }
    el = root || document.head;
    // const head = Object.is(root, document.head) ? root : el.querySelector('head') ?? document.head;
    if (isBlank(css)) {
      throw new Error(`[loadCSS] "${name}" contains empty CSS string`);
    }
    // if (!head) {
    //   throw new Error(`[loadCSS] Unable to locate "head", got "${head}"`);
    // }
    for (const s of normalizeTarget(el.querySelectorAll('style[data-role]'))) {
      // if (!s.dataset) {
      //   continue;
      // }
      // if (!s.dataset.role) {
      //   continue;
      // }
      if (Object.is(s.dataset.role, name)) {
        return s;
      }
    }
    const sty = make('style', `mujs-${name}`, {
      textContent: css,
      dataset: {
        insertedBy: 'userscript-plus',
        role: name
      }
    });
    if (!isEmpty(el.shadowRoot)) {
      el.shadowRoot.appendChild(sty);
    } else {
      el.appendChild(sty);
    }
    return sty;
  } catch (ex) {
    err(ex);
  }
  return null;
};
const iconSVG = {
  cfg: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="#ffffff"></path> </g></svg>',
  close:
    '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" fill="#ffffff"></path></g></svg>',
  filter:
    '<svg viewBox="0 0 24 24"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="#ffffff"/> </g></svg>',
  fsClose:
    '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z" fill="#ffffff"></path> <path d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z" fill="#ffffff"></path> <path d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z" fill="#ffffff"></path> <path d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z" fill="#ffffff"></path></g></svg>',
  fsOpen:
    '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z" fill="#ffffff"></path> <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z" fill="#ffffff"></path> <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z" fill="#ffffff"></path> <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z" fill="#ffffff"></path></g></svg>',
  fullscreen:
    '<svg viewBox="0 0 96 96"><g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g></svg>',
  gf: '<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>',
  gh: '<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
  hide: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5L21 10.5C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="#ffffff"></path></g></svg>',
  install:
    '<svg viewBox="0 0 16 16"><g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g></svg>',
  issue:
    '<svg viewBox="0 0 24 24"><path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/></svg>',
  nav: '<svg viewBox="0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="#ffffff"></path> <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="#ffffff"></path> <path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="#ffffff"></path> </g></svg>',
  plus: '<svg viewBox="0 0 24 24"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="#ffffff"/> </g></svg>',
  search:
    '<svg viewBox="0 0 24 24"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill="#ffffff"/> </g></svg>'
};
const Timeout = class {
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
};
/**
 * @template { string } S
 * @param { S } str
 * @param { boolean } lowerCase
 * @returns { S }
 */
const bscStr = (str = '', lowerCase = true) => {
  const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
  return txt.replaceAll(/\W/g, '');
};
const Network = {
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   * @link https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
   * @param { RequestInfo | URL } url - The URL to fetch
   * @param { GM.Request['method'] | Request['method'] } method - Fetch method
   * @param { GM.Request['responseType'] | 'buffer' | 'json' | 'text' | 'blob' | 'document' } responseType - Response type
   * @param { RequestInit | GM.Request | XMLHttpRequest } data - Fetch parameters
   * @param { boolean } useFetch
   * @returns { Promise<Response> } Fetch results
   */
  async req(url, method = 'GET', responseType = 'json', data = {}, useFetch = false) {
    try {
      if (isEmpty(url)) {
        throw new Error('"url" parameter is empty');
      }
      method = bscStr(method, false);
      responseType = bscStr(responseType);
      const params = {
        method,
        ...data
      };
      if (Supports.gm && !useFetch) {
        if (params.credentials) {
          Object.assign(params, {
            anonymous: false
          });
          if (Object.is(params.credentials, 'omit')) {
            Object.assign(params, {
              anonymous: true
            });
          }
          delete params.credentials;
        }
      } else if (params.onprogress) {
        delete params.onprogress;
      }
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
        if (responseType.match(/buffer/i)) {
          fetch(url, params).then(fetchResp).catch(reject);
        } else if (Supports.gm && !useFetch) {
          Network.xmlRequest({
            url,
            responseType,
            ...params,
            onerror: reject,
            onload: (r_1) => {
              if (r_1.status !== 200) reject(new Error(`${r_1.status} ${url}`));
              if (responseType.match(/basic/i)) resolve(r_1);
              resolve(r_1.response);
            }
          });
        } else {
          fetch(url, params).then(fetchResp).catch(reject);
        }
      });
    } catch (ex) {
      return err(ex);
    }
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${Network.sizes[i]}`;
  },
  prog(evt) {
    return Object.is(evt.total, 0)
      ? Network.format(evt.loaded)
      : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  /**
   * @param { GM.Request } details
   * @returns { Promise<void> }
   */
  xmlRequest(details) {
    if (Supports.gm) {
      return GM.xmlHttpRequest(details);
    }
    try {
      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        let method = 'GET';
        let url = 'about:blank';
        let body;
        for (const [key, value] of Object.entries(details)) {
          if (key === 'onload') {
            req.addEventListener('load', () => {
              if (isFN(value)) {
                value(req);
              }
              resolve(req);
            });
          } else if (key === 'onerror') {
            req.addEventListener('error', (evt) => {
              if (isFN(value)) {
                value(evt);
              }
              reject(evt);
            });
          } else if (key === 'onabort') {
            req.addEventListener('abort', (evt) => {
              if (isFN(value)) {
                value(evt);
              }
              reject(evt);
            });
          } else if (key === 'onprogress') {
            req.addEventListener('progress', value);
          } else if (key === 'responseType') {
            if (value.match(/buffer|blob|document|json|text/i)) {
              if (value.match(/buffer/i)) {
                req.responseType = 'arraybuffer';
              } else {
                req.responseType = value;
              }
            }
          } else if (key === 'method') {
            method = value;
          } else if (key === 'url') {
            url = value;
          } else if (key === 'body') {
            body = value;
          }
        }
        req.open(method, url);

        if (isEmpty(req.responseType)) {
          req.responseType = 'text';
        }

        if (body) {
          req.send(body);
        } else {
          req.send();
        }
      });
    } catch (ex) {
      err(ex);
    }
  }
};
/**
 * Get info of script
 * @returns { GM["info"] } Script info
 * @link https://violentmonkey.github.io/api/gm/#gm_info
 */
MU.info = Supports.gm
  ? isFN(GM.info)
    ? GM.info
    : GM_info
  : {
      script: {
        icon: '',
        name: 'Magic Userscript+',
        namespace: 'https://github.com/magicoflolis/Userscript-Plus',
        updateURL: 'https://github.com/magicoflolis/Userscript-Plus/releases',
        version: 'Bookmarklet'
      }
    };

MU.tab = {
  /**
   * Open a new window
   * @param { string } url - URL of webpage to open
   * @param { object } params - GM parameters
   * @returns { WindowProxy | null | void } `GM.openInTab` or `GM_openInTab` with `window.open` as a fallback
   * @link https://violentmonkey.github.io/api/gm/#gm_openintab
   * @link https://developer.mozilla.org/docs/Web/API/Window/open
   */
  open(
    url,
    params = {
      active: true,
      insert: true
    },
    features
  ) {
    if (!Supports.gm && isBlank(params)) {
      params = '_blank';
    }
    if (features) {
      return window.open(url, params, features);
    }
    if (Supports.gm) {
      return isFN(GM.openInTab) ? GM.openInTab(url, params) : GM_openInTab(url, params);
    }
    return window.open(url, params);
  }
};
MU.storage = {
  getItem(key) {
    return window.localStorage.getItem(key);
  },
  has(key) {
    return !isNull(this.getItem(key));
  },
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  /**
   * Set value - Saves key to either GM managed storage or `window.localStorage`
   * @param { string } key - Key to set the value of
   * @param { object } v - Value of key
   * @link https://violentmonkey.github.io/api/gm/#gm_setvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  async setValue(key, v) {
    v = typeof v === 'string' ? v : JSON.stringify(v ?? {});
    if (Supports.gm) {
      let GMType;
      if (isFN(GM.setValue)) {
        GMType = GM.setValue(key, v);
      } else {
        GMType = Promise.resolve(GM_setValue(key, v));
      }
      await GMType;
    } else {
      this.setItem(`MUJS-${key}`, v);
    }
  },
  /**
   * Get Value
   * @link https://violentmonkey.github.io/api/gm/#gm_getvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  async getValue(key, def = {}) {
    try {
      if (Supports.gm) {
        let GMType;
        if (isFN(GM.getValue)) {
          GMType = await GM.getValue(key, JSON.stringify(def));
        } else {
          GMType = GM_getValue(key, JSON.stringify(def));
        }
        return JSON.parse(GMType);
      }
      return this.has(`MUJS-${key}`) ? JSON.parse(this.getItem(`MUJS-${key}`)) : def;
    } catch (ex) {
      err(ex);
    }
  }
};
const Container = class {
  constructor() {
    this.remove = this.remove.bind(this);
    this.onFrameLoad = this.onFrameLoad.bind(this);

    this.ready = false;
    this.supported = isFN(document.createElement('main-userjs').attachShadow);
    if (this.supported) {
      this.frame = make('main-userjs', '', {
        dataset: {
          insertedBy: 'userscript-plus',
          role: 'primary-container'
        }
      });
      this.root = this.frame.attachShadow({ mode: 'open' });
      this.ready = true;
    } else {
      this.frame = make('iframe', 'mujs-iframe', {
        dataset: {
          insertedBy: 'userscript-plus',
          role: 'primary-iframe'
        },
        loading: 'lazy',
        src: 'about:blank',
        style:
          'position: fixed;bottom: 1rem;right: 1rem;height: 525px;width: 90%;margin: 0px 1rem;z-index: 100000000000000020 !important;',
        onload: this.onFrameLoad
      });
    }
    ael(window.self, 'beforeunload', this.remove);
    // info('Container:', this)
  }
  /**
   * @param { Function } callback
   */
  async inject(callback, doc) {
    if (!doc) {
      return;
    }
    while (this.ready === false) {
      await Task.requestAFrame();
    }

    doc.documentElement.appendChild(this.frame);

    if (isFN(callback)) {
      callback.call({}, this.root);
    }
  }

  remove() {
    this.frame.remove();
  }

  onFrameLoad(iFrame) {
    this.root = iFrame.target.contentDocument.documentElement;
    this.ready = true;

    this.root.classList.add('mujs-iframe');
    iFrame.target.contentDocument.body.classList.add('mujs-iframe');
  }
};
const container = new Container();
const sleazyRedirect = () => {
  if (!/greasyfork\.org/.test(window.location.hostname) && cfg.sleazyredirect) {
    return;
  }
  const otherSite = /greasyfork\.org/.test(window.location.hostname) ? 'sleazyfork' : 'greasyfork';
  qs('span.sign-in-link')
    ? /scripts\/\d+/.test(window.location.href)
      ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a'))
        ? window.location.assign(
            window.location.href.replace(
              /\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/,
              '//$1' + otherSite + '.org'
            )
          )
        : false
      : false
    : false;
};
const primaryFN = (injCon) => {
  try {
    //#region Static Elements
    const mujsRoot = make('mujs-root');
    const injectedCore = loadCSS(main_css, 'primary-stylesheet', mujsRoot);
    if (!injectedCore) {
      throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
    }

    // mujsRoot.style.setProperty('--mujs-background-color', '#007ACC');
    // mujsRoot.style.setProperty('--mujs-txt-color', '');

    const table = make('table'); // make('mujs-table')
    const tabbody = make('tbody');
    const tabhead = make('thead');
    const mouseTimeout = new Timeout();
    const main = make('mu-js', 'main hidden', {
      onmouseenter(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.target.style.opacity = '1';
        mouseTimeout.clear(...mouseTimeout.ids);
      },
      onmouseleave: async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const target = evt.target;
        await mouseTimeout.set(1000);
        target.style.opacity = '0.15';
      },
      click(evt) {
        try {
          /** @type { Element } */
          const target = evt.target.closest('[data-command]');
          if (!target) {
            return;
          }
          // dbg('target', target);
          const dataset = target.dataset;
          const cmd = dataset.command;
          if (cmd === 'open-tab' && dataset.webpage) {
            MU.tab.open(dataset.webpage);
          } else if (cmd === 'navigation') {
            if (dom.cl.has(btngreasy, 'hidden')) {
              dom.cl.remove([btngreasy, btnhome, btnissue], 'hidden');
            } else {
              dom.cl.add([btngreasy, btnhome, btnissue], 'hidden');
            }
          } else if (cmd === 'list-description') {
            if (dom.cl.has(target.nextElementSibling, 'hidden')) {
              dom.cl.remove(target.nextElementSibling, 'hidden');
            } else {
              dom.cl.add(target.nextElementSibling, 'hidden');
            }
          } else if (cmd === 'close') {
            container.remove();
          } else if (cmd === 'show-search') {
            dom.cl.toggle(ssearch, 'hidden');
          } else if (cmd === 'show-filter') {
            dom.cl.toggle(fsearch, 'hidden');
          } else if (cmd === 'fullscreen') {
            if (dom.cl.has(btnfullscreen, 'expanded')) {
              dom.cl.remove([btnfullscreen, main], 'expanded');
              dom.prop(btnfullscreen, 'innerHTML', iconSVG.fsOpen);
            } else {
              dom.cl.add([btnfullscreen, main], 'expanded');
              dom.prop(btnfullscreen, 'innerHTML', iconSVG.fsClose);
            }
          } else if (cmd === 'hide-list') {
            dom.cl.add(main, 'hidden');
            dom.cl.remove(mainframe, 'hidden');
            timeoutFrame();
          } else if (cmd === 'save') {
            if (sh('.saveerror')) {
              sh('.saveerror').remove();
            }
            if (!isNull(legacyMsg)) {
              legacyMsg = null;
              MUJS.rebuild = true;
              rateContainer.innerHTML = '';
            }
            if (!dom.prop(target, 'disabled')) {
              MUJS.save();
              sleazyRedirect();
              if (MUJS.rebuild) {
                MUJS.cache.clear();
                buildlist();
              }
              MUJS.unsaved = false;
              MUJS.rebuild = false;
            }
          } else if (cmd === 'reset') {
            cfg = defcfg;
            MUJS.unsaved = true;
            dom.prop(qs('.tarea', target.parentElement.parentElement), 'value', JSON.stringify(cfg.blacklist, null, ' '));
            for (const i of cfg.engines) {
              if (sh(`mu-js.mujs-inlab > [id="${i.name}"]`)) {
                sh(`mu-js.mujs-inlab > [id="${i.name}"]`).checked = i.enabled;
              }
            }
            for (const i of shA('mu-js.mujs-inlab > input[type="checkbox"]')) {
              if (!i.name.match(/((greasy|sleazy)fork|openuserjs|gi(thub|st))/gi)) {
                i.checked = cfg[i.name];
              }
            }
          } else if (cmd === 'settings') {
            if (MUJS.unsaved && !sh('.saveerror')) {
              const txt = make('mujs-row', 'saveerror', {
                innerHTML: 'Unsaved changes'
              });
              countframe.insertAdjacentHTML('afterend', txt.outerHTML.toString());
            }
            if (dom.cl.has(cfgpage, 'hidden')) {
              dom.cl.remove(cfgpage, 'hidden');
              dom.cl.add(tbody, 'hidden');
              dom.cl.add(main, 'auto-height');
              if (!container.supported) {
                dom.attr(container.frame, 'style', 'height: 100%;');
              }
            } else {
              dom.cl.add(cfgpage, 'hidden');
              dom.cl.remove(tbody, 'hidden');
              dom.cl.remove(main, 'auto-height');
              if (!container.supported) {
                dom.attr(container.frame, 'style', '');
              }
            }
            MUJS.rebuild = false;
          }
        } catch (ex) {
          err(ex);
        }
      }
    });
    const tbody = make('mu-js', 'mujs-body');
    const header = make('mu-js', 'mujs-header-prim');
    const cfgpage = make('mujs-row', 'mujs-cfg hidden');
    const countframe = make('mujs-column');
    const btnframe = make('mujs-column');
    const btnHandles = make('mujs-column', 'btn-handles');
    const gfcounter = make('count-frame', '', {
      title: 'https://greasyfork.org + https://sleazyfork.org',
      // style: 'background: #00b7ff;'
    });
    const sfcounter = make('count-frame', '', {
      title: 'https://openuserjs.org',
      // style: 'background: #ed3f14;'
    });
    const fsearch = make('mujs-btn', 'hidden');
    const ssearch = make('mujs-btn', 'hidden');
    const mainbtn = make('count-frame', 'mainbtn', {
      innerHTML: '0'
    });
    const rateContainer = make('mujs-column', 'rate-container');
    //#endregion

    const template = {
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
    };
    const ContainerHandler = class {
      constructor() {
        this.showError = this.showError.bind(this);
        this.cleanup = this.cleanup.bind(this);

        this.cache = new Map();
        this.host = location.hostname.split('.').splice(-2).join('.');
        this.site = window.top.document.location.href;
        this.unsaved = false;
        this.isBlacklisted = false;
        this.switchRows = true;
        this.rebuild = false;
        this.siteujs = [];
        this.forkCount = 0;
        this.customCount = 0;

        ael(window.self, 'beforeunload', this.cleanup);
      }

      checkBlacklist() {
        for (const b of cfg.blacklist.filter((b) => b.enabled)) {
          if (b.regex === true) {
            const reg = new RegExp(b.url, b.flags);
            if (!reg.test(this.site)) continue;
            this.isBlacklisted = true;
          }
          if (Array.isArray(b.url)) {
            for (const c of b.url) {
              if (!this.site.includes(c)) continue;
              this.isBlacklisted = true;
            }
          }
          if (!this.site.includes(b.url)) continue;
          this.isBlacklisted = true;
        }
        if (this.isBlacklisted) {
          this.showError('Blacklisted');
          timeoutFrame();
        }
        return this.isBlacklisted;
      }

      addCustomCnt(cnt) {
        this.customCount += cnt;
        this.updateCounters();
      }

      addForkCnt(cnt) {
        this.forkCount += cnt;
        this.updateCounters();
      }

      updateCounters() {
        sfcounter.innerHTML = this.customCount;
        gfcounter.innerHTML = this.forkCount;
        mainbtn.innerHTML = this.customCount + this.forkCount;
      }

      save() {
        this.unsaved = false;
        MU.storage.setValue('Config', cfg);
        info('Saved:', cfg);
      }

      showError(ex) {
        err(ex);
        const txt = make('mujs-row', 'error', {
          innerHTML: `ERROR: ${typeof ex === 'string' ? ex : `${ex.message} ${ex.stack}`}`
        });
        tbody.prepend(txt);
      }

      refresh() {
        this.siteujs.length = 0;
        this.forkCount = 0;
        this.customCount = 0;
        this.updateCounters();
        tabbody.innerHTML = '';
        rateContainer.innerHTML = '';
        if (sh('.error')) {
          sh('.error').remove();
        }
      }

      cleanup() {
        this.cache.clear();
      }
    };
    const MUJS = new ContainerHandler();
    const timeout = new Timeout();
    const timeoutFrame = async () => {
      timeout.clear(...timeout.ids);
      if (dom.cl.has(mainframe, 'hidden')) {
        return;
      }
      if (typeof cfg.time === 'number' && !Number.isNaN(cfg.time)) {
        await timeout.set(MUJS.isBlacklisted ? cfg.time / 2 : cfg.time);
      } else {
        await timeout.set(10000)
      }
      container.remove();
      return timeout.clear(...timeout.ids);
    };
    const sh = (elem) => injCon.querySelector(elem);
    const shA = (elem) => injCon.querySelectorAll(elem);
    const sortRowBy = (cellIndex) => {
      const rows = normalizeTarget(tabbody.rows).sort((tr1, tr2) => {
        const t1cell = tr1.cells[cellIndex];
        const t2cell = tr2.cells[cellIndex];
        const tr1Text = (t1cell.firstElementChild ?? t1cell).textContent;
        const tr2Text = (t2cell.firstElementChild ?? t2cell).textContent;
        const t1pDate = Date.parse(tr1Text);
        const t2pDate = Date.parse(tr2Text);
        if (!isNaN(t1pDate) && !isNaN(t2pDate)) {
          return +new Date(t1pDate) - +new Date(t2pDate);
        }
        if (+tr1Text && +tr2Text) {
          return tr1Text - tr2Text;
        }
        return tr1Text.localeCompare(tr2Text);
      });
      if (MUJS.switchRows) {
        rows.reverse();
      }
      MUJS.switchRows = !MUJS.switchRows;
      tabbody.append(...rows);
    };
    const createjs = (ujs, issleazy) => {
      for (const key in template) {
        if (hasOwn(ujs, key)) continue;
        ujs[key] = template[key];
      }
      const eframe = make('td', 'install-btn');
      const uframe = make('td', 'mujs-uframe');
      const fdaily = make('td', 'mujs-list', {
        innerHTML: ujs.daily_installs
      });
      const fupdated = make('td', 'mujs-list', {
        innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at))
      });
      const fname = make('td', 'mujs-name');
      const ftitle = make('mujs-a', 'mujs-homepage', {
        title: ujs.name,
        innerHTML: ujs.name,
        dataset: {
          command: 'open-tab',
          webpage: ujs.url
        }
      });
      const fver = make('mu-js', 'mujs-list', {
        innerHTML: `${lang.version}: ${ujs.version}`
      });
      const fcreated = make('mu-js', 'mujs-list', {
        innerHTML: `${lang.created}: ${new Intl.DateTimeFormat(navigator.language).format(
          new Date(ujs.created_at)
        )}`
      });
      const fmore = make('mujs-column', 'mujs-list hidden');
      const ftotal = make('mu-js', 'mujs-list', {
        innerHTML: `${lang.total}: ${ujs.total_installs}`
      });
      const fratings = make('mu-js', 'mujs-list', {
        title: lang.rating,
        innerHTML: `${lang.rating}:`
      });
      const fgood = make('mu-js', 'mujs-list mujs-ratings', {
        title: lang.good,
        innerHTML: ujs.good_ratings,
        style:
          'border-color: rgb(51, 155, 51); background-color: #339b331a; color: rgb(51, 255, 51);'
      });
      const fok = make('mu-js', 'mujs-list mujs-ratings', {
        title: lang.ok,
        innerHTML: ujs.ok_ratings,
        style:
          'border-color: rgb(155, 155, 0); background-color: #9b9b001a; color: rgb(255, 255, 0);'
      });
      const fbad = make('mu-js', 'mujs-list mujs-ratings', {
        title: lang.bad,
        innerHTML: ujs.bad_ratings,
        style: 'border-color: rgb(155, 0, 0); background-color: #9b33331a; color: rgb(255, 0, 0);'
      });
      const fdesc = make('mu-js', 'mujs-list mujs-pointer', {
        title: ujs.description,
        innerHTML: ujs.description,
        dataset: {
          command: 'list-description'
        }
      });
      const fdwn = make('mu-jsbtn', 'install', {
        title: `${lang.install} { ${ujs.name} }`,
        innerHTML: `${iconSVG.install} ${lang.install}`,
        dataset: {
          command: 'open-tab',
          webpage: ujs.code_url
        }
      });
      for (const u of ujs.users) {
        const user = make('mujs-a', 'mujs-euser', {
          innerHTML: u.name,
          dataset: {
            command: 'open-tab',
            webpage: u.url
          }
        });
        uframe.append(user);
      }
      eframe.append(fdwn);
      fmore.append(ftotal, fratings, fgood, fok, fbad, fver, fcreated);
      fname.append(ftitle, fdesc, fmore);
      const tr = make('tr', `frame${issleazy ? ' sf' : ''}`);
      for (const e of [fname, uframe, fdaily, fupdated, eframe]) {
        tr.append(e);
      }
      tabbody.append(tr);
    };
    if (navigator.languages.length > 0) {
      for (const nlang of navigator.languages) {
        const lg = nlang.split('-')[0];
        if (alang.indexOf(lg) === -1) {
          alang.push(lg);
        }
      }
    }
    const makerow = (desc, type, nm, attrs = {}) => {
      const sec = make('mujs-section', '', {
        style: !Supports.gm && nm === 'cache' ? 'display: none;' : ''
      });
      const lb = make('label');
      const divDesc = make('mu-js', '', {
        innerHTML: desc
      });
      lb.append(divDesc);
      sec.append(lb);
      cfgpage.append(sec);
      if (isNull(type)) {
        return sec;
      }
      const inp = make(
        'input',
        '',
        setObj(
          {
            type,
            id: nm,
            name: nm
          },
          attrs
        )
      );
      if (type === 'checkbox') {
        const inlab = make('mu-js', 'mujs-inlab');
        const la = make('label', '', {
          click() {
            inp.dispatchEvent(new MouseEvent('click'));
          }
        });
        inlab.append(inp, la);
        lb.append(inlab);
        if (/(greasy|sleazy)fork|openuserjs|gi(thub|st)/gi.test(nm)) {
          for (const i of cfg.engines) {
            if (i.name !== nm) continue;
            inp.checked = i.enabled;
            ael(inp, 'change', (e) => {
              MUJS.unsaved = true;
              i.enabled = e.target.checked;
            });
          }
        } else {
          inp.checked = cfg[nm];
          ael(inp, 'change', (e) => {
            MUJS.unsaved = true;
            if (/filterlang/i.test(nm)) {
              MUJS.rebuild = true;
            }
            cfg[nm] = e.target.checked;
          });
        }
      } else {
        lb.append(inp);
      }
      return inp;
    };
    //#region Build List
    const buildlist = async (host) => {
      try {
        if (isEmpty(host)) {
          host = MUJS.host;
        }
        MUJS.refresh();
        if (MUJS.checkBlacklist()) return;
        const template = {};
        for (const engine of cfg.engines) {
          template[engine.name] = [];
        }
        const engines = cfg.engines.filter((e) => e.enabled);
        if (!MUJS.cache.has(host)) {
          MUJS.cache.set(host, template);
        }
        const cache = MUJS.cache.get(host);
        const customRecords = [];
        const rateFN = (data) => {
          try {
            for (const [key, value] of Object.entries(data.resources.code_search)) {
              const txt = make('mujs-row', 'rate-info', {
                innerHTML: `${key.toUpperCase()}: ${value}`
              });
              rateContainer.append(txt);
            }
          } catch (ex) {
            MUJS.showError(ex);
          }
        };
        info('Building list', { cache, MUJS, engines });
        if (!isNull(legacyMsg)) {
          const txt = make('mujs-row', 'legacy-config', {
            innerHTML: legacyMsg
          });
          rateContainer.append(txt);
          return;
        }
        for (const engine of engines) {
          const forkFN = async (data) => {
            if (!data) return;
            const hideData = [];
            const filterLang = data.filter((d) => {
              if (d.deleted) {
                return false;
              }
              if (!cfg.filterlang) {
                return true;
              }
              const dlocal = d.locale.split('-')[0] ?? d.locale;
              if (alang.length > 1) {
                for (const a of alang) {
                  if (dlocal.includes(a)) {
                    return true;
                  }
                }
              } else if (dlocal.includes(Language.navLang)) {
                return true;
              }
              hideData.push(d);
              return false;
            });
            let finalList = filterLang;

            if (hideData.length > 0) {
              const hds = [];
              for (const h of hideData) {
                const txt = await Network.req(h.code_url, 'GET', 'text').catch(MUJS.showError);
                const headers = txt.match(/\/\/\s@[\w][\s\S]+/g) || [];
                if (headers.length > 0) {
                  const regName = new RegExp(`// @name:${Language.navLang}\\s+.+`, 'gi');
                  const findName = (regName.exec(headers[0]) ?? []).join('');
                  if (isEmpty(findName)) {
                    continue;
                  }
                  const cReg = new RegExp(`// @name:${Language.navLang}\\s+`, 'gi');
                  const cutName = findName.replace(cReg, '');
                  Object.assign(h, {
                    name: cutName
                  });
                  const regDesc = new RegExp(`// @description:${Language.navLang}\\s+.+`, 'gi');
                  const findDesc = (regDesc.exec(headers[0]) ?? []).join('');
                  if (isEmpty(findDesc)) {
                    continue;
                  }
                  Object.assign(h, {
                    description: findDesc.replace(
                      new RegExp(`// @description:${Language.navLang}\\s+`, 'gi'),
                      ''
                    )
                  });
                  hds.push(h);
                }
              }
              finalList = [...new Set([...hds, ...filterLang])];
            }
            for (const ujs of finalList) {
              MUJS.siteujs.push(ujs);
              createjs(ujs, false);
            }
            cache[engine.name].push(...finalList);
            MUJS.addForkCnt(finalList.length);
          };
          const customFN = async (data) => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            const selected = htmlDocument.documentElement;
            if (qs('.col-sm-8 .tr-link', selected)) {
              dbg('.col-sm-8 .tr-link', qsA('.col-sm-8 .tr-link', selected));
              for (const i of qsA('.col-sm-8 .tr-link', selected)) {
                await query('.script-version', i);
                const fixurl = qs('.tr-link-a', i).href.replace(
                  new RegExp(document.location.origin, 'gi'),
                  'https://openuserjs.org'
                );
                const layout = {
                  name: qs('.tr-link-a', i).textContent,
                  description: qs('p', i).textContent,
                  version: qs('.script-version', i).textContent,
                  url: fixurl,
                  code_url: `${fixurl.replace(/\/scripts/gi, '/install')}.user.js`,
                  total_installs: qs('td:nth-child(2) p', i).textContent,
                  created_at: qs('td:nth-child(4) time', i).getAttribute('datetime'),
                  code_updated_at: qs('td:nth-child(4) time', i).getAttribute('datetime'),
                  users: [
                    {
                      name: qs('.inline-block a', i).textContent,
                      url: qs('.inline-block a', i).href
                    }
                  ]
                };
                createjs(layout, true);
                // MUJS.addCustomCnt(1)
                customRecords.push(layout);
              }
            }
            if (qs('div.gist-snippet', selected)) {
              dbg('div.gist-snippet', qsA('div.gist-snippet', selected));
              for (const g of qsA('div.gist-snippet', selected)) {
                if (qs('span > a:nth-child(2)', g).textContent.includes('.user.js')) {
                  const fixurl = qs('span > a:nth-child(2)', g).href.replace(
                    new RegExp(document.location.origin, 'gi'),
                    'https://gist.github.com'
                  );
                  const layout = {};
                  Object.assign(layout, {
                    url: fixurl,
                    code_url: `${fixurl}/raw/${qs('span > a:nth-child(2)', g).textContent}`,
                    created_at: qs('time-ago.no-wrap', g).getAttribute('datetime'),
                    users: [
                      {
                        name: qs('span > a[data-hovercard-type]', g).textContent,
                        url: qs('span > a[data-hovercard-type]', g).href.replace(
                          new RegExp(document.location.origin, 'gi'),
                          'https://gist.github.com'
                        )
                      }
                    ]
                  });
                  for (const i of qsA('.file-box table tr .blob-code', g)) {
                    const txt = i.textContent;
                    const headers = txt.match(/\/\/\s@[\w][\s\S]+/gi) || [];
                    if (headers.length > 0) {
                      const crop = headers[0].split(
                        /\/\/\s@(name|description|author|version)\s+/gi
                      );
                      if (headers[0].includes('@name') && !headers[0].includes('@namespace')) {
                        Object.assign(layout, {
                          name: crop[2].trim()
                        });
                      }
                      if (headers[0].includes('@description')) {
                        Object.assign(layout, {
                          description: crop[2].trim()
                        });
                      }
                      if (headers[0].includes('@version')) {
                        Object.assign(layout, {
                          version: crop[2].trim()
                        });
                      }
                    }
                  }
                  createjs(layout, true);
                  // MUJS.addCustomCnt(1)
                  customRecords.push(layout);
                }
              }
            }
            cache[engine.name].push(...customRecords);
            MUJS.addCustomCnt(customRecords.length);
          };
          const gitFN = async (data) => {
            try {
              if (isBlank(data.items)) return;
              for (const r of data.items) {
                const layout = {
                  name: r.name,
                  description: isEmpty(r.repository.description)
                    ? 'No Description'
                    : r.repository.description,
                  url: r.html_url,
                  code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
                  code_updated_at: Date.now(), // r.commit
                  total_installs: r.score,
                  users: [
                    {
                      name: r.repository.owner.login,
                      url: r.repository.owner.html_url
                    }
                  ]
                };
                createjs(layout, true);
                customRecords.push(layout);
              }
              MUJS.addCustomCnt(data.items.length);
              cache[engine.name].push(...customRecords);
            } catch (ex) {
              MUJS.showError(ex);
            }
          };
          const eURL = engine.url;
          const cEngine = cache[`${engine.name}`];
          if (engine.name.match(/fork/gi)) {
            if (!isEmpty(cEngine)) {
              for (const ujs of cEngine) {
                createjs(ujs, false);
              }
              MUJS.addForkCnt(cEngine.length);
              continue;
            }

            if (cfg.filterlang) {
              if (alang.length > 1) {
                for (const a of alang) {
                  Network.req(`${eURL}/${a}/scripts/by-site/${host}.json?page=1`)
                    .then(forkFN)
                    .catch(MUJS.showError);
                }
                continue;
              }
              Network.req(`${eURL}/${Language.navLang}/scripts/by-site/${host}.json?page=1`)
                .then(forkFN)
                .catch(MUJS.showError);
              continue;
            }
            Network.req(`${eURL}/scripts/by-site/${host}.json`).then(forkFN).catch(MUJS.showError);
          } else if (engine.name.match(/(openuserjs|github)/gi)) {
            if (!isEmpty(cEngine)) {
              for (const ujs of cEngine) {
                createjs(ujs, true);
              }
              MUJS.addCustomCnt(cEngine.length);
              continue;
            }
            if (/github/gi.test(engine.name)) {
              Network.req(
                `${eURL}"// ==UserScript=="+${host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`,
                'GET',
                'json',
                {
                  headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${engine.token}`,
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                }
              )
                .then(gitFN)
                .then(() => {
                  Network.req('https://api.github.com/rate_limit', 'GET', 'json', {
                    headers: {
                      Accept: 'application/vnd.github+json',
                      Authorization: `Bearer ${engine.token}`,
                      'X-GitHub-Api-Version': '2022-11-28'
                    }
                  })
                    .then(rateFN)
                    .catch(MUJS.showError);
                })
                .catch(MUJS.showError);
            } else {
              Network.req(`${eURL}${host}`, 'GET', 'text').then(customFN).catch(MUJS.showError);
            }
          }
        }
        sortRowBy(2);
      } catch (ex) {
        MUJS.showError(ex);
      }
    };
    //#endregion
    //#region Make Config
    const makecfg = () => {
      makerow('Sync with GM', 'checkbox', 'cache');
      makerow('Auto Fullscreen', 'checkbox', 'autoexpand', {
        onchange(e) {
          if (e.target.checked) {
            btnfullscreen.classList.add('expanded');
            main.classList.add('expanded');
            btnfullscreen.innerHTML = iconSVG.fsClose;
          } else {
            btnfullscreen.classList.remove('expanded');
            main.classList.remove('expanded');
            btnfullscreen.innerHTML = iconSVG.fsOpen;
          }
        }
      });
      makerow(lang.redirect, 'checkbox', 'sleazyredirect');
      makerow(lang.filter, 'checkbox', 'filterlang');
      makerow('Greasy Fork', 'checkbox', 'greasyfork');
      makerow('Sleazy Fork', 'checkbox', 'sleazyfork');
      makerow('Open UserJS', 'checkbox', 'openuserjs');
      makerow('GitHub API', 'checkbox', 'github');
      const ghAPI = cfg.engines.find((c) => c.name === 'github');
      makerow('GitHub API (Token)', 'password', 'github', {
        defaultValue: '',
        value: ghAPI.token ?? '',
        placeholder: 'Paste Access Token',
        onchange(e) {
          MUJS.unsaved = true;
          MUJS.rebuild = true;
          if (isNull(legacyMsg)) {
            ghAPI.token = e.target.value;
          }
        }
      });
      makerow(`${lang.dtime} (ms)`, 'number', 'time', {
        defaultValue: 10000,
        value: cfg.time,
        min: 0,
        step: 500,
        onbeforeinput(e) {
          if (e.target.validity.badInput) {
            dom.cl.add(e.target, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', true);
          } else {
            dom.cl.remove(e.target, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', false);
          }
        },
        oninput(e) {
          MUJS.unsaved = true;
          const t = e.target;
          if (t.validity.badInput || (t.validity.rangeUnderflow && t.value !== '-1')) {
            dom.cl.add(t, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', true);
          } else {
            dom.cl.remove(t, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', false);
            cfg.time = isEmpty(t.value) ? cfg.time : parseFloat(t.value);
          }
        }
      });
      const cbtn = make('mu-js', 'mujs-sty-flex');
      const savebtn = make('mujs-btn', 'save', {
        disabled: false,
        innerHTML: lang.save,
        dataset: {
          command: 'save'
        }
      });
      const txta = make('textarea', 'tarea', {
        name: 'blacklist',
        id: 'blacklist',
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft',
        value: JSON.stringify(cfg.blacklist, null, ' '),
        oninput(e) {
          let isvalid = true;
          try {
            cfg.blacklist = JSON.parse(e.target.value);
            isvalid = true;
          } catch (ex) {
            err(ex);
            isvalid = false;
          } finally {
            if (isvalid) {
              dom.cl.remove(e.target, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', false);
            } else {
              dom.cl.add(e.target, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', true);
            }
          }
        }
      });
      const resetbtn = make('mujs-btn', 'reset', {
        innerHTML: 'Reset',
        dataset: {
          command: 'reset'
        }
      });
      cbtn.append(resetbtn, savebtn);
      cfgpage.append(txta, cbtn);
    };
    //#endregion
    const makeTHead = (rows) => {
      const tr = make('tr');
      for (const r of normalizeTarget(rows)) {
        const tparent = make('th', r.class ?? '', r);
        tr.append(tparent);
      }
      tabhead.append(tr);
      table.append(tabhead, tabbody);
    };
    const btnHide = make('mujs-btn', 'hide-list', {
      title: lang.min,
      innerHTML: iconSVG.hide,
      dataset: {
        command: 'hide-list'
      }
    });
    const btnfullscreen = make('mujs-btn', 'fullscreen', {
      title: lang.max,
      innerHTML: iconSVG.fullscreen,
      dataset: {
        command: 'fullscreen'
      }
    });
    const mainframe = make('mu-js', 'mainframe', {
      onmouseleave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.target.style.opacity = '0.15';
        timeoutFrame();
      },
      onmouseenter(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.target.style.opacity = '1';
        timeout.clear(...timeout.ids);
      },
      click(e) {
        e.preventDefault();
        timeout.clear(...timeout.ids);
        dom.cl.remove(main, 'hidden');
        dom.cl.add(mainframe, 'hidden');
        if (cfg.autoexpand) {
          dom.cl.add([btnfullscreen, main], 'expanded');
          dom.prop(btnfullscreen, 'innerHTML', iconSVG.fsClose);
        }
      }
    });
    const filterList = make('input', 'mujs-fltlist', {
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: lang.searcher,
      oninput(e) {
        e.preventDefault();
        if (isEmpty(e.target.value)) {
          for (const ujs of shA('tr.frame')) {
            ujs.classList.remove('hidden');
          }
          return;
        }
        const reg = new RegExp(e.target.value, 'gi');
        for (const ujs of shA('tr.frame')) {
          const m = ujs.children[0];
          const n = ujs.children[1];
          const final = m.textContent.match(reg) || n.textContent.match(reg) || [];
          if (final.length === 0) {
            ujs.classList.add('hidden');
          } else {
            ujs.classList.remove('hidden');
          }
        }
      }
    });
    const filterBtn = make('mujs-btn', 'filter', {
      title: lang.filterA,
      innerHTML: iconSVG.filter,
      dataset: {
        command: 'show-filter'
      }
    });
    const siteSearcher = make('input', 'mujs-searcher', {
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: MUJS.host,
      onchange(e) {
        e.preventDefault();
        buildlist(e.target.value);
      }
    });
    const siteSearchbtn = make('mujs-btn', 'search', {
      title: lang.search,
      innerHTML: iconSVG.search,
      dataset: {
        command: 'show-search'
      }
    });
    const closebtn = make('mujs-btn', 'close', {
      title: lang.close,
      innerHTML: iconSVG.close,
      dataset: {
        command: 'close'
      }
    });
    const btncfg = make('mujs-btn', 'settings', {
      title: 'Settings',
      innerHTML: iconSVG.cfg,
      dataset: {
        command: 'settings'
      }
    });
    const btnhome = make('mujs-btn', 'github hidden', {
      title: `GitHub (v${
        MU.info.script.version.includes('.') || MU.info.script.version.includes('Book')
          ? MU.info.script.version
          : MU.info.script.version.slice(0, 5)
      })`,
      innerHTML: iconSVG.gh,
      dataset: {
        command: 'open-tab',
        webpage: 'https://github.com/magicoflolis/Userscript-Plus'
      }
    });
    const btnissue = make('mujs-btn', 'issue hidden', {
      title: lang.issue,
      innerHTML: iconSVG.issue,
      dataset: {
        command: 'open-tab',
        webpage: 'https://github.com/magicoflolis/Userscript-Plus/issues/new'
      }
    });
    const btngreasy = make('mujs-btn', 'greasy hidden', {
      title: 'Greasy Fork',
      innerHTML: iconSVG.gf,
      dataset: {
        command: 'open-tab',
        webpage: 'https://greasyfork.org/scripts/421603'
      }
    });
    const btnnav = make('mujs-btn', 'nav', {
      title: 'Navigation',
      innerHTML: iconSVG.nav,
      dataset: {
        command: 'navigation'
      }
    });
    countframe.append(gfcounter, sfcounter);
    fsearch.append(filterList);
    ssearch.append(siteSearcher);
    btnHandles.append(btnHide, btnfullscreen, closebtn);
    btnframe.append(
      fsearch,
      filterBtn,
      ssearch,
      siteSearchbtn,
      btncfg,
      btnissue,
      btnhome,
      btngreasy,
      btnnav,
      btnHandles
    );
    header.append(countframe, rateContainer, btnframe);
    tbody.append(table);

    makeTHead([
      {
        class: 'mujs-header-name',
        textContent: lang.name
      },
      {
        textContent: lang.createdby
      },
      {
        textContent: lang.daily
      },
      {
        textContent: lang.updated
      },
      {
        textContent: lang.install
      }
    ]);

    for (const th of tabhead.rows[0].cells) {
      if (dom.text(th) === lang.install) continue;
      dom.cl.add(th, 'mujs-pointer');
      ael(th, 'click', () => {
        sortRowBy(th.cellIndex);
      });
    }
    main.append(header, tbody, cfgpage);
    mainframe.append(mainbtn);
    mujsRoot.append(mainframe, main);
    injCon.append(mujsRoot);
    makecfg();
    buildlist().then(timeoutFrame);
  } catch (ex) {
    err(ex);
  }
};
/**
 * @param { Function } callback
 * @returns { null | true }
 */
const loadDOM = (callback) => {
  if (!isFN(callback)) {
    return null;
  }
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    callback.call({}, document);
  }
  document.addEventListener('DOMContentLoaded', (evt) => callback.call({}, evt.target), {
    once: true
  });
  return true;
};
const Setup = async () => {
  try {
    cfg = setObj(defcfg, await MU.storage.getValue('Config'));
    lang = Language.cache;
    info('Config:', cfg);
    loadDOM((doc) => {
      if (window.location === null) {
        return;
      }
      if (doc === null) {
        return;
      }
      sleazyRedirect();
      container.inject(primaryFN, doc);
    });
  } catch (ex) {
    err(ex);
  }
};
if (typeof userjs === 'object' && userjs.UserJS && window && window.self === window.top) {
  Setup();
}
