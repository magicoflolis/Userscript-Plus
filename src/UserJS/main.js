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
  userjs.safeSelf = safe;
  return userjs.safeSelf;
}

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
  codePreview: false,
  autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  time: 10000,
  blacklist: ['userjs-local', 'userjs-finance', 'userjs-social', 'userjs-unsupported'],
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
  cfg: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="currentColor"></path></g>'
  },
  close: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" fill="currentColor"></path></g>'
  },
  filter: {
    viewBox: '0 0 24 24',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="currentColor"/></g>'
  },
  fsClose: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z" fill="currentColor"></path> <path d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z" fill="currentColor"></path> <path d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z" fill="currentColor"></path> <path d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z" fill="currentColor"></path></g>'
  },
  fsOpen: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z" fill="currentColor"></path> <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z" fill="currentColor"></path> <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z" fill="currentColor"></path> <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z" fill="currentColor"></path></g>'
  },
  fullscreen: {
    viewBox: '0 0 96 96',
    html: '<g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g>'
  },
  gf: {
    viewBox: '0 0 510.4 510.4',
    html: '<g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g>'
  },
  gh: {
    viewBox: '0 0 16 16',
    html: '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>'
  },
  hide: {
    viewBox: '0 0 24 24',
    html: '<g> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5L21 10.5C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="currentColor"></path></g>'
  },
  install: {
    viewBox: '0 0 16 16',
    html: '<g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g>'
  },
  issue: {
    viewBox: '0 0 24 24',
    html: '<path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/>'
  },
  nav: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="currentColor"></path> <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="currentColor"></path><path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="currentColor"></path></g>'
  },
  plus: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="currentColor"/></g>'
  },
  search: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill="currentColor"/></g>'
  },
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  refresh: {
    viewBox: '0 0 1024 1024',
    fill: 'currentColor',
    html: '<path d="M981.314663 554.296783a681.276879 681.276879 0 0 1-46.986468 152.746388q-105.706098 230.734238-360.983096 242.19829a593.06288 593.06288 0 0 1-228.689008-33.853939v-1.022615l-31.808709 79.979258a55.759429 55.759429 0 0 1-20.506122 22.551352 40.043451 40.043451 0 0 1-21.04434 5.382184 51.076928 51.076928 0 0 1-19.483507-5.382184 95.210839 95.210839 0 0 1-13.347817-7.158305 52.314831 52.314831 0 0 1-5.382184-4.628679L71.671707 731.908862a57.427906 57.427906 0 0 1-7.158305-21.528737 46.932646 46.932646 0 0 1 1.022615-17.438277 35.952991 35.952991 0 0 1 7.158305-13.347816 74.435608 74.435608 0 0 1 10.279972-10.279972 60.495751 60.495751 0 0 1 11.248765-7.373593 50.431066 50.431066 0 0 1 8.18092-3.606063 6.189512 6.189512 0 0 0 3.067845-1.776121l281.003839-74.866183a91.497132 91.497132 0 0 1 35.899168-2.583448 122.337047 122.337047 0 0 1 22.174599 6.404799 21.528737 21.528737 0 0 1 12.325202 12.325202 76.157907 76.157907 0 0 1 4.628679 14.854829 47.63233 47.63233 0 0 1 0 14.370431 55.167388 55.167388 0 0 1-2.04523 10.764369 10.764368 10.764368 0 0 0-1.022615 3.606063l-32.831324 79.979258a677.50935 677.50935 0 0 0 164.264262 39.505232q77.395809 7.696523 131.809692-3.606063a358.507291 358.507291 0 0 0 101.023598-36.921784 381.27393 381.27393 0 0 0 73.951211-50.753997 352.64071 352.64071 0 0 0 48.708767-55.382676 410.391547 410.391547 0 0 0 26.910921-41.550462c3.767529-7.481236 6.673908-13.616926 8.719139-18.460892zM40.885614 449.667121a685.69027 685.69027 0 0 1 63.563595-176.427998q118.0313-212.273346 374.330913-207.160271a571.803252 571.803252 0 0 1 207.160271 39.989629l33.853939-78.956643A75.619688 75.619688 0 0 1 735.187378 9.189165a37.67529 37.67529 0 0 1 15.393047-8.234742 42.303968 42.303968 0 0 1 14.854829-0.538219 47.578509 47.578509 0 0 1 13.347817 3.606064 102.907362 102.907362 0 0 1 11.302586 6.13569 49.569917 49.569917 0 0 1 6.673909 4.628678l3.067845 3.067845 154.84544 276.913379a81.970666 81.970666 0 0 1 6.13569 22.712817 46.986468 46.986468 0 0 1-1.022615 17.438277 32.293105 32.293105 0 0 1-7.696523 13.347817 69.322533 69.322533 0 0 1-10.764369 9.741753 92.142994 92.142994 0 0 1-11.302587 6.673909l-8.18092 4.09046a7.104483 7.104483 0 0 1-3.067845 1.022615l-283.049068 67.546412a112.003254 112.003254 0 0 1-46.125319-1.022615c-11.571696-3.390776-19.160576-8.019454-22.551352-13.832214a41.173709 41.173709 0 0 1-5.382184-21.04434 97.256069 97.256069 0 0 1 1.291724-17.438277 24.381295 24.381295 0 0 1 3.067845-8.234742L600.632773 296.81309a663.730958 663.730958 0 0 0-164.102797-43.057474q-77.987849-9.203535-131.809692 0a348.227319 348.227319 0 0 0-101.292707 33.853938 368.571976 368.571976 0 0 0-75.350579 49.246986 383.31916 383.31916 0 0 0-50.269601 54.360061 408.507783 408.507783 0 0 0-28.740863 41.012244A113.025869 113.025869 0 0 0 40.885614 449.667121z m0 0" fill="#ffffff" p-id="2275"></path>'
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
      this.shadowRoot = this.frame.attachShadow({
        mode: 'closed'
        // clonable: false,
        // delegatesfocus: false
      });
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
        return new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            Object.is(reason, null) || Object.is(reason, undefined) ? resolve() : reject(reason);
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
    const { cfgpage, table, exBtn, supported, frame, refresh, cache, urlBar, host } = this;

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
          dom.cl.remove([cfgpage, exBtn], 'hidden');
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
        dom.cl.add([cfgpage, exBtn], 'hidden');
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
    const getCellValue = (tr, idx) =>
      tr.children[idx].dataset.value || tr.children[idx].innerText || tr.children[idx].textContent;
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
      this.exBtn = make('mujs-column', 'mujs-sty-flex hidden');
      this.fsearch = make('mujs-btn', 'hidden');
      this.exportCFG = make('mujs-btn', 'mujs-export', {
        textContent: i18n$('export_config'),
        dataset: {
          command: 'export-cfg'
        }
      });
      this.importCFG = make('mujs-btn', 'mujs-import', {
        textContent: i18n$('import_config'),
        dataset: {
          command: 'import-cfg'
        }
      });
      this.exportTheme = make('mujs-btn', 'mujs-export', {
        textContent: i18n$('export_theme'),
        dataset: {
          command: 'export-theme'
        }
      });
      this.importTheme = make('mujs-btn', 'mujs-import', {
        textContent: i18n$('import_theme'),
        dataset: {
          command: 'import-theme'
        }
      });
      this.btnHandles = make('mujs-column', 'btn-handles');
      this.btnHide = make('mujs-btn', 'hide-list', {
        title: i18n$('min'),
        innerHTML: iconSVG.load('hide'),
        dataset: {
          command: 'hide-list'
        }
      });
      this.btnfullscreen = make('mujs-btn', 'fullscreen', {
        title: i18n$('max'),
        innerHTML: iconSVG.load('fullscreen'),
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
        innerHTML: iconSVG.load('cfg'),
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
        innerHTML: iconSVG.load('gh'),
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
        innerHTML: iconSVG.load('gf'),
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

      this.btnHandles.append(this.btnHide, this.btnfullscreen, this.closebtn);
      this.btnframe.append(this.btnhome, this.btngreasy, this.btnissue, this.btncfg, this.btnnav);
      this.toolbar.append(this.btnHandles);
      this.urlContainer.append(this.urlBar);
      this.header.append(this.urlContainer, this.rateContainer, this.countframe, this.btnframe);
      this.tbody.append(this.table, this.cfgpage);
      this.main.append(this.toolbar, this.header, this.tbody, this.footer, this.promptElem);
      this.mainframe.append(this.mainbtn);
      this.exBtn.append(this.importCFG, this.importTheme, this.exportCFG, this.exportTheme);
      this.header.append(this.exBtn);
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
      btncfg,
      btnhome,
      btnissue,
      btngreasy,
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
    // #region Main event handlers
    ael(main, 'click', async (evt) => {
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
          if (dom.cl.has(btngreasy, 'hidden')) {
            dom.cl.remove([btncfg, btngreasy, btnhome, btnissue], 'hidden');
          } else {
            dom.cl.add([btncfg, btngreasy, btnhome, btnissue], 'hidden');
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
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsOpen'));
          } else {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsClose'));
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
        } else if (cmd === 'load-userjs') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          const codeArea = qs('textarea', target.parentElement.parentElement);
          if (!isEmpty(codeArea.value)) {
            dom.cl.toggle(codeArea, 'hidden');
            return;
          }
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          const r = await dataUserJS._mujs.code.request();
          const txt = r.data;
          if (typeof txt !== 'string') {
            return;
          }
          const code_obj = new ParseUserJS(txt);
          codeArea.value = code_obj.get_code_block();
          dom.cl.remove(codeArea, 'hidden');
          const apTo = (name, elem, root) => {
            const n = dataUserJS._mujs.code[name];
            if (isEmpty(n)) {
              const el = make('mujs-a', {
                textContent: i18n$('listing_none')
              });
              elem.append(el);
              return;
            }
            dom.prop(elem, 'innerHTML', '');
            dom.cl.remove(root, 'hidden');
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
                if (name === 'resource') {
                  for (const [k, v] of Object.entries(c)) {
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
                    textContent: c.text
                  });
                  if (c.domain) {
                    el.dataset.command = 'open-tab';
                    el.dataset.webpage = `https://${c.text}`;
                  }
                  elem.append(el);
                }
              } else {
                const el = make('mujs-a', {
                  textContent: c
                });
                elem.append(el);
              }
            }
          };
          for (const e of qsA(
            'mujs-column[data-el="matches"]',
            target.parentElement.parentElement
          )) {
            apTo(e.dataset.type, qs('.mujs-grants', e), e);
          }
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
    // #endregion
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
       * @type { { [meta: string]: any } }
       */
      data_meta;
      /**
       * @type { string[] }
       */
      data_names;
      constructor(code) {
        this.code = code;
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
        const start_block = this.code.indexOf(META_START_COMMENT);
        if (isNull(start_block)) {
          return null;
        }
        const end_block = this.code.indexOf(META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return null;
        }
        const meta_block = this.code.substring(start_block + META_START_COMMENT.length, end_block);
        this.data_meta_block = meta_block;
        return meta_block;
      }
      get_code_block() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_code_block) {
          return this.data_code_block;
        }
        const start_block = this.code.indexOf(META_START_COMMENT);
        if (isNull(start_block)) {
          return null;
        }
        const end_block = this.code.indexOf(META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return null;
        }
        const code_block = this.code.substring(
          end_block + META_END_COMMENT.length,
          this.code.length
        );
        const lines = [];
        for (const l of code_block.split('\n')) {
          if (isEmpty(l)) {
            continue;
          }
          lines.push(l);
        }
        const clean_code = lines.join('\n');
        this.data_code_block = clean_code;
        return clean_code;
      }
      parse_meta() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_meta) {
          return this.data_meta;
        }
        const meta = {};
        const meta_block = this.get_meta_block();
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
        this.data_meta = meta;
        return this.data_meta;
      }
      /**
       * @returns { string[] }
       */
      calculate_applies_to_names() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_names) {
          return this.data_names;
        }
        const meta = this.parse_meta();
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
        if (this.intersect(patterns, APPLIES_TO_ALL_PATTERNS)) {
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
        const arr = [...name_set];
        this.data_names = arr;
        return this.data_names;
      }
      intersect(a = [], b = []) {
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
      }
      // intersect(a, ...arr) {
      //   return [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));
      // }
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
        textContent: ujs.daily_installs
      });
      const fupdated = make('td', 'mujs-list', {
        textContent: language.toDate(ujs.code_updated_at),
        dataset: {
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
          value: new Date(ujs.created_at).toISOString()
        }
      });
      const flicense = make('mu-js', 'mujs-list', {
        title: ujs.license ?? i18n$('no_license'),
        textContent: `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`,
        style:
          'text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: fit-content; max-width: 20em;'
      });
      const ftotal = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`
      });
      const fratings = make('mu-js', 'mujs-list', {
        title: i18n$('ratings'),
        textContent: `${i18n$('ratings')}:`
      });
      const fgood = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('good'),
        textContent: ujs.good_ratings,
        dataset: {
          el: 'good'
        }
      });
      const fok = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('ok'),
        textContent: ujs.ok_ratings,
        dataset: {
          el: 'ok'
        }
      });
      const fbad = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('bad'),
        textContent: ujs.bad_ratings,
        dataset: {
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
        innerHTML: `${iconSVG.load('install')} ${i18n$('saveFile')}`,
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
        innerHTML: `${iconSVG.load('search')} ${i18n$('preview_code')}`,
        dataset: {
          command: 'load-userjs',
          userjs: ujs.id
        }
      });
      if (engine) {
        tr.dataset.engine = engine;
        // if (engine.includes('fork')) {
        //   fdaily.dataset.command = 'open-tab';
        //   fdaily.dataset.webpage = `${ujs.url}/stats`;
        //   fupdated.dataset.command = 'open-tab';
        //   fupdated.dataset.webpage = `${ujs.url}/versions`;
        // }
        if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
          tr.dataset.good = 'upsell';
        }
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
      if (engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.id)) {
        tr.dataset.good = 'upsell';
      }
      eframe.append(scriptInstall);
      ratings.append(fratings, fgood, fok, fbad);
      jsInfo.append(ftotal, ratings, fver, fcreated);
      mkList(i18n$('code_size'), {
        list: ujs._mujs.code.code_size,
        type: 'size',
        root: jsInfo
      });

      jsInfoB.append(flicense);
      mkList(i18n$('antifeatures'), {
        list: ujs._mujs.code.antifeatures,
        type: 'antifeatures',
        root: jsInfoB
      });
      mkList(i18n$('applies_to'), {
        list: ujs._mujs.code.match,
        type: 'match',
        root: jsInfoB
      });
      mkList('@grant', {
        list: ujs._mujs.code.grant,
        type: 'grant',
        root: jsInfoB
      });
      mkList('@require', {
        list: ujs._mujs.code.meta?.require,
        type: 'require',
        root: jsInfoB
      });
      const script_resources = ujs._mujs.code.meta?.resource;
      mkList('@resource', {
        list: isNull(script_resources) ? [] : [script_resources],
        type: 'resource',
        root: jsInfoB
      });
      fmore.append(jsInfo, jsInfoB);
      fBtns.append(scriptDownload, loadCode);
      fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

      const code_data = ujs._mujs.code.data;
      if (code_data) {
        const code_obj = new ParseUserJS(code_data);
        codeArea.value = code_obj.get_code_block();
      }

      if (ujs._mujs.code?.translated) tr.classList.add('translated');

      for (const e of [fname, uframe, fdaily, fupdated, eframe]) tr.append(e);
      ujs._mujs.root = tr;

      return tr;
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
        this.sortRecords = this.sortRecords.bind(this);
        if (isEmpty(hostname)) hostname = container.host;
        this.engines = cfg.engines;
        this.host = hostname;
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
          const { blacklisted, engines, host, toArr } = this;
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
                      antifeatures: [],
                      grant: [],
                      match: [],
                      meta: {},
                      request: async function (translate = false, code_url) {
                        if (this.data) {
                          return this;
                        }
                        this.data = '';
                        /** @type { string } */
                        const code = await Network.req(code_url ?? d.code_url, 'GET', 'text').catch(
                          showError
                        );
                        if (typeof code !== 'string') {
                          return this;
                        }
                        Object.assign(this, {
                          data: code,
                          code_size: [Network.format(code.length)]
                        });
                        const grantSet = new Set();
                        const afSet = new Set();
                        const code_obj = new ParseUserJS(code);
                        const meta = code_obj.parse_meta();
                        const applies_to_names = code_obj.calculate_applies_to_names();

                        if (translate) {
                          for (const k of userjs.pool.keys()) {
                            if (meta[`name:${k}`]) {
                              Object.assign(obj, {
                                name: meta[`name:${k}`]
                              });
                              this.translated = true;
                            }
                            if (meta[`description:${k}`]) {
                              Object.assign(obj, {
                                description: meta[`description:${k}`]
                              });
                              this.translated = true;
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
                        if (typeof meta.require === 'string') {
                          const s = meta.require;
                          meta.require = [s];
                        }
                        if (meta.resource) {
                          const obj = {};
                          if (typeof meta.resource === 'string') {
                            const reg = /(.+)\s+(.+)/.exec(meta.resource);
                            if (reg) {
                              obj[reg[1].trim()] = reg[2];
                            }
                          } else {
                            for (const r of meta.resource) {
                              const reg = /(.+)\s+(http.+)/.exec(r);
                              if (reg) {
                                obj[reg[1].trim()] = reg[2];
                              }
                            }
                          }
                          meta.resource = obj;
                        }
                        Object.assign(this, {
                          meta,
                          match: applies_to_names,
                          grant: [...grantSet],
                          antifeatures: [...afSet]
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
                  if (cfg.codePreview && !ujs._mujs.code.data) {
                    await ujs._mujs.code.request();
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
                    for (const i of qsA('.col-sm-8 .tr-link', selected)) {
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
                      if (cfg.codePreview && !ujs._mujs.code.data) {
                        await ujs._mujs.code.request();
                      }
                      createjs(ujs, engine.name);
                    }
                  }
                } catch (ex) {
                  showError(ex);
                }
              };
              const gitFN = async (data) => {
                try {
                  if (isBlank(data.items)) {
                    showError('Invalid data received from the server, TODO fix this');
                    return;
                  }
                  for (const r of data.items) {
                    const ujs = _mujs({
                      name: r.name,
                      description: isEmpty(r.repository.description)
                        ? i18n$('no_license')
                        : r.repository.description,
                      url: r.html_url,
                      code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
                      code_updated_at: r.commit || Date.now(),
                      total_installs: r.score,
                      users: [
                        {
                          name: r.repository.owner.login,
                          url: r.repository.owner.html_url
                        }
                      ]
                    });
                    if (bsFilter.match(ujs)) {
                      continue;
                    }
                    if (cfg.codePreview && !ujs._mujs.code.data) {
                      await ujs._mujs.code.request();
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
            const a = qsA(`label[data-${tag}]`, sec);
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
        // engine: makesection('Search Engine', 'engine'),
        theme: makesection('Theme Colors', 'theme')
      };

      const makerow = (desc, type = null, nm, attrs = {}) => {
        desc = desc ?? i18n$('no_license');
        nm = nm ?? i18n$('no_license');
        const sec = make('mujs-section', {
          dataset: {
            name: nm
          }
        });
        const lb = make('label');
        const divDesc = make('mu-js', {
          textContent: desc
        });
        lb.append(divDesc);
        sec.append(lb);
        cfgpage.append(sec);
        if (isNull(type)) {
          return lb;
        }
        const inp = make('input', {
          type,
          dataset: {
            name: nm
          },
          ...attrs
        });
        if (!cfgMap.has(nm)) {
          cfgMap.set(nm, inp);
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
          if (nm.includes('-')) {
            return inp;
          }
          if (/(greasy|sleazy)fork|openuserjs|gi(thub|st)/gi.test(nm)) {
            const engine = cfg.engines.find((engine) => engine.name === nm);
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
                sec.append(urlInp);
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
                sec.append(ghToken);
                cfgMap.set('github-token', ghToken);
              }
            }
          } else {
            inp.checked = cfg[nm];
            ael(inp, 'change', (evt) => {
              container.unsaved = true;
              if (/filterlang/i.test(nm)) {
                container.rebuild = true;
              }
              cfg[nm] = evt.target.checked;
            });
          }
        } else {
          lb.append(inp);
        }
        return inp;
      };
      const mkSection = (text, value, type = 'checkbox', tag = 'general', attrs = {}) => {
        cfgMap.set(text, value);
        const lb = make('label', 'sub-section hidden', {
          textContent: text,
          dataset: {
            [tag]: text
          }
        });
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
        mkSection(i18n$('userjs_sync'), 'cache');
        mkSection(i18n$('userjs_autoinject'), 'autoinject', 'checkbox', 'load');
      }
      mkSection(i18n$('redirect'), 'sleazyredirect');
      mkSection(`${i18n$('dtime')} (ms)`, 'time', 'number', 'general', {
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

      mkSection(i18n$('auto_fetch'), 'autofetch', 'checkbox', 'load');
      mkSection(i18n$('userjs_fullscreen'), 'autoexpand', 'checkbox', 'load', {
        onchange(e) {
          if (e.target.checked) {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsClose'));
          } else {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsOpen'));
          }
        }
      });
      mkSection('Clear on Tab close', 'clearTabCache', 'checkbox', 'load');

      mkSection('Default Sort', 'autoSort', 'select', 'list');
      mkSection(i18n$('filter'), 'filterlang', 'checkbox', 'list');
      mkSection(i18n$('preview_code'), 'codePreview', 'checkbox', 'list');
      mkSection('Recommend author', 'recommend-author', 'checkbox', 'list');
      mkSection('Recommend scripts', 'recommend-others', 'checkbox', 'list');

      for (const [k, v] of Object.entries(cfg.filters)) {
        mkSection(v.name, `filters-${k}`, 'checkbox', 'filters');
      }

      makerow('Greasy Fork', 'checkbox', 'greasyfork');
      makerow('Sleazy Fork', 'checkbox', 'sleazyfork');
      makerow('Open UserJS', 'checkbox', 'openuserjs');
      makerow('GitHub API', 'checkbox', 'github');

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

      for (const key of cfg.blacklist) {
        createList(key);
      }

      cbtn.append(resetbtn, savebtn);
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
        dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsClose'));
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
          const code_data = v._mujs.code.data;
          if (code_data) {
            const code_obj = new ParseUserJS(code_data);
            const meta = code_obj.parse_meta(code_data);
            for (const key of Object.keys(meta)) {
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
