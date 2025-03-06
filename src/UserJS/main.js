// #region Console
const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cMagic Userscript+%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cMagic Userscript+%c] %cERROR',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  const a = typeof alert !== 'undefined' && alert;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex && a) {
      a(`[Magic Userscript+] (${ex.cause}) ${ex.message}`);
    }
  }
};
const info = (...msg) => {
  console.info(
    '[%cMagic Userscript+%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};
const log = (...msg) => {
  console.log(
    '[%cMagic Userscript+%c] %cLOG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(219, 160, 73);',
    ...msg
  );
};
// #endregion

/**
 * @type { import("../typings/types.d.ts").config }
 */
let cfg = {};

// #region Validators
/**
 * @type { import("../typings/types.d.ts").objToStr }
 */
const objToStr = (obj) => Object.prototype.toString.call(obj);
/**
 * @type { import("../typings/types.d.ts").isRegExp }
 */
const isRegExp = (obj) => {
  const s = objToStr(obj);
  return s.includes('RegExp');
};
/**
 * @type { import("../typings/types.d.ts").isElem }
 */
const isElem = (obj) => {
  const s = objToStr(obj);
  return s.includes('Element');
};
/**
 * @type { import("../typings/types.d.ts").isObj }
 */
const isObj = (obj) => {
  const s = objToStr(obj);
  return s.includes('Object');
};
/**
 * @type { import("../typings/types.d.ts").isFN }
 */
const isFN = (obj) => {
  const s = objToStr(obj);
  return s.includes('Function');
};
/**
 * @type { import("../typings/types.d.ts").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("../typings/types.d.ts").isBlank }
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
 * @type { import("../typings/types.d.ts").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
// #endregion

// #region Globals
/**
 * https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/global-this.js
 * @returns {typeof globalThis}
 */
function globalWin() {
  const check = function (it) {
    return it && it.Math === Math && it;
  };
  return (
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof this == 'object' && this) ||
    (function () {
      return this;
    })() ||
    Function('return this')()
  );
}
/** @type { import("../typings/UserJS.d.ts").safeSelf } */
function safeSelf() {
  if (userjs.safeSelf) {
    return userjs.safeSelf;
  }
  const g = globalWin();
  /** @type { import("../typings/UserJS.d.ts").safeHandles } */
  const safe = {
    XMLHttpRequest: g.XMLHttpRequest,
    CustomEvent: g.CustomEvent,
    createElement: g.document.createElement.bind(g.document),
    createElementNS: g.document.createElementNS.bind(g.document),
    createTextNode: g.document.createTextNode.bind(g.document),
    setTimeout: g.setTimeout,
    clearTimeout: g.clearTimeout,
    navigator: g.navigator,
    scheduler: {
      postTask(callback, options) {
        if ('scheduler' in g && 'postTask' in g.scheduler) {
          return g.scheduler.postTask(callback, options);
        }

        options = Object.assign({}, options);

        if (options.delay === undefined) options.delay = 0;
        options.delay = Number(options.delay);
        if (options.delay < 0) {
          return Promise.reject(new TypeError('"delay" must be a positive number.'));
        }
        return new Promise((resolve) => {
          g.setTimeout(() => {
            resolve(callback());
          }, options.delay);
        });
      },
      yield() {
        if ('scheduler' in g && 'yield' in g.scheduler) {
          scheduler.yield();
          return g.scheduler.yield();
        }
        return new Promise((resolve) => {
          g.setTimeout(resolve, 0);
        });
      }
    }
  };
  for (const [k, v] of Object.entries(safe)) {
    if (k === 'scheduler') {
      continue;
    } else if (k === 'navigator') {
      continue;
    } else if (isFN(v)) {
      continue;
    }
    err({ message: `Safe handles "${k}" returned "${v}"`, cause: 'safeSelf' });
  }
  userjs.safeSelf = safe;
  return userjs.safeSelf;
}
// #endregion

const BLANK_PAGE = 'about:blank';
// Lets highlight me :)
const authorID = 166061;
/**
 * Some UserJS I personally enjoy - `https://greasyfork.org/scripts/{{id}}`
 */
const goodUserJS = [
  33005,
  394820,
  438684,
  4870,
  394420,
  25068,
  483444,
  1682,
  22587,
  789,
  28497,
  386908,
  24204,
  404443,
  4336,
  368183,
  393396,
  473830,
  12179,
  423001,
  376510,
  23840,
  40525,
  6456,
  'https://openuserjs.org/install/Patabugen/Always_Remember_Me.user.js',
  'https://openuserjs.org/install/nokeya/Direct_links_out.user.js',
  'https://github.com/jijirae/y2monkey/raw/main/y2monkey.user.js',
  'https://github.com/jijirae/r2monkey/raw/main/r2monkey.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js',
  'https://github.com/jesus2099/konami-command/raw/master/INSTALL-USER-SCRIPT.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.user.js'
];
/** Remove UserJS from banned accounts */
const badUserJS = [478597];
/** Unsupport host for search engines */
const engineUnsupported = {
  greasyfork: ['pornhub.com'],
  sleazyfork: ['pornhub.com'],
  openuserjs: [],
  github: []
};
const getUAData = () => {
  if (userjs.isMobile !== undefined) {
    return userjs.isMobile;
  }
  try {
    const { navigator } = safeSelf();
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
const isGM = typeof GM !== 'undefined';
const builtinList = {
  local: /localhost|router|gov|(\d+\.){3}\d+/,
  finance:
    /school|pay|bank|money|cart|checkout|authorize|bill|wallet|venmo|zalo|skrill|bluesnap|coin|crypto|currancy|insurance|finance/,
  social: /login|join|signin|signup|sign-up|password|reset|password_reset/,
  unsupported: {
    host: 'fakku.net',
    pathname: '/hentai/.+/read/page/.+'
  }
};
// #region DEFAULT_CONFIG
/**
 * @type { import("../typings/types.d.ts").config }
 */
const DEFAULT_CONFIG = {
  autofetch: true,
  autoinject: true,
  autoSort: 'daily_installs',
  clearTabCache: true,
  cache: true,
  autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  time: 10000,
  blacklist: ['userjs-local', 'userjs-finance', 'userjs-social', 'userjs-unsupported'],
  preview: {
    code: false,
    metadata: false
  },
  engines: [
    {
      enabled: true,
      name: 'greasyfork',
      query: encodeURIComponent('https://greasyfork.org/scripts/by-site/{host}.json?language=all')
    },
    {
      enabled: false,
      name: 'sleazyfork',
      query: encodeURIComponent('https://sleazyfork.org/scripts/by-site/{host}.json?language=all')
    },
    {
      enabled: false,
      name: 'openuserjs',
      query: encodeURIComponent('https://openuserjs.org/?q={host}')
    },
    {
      enabled: false,
      name: 'github',
      token: '',
      query: encodeURIComponent(
        'https://api.github.com/search/code?q="// ==UserScript=="+{host}+ "// ==/UserScript=="+in:file+language:js&per_page=30'
      )
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
  },
  filters: {
    ASCII: {
      enabled: false,
      name: 'Non-ASCII',
      regExp: '[^\\x00-\\x7F\\s]+'
    },
    Latin: {
      enabled: false,
      name: 'Non-Latin',
      regExp: '[^\\u0000-\\u024F\\u2000-\\u214F\\s]+'
    },
    Games: {
      enabled: false,
      name: 'Games',
      flag: 'iu',
      regExp:
        'Aimbot|AntiGame|Agar|agar\\.io|alis\\.io|angel\\.io|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Balz|Blah Blah|Orc Clan Script|Astro\\s*Empires|^\\s*Attack|^\\s*Battle|BiteFight|Blood\\s*Wars|Bloble|Bonk|Bots|Bots4|Brawler|\\bBvS\\b|Business\\s*Tycoon|Castle\\s*Age|City\\s*Ville|chopcoin\\.io|Comunio|Conquer\\s*Club|CosmoPulse|cursors\\.io|Dark\\s*Orbit|Dead\\s*Frontier|Diep\\.io|\\bDOA\\b|doblons\\.io|DotD|Dossergame|Dragons\\s*of\\s*Atlantis|driftin\\.io|Dugout|\\bDS[a-z]+\\n|elites\\.io|Empire\\s*Board|eRep(ublik)?|Epicmafia|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\\s*Ville|Ghost\\s*Trapper|Gladiatus|Goalline|Gondal|gota\\.io|Grepolis|Hobopolis|\\bhwm(\\b|_)|Ikariam|\\bIT2\\b|Jellyneo|Kapi\\s*Hospital|Kings\\s*Age|Kingdoms?\\s*of|knastv(o|oe)gel|Knight\\s*Fight|\\b(Power)?KoC(Atta?ck)?\\b|\\bKOL\\b|Kongregate|Krunker|Last\\s*Emperor|Legends?\\s*of|Light\\s*Rising|lite\\.ext\\.io|Lockerz|\\bLoU\\b|Mafia\\s*(Wars|Mofo)|Menelgame|Mob\\s*Wars|Mouse\\s*Hunt|Molehill\\s*Empire|MooMoo|MyFreeFarm|narwhale\\.io|Neopets|NeoQuest|Nemexia|\\bOGame\\b|Ogar(io)?|Pardus|Pennergame|Pigskin\\s*Empire|PlayerScripts|pokeradar\\.io|Popmundo|Po?we?r\\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|Skribbl|slither\\.io|slitherplus\\.io|slitheriogameplay|SpaceWars|splix\\.io|Survivio|\\bSW_[a-z]+\\n|\\bSnP\\b|The\\s*Crims|The\\s*West|torto\\.io|Travian|Treasure\\s*Isl(and|e)|Tribal\\s*Wars|TW.?PRO|Vampire\\s*Wars|vertix\\.io|War\\s*of\\s*Ninja|World\\s*of\\s*Tanks|West\\s*Wars|wings\\.io|\\bWoD\\b|World\\s*of\\s*Dungeons|wtf\\s*battles|Wurzelimperium|Yohoho|Zombs'
    },
    SocialNetworks: {
      enabled: false,
      name: 'Social Networks',
      flag: 'iu',
      regExp:
        'Face\\s*book|Google(\\+| Plus)|\\bHabbo|Kaskus|\\bLepra|Leprosorium|MySpace|meinVZ|odnoklassniki|Одноклассники|Orkut|sch(ue|ü)ler(VZ|\\.cc)?|studiVZ|Unfriend|Valenth|VK|vkontakte|ВКонтакте|Qzone|Twitter|TweetDeck'
    },
    Clutter: {
      enabled: false,
      name: 'Clutter',
      flag: 'iu',
      regExp:
        "^\\s*(.{1,3})\\1+\\n|^\\s*(.+?)\\n+\\2\\n*$|^\\s*.{1,5}\\n|do\\s*n('|o)?t (install|download)|nicht installieren|(just )?(\\ban? |\\b)test(ing|s|\\d|\\b)|^\\s*.{0,4}test.{0,4}\\n|\\ntest(ing)?\\s*|^\\s*(\\{@|Smolka|Hacks)|\\[\\d{4,5}\\]|free\\s*download|theme|(night|dark) ?(mode)?"
    }
  }
};
// #endregion
// #region i18n
class i18nHandler {
  constructor() {
    if (userjs.pool !== undefined) {
      return this;
    }
    userjs.pool = new Map();
    for (const [k, v] of Object.entries(translations)) {
      if (!userjs.pool.has(k)) userjs.pool.set(k, v);
    }
  }
  /**
   * @param {string | Date | number} str
   */
  toDate(str = '') {
    const { navigator } = safeSelf();
    return new Intl.DateTimeFormat(navigator.language).format(
      typeof str === 'string' ? new Date(str) : str
    );
  }
  /**
   * @param {number | bigint} number
   */
  toNumber(number) {
    const { navigator } = safeSelf();
    return new Intl.NumberFormat(navigator.language).format(number);
  }
  /**
   * @type { import("../typings/UserJS.d.ts").i18n$ }
   */
  i18n$(key) {
    const { navigator } = safeSelf();
    const current = navigator.language.split('-')[0] ?? 'en';
    return userjs.pool.get(current)?.[key] ?? 'Invalid Key';
  }
}
const language = new i18nHandler();
const { i18n$ } = language;
// #endregion
// #region Utilities
const union = (...arr) => [...new Set(arr.flat())];
/**
 * @type { import("../typings/types.d.ts").qs }
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
 * @type { import("../typings/types.d.ts").qsA }
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
 * @type { import("../typings/types.d.ts").normalizeTarget }
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
    const { createElement } = safeSelf();
    el = createElement(tagName);
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
 * @type { import("../typings/UserJS.d.ts").getGMInfo }
 */
const getGMInfo = () => {
  if (isGM) {
    if (isObj(GM.info)) {
      return GM.info;
    } else if (isObj(GM_info)) {
      return GM_info;
    }
  }
  return {
    script: {
      icon: '',
      name: 'Magic Userscript+',
      namespace: 'https://github.com/magicoflolis/Userscript-Plus',
      updateURL: 'https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjs.js',
      version: 'Bookmarklet',
      bugs: 'https://github.com/magicoflolis/Userscript-Plus/issues'
    }
  };
};
const $info = getGMInfo();
// #endregion
/**
 * @type { import("../typings/types.d.ts").dom }
 */
const dom = {
  attr(target, attr, value = undefined) {
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
  },
  prop(target, prop, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem[prop];
      }
      elem[prop] = value;
    }
  },
  text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  },
  cl: {
    add(target, token) {
      token = Array.isArray(token) ? token : [token];
      return normalizeTarget(target).some((elem) => elem.classList.add(...token));
    },
    remove(target, token) {
      token = Array.isArray(token) ? token : [token];
      return normalizeTarget(target).some((elem) => elem.classList.remove(...token));
    },
    toggle(target, token, force) {
      let r;
      for (const elem of normalizeTarget(target)) {
        r = elem.classList.toggle(token, force);
      }
      return r;
    },
    has(target, token) {
      return normalizeTarget(target).some((elem) => elem.classList.contains(token));
    }
  }
};
class Memorize {
  constructor() {
    /**
     * @type {Map<string, Map<string, any>>}
     */
    this.store = new Map();
    /**
     * @type { { [key: string]: Map<string, any>; userjs: Map<number, import("../typings/types.d.ts").GSForkQuery> } }
     */
    this.maps = {};
    this.create('cfg', 'container', 'userjs');
  }
  /**
   * @template { string } S
   * @param { ...S } maps
   * @returns { S | S[] }
   */
  create(...maps) {
    const resp = [];
    for (const key of maps) {
      if (this.store.has(key)) {
        return this.store.get(key);
      }
      const m = new Map();
      this.store.set(key, m);
      this.maps[key] = m;
      resp.push(this.store.get(key));
    }
    return resp.length >= 2 ? resp : resp[0];
  }
}
const memory = new Memorize();
//#region Icon SVGs
const iconSVG = {
  close: {
    viewBox: '0 0 384 512',
    html: '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>'
  },
  code: {
    viewBox: '0 0 640 512',
    html: '<path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>'
  },
  collapse: {
    viewBox: '0 0 448 512',
    html: '<path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/>'
  },
  download: {
    viewBox: '0 0 384 512',
    html: '<path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>'
  },
  expand: {
    viewBox: '0 0 448 512',
    html: '<path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"/>'
  },
  gear: {
    viewBox: '0 0 512 512',
    html: '<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>'
  },
  github: {
    viewBox: '0 0 496 512',
    html: '<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>'
  },
  globe: {
    viewBox: '0 0 512 512',
    html: '<path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"/>'
  },
  install: {
    viewBox: '0 0 512 512',
    html: '<path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>'
  },
  issue: {
    viewBox: '0 0 512 512',
    html: '<path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/>'
  },
  minus: {
    viewBox: '0 0 448 512',
    html: '<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>'
  },
  nav: {
    viewBox: '0 0 448 512',
    html: '<path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>'
  },
  pager: {
    viewBox: '0 0 512 512',
    html: '<path d="M0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zm64 32l0 64c0 17.7 14.3 32 32 32l320 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L96 128c-17.7 0-32 14.3-32 32zM80 320c-13.3 0-24 10.7-24 24s10.7 24 24 24l56 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-56 0zm136 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0z"/>'
  },
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  refresh: {
    viewBox: '0 0 512 512',
    fill: 'currentColor',
    html: '<path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/>'
  },
  load(type, container) {
    const { createElementNS } = safeSelf();
    const svgElem = createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [k, v] of Object.entries(iconSVG[type])) {
      if (k === 'html') {
        continue;
      }
      svgElem.setAttributeNS(null, k, v);
    }
    try {
      if (typeof iconSVG[type].html === 'string') {
        svgElem.innerHTML = iconSVG[type].html;
        dom.attr(svgElem, 'id', `mujs_${type ?? 'Unknown'}`);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ex) {
      /* empty */
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};
//#endregion
/**
 * @type { import("../typings/UserJS.d.ts").StorageSystem }
 */
const StorageSystem = {
  prefix: 'MUJS',
  events: new Set(),
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
  addListener(name, callback) {
    if (isGM) {
      let GMType;
      if (isFN(GM.addValueChangeListener)) {
        GMType = GM.addValueChangeListener(name, callback);
      } else if (isFN(GM_addValueChangeListener)) {
        GMType = GM_addValueChangeListener(name, callback);
      }
      if (GMType) {
        return this.events.add(GMType) && GMType;
      }
    }
    return (
      this.events.add(callback) &&
      window.addEventListener('storage', (evt) => {
        const { key, oldValue, newValue } = evt;
        if (key === name) callback(key, oldValue, newValue, false);
      })
    );
  },
  attach() {
    window.addEventListener('beforeunload', () => {
      for (const e of this.events) {
        if (isGM && typeof e === 'number' && !Number.isNaN(e)) {
          if (isFN(GM.removeValueChangeListener)) {
            GM.removeValueChangeListener(e);
          } else if (isFN(GM_addValueChangeListener)) {
            GM_removeValueChangeListener(e);
          }
        } else {
          window.removeEventListener('storage', e);
        }
        this.events.delete(e);
      }
    });
  },
  async setValue(key, v) {
    if (!v) {
      return;
    }
    v = typeof v === 'string' ? v : JSON.stringify(v);
    if (isGM) {
      if (isFN(GM.setValue)) {
        await GM.setValue(key, v);
      } else if (isFN(GM_setValue)) {
        GM_setValue(key, v);
      }
    } else {
      this.setItem(`${this.prefix}-${key}`, v);
    }
  },
  async getValue(key, def = {}) {
    try {
      if (isGM) {
        let GMType;
        if (isFN(GM.getValue)) {
          GMType = await GM.getValue(key, JSON.stringify(def));
        } else if (isFN(GM_getValue)) {
          GMType = GM_getValue(key, JSON.stringify(def));
        }
        if (!isNull(GMType)) {
          return JSON.parse(GMType);
        }
      }
      return this.has(`${this.prefix}-${key}`)
        ? JSON.parse(this.getItem(`${this.prefix}-${key}`))
        : def;
    } catch (ex) {
      err(ex);
      return def;
    }
  }
};
const Command = {
  cmds: new Set(),
  register(text, command) {
    if (!isGM) {
      return;
    }

    if (isFN(command)) {
      if (this.cmds.has(command)) {
        return;
      }
      this.cmds.add(command);
    }

    if (isFN(GM.registerMenuCommand)) {
      GM.registerMenuCommand(text, command);
    } else if (isFN(GM_registerMenuCommand)) {
      GM_registerMenuCommand(text, command);
    }
  }
};
/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data, useFetch = false) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
    data = Object.assign({}, data);
    method = this.bscStr(method, false);
    responseType = this.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    if (isGM && !useFetch) {
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
    return new Promise((resolve, reject) => {
      if (isGM && !useFetch) {
        Network.xmlRequest({
          url,
          responseType,
          ...params,
          onerror: (r_1) => {
            reject(new Error(`${r_1.status} ${url}`));
          },
          onload: (r_1) => {
            if (r_1.status !== 200) reject(new Error(`${r_1.status} ${url}`));
            if (responseType.match(/basic/)) resolve(r_1);
            resolve(r_1.response);
          }
        });
      } else {
        fetch(url, params)
          .then((response_1) => {
            if (!response_1.ok) reject(response_1);
            const check = (str_2 = 'text') => {
              return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
            };
            if (responseType.match(/buffer/)) {
              resolve(check('arrayBuffer'));
            } else if (responseType.match(/json/)) {
              resolve(check('json'));
            } else if (responseType.match(/text/)) {
              resolve(check('text'));
            } else if (responseType.match(/blob/)) {
              resolve(check('blob'));
            } else if (responseType.match(/formdata/)) {
              resolve(check('formData'));
            } else if (responseType.match(/clone/)) {
              resolve(check('clone'));
            } else if (responseType.match(/document/)) {
              const respTxt = check('text');
              const domParser = new DOMParser();
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
          })
          .catch(reject);
      }
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return `0 ${this.sizes[0]}`;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${this.sizes[i]}`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  async xmlRequest(details) {
    if (isGM) {
      if (isFN(GM.xmlHttpRequest)) {
        return GM.xmlHttpRequest(details);
      } else if (isFN(GM_xmlhttpRequest)) {
        return GM_xmlhttpRequest(details);
      }
    }
    return await new Promise((resolve, reject) => {
      const { XMLHttpRequest } = safeSelf();
      const req = new XMLHttpRequest();
      let method = 'GET';
      let url = BLANK_PAGE;
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
          if (value === 'buffer') {
            req.responseType = 'arraybuffer';
          } else {
            req.responseType = value;
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
  },
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  }
};
const Counter = {
  cnt: {
    total: {
      count: 0
    }
  },
  set(engine) {
    if (!this.cnt[engine.name]) {
      const counter = make('count-frame', engine.enabled ? '' : 'hidden', {
        dataset: {
          counter: engine.name
        },
        title: engine.query ? decodeURIComponent(engine.query) : engine.url,
        textContent: '0'
      });
      this.cnt[engine.name] = {
        root: counter,
        count: 0
      };
      return counter;
    }
    return this.cnt[engine.name].root;
  },
  update(count, engine) {
    this.cnt[engine.name].count += count;
    this.cnt.total.count += count;
    this.updateAll();
  },
  updateAll() {
    for (const v of Object.values(this.cnt)) dom.text(v.root, v.count);
  },
  reset() {
    for (const [k, v] of Object.entries(this.cnt)) {
      dom.text(v.root, 0);
      v.count = 0;
      const engine = cfg.engines.find((engine) => k === engine.name);
      if (engine) {
        dom.cl[engine.enabled ? 'remove' : 'add'](v.root, 'hidden');
      }
    }
  }
};

// #region Container
/**
 * @type { import("../typings/UserJS.d.ts").Container }
 */
class Container {
  webpage;
  host;
  domain;
  ready;
  injected;
  shadowRoot;
  supported;
  frame;
  cache;
  userjsCache;
  root;
  unsaved;
  isBlacklisted;
  rebuild;
  opacityMin;
  opacityMax;
  constructor(url) {
    this.remove = this.remove.bind(this);
    this.refresh = this.refresh.bind(this);
    this.showError = this.showError.bind(this);
    this.toArr = this.toArr.bind(this);
    this.toElem = this.toElem.bind(this);

    this.webpage = this.strToURL(url);
    this.host = this.getHost(this.webpage.host);
    this.domain = this.getDomain(this.webpage.host);
    this.ready = false;
    this.injected = false;
    this.shadowRoot = undefined;
    this.supported = isFN(make('main-userjs').attachShadow);
    this.frame = this.supported
      ? make('main-userjs', {
          dataset: {
            insertedBy: $info.script.name,
            role: 'primary-container'
          }
        })
      : make('iframe', 'mujs-iframe', {
          dataset: {
            insertedBy: $info.script.name,
            role: 'primary-iframe'
          },
          loading: 'lazy',
          src: BLANK_PAGE,
          style:
            'position: fixed;bottom: 1rem;right: 1rem;height: 525px;width: 90%;margin: 0px 1rem;z-index: 100000000000000020 !important;',
          onload: (iFrame) => {
            /**
             * @type { HTMLIFrameElement }
             */
            const target = iFrame.target;
            if (!target.contentDocument) {
              return;
            }
            this.shadowRoot = target.contentDocument.documentElement;
            this.ready = true;
            dom.cl.add([this.shadowRoot, target.contentDocument.body], 'mujs-iframe');
          }
        });
    if (this.supported) {
      this.shadowRoot = this.frame.attachShadow({ mode: 'closed' });
      this.ready = true;
    }
    this.cache = memory.maps.container;
    this.userjsCache = memory.maps.userjs;
    this.root = make('mujs-root');
    this.unsaved = false;
    this.isBlacklisted = false;
    this.rebuild = false;
    this.opacityMin = '0.15';
    this.opacityMax = '1';
    this.elementsReady = this.init();

    const Timeout = class {
      constructor() {
        this.ids = [];
      }

      set(delay, reason) {
        const { setTimeout } = safeSelf();
        return new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            Object.is(reason, null) || Object.is(reason, undefined) ? resolve() : reject(reason);
            this.clear(id);
          }, delay);
          this.ids.push(id);
        });
      }

      clear(...ids) {
        const { clearTimeout } = safeSelf();
        this.ids = this.ids.filter((id) => {
          if (ids.includes(id)) {
            clearTimeout(id);
            return false;
          }
          return true;
        });
      }
    };
    this.timeouts = {
      frame: new Timeout(),
      mouse: new Timeout()
    };

    this.injFN = () => {};

    window.addEventListener('beforeunload', this.remove);
  }
  /**
   * @param { function(): * } callback
   * @param { Document } doc
   */
  async inject(callback, doc) {
    if (this.checkBlacklist(this.host)) {
      err(`Blacklisted "${this.host}"`);
      this.remove();
      return;
    }
    if (!this.shadowRoot) {
      return;
    }
    if (doc === null) {
      return;
    }

    while (this.ready === false) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    try {
      doc.documentElement.appendChild(this.frame);
      if (this.injected) {
        if (isFN(this.injFN.build)) {
          this.injFN.build();
        }
        return;
      }
      this.shadowRoot.append(this.root);
      if (isNull(this.loadCSS(main_css, 'primary-stylesheet'))) {
        throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
      }
      this.injected = true;
      this.initFn();
      if (this.elementsReady && isFN(callback)) {
        this.injFN = callback.call(this, this.shadowRoot);
      }
    } catch (ex) {
      err(ex);
      this.remove();
    }
  }
  initFn() {
    this.renderTheme(cfg.theme);

    Counter.cnt.total.root = this.mainbtn;
    for (const engine of cfg.engines) this.countframe.append(Counter.set(engine));
    const { cfgpage, table, supported, frame, refresh, cache, urlBar, host } = this;

    class Tabs {
      /**
       * @param { HTMLElement } root
       */
      constructor(root) {
        /**
         * @type { Set<HTMLElement> }
         */
        this.pool = new Set();
        this.blank = BLANK_PAGE;
        this.protocal = 'mujs:';
        this.protoReg = new RegExp(`${this.protocal}(.+)`, 'i');
        this.el = {
          add: make('mujs-addtab', {
            textContent: '+',
            dataset: {
              command: 'new-tab'
            }
          }),
          head: make('mujs-tabs'),
          root
        };
        this.el.head.append(this.el.add);
        this.el.root.append(this.el.head);
        this.custom = () => {};
      }
      /**
       * @param {string} hostname
       */
      getTab(hostname) {
        return [...this.pool].find(({ dataset }) => hostname === dataset.host);
      }
      getActive() {
        return [...this.pool].find((tab) => tab.classList.contains('active'));
      }
      /**
       * @param {string} hostname
       */
      intFN(hostname) {
        if (!hostname.startsWith(this.protocal)) {
          return;
        }
        if (hostname.match(this.protoReg)[1] === 'settings') {
          dom.cl.remove(cfgpage, 'hidden');
          dom.cl.add(table, 'hidden');
          if (!supported) {
            dom.attr(frame, 'style', 'height: 100%;');
          }
        }
      }
      /**
       * @param {HTMLElement} tab
       * @param {boolean} [build]
       */
      active(tab, build = true) {
        if (!this.pool.has(tab)) this.pool.add(tab);
        dom.cl.add(cfgpage, 'hidden');
        dom.cl.remove(table, 'hidden');
        dom.cl.remove([...this.pool], 'active');
        dom.cl.add(tab, 'active');
        if (!build) {
          return;
        }
        const host = tab.dataset.host ?? this.blank;
        if (host === this.blank) {
          refresh();
        } else if (host.startsWith(this.protocal)) {
          this.intFN(host);
        } else {
          this.custom(host);
        }
      }
      /** @param { HTMLElement } tab */
      close(tab) {
        if (this.pool.has(tab)) this.pool.delete(tab);
        const host = tab.dataset.host;
        if (cfg.clearTabCache && cache.has(host)) cache.delete(host);
        if (tab.classList.contains('active')) refresh();
        const sibling = tab.nextElementSibling ?? tab.previousElementSibling;
        if (sibling) {
          if (sibling.dataset.command !== 'new-tab') {
            this.active(sibling);
          }
        }
        tab.remove();
      }
      /**
       * @param {string} [hostname]
       */
      create(hostname = undefined) {
        if (typeof hostname === 'string') {
          const createdTab = this.getTab(hostname);
          if (this.protoReg.test(hostname) && createdTab) {
            this.active(createdTab);
            return;
          }
        }
        const tab = make('mujs-tab', {
          dataset: {
            command: 'switch-tab'
          },
          style: `order: ${this.el.head.childElementCount};`
        });
        const tabClose = make('mu-js', {
          dataset: {
            command: 'close-tab'
          },
          title: i18n$('close'),
          textContent: 'X'
        });
        const tabHost = make('mujs-host');
        tab.append(tabHost, tabClose);
        this.el.head.append(tab);
        this.active(tab, false);
        if (isNull(hostname)) {
          refresh();
          urlBar.placeholder = i18n$('newTab');
          tab.dataset.host = this.blank;
          tabHost.title = i18n$('newTab');
          tabHost.textContent = i18n$('newTab');
        } else if (hostname.startsWith(this.protocal)) {
          const type = hostname.match(this.protoReg)[1];
          tab.dataset.host = hostname || host;
          tabHost.title = type || tab.dataset.host;
          tabHost.textContent = tabHost.title;
          this.intFN(hostname);
        } else {
          tab.dataset.host = hostname || host;
          tabHost.title = hostname || host;
          tabHost.textContent = tabHost.title;
        }
        return tab;
      }
    }
    this.tab = new Tabs(this.toolbar);
    this.tab.create(host);

    const tabbody = this.tabbody;
    const getCellValue = (tr, idx) => tr.children[idx].dataset.value || tr.children[idx].textContent;
    const comparer = (idx, asc) => (a, b) =>
      ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
          ? v1 - v2
          : v1.toString().localeCompare(v2))(
        getCellValue(asc ? a : b, idx),
        getCellValue(asc ? b : a, idx)
      );
    for (const th of this.tabhead.rows[0].cells) {
      if (dom.text(th) === i18n$('install')) continue;
      dom.cl.add(th, 'mujs-pointer');
      ael(th, 'click', () => {
        /** [Stack Overflow Reference](https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/53880407#53880407) */
        Array.from(tabbody.querySelectorAll('tr'))
          .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
          .forEach((tr) => tabbody.appendChild(tr));
      });
    }
  }
  init() {
    try {
      // #region Elements
      this.mainframe = make('mu-js', 'mainframe', {
        style: `opacity: ${this.opacityMin};`
      });
      this.countframe = make('mujs-column');
      this.mainbtn = make('count-frame', 'mainbtn', {
        textContent: '0'
      });
      this.urlBar = make('input', 'mujs-url-bar', {
        autocomplete: 'off',
        spellcheck: false,
        type: 'text',
        placeholder: i18n$('search_placeholder')
      });
      this.rateContainer = make('mujs-column', 'rate-container');
      this.footer = make('mujs-row', 'mujs-footer');
      this.tabbody = make('tbody');
      this.promptElem = make('mujs-row', 'mujs-prompt');
      this.toolbar = make('mujs-toolbar');
      this.table = make('table');
      this.tabhead = make('thead');
      this.header = make('mujs-header');
      this.tbody = make('mujs-body');
      this.cfgpage = make('mujs-row', 'mujs-cfg hidden');
      this.btnframe = make('mujs-column', 'btn-frame');
      this.fsearch = make('mujs-btn', 'hidden');
      this.btnHandles = make('mujs-column', 'btn-handles');
      this.btnHide = make('mujs-btn', 'hide-list', {
        title: i18n$('min'),
        innerHTML: iconSVG.load('minus'),
        dataset: {
          command: 'hide-list'
        }
      });
      this.btnfullscreen = make('mujs-btn', 'fullscreen', {
        title: i18n$('max'),
        innerHTML: iconSVG.load('expand'),
        dataset: {
          command: 'fullscreen'
        }
      });
      this.main = make('mujs-main', 'hidden');
      this.urlContainer = make('mujs-url');
      this.closebtn = make('mujs-btn', 'close', {
        title: i18n$('close'),
        innerHTML: iconSVG.load('close'),
        dataset: {
          command: 'close'
        }
      });
      this.btncfg = make('mujs-btn', 'settings hidden', {
        title: 'Settings',
        innerHTML: iconSVG.load('gear'),
        dataset: {
          command: 'settings'
        }
      });
      this.btnhome = make('mujs-btn', 'github hidden', {
        title: `GitHub (v${
          $info.script.version.includes('.') || $info.script.version.includes('Book')
            ? $info.script.version
            : $info.script.version.slice(0, 5)
        })`,
        innerHTML: iconSVG.load('github'),
        dataset: {
          command: 'open-tab',
          webpage: $info.script.namespace
        }
      });
      this.btnissue = make('mujs-btn', 'issue hidden', {
        innerHTML: iconSVG.load('issue'),
        title: i18n$('issue'),
        dataset: {
          command: 'open-tab',
          webpage: $info.script.bugs ?? 'https://github.com/magicoflolis/Userscript-Plus/issues'
        }
      });
      this.btngreasy = make('mujs-btn', 'greasy hidden', {
        title: 'Greasy Fork',
        innerHTML: iconSVG.load('globe'),
        dataset: {
          command: 'open-tab',
          webpage: 'https://greasyfork.org/scripts/421603'
        }
      });
      this.btnnav = make('mujs-btn', 'nav', {
        title: 'Navigation',
        innerHTML: iconSVG.load('nav'),
        dataset: {
          command: 'navigation'
        }
      });
      const makeTHead = (rows = []) => {
        const tr = make('tr');
        for (const r of rows) {
          const tparent = make('th', r.class ?? '', r);
          tr.append(tparent);
        }
        this.tabhead.append(tr);
        this.table.append(this.tabhead, this.tabbody);
      };
      makeTHead([
        {
          class: 'mujs-header-name',
          textContent: i18n$('name')
        },
        {
          textContent: i18n$('createdby')
        },
        {
          textContent: i18n$('daily_installs')
        },
        {
          textContent: i18n$('updated')
        },
        {
          textContent: i18n$('install')
        }
      ]);
      // #endregion
      if (isMobile) {
        dom.cl.add([this.btnHide, this.btnfullscreen, this.closebtn], 'hidden');
        this.btnframe.append(
          this.btnHide,
          this.btnfullscreen,
          this.closebtn,
          this.btnhome,
          this.btngreasy,
          this.btnissue,
          this.btncfg,
          this.btnnav
        );
      } else {
        this.btnHandles.append(this.btnHide, this.btnfullscreen, this.closebtn);
        this.btnframe.append(this.btnhome, this.btngreasy, this.btnissue, this.btncfg, this.btnnav);
      }
      this.toolbar.append(this.btnHandles);
      this.urlContainer.append(this.urlBar);
      this.header.append(this.urlContainer, this.rateContainer, this.countframe, this.btnframe);
      this.tbody.append(this.table, this.cfgpage);
      this.main.append(this.toolbar, this.header, this.tbody, this.footer, this.promptElem);
      this.mainframe.append(this.mainbtn);
      // this.exBtn.append(this.importCFG, this.importTheme, this.exportCFG, this.exportTheme);
      // this.header.append(this.exBtn);
      this.root.append(this.mainframe, this.main);

      return true;
    } catch (ex) {
      err(ex);
    }
    return false;
  }
  remove() {
    memory.store.clear();
    if (this.frame) {
      this.frame.remove();
    }
  }
  async save() {
    this.unsaved = false;
    await StorageSystem.setValue('Config', cfg);
    info('Saved config:', cfg);
    this.redirect();
    return cfg;
  }
  /**
   * @param { string } css - CSS to inject
   * @param { string } name - Name of stylesheet
   * @return { HTMLStyleElement } Style element
   */
  loadCSS(css, name = 'CSS') {
    try {
      if (typeof name !== 'string') {
        throw new Error('"name" must be a typeof "string"', { cause: 'loadCSS' });
      }
      if (qs(`style[data-role="${name}"]`, this.root)) {
        return qs(`style[data-role="${name}"]`, this.root);
      }
      if (typeof css !== 'string') {
        throw new Error('"css" must be a typeof "string"', { cause: 'loadCSS' });
      }
      if (isBlank(css)) {
        throw new Error(`"${name}" contains empty CSS string`, { cause: 'loadCSS' });
      }
      const parent = isEmpty(this.root.shadowRoot) ? this.root : this.root.shadowRoot;
      if (isGM) {
        let sty;
        if (isFN(GM.addElement)) {
          sty = GM.addElement(parent, 'style', {
            textContent: css
          });
        } else if (isFN(GM_addElement)) {
          sty = GM_addElement(parent, 'style', {
            textContent: css
          });
        }
        if (isElem(sty)) {
          sty.dataset.insertedBy = $info.script.name;
          sty.dataset.role = name;
          return sty;
        }
      }
      const sty = make('style', {
        textContent: css,
        dataset: {
          insertedBy: $info.script.name,
          role: name
        }
      });
      parent.appendChild(sty);
      return sty;
    } catch (ex) {
      err(ex);
    }
  }
  checkBlacklist(str) {
    str = str || this.host;
    let blacklisted = false;
    if (/accounts*\.google\./.test(this.webpage.host)) {
      blacklisted = true;
    }
    for (const b of normalizeTarget(cfg.blacklist)) {
      if (typeof b === 'string') {
        if (b.startsWith('userjs-')) {
          const r = /userjs-(\w+)/.exec(b)[1];
          const biList = builtinList[r];
          if (isRegExp(biList)) {
            if (!biList.test(str)) continue;
            blacklisted = true;
          } else if (isObj(biList) && biList.host === this.host) {
            blacklisted = true;
          }
        }
      } else if (isObj(b)) {
        if (!b.enabled) {
          continue;
        }
        if (b.regex === true) {
          const reg = new RegExp(b.url, b.flags);
          if (!reg.test(str)) continue;
          blacklisted = true;
        }
        if (Array.isArray(b.url)) {
          for (const c of b.url) {
            if (!str.includes(c)) continue;
            blacklisted = true;
          }
        }
        if (!str.includes(b.url)) continue;
        blacklisted = true;
      }
    }
    this.isBlacklisted = blacklisted;
    return this.isBlacklisted;
  }
  getInfo(url) {
    const webpage = this.strToURL(url || this.webpage);
    const host = this.getHost(webpage.host);
    const domain = this.getDomain(webpage.host);
    return {
      domain,
      host,
      webpage
    };
  }
  /**
   * @template { string } S
   * @param { S } str
   */
  getHost(str = '') {
    return str.split('.').splice(-2).join('.');
  }
  /**
   * @template { string } S
   * @param { S } str
   */
  getDomain(str = '') {
    return str.split('.').at(-2) ?? BLANK_PAGE;
  }
  renderTheme(theme) {
    theme = theme || cfg.theme;
    if (theme === DEFAULT_CONFIG.theme) {
      return;
    }
    const sty = this.root.style;
    for (const [k, v] of Object.entries(theme)) {
      const str = `--mujs-${k}`;
      const prop = sty.getPropertyValue(str);
      if (isEmpty(v)) {
        theme[k] = prop;
      }
      if (prop === v) {
        continue;
      }
      sty.removeProperty(str);
      sty.setProperty(str, v);
    }
  }
  makePrompt(txt, dataset = {}, usePrompt = true) {
    if (qs('.prompt', this.promptElem)) {
      for (const elem of qsA('.prompt', this.promptElem)) {
        if (elem.dataset.prompt) {
          elem.remove();
        }
      }
    }
    const el = make('mu-js', 'prompt', {
      dataset: {
        prompt: txt
      }
    });
    const elHead = make('mu-js', 'prompt-head', {
      innerHTML: `${iconSVG.load('refresh')} ${txt}`
    });
    el.append(elHead);
    if (usePrompt) {
      const elPrompt = make('mu-js', 'prompt-body', { dataset });
      const elYes = make('mujs-btn', 'prompt-confirm', {
        innerHTML: 'Confirm',
        dataset: {
          command: 'prompt-confirm'
        }
      });
      const elNo = make('mujs-btn', 'prompt-deny', {
        innerHTML: 'Deny',
        dataset: {
          command: 'prompt-deny'
        }
      });
      elPrompt.append(elYes, elNo);
      el.append(elPrompt);
    }
    this.promptElem.append(el);
  }
  /**
   * @template {string | Error} E
   * @param {...E} ex
   */
  showError(...ex) {
    err(...ex);
    const error = make('mu-js', 'error');
    let str = '';
    for (const e of ex) {
      str += `${typeof e === 'string' ? e : `${e.cause ? `[${e.cause}] ` : ''}${e.message}${e.stack ? ` ${e.stack}` : ''}`}\n`;
      if (isObj(e)) {
        if (e.notify) {
          dom.cl.add(this.mainframe, 'error');
        }
      }
    }
    const { createTextNode } = safeSelf();
    error.appendChild(createTextNode(str));
    this.footer.append(error);
  }
  toArr() {
    return Array.from(this.userjsCache.values()).filter(({ _mujs }) => {
      return isElem(_mujs.root) && _mujs.info.engine.enabled;
    });
  }
  toElem() {
    return this.toArr().map(({ _mujs }) => {
      return _mujs.root;
    });
  }
  refresh() {
    this.urlBar.placeholder = i18n$('newTab');
    Counter.reset();
    dom.cl.remove(this.toElem(), 'hidden');
    dom.cl.remove(qsA('mujs-section[data-name]', this.cfgpage), 'hidden');
    dom.prop([this.tabbody, this.rateContainer, this.footer], 'innerHTML', '');
  }
  /**
   * @template {string | URL} S
   * @param {S} str
   * @returns {URL}
   */
  strToURL(str) {
    const WIN_LOCATION = window.location ?? BLANK_PAGE;
    try {
      str = str ?? WIN_LOCATION;
      return objToStr(str).includes('URL') ? str : new URL(str);
    } catch (ex) {
      ex.cause = 'strToURL';
      this.showError(ex);
    }
    return WIN_LOCATION;
  }
  /**
   * Redirects sleazyfork userscripts from greasyfork.org to sleazyfork.org
   *
   * Taken from: https://greasyfork.org/scripts/23840
   */
  redirect() {
    const locObj = window.top.location;
    const { hostname } = locObj;
    const gfSite = /greasyfork\.org/.test(hostname);
    if (!gfSite && cfg.sleazyredirect) {
      return;
    }
    const otherSite = gfSite ? 'sleazyfork' : 'greasyfork';
    if (!qs('span.sign-in-link')) {
      return;
    }
    if (!/scripts\/\d+/.test(locObj.href)) {
      return;
    }
    if (
      !qs('#script-info') &&
      (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a'))
    ) {
      const str = locObj.href.replace(
        /\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/,
        '//$1' + otherSite + '.org'
      );
      info(`Redirecting to "${str}"`);
      if (isFN(locObj.assign)) {
        locObj.assign(str);
      } else {
        locObj.href = str;
      }
    }
  }
}
const container = new Container();
// #endregion
// #region Primary Function
function primaryFN() {
  const respHandles = {
    build: async () => {}
  };
  try {
    const { scheduler } = safeSelf();
    const {
      mainframe,
      urlBar,
      rateContainer,
      footer,
      tabbody,
      cfgpage,
      fsearch,
      btnfullscreen,
      main,
      tab,
      showError
    } = container;
    const frameTimeout = container.timeouts.frame;
    const cfgMap = memory.maps.cfg;
    const rebuildCfg = () => {
      for (const engine of cfg.engines) {
        if (cfgMap.has(engine.name)) {
          const inp = cfgMap.get(engine.name);
          inp.checked = engine.enabled;
          if (engine.name === 'github') {
            const txt = cfgMap.get('github-token');
            dom.prop(txt, 'value', engine.token);
          }
        }
      }
      for (const [k, v] of Object.entries(cfg)) {
        if (typeof v === 'boolean') {
          if (cfgMap.has(k)) {
            const inp = cfgMap.get(k);
            if (inp.type === 'checkbox') {
              inp.checked = v;
            } else {
              dom.prop(inp, 'value', v);
            }
          }
        }
      }
      // dom.prop(cfgMap.get('blacklist'), 'value', JSON.stringify(cfg.blacklist, null, ' '));
      for (const [k, v] of Object.entries(cfg.theme)) {
        dom.prop(cfgMap.get(k), 'value', v);
      }
      container.renderTheme(cfg.theme);
    };
    const doInstallProcess = async (installLink) => {
      const locObj = window.top.location;
      if (isFN(locObj.assign)) {
        locObj.assign(installLink.href);
      } else {
        locObj.href = installLink.href;
      }
      installLink.remove();
      await init();
    };
    const applyTo = (ujs, name, elem, root) => {
      const n = ujs._mujs.code[name] ?? ujs._mujs.code.data_meta[name];
      if (isEmpty(n)) {
        const el = make('mujs-a', {
          textContent: i18n$('listing_none')
        });
        elem.append(el);
        return;
      }
      dom.prop(elem, 'innerHTML', '');
      dom.cl.remove(root, 'hidden');
      if (isObj(n)) {
        if (name === 'resource') {
          for (const [k, v] of Object.entries(n)) {
            const el = make('mujs-a', {
              textContent: k ?? 'ERROR'
            });
            if (v.startsWith('http')) {
              el.dataset.command = 'open-tab';
              el.dataset.webpage = v;
            }
            elem.append(el);
          }
        } else {
          const el = make('mujs-a', {
            textContent: n.text
          });
          if (n.domain) {
            el.dataset.command = 'open-tab';
            el.dataset.webpage = `https://${n.text}`;
          }
          elem.append(el);
        }
      } else if (typeof n === 'string') {
        const el = make('mujs-a', {
          textContent: n
        });
        elem.append(el);
      } else {
        for (const c of n) {
          if (typeof c === 'string' && c.startsWith('http')) {
            const el = make('mujs-a', {
              textContent: c,
              dataset: {
                command: 'open-tab',
                webpage: c
              }
            });
            elem.append(el);
          } else if (isObj(c)) {
            const el = make('mujs-a', {
              textContent: c.text
            });
            if (c.domain) {
              el.dataset.command = 'open-tab';
              el.dataset.webpage = `https://${c.text}`;
            }
            elem.append(el);
          } else {
            const el = make('mujs-a', {
              textContent: c
            });
            elem.append(el);
          }
        }
      }
    };
    // #region Main event handlers
    ael(main, isMobile ? 'touchend' : 'click', async (evt) => {
      try {
        /** @type { HTMLElement } */
        const target = evt.target.closest('[data-command]');
        if (!target) {
          return;
        }
        const prmpt = /prompt-/.test(target.dataset.command);
        let dataset = target.dataset;
        let cmd = dataset.command;
        let prmptChoice = false;
        if (prmpt) {
          dataset = target.parentElement.dataset;
          cmd = dataset.command;
          prmptChoice = /confirm/.test(target.dataset.command);
          target.parentElement.parentElement.remove();
        }
        if (cmd === 'install-script' && dataset.userjs) {
          let installCode = dataset.userjs;
          if (!prmpt && dataset.userjs.endsWith('.user.css')) {
            container.makePrompt(i18n$('prmpt_css'), dataset);
            return;
          } else if (prmpt !== prmptChoice) {
            installCode = dataset.userjs.replace(/\.user\.css$/, '.user.js');
          }
          const dlBtn = make('a', {
            onclick(evt) {
              evt.preventDefault();
              doInstallProcess(evt.target);
            }
          });
          dlBtn.href = installCode;
          dlBtn.click();
        } else if (cmd === 'open-tab' && dataset.webpage) {
          if (isGM) {
            if (isFN(GM.openInTab)) {
              return GM.openInTab(dataset.webpage);
            } else if (isFN(GM_openInTab)) {
              return GM_openInTab(dataset.webpage, {
                active: true,
                insert: true
              });
            }
          }
          return window.open(dataset.webpage, '_blank');
        } else if (cmd === 'navigation') {
          for (const e of qsA('mujs-btn', target.parentElement)) {
            if (dom.cl.has(e, 'nav')) continue;
            if (dom.cl.has(e, 'hidden')) {
              dom.cl.remove(e, 'hidden');
            } else {
              dom.cl.add(e, 'hidden');
            }
          }
        } else if (cmd === 'list-description') {
          const arr = [];
          const ignoreTags = new Set(['TD', 'MUJS-A', 'MU-JS']);
          for (const node of target.parentElement.childNodes) {
            if (ignoreTags.has(node.tagName)) {
              continue;
            }
            if (node.tagName === 'TEXTAREA' && isEmpty(node.value)) {
              continue;
            }
            arr.push(node);
          }
          if (target.nextElementSibling) {
            arr.push(target.nextElementSibling);
            if (target.nextElementSibling.nextElementSibling) {
              arr.push(target.nextElementSibling.nextElementSibling);
            }
          }
          if (dom.cl.has(arr[0], 'hidden')) {
            dom.cl.remove(arr, 'hidden');
          } else {
            dom.cl.add(arr, 'hidden');
          }
        } else if (cmd === 'close') {
          container.remove();
        } else if (cmd === 'show-filter') {
          dom.cl.toggle(fsearch, 'hidden');
        } else if (cmd === 'fullscreen') {
          if (dom.cl.has(btnfullscreen, 'expanded')) {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('expand'));
          } else {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('collapse'));
          }
        } else if (cmd === 'hide-list') {
          dom.cl.add(main, 'hidden');
          dom.cl.remove(mainframe, 'hidden');
          timeoutFrame();
        } else if (cmd === 'save') {
          container.rebuild = true;
          dom.prop(rateContainer, 'innerHTML', '');
          if (!dom.prop(target, 'disabled')) {
            const config = await container.save();
            if (container.rebuild) {
              container.cache.clear();
              if (config.autofetch) {
                respHandles.build();
              }
            }
            container.unsaved = false;
            container.rebuild = false;
          }
        } else if (cmd === 'reset') {
          cfg = DEFAULT_CONFIG;
          dom.cl.remove(mainframe, 'error');
          if (qs('.error', footer)) {
            for (const elem of qsA('.error', footer)) {
              elem.remove();
            }
          }
          container.unsaved = true;
          container.rebuild = true;
          rebuildCfg();
        } else if (cmd === 'settings') {
          if (container.unsaved) {
            showError('Unsaved changes');
          }
          tab.create('mujs:settings');
          container.rebuild = false;
        } else if (cmd === 'new-tab') {
          tab.create();
        } else if (cmd === 'switch-tab') {
          tab.active(target);
        } else if (cmd === 'close-tab' && target.parentElement) {
          tab.close(target.parentElement);
        } else if (cmd === 'download-userjs') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          let installCode = dataUserJS.code_url;
          if (!prmpt && dataUserJS.code_url.endsWith('.user.css')) {
            container.makePrompt('Download as UserStyle?', dataset);
            return;
          } else if (prmpt !== prmptChoice) {
            installCode = dataUserJS.code_url.replace(/\.user\.css$/, '.user.js');
          }
          const r = await dataUserJS._mujs.code.request(false, installCode);
          const txt = r.data;
          if (typeof txt !== 'string') {
            return;
          }
          const userjsName = dataset.userjsName ?? dataset.userjs;
          const userjsExt = prmpt !== prmptChoice ? '.user.js' : '.user.css';
          const makeUserJS = new Blob([txt], { type: 'text/plain' });
          const dlBtn = make('a', 'mujs_Downloader');
          dlBtn.href = URL.createObjectURL(makeUserJS);
          dlBtn.download = `${userjsName}${userjsExt}`;
          dlBtn.click();
          URL.revokeObjectURL(dlBtn.href);
          dlBtn.remove();
        } else if (cmd === 'load-userjs' || cmd === 'load-header') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          const codeArea = qs('textarea', target.parentElement.parentElement);
          if (!isEmpty(codeArea.value) && cmd === codeArea.dataset.load) {
            dom.cl.toggle(codeArea, 'hidden');
            return;
          }
          codeArea.dataset.load = cmd;
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          const code_obj = await dataUserJS._mujs.code.request();
          if (typeof code_obj.data_code_block !== 'string') {
            codeArea.value = 'An error occured';
            return;
          }
          codeArea.value =
            cmd === 'load-userjs' ? code_obj.data_code_block : code_obj.data_meta_block;
          dom.cl.remove(codeArea, 'hidden');
          for (const e of qsA(
            'mujs-column[data-el="matches"]',
            target.parentElement.parentElement
          )) {
            applyTo(dataUserJS, e.dataset.type, qs('.mujs-grants', e), e);
          }
        } else if (cmd === 'load-page') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          let pageArea = qs('mujs-page', target.parentElement.parentElement);
          if (!pageArea) {
            pageArea = make('mujs-page');
            target.parentElement.parentElement.append(pageArea);
            const dataUserJS = container.userjsCache.get(+dataset.userjs);
            const engine = dataUserJS._mujs.info.engine;
            let pageURL;
            if (engine.name.includes('fork')) {
              const { navigator } = safeSelf();
              const current = navigator.language.split('-')[0] ?? 'en';
              pageURL = dataUserJS.url.replace(
                /\/scripts/,
                `/${/^(zh|fr|es)/.test(current) ? navigator.language : current}/scripts`
              );
            } else if (engine.name.includes('github')) {
              const page_url = await Network.req(dataUserJS.page_url, 'GET', 'json', {
                headers: {
                  Accept: 'application/vnd.github+json',
                  Authorization: `Bearer ${engine.token}`,
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              }).catch(() => {
                return {};
              });
              if (!page_url.download_url) {
                return;
              }
              const page = await Network.req(page_url.download_url, 'GET', 'text');
              if (container.supported) {
                const shadow = pageArea.attachShadow({ mode: 'closed' });
                const div = make('div', {
                  innerHTML: page
                });
                shadow.append(div);
              }
              return;
            } else {
              pageURL = dataUserJS.url;
            }
            if (!pageURL) {
              return;
            }
            const page = await Network.req(pageURL, 'GET', 'document');
            const getContent = () => {
              let content = 'An error occured';
              const h = new URL(dataUserJS.url);
              const root = qs('.user-content', page.documentElement);
              for (const e of qsA('[href]', root)) {
                e.target = '_blank';
                e.style = 'pointer-events: auto;';
                if (e.href.startsWith('/')) {
                  e.href = `${h.origin}${e.href}`;
                }
              }
              for (const e of qsA('img[src]', root)) {
                e.style =
                  'max-width: 25em; max-height: 25em; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;';
              }
              if (root) {
                content = root.innerHTML;
              } else {
                content = 'No additional info available';
              }
              return content;
            };
            if (container.supported) {
              const shadow = pageArea.attachShadow({ mode: 'closed' });
              const div = make('div', {
                style: 'pointer-events: none;',
                innerHTML: getContent()
              });
              shadow.append(div);
            }
            return;
          }
          if (!dom.cl.has(pageArea, 'hidden')) {
            dom.cl.add(pageArea, 'hidden');
            return;
          }
          dom.cl.remove(pageArea, 'hidden');
        } else if (/export-/.test(cmd)) {
          const str = JSON.stringify(cmd === 'export-cfg' ? cfg : cfg.theme, null, ' ');
          const bytes = new TextEncoder().encode(str);
          const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
          const dlBtn = make('a', 'mujs-exporter', {
            href: URL.createObjectURL(blob),
            download: `Magic_Userscript_${cmd === 'export-cfg' ? 'config' : 'theme'}.json`
          });
          dlBtn.click();
          URL.revokeObjectURL(dlBtn.href);
        } else if (/import-/.test(cmd)) {
          if (qs('input', target.parentElement)) {
            qs('input', target.parentElement).click();
            return;
          }
          const inpJSON = make('input', 'hidden', {
            type: 'file',
            accept: '.json',
            onchange(evt) {
              try {
                [...evt.target.files].forEach((file) => {
                  const reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = () => {
                    const result = JSON.parse(reader.result);
                    if (result.blacklist) {
                      log(`Imported config: { ${file.name} }`, result);
                      cfg = result;
                      container.unsaved = true;
                      container.rebuild = true;
                      rebuildCfg();
                      container.save().then((config) => {
                        container.cache.clear();
                        if (config.autofetch) {
                          respHandles.build();
                        }
                        container.unsaved = false;
                        container.rebuild = false;
                      });
                    } else {
                      log(`Imported theme: { ${file.name} }`, result);
                      cfg.theme = result;
                      container.renderTheme(cfg.theme);
                    }
                    inpJSON.remove();
                  };
                  reader.onerror = () => {
                    showError(reader.error);
                    inpJSON.remove();
                  };
                });
              } catch (ex) {
                showError(ex);
                inpJSON.remove();
              }
            }
          });
          target.parentElement.append(inpJSON);
          inpJSON.click();
        }
      } catch (ex) {
        showError(ex);
      }
    });
    ael(main, 'auxclick', (evt) => {
      if (evt.button !== 1) {
        return;
      }
      /** @type { HTMLElement } */
      const target = evt.target.closest('[data-command]');
      if (!target) {
        return;
      }
      const dataset = target.dataset;
      const cmd = dataset.command;
      if (cmd === 'switch-tab' || cmd === 'close-tab') {
        tab.close(target);
      } else if (cmd === 'new-tab') {
        tab.create();
      }
    });
    if (!isMobile) {
      const fade = async (target, type) => {
        if (type === 'mouseenter') {
          frameTimeout.clear(...frameTimeout.ids);
          container.timeouts.mouse.clear(...container.timeouts.mouse.ids);
          target.style.opacity = container.opacityMax;
        } else if (type === 'mouseleave') {
          await container.timeouts.mouse.set(cfg.time);
          target.style.opacity = container.opacityMin;
        }
      };
      for (const e of ['mouseenter', 'mouseleave']) {
        ael(main, e, (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          fade(evt.target, evt.type);
        });
      }
    }
    ael(main, 'updateditem', (evt) => {
      /**
       * @type {import("../typings/types.d.ts").GSForkQuery}
       */
      const ujs = evt.detail;
      if (!ujs._mujs) return;
      for (const elem of qsA('[data-name]', ujs._mujs.root)) {
        const name = elem.dataset.name;
        if (name === 'code') {
          if (ujs._mujs.code.data_code_block) {
            if (cfg.preview.code && !cfg.preview.metadata) {
              elem.value = ujs._mujs.code.data_code_block;
            } else if (cfg.preview.metadata && !cfg.preview.code) {
              elem.value = ujs._mujs.code.data_meta_block;
            } else {
              elem.value = `${ujs._mujs.code.META_START_COMMENT}${ujs._mujs.code.data_meta_block}${ujs._mujs.code.META_END_COMMENT}${ujs._mujs.code.data_code_block}`;
            }
          }
          continue;
        }
        if (!ujs[name]) continue;
        if (name === 'license') {
          dom.attr(elem, 'title', ujs.license ?? i18n$('no_license'));
          dom.text(elem, `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`);
        } else if (name === 'code_updated_at') {
          dom.text(elem, language.toDate(ujs.code_updated_at));
          elem.dataset.value = new Date(ujs.code_updated_at).toISOString();
        } else if (name === 'created_date') {
          dom.text(elem, `${i18n$('created_date')}: ${language.toDate(ujs.created_at)}`);
          elem.dataset.value = new Date(ujs.created_at).toISOString();
        } else if (name === 'total_installs') {
          dom.text(elem, `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`);
        } else {
          dom.text(elem, ujs[name]);
        }
      }
      if (ujs._mujs.code.data_code_block) {
        for (const e of qsA('mujs-column[data-el="matches"]', ujs._mujs.root)) {
          applyTo(ujs, e.dataset.type, qs('.mujs-grants', e), e);
        }
      }
      if (container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
    });
    // #endregion
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
    class ParseUserJS {
      /**
       * @type { string }
       */
      code;
      /**
       * @type { string }
       */
      data_meta_block;
      /**
       * @type { string }
       */
      data_code_block;
      /**
       * @type { { [meta: string]: string | string[] | { [resource: string]: string } } }
       */
      data_meta;
      /**
       * @type { {text: string;domain: boolean;tld_extra: boolean}[] }
       */
      data_names;
      constructor(code, isUserCSS) {
        this.code = code;
        this.META_START_COMMENT = isUserCSS ? '/* ==UserStyle==' : '// ==UserScript==';
        this.META_END_COMMENT = isUserCSS ? '==/UserStyle== */' : '// ==/UserScript==';
        this.get_meta_block();
        this.get_code_block();
        this.parse_meta();
        this.calculate_applies_to_names();
      }
      get_meta_block() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_meta_block) {
          return this.data_meta_block;
        }
        const start_block = this.code.indexOf(this.META_START_COMMENT);
        if (isNull(start_block)) {
          return null;
        }
        const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return null;
        }
        const meta_block = this.code.substring(
          start_block + this.META_START_COMMENT.length,
          end_block
        );
        this.data_meta_block = meta_block;
        return this.data_meta_block;
      }
      get_code_block() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_code_block) {
          return this.data_code_block;
        }
        const start_block = this.code.indexOf(this.META_START_COMMENT);
        if (isNull(start_block)) {
          return null;
        }
        const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return null;
        }
        const code_block = this.code.substring(
          end_block + this.META_END_COMMENT.length,
          this.code.length
        );
        this.data_code_block = code_block
          .split('\n')
          .filter((l) => !isEmpty(l))
          .join('\n');
        return this.data_code_block;
      }
      parse_meta() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_meta) {
          return this.data_meta;
        }
        const meta = {};
        const meta_block_map = new Map();
        for (const meta_line of this.get_meta_block().split('\n')) {
          const meta_match = /\/\/\s+@([a-zA-Z:-]+)\s+(.*)/.exec(meta_line);
          if (!meta_match) {
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
        this.data_meta = meta;
        return this.data_meta;
      }
      calculate_applies_to_names() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_names) {
          return this.data_names;
        }
        let patterns = [];
        for (const [k, v] of Object.entries(this.parse_meta())) {
          if (/include|match/i.test(k)) {
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
        if (this.intersect(patterns, APPLIES_TO_ALL_PATTERNS)) {
          this.data_names = [
            {
              domain: false,
              text: 'All sites',
              tld_extra: false
            }
          ];
          return this.data_names;
        }
        const name_map = new Map();
        const addObj = (obj) => {
          if (name_map.has(obj.text)) {
            return;
          }
          name_map.set(obj.text, obj);
        };
        for (let p of patterns) {
          try {
            const original_pattern = p;
            let pre_wildcards = [];
            if (p.match(/^\/(.*)\/$/)) {
              pre_wildcards = [p];
            } else {
              let m = /^\*(https?:.*)/i.exec(p);
              if (m) {
                p = m[1];
              }
              p = p
                .replace(/^\*:/i, 'http:')
                .replace(/^\*\/\//i, 'http://')
                .replace(/^http\*:/i, 'http:')
                .replace(/^(https?):([^/])/i, '$1://$2');
              m = /^([a-z]+:\/\/)\*\.?([a-z0-9-]+(?:.[a-z0-9-]+)+.*)/i.exec(p);
              if (m) {
                p = m[1] + m[2];
              }
              m = /^\*\.?([a-z0-9-]+\.[a-z0-9-]+.*)/i.exec(p);
              if (m) {
                p = `http://${m[1]}`;
              }
              m = /^http\*(?:\/\/)?\.?((?:[a-z0-9-]+)(?:\.[a-z0-9-]+)+.*)/i.exec(p);
              if (m) {
                p = `http://${m[1]}`;
              }
              m = /^([a-z]+:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)*\.))\*(.*)/.exec(p);
              if (m) {
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
                const urlObj = new URL(pre_wildcard);
                const { host } = urlObj;
                if (isNull(host)) {
                  addObj({ text: original_pattern, domain: false, tld_extra: false });
                } else if (!host.includes('.') && host.includes('*')) {
                  addObj({ text: original_pattern, domain: false, tld_extra: false });
                } else if (host.endsWith('.tld')) {
                  for (let i = 0; i < TLD_EXPANSION.length; i++) {
                    const tld = TLD_EXPANSION[i];
                    addObj({
                      text: host.replace(/tld$/i, tld),
                      domain: true,
                      tld_extra: i != 0
                    });
                  }
                } else if (host.endsWith('.')) {
                  addObj({
                    text: host.slice(0, -1),
                    domain: true,
                    tld_extra: false
                  });
                } else {
                  addObj({
                    text: host,
                    domain: true,
                    tld_extra: false
                  });
                }
                // eslint-disable-next-line no-unused-vars
              } catch (ex) {
                addObj({ text: original_pattern, domain: false, tld_extra: false });
              }
            }
          } catch (ex) {
            err(ex);
          }
        }
        this.data_names = [...name_map.values()];
        return this.data_names;
      }
      intersect(a, ...arr) {
        return !isBlank([...new Set(a)].filter((v) => arr.every((b) => b.includes(v))));
      }
    }
    const template = {
      id: 0,
      bad_ratings: 0,
      good_ratings: 0,
      ok_ratings: 0,
      daily_installs: 0,
      total_installs: 0,
      name: 'NOT FOUND',
      description: 'NOT FOUND',
      version: '0.0.0',
      url: BLANK_PAGE,
      code_url: BLANK_PAGE,
      created_at: Date.now(),
      code_updated_at: Date.now(),
      locale: 'NOT FOUND',
      deleted: false,
      users: []
    };
    const mkList = (txt = '', obj = {}) => {
      if (!obj.root || !obj.type) {
        return;
      }
      const { root, type } = obj;
      const appliesTo = make('mu-js', 'mujs-list', {
        textContent: `${txt}: `
      });
      const applyList = make('mu-js', 'mujs-grants');
      const ujsURLs = make('mujs-column', 'mujs-list', {
        dataset: {
          el: 'matches',
          type
        }
      });
      ujsURLs.append(appliesTo, applyList);
      root.append(ujsURLs);

      const list = obj.list ?? [];
      if (isEmpty(list)) {
        const elem = make('mujs-a', {
          textContent: i18n$('listing_none')
        });
        applyList.append(elem);
        dom.cl.add(ujsURLs, 'hidden');
        return;
      }
      for (const c of list) {
        if (typeof c === 'string' && c.startsWith('http')) {
          const elem = make('mujs-a', {
            textContent: c,
            dataset: {
              command: 'open-tab',
              webpage: c
            }
          });
          applyList.append(elem);
        } else if (isObj(c)) {
          if (type === 'resource') {
            for (const [k, v] of Object.entries(c)) {
              const elem = make('mujs-a', {
                textContent: k ?? 'ERROR'
              });
              if (v.startsWith('http')) {
                elem.dataset.command = 'open-tab';
                elem.dataset.webpage = v;
              }
              applyList.append(elem);
            }
          } else {
            const elem = make('mujs-a', {
              textContent: c.text
            });
            if (c.domain) {
              elem.dataset.command = 'open-tab';
              elem.dataset.webpage = `https://${c.text}`;
            }
            applyList.append(elem);
          }
        } else {
          const elem = make('mujs-a', {
            textContent: c
          });
          applyList.append(elem);
        }
      }
    };
    /**
     * @param {number} [time]
     */
    const timeoutFrame = async (time) => {
      frameTimeout.clear(...frameTimeout.ids);
      if (dom.cl.has(mainframe, 'hidden')) {
        return;
      }
      time = time ?? cfg.time ?? DEFAULT_CONFIG.time;
      let n = 10000;
      if (typeof time === 'number' && !Number.isNaN(time)) {
        n = container.isBlacklisted ? time / 2 : time;
      }
      await frameTimeout.set(n);
      container.remove();
      return frameTimeout.clear(...frameTimeout.ids);
    };
    // #region Create UserJS
    /**
     * @param { import("../typings/types.d.ts").GSForkQuery } ujs
     * @param { string } engine
     */
    const createjs = (ujs, engine) => {
      // Lets not add this UserJS to the list
      if (ujs.id === 421603) {
        return;
      }
      if (badUserJS.includes(ujs.id) || badUserJS.includes(ujs.url)) {
        return;
      }
      if (!container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
      const eframe = make('td', 'install-btn');
      const uframe = make('td', 'mujs-uframe');
      const fdaily = make('td', 'mujs-list', {
        textContent: ujs.daily_installs,
        dataset: {
          name: 'daily_installs'
        }
      });
      const fupdated = make('td', 'mujs-list', {
        textContent: language.toDate(ujs.code_updated_at),
        dataset: {
          name: 'code_updated_at',
          value: new Date(ujs.code_updated_at).toISOString()
        }
      });
      const fname = make('td', 'mujs-name');
      const fmore = make('mujs-column', 'mujs-list hidden', {
        dataset: {
          el: 'more-info'
        }
      });
      const fBtns = make('mujs-column', 'mujs-list hidden');
      const jsInfo = make('mujs-row', 'mujs-list');
      const jsInfoB = make('mujs-row', 'mujs-list');
      const ratings = make('mujs-column', 'mujs-list');
      const ftitle = make('mujs-a', 'mujs-homepage', {
        textContent: ujs.name,
        title: ujs.url,
        dataset: {
          command: 'open-tab',
          webpage: ujs.url
        }
      });
      const fver = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('version_number')}: ${ujs.version}`
      });
      const fcreated = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('created_date')}: ${language.toDate(ujs.created_at)}`,
        dataset: {
          name: 'created_at',
          value: new Date(ujs.created_at).toISOString()
        }
      });
      const flicense = make('mu-js', 'mujs-list', {
        title: ujs.license ?? i18n$('no_license'),
        textContent: `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`,
        dataset: {
          name: 'license'
        }
      });
      const ftotal = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`,
        dataset: {
          name: 'total_installs'
        }
      });
      const fratings = make('mu-js', 'mujs-list', {
        title: i18n$('ratings'),
        textContent: `${i18n$('ratings')}:`
      });
      const fgood = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('good'),
        textContent: ujs.good_ratings,
        dataset: {
          name: 'good_ratings',
          el: 'good'
        }
      });
      const fok = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('ok'),
        textContent: ujs.ok_ratings,
        dataset: {
          name: 'ok_ratings',
          el: 'ok'
        }
      });
      const fbad = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('bad'),
        textContent: ujs.bad_ratings,
        dataset: {
          name: 'bad_ratings',
          el: 'bad'
        }
      });
      const fdesc = make('mu-js', 'mujs-list mujs-pointer', {
        title: ujs.description,
        textContent: ujs.description,
        dataset: {
          command: 'list-description'
        }
      });
      const scriptInstall = make('mu-jsbtn', 'install', {
        innerHTML: `${iconSVG.load('install')} ${i18n$('install')}`,
        title: `${i18n$('install')} "${ujs.name}"`,
        dataset: {
          command: 'install-script',
          userjs: ujs.code_url
        }
      });
      const scriptDownload = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('download')} ${i18n$('saveFile')}`,
        dataset: {
          command: 'download-userjs',
          userjs: ujs.id,
          userjsName: ujs.name
        }
      });
      const tr = make('tr', 'frame', {
        dataset: {
          scriptId: ujs.id
        }
      });
      const codeArea = make('textarea', 'code-area hidden', {
        dataset: {
          name: 'code'
        },
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft'
      });
      const loadCode = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('code')} ${i18n$('preview_code')}`,
        dataset: {
          command: 'load-userjs',
          userjs: ujs.id
        }
      });
      const loadMetadata = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('code')} Metadata`,
        dataset: {
          command: 'load-header',
          userjs: ujs.id
        }
      });
      tr.dataset.engine = engine;
      if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
        tr.dataset.good = 'upsell';
      }
      for (const u of ujs.users) {
        const user = make('mujs-a', {
          innerHTML: u.name,
          title: u.url,
          dataset: {
            command: 'open-tab',
            webpage: u.url
          }
        });
        if (cfg.recommend.author && u.id === authorID) {
          tr.dataset.author = 'upsell';
          dom.prop(user, 'innerHTML', `${u.name} ${iconSVG.load('verified')}`);
        }
        uframe.append(user);
      }
      if (cfg.recommend.others && goodUserJS.includes(ujs.id)) {
        tr.dataset.good = 'upsell';
      }
      eframe.append(scriptInstall);
      ratings.append(fratings, fgood, fok, fbad);
      jsInfo.append(ftotal, ratings, fver, fcreated);
      mkList(i18n$('code_size'), {
        list: ujs._mujs.code.code_size,
        type: 'code_size',
        root: jsInfo
      });

      jsInfoB.append(flicense);
      const data_meta = ujs._mujs.code?.data_meta ?? {};
      mkList(i18n$('antifeatures'), {
        list: data_meta.antifeatures ?? [],
        type: 'antifeatures',
        root: jsInfoB
      });
      mkList(i18n$('applies_to'), {
        list: ujs._mujs.code?.data_names ?? [],
        type: 'data_names',
        root: jsInfoB
      });
      mkList('@grant', {
        list: data_meta.grant ?? [],
        type: 'grant',
        root: jsInfoB
      });
      mkList('@require', {
        list: data_meta.require,
        type: 'require',
        root: jsInfoB
      });
      mkList('@resource', {
        list: isNull(data_meta.resource) ? [] : [data_meta.resource],
        type: 'resource',
        root: jsInfoB
      });
      fmore.append(jsInfo, jsInfoB);
      fBtns.append(scriptDownload, loadCode, loadMetadata);
      fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

      const loadPage = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('pager')} Page`,
        dataset: {
          command: 'load-page',
          userjs: ujs.id
        }
      });
      fBtns.append(loadPage);

      if (ujs._mujs.code?.translated) tr.classList.add('translated');

      for (const e of [fname, uframe, fdaily, fupdated, eframe]) tr.append(e);
      ujs._mujs.root = tr;
      return ujs._mujs.root;
    };
    // #endregion
    const loadFilters = () => {
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
    // #region List
    class List {
      engines;
      intHost;
      constructor(hostname = undefined) {
        this.build = this.build.bind(this);
        this.toArr = this.toArr.bind(this);
        this.groupBy = this.groupBy.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.sortRecords = this.sortRecords.bind(this);
        if (isEmpty(hostname)) hostname = container.host;
        this.engines = cfg.engines;
        this.host = hostname;
      }

      dispatch(ujs) {
        const { CustomEvent } = safeSelf();
        const customEvent = new CustomEvent('updateditem', { detail: ujs });
        main.dispatchEvent(customEvent);
      }

      set host(hostname) {
        this.intHost = hostname;

        if (!container.cache.has(hostname)) {
          const engineTemplate = {};
          for (const engine of cfg.engines) {
            engineTemplate[engine.name] = [];
          }
          container.cache.set(hostname, engineTemplate);
        }
        this.blacklisted = container.checkBlacklist(hostname);
        if (this.blacklisted) {
          showError(`Blacklisted "${hostname}"`);
          timeoutFrame();
        }

        this.engines = cfg.engines.filter((e) => {
          if (!e.enabled) {
            return false;
          }
          const v = engineUnsupported[e.name] ?? [];
          if (v.includes(hostname)) {
            showError(`Engine: "${e.name}" unsupported on "${hostname}"`);
            timeoutFrame();
            return false;
          }
          return true;
        });
      }

      get host() {
        return this.intHost;
      }

      // #region Builder
      build() {
        try {
          container.refresh();
          const { blacklisted, engines, host, toArr, dispatch } = this;
          if (blacklisted || isEmpty(engines)) {
            container.opacityMin = '0';
            mainframe.style.opacity = container.opacityMin;
            return;
          }
          const fetchRecords = [];
          const bsFilter = loadFilters();
          const hostCache = toArr();

          info('Building list', { hostCache, engines });

          if (isBlank(hostCache)) {
            for (const engine of engines) {
              info(`Fetching from "${engine.name}" for "${host}"`);
              const respError = (error) => {
                if (!error.cause) error.cause = engine.name;
                if (error.message.startsWith('429')) {
                  showError(`Engine: "${engine.name}" Too many requests...`);
                  return;
                }
                showError(`Engine: "${engine.name}"`, error.message);
              };
              const _mujs = (d) => {
                const obj = {
                  ...template,
                  ...d,
                  _mujs: {
                    root: {},
                    info: {
                      engine,
                      host
                    },
                    code: {
                      meta: {},
                      request: async function (translate = false, code_url) {
                        if (this.data_code_block) {
                          return this;
                        }
                        code_url = code_url ?? d.code_url;
                        /** @type { string } */
                        const code = await Network.req(code_url, 'GET', 'text').catch(showError);
                        if (typeof code !== 'string') {
                          return this;
                        }
                        const code_obj = new ParseUserJS(code, /\.user\.css/.test(code_url));
                        const { data_meta } = code_obj;
                        if (translate) {
                          for (const k of userjs.pool.keys()) {
                            if (data_meta[`name:${k}`]) {
                              Object.assign(obj, {
                                name: data_meta[`name:${k}`]
                              });
                              this.translated = true;
                            }
                            if (data_meta[`description:${k}`]) {
                              Object.assign(obj, {
                                description: data_meta[`description:${k}`]
                              });
                              this.translated = true;
                            }
                          }
                        }
                        if (Array.isArray(data_meta.grant)) {
                          data_meta.grant = union(data_meta.grant);
                        }
                        if (data_meta.resource) {
                          const obj = {};
                          if (typeof data_meta.resource === 'string') {
                            const reg = /(.+)\s+(.+)/.exec(data_meta.resource);
                            if (reg) {
                              obj[reg[1].trim()] = reg[2];
                            }
                          } else {
                            for (const r of data_meta.resource) {
                              const reg = /(.+)\s+(http.+)/.exec(r);
                              if (reg) {
                                obj[reg[1].trim()] = reg[2];
                              }
                            }
                          }
                          data_meta.resource = obj;
                        }
                        Object.assign(this, {
                          code_size: [Network.format(code.length)],
                          meta: data_meta,
                          ...code_obj
                        });

                        return this;
                      }
                    }
                  }
                };
                return obj;
              };
              /**
               * Prior to UserScript v7.0.0
               * @template {string} F
               * @param {F} fallback
               * @returns {F}
               */
              const toQuery = (fallback) => {
                if (engine.query) {
                  return decodeURIComponent(engine.query).replace(/\{host\}/g, host);
                }
                return fallback;
              };
              /**
               * @param { import("../typings/types.d.ts").GSFork } dataQ
               */
              const forkFN = async (dataQ) => {
                if (!dataQ) {
                  showError('Invalid data received from the server, check internet connection');
                  return;
                }
                /**
                 * @type { import("../typings/types.d.ts").GSForkQuery[] }
                 */
                const dq = Array.isArray(dataQ)
                  ? dataQ
                  : Array.isArray(dataQ.query)
                    ? dataQ.query
                    : [];
                const dataA = dq
                  .filter(Boolean)
                  .filter((d) => !d.deleted)
                  .filter(bsFilter.match);
                if (isBlank(dataA)) {
                  return;
                }
                const data = dataA.map(_mujs);
                const otherLng = [];
                /**
                 * @param {import("../typings/types.d.ts").GSForkQuery} d
                 * @returns {boolean}
                 */
                const inUserLanguage = (d) => {
                  if (userjs.pool.has(d.locale.split('-')[0] ?? d.locale)) {
                    return true;
                  }
                  otherLng.push(d);
                  return false;
                };
                const filterLang = data.filter((d) => {
                  if (cfg.filterlang && !inUserLanguage(d)) {
                    return false;
                  }
                  return true;
                });
                let finalList = filterLang;
                const hds = [];
                for (const ujs of otherLng) {
                  const c = await ujs._mujs.code.request(true);
                  if (c.translated) {
                    hds.push(ujs);
                  }
                }
                finalList = union(hds, filterLang);

                for (const ujs of finalList) {
                  if (
                    !ujs._mujs.code.data_code_block &&
                    (cfg.preview.code || cfg.preview.metadata)
                  ) {
                    ujs._mujs.code.request().then(() => {
                      dispatch(ujs);
                    });
                  }
                  createjs(ujs, engine.name);
                }
              };
              /**
               * @param {Document} htmlDocument
               */
              const openuserjs = async (htmlDocument) => {
                try {
                  if (!htmlDocument) {
                    showError('Invalid data received from the server, TODO fix this');
                    return;
                  }
                  const selected = htmlDocument.documentElement;
                  if (/openuserjs/gi.test(engine.name)) {
                    const col = qsA('.col-sm-8 .tr-link', selected) ?? [];
                    for (const i of col) {
                      while (isNull(qs('.script-version', i))) {
                        await new Promise((resolve) => requestAnimationFrame(resolve));
                      }
                      const fixurl = dom
                        .prop(qs('.tr-link-a', i), 'href')
                        .replace(
                          new RegExp(document.location.origin, 'gi'),
                          'https://openuserjs.org'
                        );
                      const ujs = _mujs({
                        name: dom.text(qs('.tr-link-a', i)),
                        description: dom.text(qs('p', i)),
                        version: dom.text(qs('.script-version', i)),
                        url: fixurl,
                        code_url: `${fixurl.replace(/\/scripts/gi, '/install')}.user.js`,
                        total_installs: dom.text(qs('td:nth-child(2) p', i)),
                        created_at: dom.attr(qs('td:nth-child(4) time', i), 'datetime'),
                        code_updated_at: dom.attr(qs('td:nth-child(4) time', i), 'datetime'),
                        users: [
                          {
                            name: dom.text(qs('.inline-block a', i)),
                            url: dom.prop(qs('.inline-block a', i), 'href')
                          }
                        ]
                      });
                      if (bsFilter.match(ujs)) {
                        continue;
                      }
                      if (
                        !ujs._mujs.code.data_code_block &&
                        (cfg.preview.code || cfg.preview.metadata)
                      ) {
                        ujs._mujs.code.request().then(() => {
                          dispatch(ujs);
                        });
                      }
                      createjs(ujs, engine.name);
                    }
                  }
                } catch (ex) {
                  showError(ex);
                }
              };
              const gitFN = (data) => {
                try {
                  if (isBlank(data.items)) {
                    showError('Invalid data received from the server, TODO fix this');
                    return;
                  }
                  for (const r of data.items) {
                    const ujs = _mujs({
                      id: r.repository.id ?? r.id ?? 0,
                      name: r.repository.name ?? r.name,
                      description: isEmpty(r.repository.description)
                        ? i18n$('no_license')
                        : r.repository.description,
                      url: r.repository.html_url,
                      code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
                      page_url: `${r.repository.url}/contents/README.md`,
                      users: [
                        {
                          name: r.repository.owner.login,
                          url: r.repository.owner.html_url
                        }
                      ]
                    });
                    // if (bsFilter.match(ujs)) {
                    //   continue;
                    // }
                    Network.req(r.repository.url, 'GET', 'json', {
                      headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: `Bearer ${engine.token}`,
                        'X-GitHub-Api-Version': '2022-11-28'
                      }
                    }).then((repository) => {
                      ujs.code_updated_at = r.commit || repository.updated_at || Date.now();
                      ujs.created_at = repository.created_at;
                      ujs.daily_installs = repository.watchers_count ?? 0;
                      ujs.good_ratings = repository.stargazers_count ?? 0;
                      if (repository.license?.name) ujs.license = repository.license.name;
                      dispatch(ujs);
                    });
                    if (
                      !ujs._mujs.code.data_code_block &&
                      (cfg.preview.code || cfg.preview.metadata)
                    ) {
                      ujs._mujs.code.request().then(() => {
                        dispatch(ujs);
                      });
                    }
                    createjs(ujs, engine.name);
                  }
                } catch (ex) {
                  showError(ex);
                }
              };
              let netFN;
              if (/github/gi.test(engine.name)) {
                if (isEmpty(engine.token)) {
                  showError(`"${engine.name}" requires a token to use`);
                  continue;
                }
                netFN = Network.req(
                  toQuery(
                    `${engine.url}"// ==UserScript=="+${host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`
                  ),
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
                      .then((data) => {
                        for (const [key, value] of Object.entries(data.resources.code_search)) {
                          const txt = make('mujs-row', 'rate-info', {
                            textContent: `${key.toUpperCase()}: ${value}`
                          });
                          rateContainer.append(txt);
                        }
                      })
                      .catch(respError);
                  });
              } else if (/openuserjs/gi.test(engine.name)) {
                netFN = Network.req(toQuery(`${engine.url}${host}`), 'GET', 'document').then(
                  openuserjs
                );
              } else {
                netFN = Network.req(
                  toQuery(`${engine.url}/scripts/by-site/${host}.json?language=all`)
                ).then(forkFN);
              }
              if (netFN) {
                fetchRecords.push(netFN.catch(respError));
              }
            }
          } else {
            for (const ujs of hostCache) tabbody.append(ujs._mujs.root);
          }

          urlBar.placeholder = i18n$('search_placeholder');
          urlBar.value = '';

          if (isBlank(fetchRecords)) {
            this.sortRecords();
            return;
          }
          Promise.allSettled(fetchRecords).then(this.sortRecords).catch(showError);
        } catch (ex) {
          showError(ex);
        }
      }

      sortRecords() {
        const arr = this.toArr();
        for (const ujs of arr.flat().sort((a, b) => {
          const sortType = cfg.autoSort ?? 'daily_installs';
          return b[sortType] - a[sortType];
        })) {
          if (isElem(ujs._mujs.root)) tabbody.append(ujs._mujs.root);
        }
        for (const [name, value] of Object.entries(this.groupBy(arr)))
          Counter.update(value.length, { name });
      }

      toArr() {
        const h = this.intHost;
        return container.toArr().filter(({ _mujs }) => _mujs.info.host === h);
      }

      groupBy(arr) {
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
      // #endregion
    }
    const MUList = new List();
    // #endregion
    // #region Make Config
    const makecfg = () => {
      const cbtn = make('mu-js', 'mujs-sty-flex');
      const savebtn = make('mujs-btn', 'save', {
        textContent: i18n$('save'),
        dataset: {
          command: 'save'
        },
        disabled: false
      });
      const resetbtn = make('mujs-btn', 'reset', {
        textContent: i18n$('reset'),
        dataset: {
          command: 'reset'
        }
      });
      cbtn.append(resetbtn, savebtn);

      const makesection = (name, tag) => {
        tag = tag ?? i18n$('no_license');
        name = name ?? i18n$('no_license');
        const sec = make('mujs-section', {
          dataset: {
            name: tag
          }
        });
        const lb = make('label', {
          dataset: {
            command: tag
          }
        });
        const divDesc = make('mu-js', {
          textContent: name
        });
        ael(sec, 'click', (evt) => {
          /** @type { HTMLElement } */
          const target = evt.target.closest('[data-command]');
          if (!target) {
            return;
          }
          const cmd = target.dataset.command;
          if (cmd === tag) {
            const a = qsA(`[data-${tag}]`, sec);
            if (dom.cl.has(a, 'hidden')) {
              dom.cl.remove(a, 'hidden');
            } else {
              dom.cl.add(a, 'hidden');
            }
          }
        });

        lb.append(divDesc);
        sec.append(lb);
        cfgpage.append(sec);
        return sec;
      };
      const sections = {
        general: makesection('General', 'general'),
        load: makesection('Automation', 'load'),
        list: makesection('List', 'list'),
        filters: makesection('List Filters', 'filters'),
        blacklist: makesection('Blacklist (WIP)', 'blacklist'),
        engine: makesection('Search Engines', 'engine'),
        theme: makesection('Theme Colors', 'theme'),
        exp: makesection('Import / Export', 'exp')
      };
      const makeRow = (text, value, type = 'checkbox', tag = 'general', attrs = {}) => {
        const lb = make('label', 'sub-section hidden', {
          textContent: text,
          dataset: {
            [tag]: text
          }
        });
        cfgMap.set(text, value);
        if (type === 'select') {
          const inp = make('select', {
            dataset: {
              [tag]: text
            },
            ...attrs
          });
          for (const selV of Object.keys(template)) {
            if (selV === 'deleted' || selV === 'users') continue;
            const o = make('option', {
              value: selV,
              textContent: selV
            });
            inp.append(o);
          }
          inp.value = cfg[value];
          lb.append(inp);
          if (sections[tag]) {
            sections[tag].append(lb);
          }
          return lb;
        }
        const inp = make('input', {
          type,
          dataset: {
            [tag]: text
          },
          ...attrs
        });

        if (tag === 'engine') {
          inp.dataset.name = value;
        }

        if (sections[tag]) {
          sections[tag].append(lb);
        }

        if (type === 'checkbox') {
          const inlab = make('mu-js', 'mujs-inlab');
          const la = make('label', {
            onclick() {
              inp.dispatchEvent(new MouseEvent('click'));
            }
          });
          inlab.append(inp, la);
          lb.append(inlab);

          const nm = /^(\w+)-(.+)/.exec(value);
          if (nm) {
            if (nm[1] === 'filters') {
              inp.checked = cfg[nm[1]][nm[2]].enabled;
            } else {
              inp.checked = cfg[nm[1]][nm[2]];
            }
          } else {
            inp.checked = cfg[value];
          }
          ael(inp, 'change', (evt) => {
            container.unsaved = true;
            if (/filterlang/i.test(value)) {
              container.rebuild = true;
            }
            if (nm) {
              if (nm[1] === 'filters') {
                cfg[nm[1]][nm[2]].enabled = evt.target.checked;
              } else {
                cfg[nm[1]][nm[2]] = evt.target.checked;
              }
            } else {
              cfg[value] = evt.target.checked;
            }
          });

          if (tag === 'engine') {
            const engine = cfg.engines.find((engine) => engine.name === value);
            if (engine) {
              inp.checked = engine.enabled;
              inp.dataset.engine = engine.name;
              ael(inp, 'change', (evt) => {
                container.unsaved = true;
                container.rebuild = true;
                engine.enabled = evt.target.checked;
              });

              if (engine.query) {
                const d = DEFAULT_CONFIG.engines.find((e) => e.name === engine.name);
                const urlInp = make('input', {
                  type: 'text',
                  defaultValue: '',
                  value: decodeURIComponent(engine.query) ?? '',
                  placeholder: decodeURIComponent(d.query) ?? '',
                  dataset: {
                    name: nm,
                    engine: engine.name
                  },
                  onchange(evt) {
                    container.unsaved = true;
                    container.rebuild = true;
                    try {
                      engine.query = encodeURIComponent(new URL(evt.target.value).toString());
                    } catch (ex) {
                      err(ex);
                    }
                  }
                });
                lb.append(urlInp);
              }
              if (engine.name === 'github') {
                const ghToken = make('input', {
                  type: 'text',
                  defaultValue: '',
                  value: engine.token ?? '',
                  placeholder: 'Paste Access Token',
                  dataset: {
                    engine: 'github-token'
                  },
                  onchange(evt) {
                    container.unsaved = true;
                    container.rebuild = true;
                    engine.token = evt.target.value;
                  }
                });
                lb.append(ghToken);
                cfgMap.set('github-token', ghToken);
              }
            }
          }
        } else {
          if (type === 'text') {
            inp.defaultValue = '';
            inp.value = value ?? '';
            inp.placeholder = value ?? '';
          }

          lb.append(inp);
        }

        return lb;
      };
      if (isGM) {
        makeRow(i18n$('userjs_sync'), 'cache');
        makeRow(i18n$('userjs_autoinject'), 'autoinject', 'checkbox', 'load');
      }
      makeRow(i18n$('redirect'), 'sleazyredirect');
      makeRow(`${i18n$('dtime')} (ms)`, 'time', 'number', 'general', {
        defaultValue: 10000,
        value: cfg.time,
        min: 0,
        step: 500,
        onbeforeinput(evt) {
          if (evt.target.validity.badInput) {
            dom.cl.add(evt.target, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', true);
          } else {
            dom.cl.remove(evt.target, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', false);
          }
        },
        oninput(evt) {
          container.unsaved = true;
          const t = evt.target;
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

      makeRow(i18n$('auto_fetch'), 'autofetch', 'checkbox', 'load');
      makeRow(i18n$('userjs_fullscreen'), 'autoexpand', 'checkbox', 'load', {
        onchange(e) {
          if (e.target.checked) {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('collapse'));
          } else {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('expand'));
          }
        }
      });
      makeRow('Clear on Tab close', 'clearTabCache', 'checkbox', 'load');

      makeRow('Default Sort', 'autoSort', 'select', 'list');
      makeRow(i18n$('filter'), 'filterlang', 'checkbox', 'list');
      makeRow(i18n$('preview_code'), 'preview-code', 'checkbox', 'list');
      makeRow('Preview Metadata', 'preview-metadata', 'checkbox', 'list');
      makeRow('Recommend author', 'recommend-author', 'checkbox', 'list');
      makeRow('Recommend scripts', 'recommend-others', 'checkbox', 'list');

      for (const [k, v] of Object.entries(cfg.filters)) {
        makeRow(v.name, `filters-${k}`, 'checkbox', 'filters');
      }

      makeRow('Greasy Fork', 'greasyfork', 'checkbox', 'engine');
      makeRow('Sleazy Fork', 'sleazyfork', 'checkbox', 'engine');
      makeRow('Open UserJS', 'openuserjs', 'checkbox', 'engine');
      makeRow('GitHub API', 'github', 'checkbox', 'engine');

      for (const [k, v] of Object.entries(cfg.theme)) {
        const lb = make('label', 'hidden', {
          textContent: k,
          dataset: {
            theme: k
          }
        });
        const inp = make('input', {
          type: 'text',
          defaultValue: '',
          value: v ?? '',
          placeholder: v ?? '',
          dataset: {
            theme: k
          },
          onchange(evt) {
            let isvalid = true;
            try {
              const val = evt.target.value;
              const sty = container.root.style;
              const str = `--mujs-${k}`;
              const prop = sty.getPropertyValue(str);
              if (isEmpty(val)) {
                cfg.theme[k] = DEFAULT_CONFIG.theme[k];
                sty.removeProperty(str);
                return;
              }
              if (prop === val) {
                return;
              }
              sty.removeProperty(str);
              sty.setProperty(str, val);
              cfg.theme[k] = val;
            } catch (ex) {
              err(ex);
              isvalid = false;
            } finally {
              if (isvalid) {
                dom.cl.remove(evt.target, 'mujs-invalid');
                dom.prop(savebtn, 'disabled', false);
              } else {
                dom.cl.add(evt.target, 'mujs-invalid');
                dom.prop(savebtn, 'disabled', true);
              }
            }
          }
        });
        cfgMap.set(k, inp);
        lb.append(inp);
        sections.theme.append(lb);
      }

      // const blacklist = make('textarea', {
      //   dataset: {
      //     name: 'blacklist'
      //   },
      //   rows: '10',
      //   autocomplete: false,
      //   spellcheck: false,
      //   wrap: 'soft',
      //   value: JSON.stringify(cfg.blacklist, null, ' '),
      //   oninput(evt) {
      //     let isvalid = true;
      //     try {
      //       cfg.blacklist = JSON.parse(evt.target.value);
      //       isvalid = true;
      //     } catch (ex) {
      //       err(ex);
      //       isvalid = false;
      //     } finally {
      //       if (isvalid) {
      //         dom.cl.remove(evt.target, 'mujs-invalid');
      //         dom.prop(savebtn, 'disabled', false);
      //       } else {
      //         dom.cl.add(evt.target, 'mujs-invalid');
      //         dom.prop(savebtn, 'disabled', true);
      //       }
      //     }
      //   }
      // });
      // cfgMap.set('blacklist', blacklist);
      // const addList = make('mujs-add', {
      //   textContent: '+',
      //   dataset: {
      //     command: 'new-list'
      //   }
      // });
      // const n = make('input', {
      //   type: 'text',
      //   defaultValue: '',
      //   value: '',
      //   placeholder: 'Name',
      // });
      // const inpValue = make('input', {
      //   type: 'text',
      //   defaultValue: '',
      //   value: '',
      //   placeholder: 'Value',
      // });
      // const label = make('label', 'new-list hidden', {
      //   dataset: {
      //     blacklist: 'new-list'
      //   }
      // });
      // label.append(n, inpValue, addList);
      // listSec.append(label);
      // ael(addList, 'click', () => {
      //   if (isEmpty(n.value) || isEmpty(inpValue.value)) {
      //     return
      //   };
      //   createList(n.value, n.value, inpValue.value);
      // });
      const createList = (key, v = '', disabled = false, type = 'String') => {
        let txt = key;
        if (typeof key === 'string') {
          if (key.startsWith('userjs-')) {
            disabled = true;
            const s = key.substring(7);
            txt = `Built-in "${s}"`;
            v = builtinList[s];
          }
        } else {
          if (!key.enabled) {
            return;
          }
        }

        if (isRegExp(v)) {
          v = v.toString();
          type = 'RegExp';
        } else {
          v = JSON.stringify(v);
          type = 'Object';
        }

        const lb = make('label', 'hidden', {
          textContent: txt,
          dataset: {
            blacklist: key
          }
        });
        const inp = make('input', {
          type: 'text',
          defaultValue: '',
          value: v ?? '',
          placeholder: v ?? '',
          dataset: {
            blacklist: key
          },
          onchange(evt) {
            let isvalid = true;
            try {
              const val = evt.target.value;
              if (isEmpty(val)) {
                return;
              }
              isvalid = true;
            } catch (ex) {
              err(ex);
              isvalid = false;
            } finally {
              if (isvalid) {
                dom.cl.remove(evt.target, 'mujs-invalid');
                dom.prop(savebtn, 'disabled', false);
              } else {
                dom.cl.add(evt.target, 'mujs-invalid');
                dom.prop(savebtn, 'disabled', true);
              }
            }
          }
        });
        const selType = make('select', {
          disabled,
          dataset: {
            blacklist: key
          }
        });
        if (disabled) {
          inp.readOnly = true;
          const o = make('option', {
            value: type,
            textContent: type
          });
          selType.append(o);
        } else {
          for (const selV of ['String', 'RegExp', 'Object']) {
            const o = make('option', {
              value: selV,
              textContent: selV
            });
            selType.append(o);
          }
        }
        selType.value = type;
        lb.append(inp, selType);
        sections.blacklist.append(lb);
      };
      for (const key of cfg.blacklist) {
        createList(key);
      }

      const transfers = {
        export: {
          cfg: make('mujs-btn', 'mujs-export sub-section hidden', {
            textContent: i18n$('export_config'),
            dataset: {
              command: 'export-cfg',
              exp: 'export-cfg'
            }
          }),
          theme: make('mujs-btn', 'mujs-export sub-section hidden', {
            textContent: i18n$('export_theme'),
            dataset: {
              command: 'export-theme',
              exp: 'export-theme'
            }
          })
        },
        import: {
          cfg: make('mujs-btn', 'mujs-import sub-section hidden', {
            textContent: i18n$('import_config'),
            dataset: {
              command: 'import-cfg',
              exp: 'import-cfg'
            }
          }),
          theme: make('mujs-btn', 'mujs-import sub-section hidden', {
            textContent: i18n$('import_theme'),
            dataset: {
              command: 'import-theme',
              exp: 'import-theme'
            }
          })
        }
      };
      for (const value of Object.values(transfers)) {
        for (const v of Object.values(value)) {
          sections.exp.append(v);
        }
      }

      cfgpage.append(cbtn);
    };
    // #endregion
    container.tab.custom = (host) => {
      MUList.host = host;
      respHandles.build();
    };
    ael(mainframe, 'mouseenter', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      evt.target.style.opacity = container.opacityMax;
      frameTimeout.clear(...frameTimeout.ids);
    });
    ael(mainframe, 'mouseleave', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      evt.target.style.opacity = container.opacityMin;
      timeoutFrame();
    });
    ael(mainframe, 'click', (evt) => {
      evt.preventDefault();
      frameTimeout.clear(...frameTimeout.ids);
      dom.cl.remove(main, 'hidden');
      dom.cl.add(mainframe, 'hidden');
      if (cfg.autoexpand) {
        dom.cl.add([btnfullscreen, main], 'expanded');
        dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('collapse'));
      }
      if (dom.cl.has(mainframe, 'error')) {
        tab.create('mujs:settings');
      }
    });
    ael(urlBar, 'input', (evt) => {
      evt.preventDefault();
      if (urlBar.placeholder === i18n$('newTab')) {
        return;
      }
      /**
       * @type { string }
       */
      const val = evt.target.value;
      const section = qsA('mujs-section[data-name]', cfgpage);
      if (isEmpty(val)) {
        dom.cl.remove(container.toElem(), 'hidden');
        dom.cl.remove(section, 'hidden');
        return;
      }
      const finds = new Set();
      if (!dom.cl.has(cfgpage, 'hidden')) {
        const reg = new RegExp(val, 'gi');
        for (const elem of section) {
          if (!isElem(elem)) {
            continue;
          }
          if (finds.has(elem)) {
            continue;
          }
          if (elem.dataset.name.match(reg)) {
            finds.add(elem);
          }
        }
        dom.cl.add(section, 'hidden');
        dom.cl.remove([...finds], 'hidden');
        return;
      }
      const cacheValues = container.toArr().filter(({ _mujs }) => {
        return !finds.has(_mujs.root);
      });
      /**
       * @param {RegExpMatchArray} regExp
       * @param {keyof import("../typings/types.d.ts").GSForkQuery} key
       */
      const ezQuery = (regExp, key) => {
        const q_value = val.replace(regExp, '');
        const reg = new RegExp(q_value, 'gi');
        for (const v of cacheValues) {
          let k = v[key];
          if (typeof k === 'number') {
            k = `${v[key]}`;
          }
          if (k && k.match(reg)) {
            finds.add(v._mujs.root);
          }
        }
      };
      if (val.match(/^(code_url|url):/)) {
        ezQuery(/^(code_url|url):/, 'code_url');
      } else if (val.match(/^(author|users?):/)) {
        const parts = /^[\w_]+:(.+)/.exec(val);
        if (parts) {
          const reg = new RegExp(parts[1], 'gi');
          for (const v of cacheValues.filter((v) => !isEmpty(v.users))) {
            for (const user of v.users) {
              for (const value of Object.values(user)) {
                if (typeof value === 'string' && value.match(reg)) {
                  finds.add(v._mujs.root);
                } else if (typeof value === 'number' && `${value}`.match(reg)) {
                  finds.add(v._mujs.root);
                }
              }
            }
          }
        }
      } else if (val.match(/^(locale|i18n):/)) {
        ezQuery(/^(locale|i18n):/, 'locale');
      } else if (val.match(/^id:/)) {
        ezQuery(/^id:/, 'id');
      } else if (val.match(/^license:/)) {
        ezQuery(/^license:/, 'license');
      } else if (val.match(/^name:/)) {
        ezQuery(/^name:/, 'name');
      } else if (val.match(/^description:/)) {
        ezQuery(/^description:/, 'description');
      } else if (val.match(/^(search_engine|engine):/)) {
        const parts = /^[\w_]+:(\w+)/.exec(val);
        if (parts) {
          const reg = new RegExp(parts[1], 'gi');
          for (const { _mujs } of cacheValues) {
            if (!_mujs.info.engine.name.match(reg)) {
              continue;
            }
            finds.add(_mujs.root);
          }
        }
      } else if (val.match(/^filter:/)) {
        const parts = /^\w+:(.+)/.exec(val);
        if (parts) {
          const bsFilter = loadFilters();
          const filterType = bsFilter.get(parts[1].trim().toLocaleLowerCase());
          if (filterType) {
            const { reg } = filterType;
            for (const { name, users, _mujs } of cacheValues) {
              if ([{ name }, ...users].find((o) => o.name.match(reg))) {
                continue;
              }
              finds.add(_mujs.root);
            }
          }
        }
      } else if (val.match(/^recommend:/)) {
        for (const { url, id, users, _mujs } of cacheValues) {
          if (
            users.find((u) => u.id === authorID) ||
            goodUserJS.includes(url) ||
            goodUserJS.includes(id)
          ) {
            finds.add(_mujs.root);
          }
        }
      } else {
        const reg = new RegExp(val, 'gi');
        for (const v of cacheValues) {
          if (v.name && v.name.match(reg)) finds.add(v._mujs.root);
          if (v.description && v.description.match(reg)) finds.add(v._mujs.root);
          if (v._mujs.code.data_meta) {
            for (const key of Object.keys(v._mujs.code.data_meta)) {
              if (/name|desc/i.test(key) && key.match(reg)) finds.add(v._mujs.root);
            }
          }
        }
      }
      dom.cl.add(qsA('tr[data-engine]', tabbody), 'hidden');
      dom.cl.remove([...finds], 'hidden');
    });
    ael(urlBar, 'change', (evt) => {
      evt.preventDefault();
      const val = evt.target.value;
      const tabElem = tab.getActive();
      if (urlBar.placeholder === i18n$('newTab') && tabElem) {
        const tabHost = tabElem.firstElementChild;
        if (tab.protoReg.test(val)) {
          const createdTab = tab.getTab(val);
          tab.close(tabElem);
          if (createdTab) {
            tab.active(createdTab);
          } else {
            tab.create(val);
          }
          evt.target.placeholder = i18n$('search_placeholder');
          evt.target.value = '';
          return;
        } else if (val === '*') {
          tabElem.dataset.host = val;
          tabHost.title = '<All Sites>';
          tabHost.textContent = '<All Sites>';
          MUList.host = val;
          respHandles.build();
          return;
        }
        const value = container.getHost(val);
        if (container.checkBlacklist(value)) {
          showError(`Blacklisted "${value}"`);
          return;
        }
        tabElem.dataset.host = value;
        tabHost.title = value;
        tabHost.textContent = value;
        MUList.host = value;
        respHandles.build();
      }
    });
    scheduler.postTask(makecfg, { priority: 'background' });

    respHandles.build = async () => {
      const time = await scheduler.postTask(MUList.build, { priority: 'background' });
      return timeoutFrame(time);
    };

    if (cfg.autofetch) {
      respHandles.build();
    }
    dbg('Container', container);
  } catch (ex) {
    err(ex);
    container.remove();
  }
  return respHandles;
}
// #endregion
/**
 * @template { Function } F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (isFN(onDomReady)) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomReady(document);
    } else {
      document.addEventListener('DOMContentLoaded', (evt) => onDomReady(evt.target), {
        once: true
      });
    }
  }
};

const init = async (prefix = 'Config') => {
  const stored = await StorageSystem.getValue(prefix, DEFAULT_CONFIG);
  cfg = {
    ...DEFAULT_CONFIG,
    ...stored
  };
  info('Config:', cfg);
  loadDOM((doc) => {
    try {
      if (window.location === null) {
        throw new Error('"window.location" is null, reload the webpage or use a different one', {
          cause: 'loadDOM'
        });
      }
      if (doc === null) {
        throw new Error('"doc" is null, reload the webpage or use a different one', {
          cause: 'loadDOM'
        });
      }
      container.redirect();

      if (cfg.autoinject) container.inject(primaryFN, doc);

      Command.register(i18n$('userjs_inject'), () => {
        container.inject(primaryFN, doc);
      });
      Command.register(i18n$('userjs_close'), () => {
        container.remove();
      });
    } catch (ex) {
      err(ex);
    }
  });
};
init();
