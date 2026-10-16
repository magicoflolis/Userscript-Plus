// #region Console
class con extends null {
  static #title = '[%cMagic Userscript+%c]';
  static #color = 'color: rgb(29, 155, 240);';
  static #alerts = new Set();
  /**
   * @param {unknown[]} msg
   */
  static dbg(...msg) {
    const dt = new Date();
    console.debug(
      `${con.#title} %cDBG`,
      con.#color,
      '',
      'color: rgb(255, 212, 0);',
      `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
      ...msg
    );
  }
  /**
   * @param {unknown[]} msg
   */
  static err(...msg) {
    console.error(`${con.#title} %cERROR`, con.#color, '', 'color: rgb(249, 24, 128);', ...msg);
    const t = con.#title.replace(/%c/g, '');
    for (const e of msg.filter(
      (i) => i instanceof Error && 'cause' in i && !Object.is(i.name, '')
    )) {
      if (!con.#alerts.has(e.message)) {
        con.#alerts.add(e.message);
        con.alert(`${t} ${e.message} Caused by: ${e.cause}`);
      }
    }
  }
  /**
   * @param {unknown[]} msg
   */
  static info(...msg) {
    console.info(`${con.#title} %cINF`, con.#color, '', 'color: rgb(0, 186, 124);', ...msg);
  }
  /**
   * @param {unknown[]} msg
   */
  static log(...msg) {
    console.log(`${con.#title} %cLOG`, con.#color, '', 'color: rgb(219, 160, 73);', ...msg);
  }
  /**
   * @param {unknown} message
   */
  static alert(message) {
    if (typeof alert !== 'undefined') {
      alert(message);
    }
  }
}
// #endregion

// #region Custom Elements Compatibility
/**
 * Check for the browser's genuine `HTMLElement` interface object.
 *
 * The genuine interface object inherits from `Element`,
 * ES5 shims are plain functions that inherit from `Function.prototype`.
 * @param {unknown} fn
 * @returns {fn is typeof HTMLElement}
 */
const isNativeHTMLElement = (fn) => {
  try {
    return (
      typeof fn === 'function' &&
      Reflect.getPrototypeOf(fn) === Element &&
      Reflect.getPrototypeOf(/** @type {Function} */ (fn).prototype) === Element.prototype
    );
  } catch {
    return false;
  }
};
/**
 * Recover the genuine `HTMLElement` constructor, even if the webpage replaced `window.HTMLElement`
 * @returns {typeof HTMLElement | undefined}
 */
const resolveHTMLElement = () => {
  /** @type {Array<() => unknown>} */
  const candidates = [
    /** Untouched `window.HTMLElement` */
    () => HTMLElement,
    /** Shims keep the genuine prototype, which still points to the genuine constructor */
    () => HTMLElement.prototype.constructor,
    /** Every built-in element interface inherits from the genuine constructor */
    () => Reflect.getPrototypeOf(HTMLDivElement),
    () => Reflect.getPrototypeOf(HTMLSpanElement),
    () => Reflect.getPrototypeOf(HTMLUnknownElement)
  ];
  for (const candidate of candidates) {
    try {
      const fn = candidate();
      if (isNativeHTMLElement(fn)) return fn;
    } catch {
      /** Try the next candidate */
    }
  }
  return undefined;
};
/**
 * Genuine `HTMLElement`, base class of every custom element in this UserJS
 * @type {typeof HTMLElement}
 */
const NativeHTMLElement = /** @type {typeof HTMLElement} */ (resolveHTMLElement());
if (NativeHTMLElement == null) {
  con.err(new Error('Failed to find the native "HTMLElement"', { cause: 'customElements' }));
  return;
}
/**
 * `define` and `get` of the genuine `CustomElementRegistry`.
 *
 * The ES5 adapter only overwrites them on the global `window.customElements` **instance**,
 * the prototype is left untouched.
 */
const registryProto = /** @type {CustomElementRegistry} */ (
  typeof CustomElementRegistry === 'function'
    ? CustomElementRegistry.prototype
    : Reflect.getPrototypeOf(customElements)
);
const nativeRegistry = {
  define: registryProto.define,
  get: registryProto.get
};
if (typeof nativeRegistry.define !== 'function' || typeof nativeRegistry.get !== 'function') {
  con.err(new Error('Failed to find the native "customElements"', { cause: 'customElements' }));
  return;
}
/**
 * Custom elements registry used by this UserJS.
 *
 * Prefers a scoped registry (keeps the UserJS elements away from the webpage) but only if
 * the browser actually upgrades elements created with it, otherwise falls back to the global registry.
 * @type {CustomElementRegistry}
 */
const ce = (() => {
  try {
    const probeName = 'mujs-probe';
    const probeRegistry = Reflect.construct(CustomElementRegistry, []);
    class Probe extends NativeHTMLElement {}
    Reflect.apply(nativeRegistry.define, probeRegistry, [probeName, Probe]);
    const probe = Reflect.apply(Document.prototype.createElement, document, [
      probeName,
      { customElementRegistry: probeRegistry }
    ]);
    if (probe instanceof Probe) return Reflect.construct(CustomElementRegistry, []);
  } catch {
    /** Scoped registries are not supported, e.g. "Illegal constructor" */
  }
  return customElements;
})();
/**
 * Define a custom element using the genuine `CustomElementRegistry.prototype.define`
 *
 * Never use `ce.define` directly, on pages with the ES5 adapter it wraps the class
 * and calls it without `new` (`Class constructor cannot be invoked without 'new'`)
 * @param {string} name - Custom element name
 * @param {CustomElementConstructor} constructor - Custom element class
 */
const defineElement = (name, constructor) => {
  const existing = Reflect.apply(nativeRegistry.get, ce, [name]);
  if (existing === constructor) return;
  if (existing !== undefined) {
    throw new Error(`"${name}" is already defined by another script`);
  }
  Reflect.apply(nativeRegistry.define, ce, [name, constructor]);
};
// #endregion

// TODO: Option to only load certain SE's on site?
// TODO: Finish translations
// TODO: Blacklist editor
// TODO: Undo the crimes against humanity that is this code base

// const mql = window.matchMedia("(orientation:landscape)");
// mql.addEventListener("change", (event) => {
//   if (event.matches) {
//     console.log("Now in landscape orientation");
//   } else {
//     console.log("Now in portrait orientation");
//   }
// });

// matchMedia("(width > 800px)").matches

// const { pointerLockElement } = document;
// if (typeof pointerLockElement !== 'undefined') {
//     if ('userAgentData' in navigator) {
//         console.log('On Chrome');
//     } else {
//         console.log('On Firefox');
//     }
//     console.log('On Desktop');
// } else {
//     console.log('On Mobile');
// }

// #region Globals
/**
 * <https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/global-this.js>
 */
function globalWin() {
  /**
   * @param {Window & typeof globalThis} it
   */
  const check = (it) => it && it.Math === Math && it;
  return (
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    undefined
  );
}
const g = globalWin();
if (g == null) {
  return;
}
/** @type { import("../typings/UserJS.d.ts").safeHandles } */
const _self = {
  createElement: g.document.createElement.bind(g.document),
  createElementNS: g.document.createElementNS.bind(g.document),
  createTextNode: g.document.createTextNode.bind(g.document),
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
        setTimeout(() => {
          resolve(callback());
        }, options.delay);
      });
    },
    yield() {
      if ('scheduler' in g && 'yield' in g.scheduler) {
        return g.scheduler.yield();
      }
      return new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    }
  },
  groupBy(items, keySelector) {
    if ('groupBy' in Object) {
      return Object.groupBy(items, keySelector);
    }
    /** [Object.groupBy polyfill](https://gist.github.com/gtrabanco/7c97bd41aa74af974fa935bfb5044b6e) */
    return items.reduce((acc = {}, ...args) => {
      const key = keySelector(...args);
      acc[key] ??= [];
      acc[key].push(args[0]);
      return acc;
    }, {});
  }
};
for (const [k, v] of Object.entries(_self)) {
  if (/scheduler|navigator|customElements/.test(k) || typeof v === 'function') continue;
  throw new Error(`Safe "${k}" returned "${v}"`, { cause: '_self' });
}
// #endregion
//#region Placeholders
const BLANK_FN = function () {};
const BLANK_ASYNC_FN = async function () {};
const BLANK_PAGE = 'about:blank';
const winURL = (() => {
  try {
    return new URL(window.location.href);
  } catch {
    return new URL(BLANK_PAGE);
  }
})();
/**
 * @type { import("../typings/types.d.ts").config }
 */
let cfg;
//#endregion
/**
 * @template {string} S
 * @param {S} str
 */
const normalizedHostname = (str) => {
  let resp;
  if (typeof str === 'string') {
    resp = str.replace(/^www\./, '');
  }
  return resp || '';
};
/**
 * @template {string} S
 * @param {S} str
 */
const formatURL = (str) => {
  let resp;
  if (typeof str === 'string') {
    resp = str
      .split('.')
      .splice(-2)
      .join('.')
      .replace(/\/|https:/g, '');
  }
  return resp || '';
};
/**
 * @template {string} S
 * @param {S} str
 */
const getHostname = (str) => formatURL(normalizedHostname(str));
// #region Validators
/**
 * Transform parameter into string
 * @template O
 * @param {O} obj
 * @returns {string}
 */
function objToStr(obj) {
  try {
    return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)?.[1] || '';
  } catch {
    return '';
  }
}
/**
 * @template O
 * @param {O} obj
 * @returns {obj is (Document | HTMLElement | Element | Node)}
 */
const isElem = (obj) => /Document|Element|HTML/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns { obj is Function ? obj : obj is () => unknown }
 */
const isFN = (obj) => /Function/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns {obj is (Document | HTMLElement | Window)}
 */
const isHTML = (obj) => /Document|Element|HTML|Window/.test(objToStr(obj));
/**
 * Parameter is `JSON Object`
 * @template O
 * @param {O} obj
 * @returns { obj is Object ? obj : obj is (Record<PropertyKey, unknown> | Record<keyof O, O>) }
 */
const isObj = (obj) => /Object/.test(objToStr(obj));
/**
 * @type { typeof import("../typings/types.d.ts").toArray }
 */
function toArray(target, args, root) {
  if (target == null) return /** @type {any} */ ([]);
  if (Array.isArray(target)) return /** @type {any} */ (target);
  if (target instanceof Window || target instanceof Document) return /** @type {[T]} */ ([target]);
  if (isHTML(target)) return /** @type {T[]} */ (Array.of(target));
  const opts = Object.assign({}, args);
  const method = /** @type {"entries" | "keys" | "values" | undefined} */ (
    ['entries', 'keys', 'values'].find((key) => key in opts || opts[key])
  );
  if (typeof target === 'string') {
    if (root instanceof Element || root instanceof Document) {
      return /** @type {Element[]} */ ([...root.querySelectorAll(target)]);
    } else if (method === 'keys' && typeof root === 'string') {
      return /** @type {string[]} */ (target.split(root));
    }
    return method === 'keys' ? /** @type {T[]} */ ([...target]) : /** @type {[T]} */ ([target]);
  }
  if (method != null) {
    const s = objToStr(target);
    if (/Object/.test(s)) {
      /** @type {Extract<"entries" | "keys" | "values", keyof typeof Object>} */
      const _method = method;
      if (Object[_method]) {
        return /** @type {any} */ (Array.from(Object[_method](/** @type {object} */ (target))));
      }
    } else if (/Set|Map/.test(s)) {
      /** @type {Set<unknown> | Map<unknown, unknown>} */
      const _target = /** @type {any} */ (target);
      /** @type {Extract<"entries" | "keys" | "values", keyof typeof _target>} */
      const _method = method;
      if (_target[_method]) {
        return /** @type {any} */ (Array.from(_target[_method]()));
      }
    }
  }
  return /** @type {any} */ (Array.from(/** @type {any} */ (target)));
}
/**
 * Parameter is `RegExp`
 * @template O
 * @param {O} obj
 * @returns {obj is RegExp}
 */
const isRegExp = (obj) => /RegExp/.test(objToStr(obj));
const isUserCSS = (str) => typeof str === 'string' && /\.user\.css$/.test(str);
const isUserJS = (str) => typeof str === 'string' && /\.user\.js$/.test(str);
/**
 * Parameter is `null` or `undefined`
 * @template O
 * @param {O} obj
 * @returns {obj is (null | undefined)}
 */
const isNull = (obj) => Object.is(obj, null) || Object.is(obj, undefined);
/**
 * Parameter is an empty `Array`, `JSON Object`, `Map`, `Set`, or `String`
 * @template O
 * @param {O} obj
 */
const isBlank = (obj) => {
  return typeof obj === 'string'
    ? Object.is(obj.replaceAll('\0', '').trim(), '')
    : Object.is(toArray(obj, { keys: true }).length, 0);
};
/**
 * Parameter is Empty
 * @template O
 * @param {O} obj
 */
const isEmpty = (obj) => isNull(obj) || isBlank(obj);
/**
 * @template O
 * @param {O} object
 * @returns {O}
 */
const copyObject = (object) => JSON.parse(JSON.stringify(object));
// #endregion
// #region Constants
const isMobile = (() => {
  const { userAgent = '', userAgentData = {} } = navigator;
  const { platform = '', mobile = false } = Object(userAgentData);
  return (
    /Mobile|Tablet/.test(String(userAgent)) ||
    Boolean(mobile) ||
    /Android|Apple/.test(String(platform))
  );
})();
class $GM extends null {
  static #INFO = {
    script: {
      icon: '',
      name: 'Magic Userscript+',
      namespace: 'https://github.com/magicoflolis/Userscript-Plus',
      updateURL: 'https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjs.js',
      version: 'Bookmarklet',
      bugs: 'https://github.com/magicoflolis/Userscript-Plus/issues'
    }
  };
  static get isGM() {
    return typeof GM !== 'undefined' || typeof GM_xmlhttpRequest !== 'undefined';
  }
  /**
   * @template F
   * @param {F} fn
   */
  static async wrap(fn) {
    return fn;
  }
  static addElement() {
    /** @type { typeof GM_addElement } */
    const _ =
      ($GM.isGM && typeof GM.addElement !== 'undefined' && isFN(GM.addElement) && GM.addElement) ||
      (typeof GM_addElement !== 'undefined' && isFN(GM_addElement) && GM_addElement) ||
      BLANK_FN;
    return _(...arguments);
  }
  static openInTab() {
    /** @type { typeof GM_openInTab } */
    const _ =
      ($GM.isGM && typeof GM.openInTab !== 'undefined' && isFN(GM.openInTab) && GM.openInTab) ||
      (typeof GM_openInTab !== 'undefined' && isFN(GM_openInTab) && GM_openInTab) ||
      window.open;
    return _(...arguments);
  }
  static get info() {
    /** @type { typeof GM_info } */
    const _ =
      ($GM.isGM && typeof GM.info !== 'undefined' && isObj(GM.info) && GM.info) ||
      (typeof GM_info !== 'undefined' && isObj(GM_info) && GM_info) ||
      $GM.#INFO;
    return _;
  }
  static async setValue() {
    /** @type { typeof GM.setValue | typeof GM_setValue } */
    const _ =
      ($GM.isGM && typeof GM.setValue !== 'undefined' && isFN(GM.setValue) && GM.setValue) ||
      (typeof GM_setValue !== 'undefined' && isFN(GM_setValue) && $GM.wrap(GM_setValue)) ||
      BLANK_ASYNC_FN;
    return _(...arguments);
  }
  static async getValue() {
    /** @type { typeof GM.getValue | typeof GM_getValue } */
    const _ =
      ($GM.isGM && typeof GM.getValue !== 'undefined' && isFN(GM.getValue) && GM.getValue) ||
      (typeof GM_getValue !== 'undefined' && isFN(GM_getValue) && $GM.wrap(GM_getValue)) ||
      BLANK_ASYNC_FN;
    return _(...arguments);
  }
  static registerMenuCommand() {
    /** @type { typeof GM.registerMenuCommand | typeof GM_registerMenuCommand } */
    const _ =
      ($GM.isGM &&
        typeof GM.registerMenuCommand !== 'undefined' &&
        isFN(GM.registerMenuCommand) &&
        GM.registerMenuCommand) ||
      (typeof GM_registerMenuCommand !== 'undefined' &&
        isFN(GM_registerMenuCommand) &&
        GM_registerMenuCommand) ||
      BLANK_FN;
    return _(...arguments);
  }
  static xmlHttpRequest() {
    /** @type { typeof GM.xmlHttpRequest | typeof GM_xmlhttpRequest } */
    const _ =
      ($GM.isGM &&
        typeof GM.xmlHttpRequest !== 'undefined' &&
        isFN(GM.xmlHttpRequest) &&
        GM.xmlHttpRequest) ||
      (typeof GM_xmlhttpRequest !== 'undefined' &&
        isFN(GM_xmlhttpRequest) &&
        $GM.wrap(GM_xmlhttpRequest)) ||
      /**
       * @template {string | Blob | ArrayBuffer | Document | object} T
       * @param {VMScriptGMXHRDetails<T>} details
       */
      function (details) {
        return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          let method = 'GET';
          let url = BLANK_PAGE;
          let body;
          for (const [key, value] of toArray(details, { entries: true })) {
            if (isFN(value)) {
              const [, k] = /^on(\w+)/g.exec(key) || [];
              if (k) {
                if (/progress/i.test(k)) {
                  req.addEventListener(k, value);
                } else {
                  req.addEventListener(k, (evt) => {
                    value(evt);
                    if (/error|abort/.test(k)) {
                      reject(evt);
                    } else {
                      resolve(evt);
                    }
                  });
                }
              }
            } else if (typeof value === 'string') {
              if (key === 'responseType') {
                req.responseType = /buffer/i.test(value) ? 'arraybuffer' : value;
              } else if (key === 'method') {
                method = value;
              } else if (key === 'url') {
                url = value;
              }
            } else if (value instanceof URL) {
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
      };
    return _(...arguments);
  }
}
// #endregion
// #region DEFAULT_CONFIG
/**
 * My best shot at excluding unsupported + local + finical + etc.
 */
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
/**
 * @type { import("../typings/types.d.ts").config }
 */
const DEFAULT_CONFIG = {
  autofetch: false,
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
      query: encodeURIComponent(
        'https://greasyfork.org/en/scripts/by-site/{host}?page=1'
      ),
      unsupported: ['pornhub.com']
    },
    {
      enabled: false,
      name: 'sleazyfork',
      query: encodeURIComponent(
        'https://sleazyfork.org/en/scripts/by-site/{host}?page=1'
      ),
      unsupported: ['pornhub.com']
    },
    {
      enabled: false,
      name: 'openuserjs',
      query: encodeURIComponent('https://openuserjs.org/?q={host}'),
      unsupported: []
    },
    {
      enabled: false,
      name: 'github',
      token: '',
      query: encodeURIComponent(
        'https://api.github.com/search/repositories?q=topic:{domain}+topic:userscript'
      ),
      unsupported: []
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
    others: true,
    authorID: 166061,
    authorUrl: 'https://github.com/magicoflolis',
    blacklist: [478597],
    list: [
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
    ]
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
class Language extends null {
  static #map = new Map(Object.entries(translations));
  /**
   * @template { string | Date | number } T
   * @param { T } s
   */
  static toDate(s) {
    const d = typeof s === 'string' ? new Date(s) : s;
    return new Intl.DateTimeFormat(navigator.language).format(d);
  }
  /**
   * @template { number | bigint } T
   * @param { T } n
   */
  static toNumber(n) {
    return new Intl.NumberFormat(navigator.language).format(n);
  }
  /**
   * @type { typeof import("../typings/UserJS.d.ts").i18n$ }
   */
  static i18n$(key) {
    // eslint-disable-next-line no-useless-assignment
    let resp = 'INVALID KEY';
    try {
      const m = Language.#map;
      if (m.has(Language.current)) {
        resp = m.get(Language.current);
      } else {
        resp = m.get('en');
      }
      if (isObj(resp) && key in resp) {
        return resp[key];
      }
    } catch (e) {
      con.err(e);
      resp = 'ERROR OCCURED';
    }
    return resp;
  }
  static get current() {
    return navigator.language.split('-').find((l) => Language.#map.has(l)) || 'en';
  }
}
const { i18n$ } = Language;
// #endregion
// #region Utilities
/**
 * @param {string} str
 */
const decode = (str) => {
  let last = str;
  while (true) {
    try {
      const decoded = decodeURIComponent(last);
      if (decoded === last) return last;
      last = decoded;
    } catch {
      return last;
    }
  }
};
/**
 * @type { import("../typings/types.d.ts").qs }
 */
const qs = (selector, root) => {
  return (root || document).querySelector(selector);
};
/**
 * @type { import("../typings/types.d.ts").qsA }
 */
const qsA = (selectors, root) => {
  return (root || document).querySelectorAll(selectors);
};
/**
 * @template { keyof HTMLElementEventMap | SVGElementEventMap | WindowEventMap } K
 * @param { K } type
 * @param { string } fallback
 */
const touchType = (type, fallback) =>
  isMobile && typeof TouchEvent !== 'undefined' ? type : fallback;
/**
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options) => {
  if (options === undefined || typeof options === 'boolean') {
    options = { capture: true };
  } else {
    options.capture = true;
  }
  for (const elem of toArray(el).filter(isHTML)) {
    if (type === 'click' && isMobile) {
      elem.addEventListener(touchType('touchstart', 'click'), listener, options);
      continue;
    }
    elem.addEventListener(type, listener, options);
  }
};
/**
 * @param {HTMLElement} elem - HTMLElement
 * @param {unknown} str - Class string(s)
 */
function addClass(elem, str) {
  /** @type {string[]} */
  const arr = (Array.isArray(str) ? str : typeof str === 'string' ? str.split(' ') : []).filter(
    (s) => typeof s === 'string' && !isBlank(s)
  );
  if (!isBlank(arr)) elem.classList.add(...arr);
}
/**
 * @template {HTMLElement} E
 * @param {E} elem
 * @param {Record<keyof E, E>} attr
 */
function formAttrs(elem, attr) {
  if (elem != null && isObj(attr)) {
    for (const [key, value] of Object.entries(attr)) {
      if (/^useGM|customElementRegistry/.test(key)) {
        continue;
      } else if (/^_mujs/i.test(key)) {
        elem[key] = value;
      } else if (isObj(value)) {
        formAttrs(elem[key], value);
      } else if (isFN(value)) {
        if (/^on/.test(key)) {
          elem[key] = value;
        } else {
          elem.addEventListener(key, value);
        }
      } else if (/^class/i.test(key)) {
        addClass(elem, value);
      } else if (
        elem.tagName === 'A' &&
        typeof value === 'string' &&
        /^(download|type)/i.test(key)
      ) {
        elem.setAttribute(key, value);
      } else {
        elem[key] = value;
      }
    }
  }
  return elem;
}
/**
 * @type { typeof import("../typings/types.d.ts").make }
 */
const make = (tagName, ...attributes) => {
  /** @type {HTMLElement} */
  const el = _self.createElement(tagName, { customElementRegistry: ce });
  for (let i = 0; i < attributes.length; i++) {
    const _attr = attributes[i];
    if (i === 0) {
      addClass(el, _attr);
    } else if (i === 1 && typeof _attr === 'string' && !isEmpty(_attr)) {
      el.textContent = _attr;
      continue;
    }
    formAttrs(el, _attr);
  }
  return el;
};
// #endregion
class dom extends null {
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @returns {E[]}
   */
  static HTML(target) {
    return toArray(target).filter(isHTML);
  }
  /**
   * @template {HTMLElement} E
   * @template {string} A
   * @template {string | null | undefined} V
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @param {A} attr
   * @param {V} value
   */
  static attr(target, attr, value) {
    for (const elem of dom.HTML(target)) {
      if (value === undefined) {
        return elem.getAttribute(attr) || undefined;
      }
      if (value === null) {
        elem.removeAttribute(attr);
      } else {
        elem.setAttribute(attr, value);
      }
    }
  }
  /**
   * @template {HTMLElement} E
   * @template V
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @param {keyof E} prop
   * @param {V} [value=undefined]
   */
  static prop(target, prop, value = undefined) {
    const t = dom.HTML(target);
    if (value === undefined) {
      return t.find((elem) => elem[prop]);
    }
    for (const elem of t) {
      elem[prop] = value;
    }
  }
  /**
   * @template {HTMLElement} E
   * @template T
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @param {T} text
   */
  static text(target, text) {
    const t = dom.HTML(target);
    if (text === undefined) {
      return t.length !== 0 ? t[0].textContent : undefined;
    }
    for (const elem of t) {
      elem.textContent = text;
    }
  }
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E> | NodeListOf<E>} target
   */
  static remove(target) {
    dom.HTML(target).some((elem) => elem.remove());
    return dom;
  }
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   */
  static rmChildren(target) {
    for (const elem of dom.HTML(target)) {
      for (const e of elem.children) {
        if (e) {
          e.remove();
        }
      }
    }
  }
  static get cl() {
    return {
      /**
       * @template {HTMLElement} E
       * @template {string} T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T | T[]} token
       */
      add(target, token) {
        /** @type {string[]} */
        const _token = toArray(token, { keys: true }, ' ');
        return dom.HTML(target).some((elem) => elem.classList.add(..._token));
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T | T[]} token
       */
      remove(target, token) {
        /** @type {string[]} */
        const _token = toArray(token, { keys: true }, ' ');
        return dom.HTML(target).some((elem) => elem.classList.remove(..._token));
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T} token
       * @param {boolean} [force]
       */
      toggle(target, token, force) {
        let r;
        for (const elem of dom.HTML(target)) {
          r = elem.classList.toggle(token, force);
        }
        return r;
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T} token
       */
      has(target, token) {
        return dom.HTML(target).some((elem) => elem.classList.contains(token));
      }
    };
  }
}
/**
 * @typedef { { "active": (this: Tabs, tab: HTMLElement, build: boolean) => void; "close": (this: Tabs, tab: HTMLElement) => void; "create": (this: Tabs, tab: HTMLElement, tabHost: HTMLElement, tabClose: HTMLElement, host: string, hostname: string | undefined) => void; "internal": (this: Tabs, tab: HTMLElement) => void; } } tabEvents
 */
class Tabs {
  /** @type { Map<keyof tabEvents, Set<{ listener: tabEvents[keyof tabEvents]; options?: { once: true } }>> } */
  eventListeners = new Map();
  /** @type { Set<{ type: keyof tabEvents; listener: tabEvents[keyof tabEvents]; options?: { once: true } }> } */
  events = new Set();
  /** @type { Set<HTMLElement> } */
  pool = new Set();
  /** @type { typeof BLANK_PAGE } */
  blank = BLANK_PAGE;
  /** @type { "mujs:" } */
  protocal = 'mujs:';
  /** @type { RegExp } */
  protoReg = new RegExp(`${this.protocal}(.+)`, 'i');
  /** @type { () => unknown } */
  custom = BLANK_FN;
  /** @type { { [key: string]: HTMLElement } } */
  el = {
    add: make('tab-add', {
      textContent: '+',
      dataset: {
        command: 'new-tab'
      }
    }),
    head: make('tab-root')
  };
  /**
   * @param { ?HTMLElement } root
   */
  constructor(root) {
    this.el.head.append(this.el.add);
    if (root) {
      this.el.root = root;
      this.el.root.append(this.el.head);
    }
  }
  get _pool() {
    return toArray(this.pool).filter((e) => !isNull(e));
  }
  get _active() {
    return this._pool.find(({ classList }) => classList.contains('active')) || null;
  }
  /**
   * @template H
   * @param {H} hostname
   */
  getTab(hostname) {
    const host = this.validate(hostname);
    return this._pool.find(({ dataset }) => dataset.host === host) || null;
  }
  /**
   * @template H
   * @param {H} hostname
   */
  validate(hostname) {
    if (typeof hostname === 'string') {
      return hostname;
    } else if (hostname instanceof URL || hostname instanceof Location) {
      return hostname.toString();
    }
    return '';
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {tabEvents[K]} listener
   * @param {{once: true}} [options]
   */
  addListener(type, listener, options) {
    const obj = {
      type,
      listener
    };
    if (!this.events.has(obj)) {
      if (!isEmpty(options)) {
        obj.options = options;
      }
      this.events.add(obj);
    }
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {...unknown} args
   */
  #dispatch(type, ...args) {
    for (const evt of toArray(this.events).filter((event) => event.type === type)) {
      if (isFN(evt.listener)) {
        evt.listener.call(this, ...args);
      }
      if (isObj(evt.options) && evt.options.once === true) {
        this.events.delete(event);
      }
    }
    return this;
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {tabEvents[K]} listener
   * @param {{once: true}} [options]
   */
  addEventListener(type, listener, options) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, new Set());
    }
    const obj = {
      listener,
      options
    };
    const eventSet = this.eventListeners.get(type);
    if (eventSet && !eventSet.has(obj)) {
      eventSet.add(obj);
    }
  }
  /**
   * @template {keyof tabEvents} K
   * @param {CustomEvent<K>} event
   */
  dispatchEvent(event) {
    /** @type {K} */
    const type = event.type;
    if (!(type in this.eventListeners)) {
      return true;
    }
    const _set = this.eventListeners.get(type) || new Set();
    for (const evt of toArray(_set)) {
      evt.listener(event);
    }

    return !event.defaultPrevented;
  }
  /**
   * Handles internal protocols
   * @template H
   * @param {H} hostname
   */
  intFN(hostname) {
    const h = this.validate(hostname);
    const [, host] = this.protoReg.exec(h) || [];
    return this.#dispatch('internal', host, hostname);
  }
  /**
   * @template {HTMLElement} T
   * @param {T} tab
   * @param {boolean} [build]
   */
  active(tab, build = true) {
    if (isElem(tab)) {
      if (!this.pool.has(tab)) {
        this.pool.add(tab);
      }
      return this.#dispatch('active', tab, build);
    }
    return this;
  }
  /**
   * @template {HTMLElement} T
   * @param {T} tab
   */
  close(tab) {
    if (isElem(tab)) {
      if (this.pool.has(tab)) {
        this.pool.delete(tab);
      }
      this.#dispatch('close', tab);
      tab.remove();
    }
    return this;
  }
  /**
   * @param {string} [hostname]
   */
  create(hostname = undefined) {
    if (typeof hostname === 'string') {
      const createdTab = this.getTab(hostname);
      if (this.protoReg.test(hostname) && createdTab) {
        this.active(createdTab);
        return null;
      }
    }
    const tab = make('tab-content', {
      dataset: {
        command: 'switch-tab'
      },
      style: `order: ${this.el.head.childElementCount};`
    });
    const tabClose = make('tab-close', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    const tabHost = make('tab-host');
    tab.append(tabHost, tabClose);
    this.el.head.append(tab);
    this.active(tab, false);

    const [, host] = this.protoReg.exec(hostname) ?? [];
    this.#dispatch('create', tab, tabHost, tabClose, host, hostname);
    return tab;
  }
}
class Timeout {
  /**
   * @type {number[]}
   */
  ids = [];
  /**
   * @template R
   * @param {number} delay
   * @param {R} [reason]
   * @returns {Promise<unknown>}
   */
  set(delay, reason) {
    return new Promise((resolve, reject) => {
      /** @type {number} */
      const id = setTimeout(() => {
        this.clear(id);
        if (typeof reason === 'string') {
          reject(new Error(reason));
        } else {
          resolve();
        }
      }, delay);
      this.ids.push(id);
    });
  }
  /**
   * @param {...number} ids
   */
  clear(...ids) {
    this.ids = this.ids.filter((id) => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
    return this;
  }
}
//#region Icon SVGs
class IconSVG extends null {
  static type = {
    _: {
      viewBox: '0 0 0 0'
    },
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
    info: {
      viewBox: '0 0 512 512',
      html: '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>'
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
    }
  };
  /**
   * @template C
   * @param {keyof typeof IconSVG["type"]} key
   * @param {C} container
   * @returns {C extends HTMLElement ? SVGSVGElement : string}
   */
  static load(key, container) {
    if (!(key in IconSVG.type)) {
      key = '_';
    }
    const svgElem = _self.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const sel = IconSVG.type[key];
    for (const [k, v] of Object.entries(sel)) {
      if (k === 'html') continue;
      svgElem.setAttributeNS(null, k, v);
    }
    try {
      if (typeof sel.html === 'string') {
        if (window.trustedTypes.defaultPolicy) {
          const h = window.trustedTypes.defaultPolicy.createHTML(sel.html);
          svgElem.innerHTML = h;
        } else {
          svgElem.innerHTML = sel.html;
        }
        svgElem.setAttribute('id', `mujs_${key}`);
      }
    } catch {
      /* empty */
    }
    formAttrs(svgElem, container);
    if (isElem(container)) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
}
//#endregion
class jsStorage extends null {
  static prefix = 'MUJS';
  static get store() {
    return window.localStorage;
  }
  static getItem(key) {
    return jsStorage.store.getItem(`${jsStorage.prefix}-${key}`);
  }
  static has(key) {
    return jsStorage.getItem(key) != null;
  }
  static setItem(key, value) {
    jsStorage.store.setItem(`${jsStorage.prefix}-${key}`, value);
    return jsStorage;
  }
  static remove(key) {
    jsStorage.store.removeItem(`${jsStorage.prefix}-${key}`);
    return jsStorage;
  }
  static async setValue(key, v) {
    if (v) {
      const val = typeof v === 'string' ? v : JSON.stringify(v);
      if ($GM.isGM) {
        await $GM.setValue(key, val);
      } else {
        jsStorage.setItem(key, val);
      }
    }
    return jsStorage;
  }
  /**
   * @template K
   * @template D
   * @param {K} key
   * @param {D} def
   */
  static async getValue(key, def) {
    try {
      /**
       * @template {typeof def} T
       * @param {T | string} s
       * @returns {T}
       */
      const parse = (s) => {
        if (typeof s === 'string') {
          try {
            const p = JSON.parse(s);
            if (!isEmpty(p)) return p;
          } catch {
            /* empty */
          }
        }
        return def;
      };
      /** @type { typeof def } */
      const store = $GM.isGM
        ? await $GM.getValue(key, JSON.stringify(def))
        : jsStorage.getItem(key);
      if (store == null) {
        return def;
      }
      return parse(store);
    } catch (ex) {
      if (ex instanceof Error) ex.cause = 'getValue';
      con.err(ex);
      return def;
    }
  }
}
class Command extends null {
  static cmds = new Set();
  static register(text, command) {
    if ($GM.isGM) {
      if (isFN(command) && !this.cmds.has(command)) this.cmds.add(command);
      $GM.registerMenuCommand(text, command);
    }
    return Command;
  }
}
/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  req(requestURL, method = 'GET', responseType = 'json', data, useFetch = false) {
    const params = Object.assign({}, data);
    if (typeof method === 'string') {
      params.method = method.toUpperCase().replaceAll(/\W/g, '');
    }
    if (typeof responseType === 'string') {
      responseType = responseType.toLowerCase().replaceAll(/\W/g, '');
    }
    if (params.credentials && $GM.isGM && !useFetch) {
      params.anonymous = Object.is(params.credentials, 'omit');
      delete params.credentials;
    } else if (params.onprogress) {
      delete params.onprogress;
    }
    return new Promise((resolve, reject) => {
      if (isEmpty(requestURL)) {
        reject(new Error('"url" parameter is empty', { cause: 'Network.req' }));
      } else if (useFetch) {
        const _request =
          requestURL instanceof Request ? requestURL : new Request(requestURL, params);
        fetch(_request)
          .then((resp) => {
            if (resp.ok) {
              if (/array|buffer/i.test(responseType)) {
                resolve(resp.arrayBuffer());
              } else if (/json/i.test(responseType)) {
                resolve(resp.json());
              } else if (/text/i.test(responseType)) {
                resolve(resp.text());
              } else if (/blob/i.test(responseType)) {
                resolve(resp.blob());
              } else if (/form|data/i.test(responseType)) {
                resolve(resp.formData());
              } else if (/clone|copy/i.test(responseType)) {
                resolve(resp.clone());
              } else if (/document/i.test(responseType)) {
                const responseText = resp.text();
                const domParser = new DOMParser();
                if (responseText instanceof Promise) {
                  responseText.then((txt) => {
                    const doc = domParser.parseFromString(txt, 'text/html');
                    resolve(doc);
                  });
                } else {
                  const doc = domParser.parseFromString(responseText, 'text/html');
                  resolve(doc);
                }
              } else {
                resolve(resp);
              }
            } else {
              reject(resp);
            }
          })
          .catch(reject);
      } else {
        /** @type {VMScriptGMXHRDetails<typeof responseType>} */
        const DETAILS = {
          url: requestURL,
          responseType,
          ...params,
          onerror(r_1) {
            const e = new Error(`status: ${r_1.status} finalURL: ${requestURL}`, {
              cause: 'Network.req::onerror'
            });
            e.name = '';
            reject(e);
          },
          onload(r_1) {
            if (r_1.status !== 200) {
              const e = new Error(`status: ${r_1.status} finalURL: ${requestURL}`, {
                cause: 'Network.req::onload'
              });
              e.name = '';
              reject(e);
            } else if (/basic/i.test(responseType)) {
              resolve(r_1);
            } else {
              resolve(r_1.response);
            }
          }
        };
        $GM.xmlHttpRequest(DETAILS);
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
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
};
const Counter = {
  /**
   * @type { { total: { count: number; root?: CountFrame | undefined; }; [key: string]: { count: number; root?: CountFrame | undefined; } } }
   */
  cnt: {
    total: {
      count: 0
    }
  },
  /**
   * @template { import("../typings/types.d.ts").UserJSEngine } E
   * @param {E} engine
   */
  set(engine) {
    if (!this.cnt[engine.name]) {
      const root = make('count-frame', { _mujs: engine });
      this.cnt[engine.name] = {
        count: 0,
        root
      };
      return root;
    }
    return this.cnt[engine.name].root;
  },
  /**
   * @template { import("../typings/types.d.ts").UserJSEngine } E
   * @param {number} count
   * @param {E} engine
   */
  update(count, engine) {
    this.cnt[engine.name].count += count;
    this.cnt.total.count += count;
    this.updateAll();
  },
  updateAll() {
    for (const v of Object.values(this.cnt)) dom.attr(v.root, 'count', String(v.count));
  },
  reset() {
    for (const [k, v] of Object.entries(this.cnt)) {
      v.count = 0;
      dom.attr(v.root, 'count', String(v.count));
      const engine = cfg.engines.find((engine) => k === engine.name);
      if (engine) {
        dom.cl[engine.enabled ? 'remove' : 'add'](v.root, 'hidden');
      }
    }
  }
};
// #region Container
class Container {
  static prompts = [];
  injected;
  userjsCache;
  isBlacklisted;
  opacityMin;
  opacityMax;
  #cache = {
    unsaved: false,
    rebuild: false
  };
  /** @type {MainUserJS | undefined} */
  #frame;
  /** @type {HTMLElement | undefined} */
  #root;
  constructor() {
    this.refresh = this.refresh.bind(this);
    this.showError = this.showError.bind(this);
    this.toElem = this.toElem.bind(this);

    this.webpage = winURL;
    this.host = getHostname(winURL.hostname ?? BLANK_PAGE);
    this.injected = false;

    if (this.#frame == null) {
      this.#frame = make('main-userjs');
      if (!isHTML(this.#frame)) {
        this.#frame = $GM.addElement('main-userjs');
      }
    }
    if (this.#root == null) {
      this.#root = make('mujs-root');
      if (!isHTML(this.#root)) {
        this.#root = $GM.addElement('mujs-root');
      }
    }

    this.userjsCache = new Map();
    this.isBlacklisted = false;
    this.opacityMin = '0.15';
    this.opacityMax = '1';
    /** @type { { [key: string]: Timeout } } */
    this.timeouts = {
      frame: new Timeout(),
      mouse: new Timeout()
    };
    /** @type {ReturnType<typeof primaryFN>} */
    this.injFN = BLANK_FN;

    window.addEventListener('beforeunload', this, false);
  }
  get frame() {
    if (this.#frame == null) {
      this.#frame = make('main-userjs');
      if (!isHTML(this.#frame)) {
        this.#frame = $GM.addElement('main-userjs');
      }
    }
    return this.#frame;
  }
  get root() {
    if (this.#root == null) {
      this.#root = make('mujs-root');
      if (!isHTML(this.#root)) {
        this.#root = $GM.addElement('mujs-root');
      }
    }
    return this.#root;
  }
  set cache(bol) {
    if (typeof bol === 'boolean') {
      this.#cache.unsaved = bol;
      this.#cache.rebuild = bol;
    } else {
      this.#cache.unsaved = false;
      this.#cache.rebuild = false;
    }
  }
  get cache() {
    return this.#cache;
  }
  setCache(unsaved, rebuild) {
    if (typeof unsaved === 'boolean') {
      this.#cache.unsaved = unsaved;
    }
    if (isNull(unsaved) && isNull(rebuild)) {
      this.#cache.rebuild = false;
    } else if (typeof rebuild === 'boolean') {
      this.#cache.rebuild = rebuild;
    }
  }
  /**
   * @param {typeof primaryFN} [callback]
   * @param {typeof document} [doc]
   */
  inject(callback, doc) {
    if (this.checkBlacklist(this.host)) {
      this.showError(`Blacklisted: "${this.host}"`);
      this.remove();
    } else if (!isNull(doc)) {
      try {
        doc.documentElement.appendChild(this.frame);
        if (this.injected) {
          if (isFN(this.injFN.build)) this.injFN.build();
        } else {
          this.injected = true;
          this.initFn();
          if (isFN(callback) && this.elementsReady) this.injFN = callback();
        }
        if (isEmpty(this.frame.dataset.insertedBy)) {
          const msg = 'Failed to inject due to the current website!';
          if (this.host === 'youtube.com') {
            con.err(msg);
          } else {
            con.err(new Error(msg, { cause: this.host }));
          }
        }
      } catch (ex) {
        con.err(ex);
        this.remove();
      }
    }
    return this;
  }
  initFn() {
    this.setTheme();

    Counter.cnt.total.root = this.mainbtn;
    if (this.countframe)
      for (const engine of cfg.engines) this.countframe.append(Counter.set(engine));
    const { refresh, urlBar, host, userjsCache, cfgpage, table } = this;
    this.Tabs = new Tabs(this.toolbar);
    this.Tabs.addListener('internal', function (host) {
      if (host === 'settings') {
        dom.cl.remove(cfgpage, 'hidden');
        dom.cl.add(table, 'hidden');
        // TODO: Add translation
        dom.prop(urlBar, 'placeholder', 'Search settings');
      }
    });
    this.Tabs.addListener('active', function (tab, build) {
      dom.cl.add([table, cfgpage], 'hidden');
      dom.cl.remove(this.pool, 'active');
      dom.cl.add(tab, 'active');
      if (build) {
        const host = tab.dataset.host ?? this.blank;
        if (host === this.blank) {
          dom.cl.add(cfgpage, 'hidden');
          dom.cl.remove(table, 'hidden');
          refresh();
        } else if (host.startsWith(this.protocal)) {
          this.intFN(host);
        } else {
          dom.cl.add(cfgpage, 'hidden');
          dom.cl.remove(table, 'hidden');
          this.custom(host);
        }
      } else {
        dom.cl.remove(table, 'hidden');
      }
    });
    this.Tabs.addListener('close', function (tab) {
      if (cfg.clearTabCache) {
        const { host } = tab.dataset;
        const arr = Array.from(userjsCache.values()).filter(({ _mujs }) => {
          return !isEmpty(_mujs) && _mujs.info.host === host;
        });
        for (const a of arr) arr.splice(arr.indexOf(a), 1);
      }
      if (tab.classList.contains('active')) refresh();
      const sibling = tab.nextElementSibling ?? tab.previousElementSibling;
      if (sibling && sibling.dataset.command !== 'new-tab') this.active(sibling);
    });
    this.Tabs.addListener('create', function (tab, tabHost, tabClose, host, hostname) {
      if (isNull(hostname)) {
        refresh();
        tab.dataset.host = this.blank;
        tabHost.title = tabHost.textContent = i18n$('newTab');
      } else if (host) {
        tab.dataset.host = hostname || host;
        tabHost.title = tabHost.textContent = host || hostname;
        this.intFN(hostname);
      } else {
        tab.dataset.host = tabHost.title = tabHost.textContent = hostname || host;
      }
    });
    this.Tabs.create(host);
    return this;
  }
  init() {
    try {
      // #region Elements
      this.mainframe = make('mujs-mainframe', {
        style: `opacity: ${this.opacityMin};`
      });
      this.countframe = make('mujs-column');
      this.mainbtn = make('count-frame', 'mainbtn');
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
      this.cfgpage = make('mujs-config', 'hidden');
      this.main = make('mujs-main', 'hidden');
      this.urlContainer = make('mujs-url');
      this.btnframe = make('mujs-column', 'btn-frame');
      this.btnHandles = make('mujs-column', 'btn-handles');
      this.btnHide = make('mujs-btn', 'hide-list', {
        title: i18n$('min'),
        dataset: {
          command: 'hide-list'
        }
      });
      IconSVG.load('minus', this.btnHide);
      this.btnfullscreen = make('mujs-btn', 'fullscreen', {
        title: i18n$('max'),
        dataset: {
          command: 'fullscreen'
        }
      });
      IconSVG.load('expand', this.btnfullscreen);
      this.closebtn = make('mujs-btn', 'close', {
        title: i18n$('close'),
        dataset: {
          command: 'close'
        }
      });
      IconSVG.load('close', this.closebtn);
      this.btncfg = make('mujs-btn', 'settings hidden', {
        title: 'Settings',
        dataset: {
          command: 'settings'
        }
      });
      IconSVG.load('gear', this.btncfg);
      this.btnhome = make('mujs-btn', 'github hidden', {
        title: `GitHub (v${
          /\d+\.\d+\.\d+|Book/.test($GM.info.script.version)
            ? $GM.info.script.version
            : $GM.info.script.version.slice(0, 5)
        })`,
        dataset: {
          command: 'open-tab',
          webpage: $GM.info.script.namespace
        }
      });
      IconSVG.load('github', this.btnhome);
      this.btnissue = make('mujs-btn', 'issue hidden', {
        title: i18n$('issue'),
        dataset: {
          command: 'open-tab',
          webpage: $GM.info.script.bugs ?? 'https://github.com/magicoflolis/Userscript-Plus/issues'
        }
      });
      IconSVG.load('issue', this.btnissue);
      this.btngreasy = make('mujs-btn', 'greasy hidden', {
        title: 'Greasy Fork',
        dataset: {
          command: 'open-tab',
          webpage: 'https://greasyfork.org/scripts/421603'
        }
      });
      IconSVG.load('globe', this.btngreasy);
      this.btnnav = make('mujs-btn', 'nav', {
        title: 'Navigation',
        dataset: {
          command: 'navigation'
        }
      });
      IconSVG.load('nav', this.btnnav);
      const makeTHead = (...rows) => {
        const tr = make('tr');
        for (const r of rows) {
          const tparent = make('th', r.class ?? '', r);
          if (dom.text(tparent) !== i18n$('install')) {
            dom.cl.add(tparent, 'mujs-pointer');
            tparent.dataset.command = 'sort_by';
            tparent.dataset.asc = false;
          }
          tr.append(tparent);
        }
        this.tabhead.append(tr);
        this.table.append(this.tabhead, this.tabbody);
      };
      makeTHead(
        {
          class: 'mujs-header-name',
          textContent: i18n$('name'),
          dataset: {
            sort: 'name'
          }
        },
        {
          textContent: i18n$('createdby'),
          dataset: {
            sort: 'users'
          }
        },
        {
          textContent: i18n$('daily_installs'),
          dataset: {
            sort: 'daily_installs'
          }
        },
        {
          textContent: i18n$('updated'),
          dataset: {
            sort: 'code_updated_at'
          }
        },
        {
          textContent: i18n$('install')
        }
      );
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
      if (this.root) {
        this.root.append(this.mainframe, this.main);
      }
      return true;
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
  /**
   * @param {Event} event
   */
  handleEvent(event) {
    if (event.type === 'beforeunload') this.remove();
  }
  remove() {
    this.userjsCache.clear();
    dom.remove(this.frame);
    return this;
  }
  async save() {
    this.setCache(false);
    const config = copyObject(cfg);
    if (config !== DEFAULT_CONFIG) {
      const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      for (const [key, value] of Object.entries(config)) {
        if (!(key in DEFAULT_CONFIG)) {
          delete config[key];
        } else if (Array.isArray(value) && isEqual(value, DEFAULT_CONFIG[key])) {
          delete config[key];
        } else if (isObj(value) && isEqual(value, DEFAULT_CONFIG[key])) {
          delete config[key];
        } else if (Object.is(value, DEFAULT_CONFIG[key])) {
          delete config[key];
        }
      }
      await jsStorage.setValue('Config', config);
      con.info('Saved config:', { config, cfg, DEFAULT_CONFIG });
      this.redirect();
    }
    return cfg;
  }
  checkBlacklist(str) {
    if (!this.injected) return false;
    str = str || this.host;
    if (/accounts*\.google\./.test(this.webpage.host)) return (this.isBlacklisted = true);
    let blacklisted = false;
    for (const b of toArray(cfg.blacklist)) {
      if (typeof b === 'string') {
        if (b.startsWith('userjs-')) {
          const [, r] = /userjs-(\w+)/.exec(b) ?? [];
          const biList = builtinList[r];
          if (isRegExp(biList)) {
            if (biList.test(str)) blacklisted = true;
          } else if (isObj(biList) && biList.host === this.host) {
            blacklisted = true;
          }
        }
      } else if (isObj(b)) {
        if (!b.enabled) continue;
        if (b.regex === true) {
          const reg = new RegExp(b.url, b.flags);
          if (reg.test(str)) blacklisted = true;
        }
        if (Array.isArray(b.url)) {
          for (const c of b.url) {
            if (str.includes(c)) blacklisted = true;
          }
        }
        if (str.includes(b.url)) blacklisted = true;
      }
    }
    return (this.isBlacklisted = blacklisted);
  }
  setTheme() {
    const theme = cfg.theme ?? DEFAULT_CONFIG.theme;
    if (this.root && theme !== DEFAULT_CONFIG.theme) {
      const { style } = this.root;
      for (const [k, v] of Object.entries(theme)) {
        const str = `--mujs-${k}`;
        const prop = style.getPropertyValue(str);
        if (isEmpty(v)) theme[k] = prop;
        if (prop === v) continue;
        style.removeProperty(str);
        style.setProperty(str, v);
      }
    }
    return this;
  }
  makePrompt(txt, dataset = {}, usePrompt = true, ...elems) {
    dom.remove(Container.prompts);
    const el = make('mu-js', 'prompt', {
      dataset: {
        prompt: txt
      }
    });
    const elHead = make('mu-js', 'prompt-head');
    IconSVG.load('refresh', elHead);
    for (const e of elems) {
      if (isElem(e)) {
        elHead.appendChild(e);
      }
    }
    el.append(elHead);
    if (usePrompt) {
      const elPrompt = make('mu-js', 'prompt-body', { dataset });
      const elYes = make('mujs-btn', 'prompt-confirm', {
        textContent: 'Confirm',
        dataset: {
          command: 'prompt-confirm'
        }
      });
      const elNo = make('mujs-btn', 'prompt-deny', {
        textContent: 'Deny',
        dataset: {
          command: 'prompt-deny'
        }
      });
      elPrompt.append(elYes, elNo);
      el.append(elPrompt);
    } else {
      const elPrompt = make('mu-js', 'prompt-body');
      const elNo = make('mujs-btn', 'prompt-deny', {
        textContent: i18n$('close')
      });
      ael(elNo, touchType('touchend', 'click'), () => {
        el.remove();
      });
      elPrompt.append(elNo);
      el.append(elPrompt);
    }
    Container.prompts.push(el);
    this.promptElem.append(el);
    return el;
  }
  /**
   * @template {string | Error} E
   * @param {...E} ex
   */
  showError(...ex) {
    con.err(...ex);
    let str = '';
    for (const e of ex) {
      if (e instanceof Error) {
        str += `${e.message}${'cause' in e ? ` Caused by: "${e.cause}"` : ''}\n`;
      } else if (isObj(e)) {
        str += JSON.stringify(e) + '\n';
      } else if (typeof e === 'string') {
        str += `${e}\n`;
      }
    }
    const error = make('mu-js', 'error');
    error.appendChild(_self.createTextNode(str));
    this.footer.append(error);
    return this;
  }
  refresh() {
    this.urlBar.placeholder = i18n$('newTab');
    Counter.reset();
    dom.cl.remove(this.toElem(), 'hidden');
    dom.cl.remove(this.cfgpage._mujs.sections, 'hidden');
    dom.rmChildren([this.tabbody, this.rateContainer, this.footer]);
    return this;
  }
  reloadConfig() {
    if (!this.cfgpage) return this;
    for (const base of this.cfgpage._mujs.base) {
      const [, CONFIG, SUB_CONFIG] = /^(\w+)-(.+)/.exec(base.value) ?? [];
      let d = DEFAULT_CONFIG[base.value];
      let v = cfg[base.value];
      if (base.tag === 'engine') {
        const dEngine = DEFAULT_CONFIG.engines.find((engine) => engine.name === base.value);
        const vEngine = cfg.engines.find((engine) => engine.name === base.value);
        if (dEngine) d = dEngine;
        if (vEngine) v = vEngine;
      } else if (CONFIG) {
        d = DEFAULT_CONFIG[CONFIG][SUB_CONFIG];
        v = cfg[CONFIG][SUB_CONFIG];
      }
      base.cache = v;
      if (base.type === 'checkbox') {
        if (CONFIG) {
          if (CONFIG === 'filters') {
            base.elem.checked = cfg[CONFIG][SUB_CONFIG].enabled;
          } else {
            base.elem.checked = v;
          }
        } else if (base.tag === 'engine') {
          base.elem.checked = v.enabled;
          base.elemUrl.value = decode(v.query);
          base.elemUrl.placeholder = decode(d.query);
          if (base.elemToken) base.elemToken = v.token;
        }
      } else {
        base.elem.value = v;
      }
    }
    return this.setTheme();
  }
  /**
   * Redirects sleazyfork userscripts from greasyfork.org to sleazyfork.org
   *
   * Taken from: https://greasyfork.org/scripts/23840
   */
  redirect() {
    /** Get top most location object */
    const locObj = window.top.location;
    const gfSite = /greasyfork\.org/.test(locObj.hostname);
    if (
      cfg.sleazyredirect &&
      gfSite &&
      /scripts\/\d+/.test(locObj.href) &&
      qs('span.sign-in-link')
    ) {
      const otherSite = gfSite ? 'sleazyfork' : 'greasyfork';
      if (
        !qs('#script-info') &&
        (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a'))
      ) {
        const str = locObj.href.replace(
          /\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/,
          '//$1' + otherSite + '.org'
        );
        con.info(`Redirecting to "${str}"`);
        if (isFN(locObj.assign)) {
          locObj.assign(str);
        } else {
          locObj.href = str;
        }
      }
    }
    return this;
  }
  /**
   * @param {number} [time]
   */
  async timeoutFrame(time) {
    const { frame } = this.timeouts;
    frame.clear(...frame.ids);
    if (!dom.cl.has(this.mainframe, 'hidden')) {
      time = time ?? cfg.time ?? DEFAULT_CONFIG.time;
      let n = 10000;
      if (typeof time === 'number' && !Number.isNaN(time)) n = this.isBlacklisted ? time / 2 : time;
      await frame.set(n);
      this.remove();
      frame.clear(...frame.ids);
    }
    return this;
  }
  toElem() {
    return Array.from(this).map(({ _mujs }) => _mujs.root);
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
const container = new Container();
// #endregion
const respHandles = {
  build: BLANK_ASYNC_FN
};
//#region Custom Elements
class MainUserJS extends NativeHTMLElement {
  constructor() {
    super();
    if (!isFN(this.attachShadow)) {
      throw new Error('Failed to initialize: "attachShadow not supported"', {
        cause: 'MainUserJS'
      });
    }
    const shadow = this.attachShadow({ mode: 'closed' });

    this.dataset.insertedBy = $GM.info.script.name;
    this.style = 'visibility: visible;';

    this._mujs = {
      webpage: winURL,
      host: getHostname(winURL.hostname)
    };

    this._mujsElements = {
      root: container.root
    };

    /**
     * @param {string} css - CSS to inject
     * @param {string} [role] - Name of stylesheet
     * @param {boolean} [useMake] - Use {@link make} instead of {@link GM_addElement}
     */
    const loadCSS = (css, role, useMake) => {
      /** @type {ErrorOptions} */
      const eCause = {
        cause: 'loadCSS'
      };
      if (this._mujsElements.stylesheet instanceof HTMLStyleElement) {
        return /** @type {HTMLStyleElement} */ (this._mujsElements.stylesheet);
      }
      if (typeof useMake !== 'boolean') useMake = !$GM.isGM;
      if (typeof role !== 'string' || isEmpty(role)) role = 'CSS';
      if (typeof css !== 'string') throw new Error('"css" must be a typeof "string"', eCause);
      if (isBlank(css)) throw new Error(`"${role}" contains empty CSS string`, eCause);
      /** @type {?HTMLStyleElement} */
      let sty;
      if (useMake) {
        sty = make('style', {
          textContent: css,
          dataset: {
            insertedBy: $GM.info.script.name,
            role,
            useMake
          }
        });
        if (sty instanceof HTMLStyleElement) {
          shadow.appendChild(sty);
          this._mujsElements.stylesheet = sty;
          return sty;
        }
        throw new Error(`An unknown error occured, Role: ${role}; useMake: ${useMake}`, eCause);
      }
      if (!Object.is($GM.addElement, BLANK_FN)) {
        sty = $GM.addElement(shadow, 'style', { textContent: css });
        if (sty instanceof HTMLStyleElement || sty instanceof HTMLElement) {
          sty.dataset.insertedBy = $GM.info.script.name;
          sty.dataset.role = role;
          sty.dataset.useMake = useMake;
          this._mujsElements.stylesheet = sty;
          return sty;
        }
      }
      return loadCSS(css, role, true);
    };
    loadCSS(main_css, 'primary-stylesheet');
    shadow.appendChild(container.root);
    container.elementsReady = container.init();
  }
}
class CountFrame extends NativeHTMLElement {
  static observedAttributes = ['count'];
  constructor() {
    super();
  }
  connectedCallback() {
    if (this._mujs) {
      const engine = this._mujs;
      if (!engine.enabled) this.classList.add('hidden');
      this.dataset.type = engine.name;
      this.title = decode(engine.query ?? engine.url);
    }
    this.setAttribute('count', '0');
  }
  attributeChangedCallback(_, oldValue, newValue) {
    if (!Object.is(oldValue, newValue)) this.textContent = newValue;
  }
}
class ConfigElement extends NativeHTMLElement {
  constructor() {
    super();
    this._mujs = {
      base: [],
      sections: new Set()
    };
  }
}
class MainFrame extends NativeHTMLElement {
  constructor() {
    super();
    this.initClick = true;
    const events = ['mouseenter', 'mouseleave'];
    events.push(touchType('touchstart', 'mouseup'));
    /**
     * @param { MouseEvent | TouchEvent } evt
     */
    const handle = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const isMouse = evt instanceof MouseEvent;
      if (evt.type === 'mouseup' || evt.type === 'touchstart') {
        container.timeouts.frame.clear(...container.timeouts.frame.ids);
        if (isMouse && evt.button === 2) return;
        if ((isMouse && evt.button === 1) || (evt.ctrlKey && evt.altKey && !evt.shiftKey)) {
          return container.remove();
        } else if (!evt.ctrlKey && !evt.altKey && evt.shiftKey) {
          container.Tabs.create();
        } else if (!evt.ctrlKey && evt.altKey && !evt.shiftKey) {
          container.Tabs.create('mujs:settings');
        }
        if (this.initClick && !cfg.autofetch) {
          this.initClick = false;
          respHandles.build();
        }
        dom.cl.remove(container.main, 'hidden');
        dom.cl.add(this, 'hidden');
        if ((evt.ctrlKey && !evt.altKey && !evt.shiftKey) || cfg.autoexpand) {
          dom.cl.add([container.btnfullscreen, container.main], 'expanded');
          dom.rmChildren(container.btnfullscreen);
          IconSVG.load('collapse', container.btnfullscreen);
        }
      } else if (evt.type === 'mouseenter') {
        this.style.opacity = container.opacityMax;
        container.timeouts.frame.clear(...container.timeouts.frame.ids);
      } else if (evt.type === 'mouseleave') {
        this.style.opacity = container.opacityMin;
        container.timeoutFrame();
      }
    };
    for (const e of events) this.addEventListener(e, handle);
  }
}
class MainElement extends NativeHTMLElement {
  constructor() {
    super();
    this._mujs = {};
  }
}
/** @type {Array<[string, CustomElementConstructor]>} */
const customElementList = [
  ['main-userjs', MainUserJS],
  ['count-frame', CountFrame],
  ['mujs-config', ConfigElement],
  ['mujs-mainframe', MainFrame],
  ['mujs-main', MainElement]
];
for (const [name, constructor] of customElementList) {
  try {
    defineElement(name, constructor);
  } catch (e) {
    con.err(e);
  }
}
//#endregion
// #region Primary Function
function primaryFN() {
  try {
    const { scheduler } = _self;
    const { btnfullscreen, mainframe, main, Tabs, showError } = container;
    const doProcess = {
      /**
       * @template { {url: string | {}; filename?: string; type?: string} } D
       * @param {D} details
       */
      download(details) {
        if (isObj(details) && details.url) {
          details.url = `data:text/plain;charset=utf-8,${encodeURIComponent(isObj(details.url) ? JSON.stringify(details.url, null, ' ') : details.url)}`;
          make('a', {
            download: details.filename || 'file',
            href: details.url,
            type: details.type || 'text/plain'
          }).dispatchEvent(new MouseEvent('click'));
        }
        return container.inject(primaryFN, document);
      },
      /**
       * @param { string | HTMLAnchorElement | URL } installLink
       */
      install(installLink) {
        const locObj = window.top.location;
        const str = typeof installLink === 'string' ? installLink : installLink.href;
        if (isFN(locObj.assign)) {
          locObj.assign(str);
        } else {
          locObj.href = str;
        }
        if (isElem(installLink)) installLink.remove();
        return container.inject(primaryFN, document);
      }
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
      dom.rmChildren(elem);
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
    class mainHandler {
      constructor() {
        const events = [touchType('touchstart', 'mouseup'), 'updateditem'];
        if (!isMobile) events.push('mouseenter', 'mouseleave');
        for (const evt of events) ael(main, evt, this, false);
      }
      /**
       * @param {MouseEvent | TouchEvent | CustomEvent<import("../typings/types.d.ts").GSForkQuery>} evt
       */
      $handleEvent(evt) {
        const { type } = evt;
        if (evt instanceof CustomEvent && type === 'updateditem') {
          const ujs = evt.detail;
          if (!ujs._mujs) return;
          if (ujs.deleted === true) {
            ujs._mujs.root.remove();
            container.userjsCache.delete(ujs.id);
            Counter.reset();
            MUList.sortRecords();
            return;
          }
          if (!isEmpty(ujs.code_urls)) ujs.code_url = ujs.code_urls[0].code_url;
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
              dom.text(elem, Language.toDate(ujs.code_updated_at));
              elem.dataset.value = new Date(ujs.code_updated_at).toISOString();
            } else if (name === 'created_date') {
              dom.text(elem, `${i18n$('created_date')}: ${Language.toDate(ujs.created_at)}`);
              elem.dataset.value = new Date(ujs.created_at).toISOString();
            } else if (name === 'total_installs') {
              dom.text(
                elem,
                `${i18n$('total_installs')}: ${Language.toNumber(ujs.total_installs)}`
              );
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
        } else {
          evt.preventDefault();
          evt.stopPropagation();
          if (
            !isNull(evt.target) &&
            ((type === 'mouseup' && evt.button === 1) || type === 'touchstart')
          ) {
            /** @type { HTMLElement } */
            const t = evt.target.closest('[data-command]');
            if (isNull(t)) return;
            const {
              dataset: { command }
            } = t;
            if (command === 'switch-tab' || command === 'close-tab') {
              Tabs.close(t);
            } else if (command === 'new-tab') {
              Tabs.create();
            }
          } else if (type === 'mouseenter') {
            container.timeouts.frame.clear(...container.timeouts.frame.ids);
            container.timeouts.mouse.clear(...container.timeouts.mouse.ids);
            main.style.opacity = container.opacityMax;
          } else if (type === 'mouseleave') {
            container.timeouts.mouse.set(cfg.time).then(() => {
              main.style.opacity = container.opacityMin;
            });
          }
        }
      }
      handleEvent(evt) {
        this.$handleEvent(evt);
      }
    }
    new mainHandler();
    ael(main, touchType('touchend', 'click'), async (evt) => {
      try {
        if (!evt.target) return;
        /** @type { HTMLElement } */
        const t = evt.target;
        const target = t.closest('[data-command]');
        if (isNull(target)) return;
        let dataset = target.dataset;
        let cmd = dataset.command;
        if (/^prompt-/.test(target.dataset.command)) {
          dataset = target.parentElement.dataset;
          cmd = dataset.command;
          let pElem = target.parentElement.parentElement;
          if (/prompt-install/.test(target.dataset.command)) {
            pElem = target.parentElement.parentElement.parentElement;
            doProcess.install(target.dataset.code_url);
          } else if (/prompt-download/.test(target.dataset.command)) {
            pElem = target.parentElement.parentElement.parentElement;
            const dataUserJS = container.userjsCache.get(+target.dataset.userjs);
            if (dataUserJS) {
              const code_obj = await dataUserJS._mujs.code.request(false, target.dataset.code_url);
              if (typeof code_obj.code === 'string')
                doProcess.download({
                  url: code_obj.code,
                  filename: `${dataUserJS.name}-${Date.now()}.user.${isUserCSS(target.dataset.code_url) ? 'css' : 'js'}`
                });
            }
          }
          pElem.remove();
          return;
        }
        if (cmd === 'install-script') {
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          if (isNull(dataUserJS)) {
            return;
          }
          if (dataUserJS.code_urls.length > 1) {
            const list = make('mujs-list', {
              style: 'display: flex; flex-direction: column;'
            });
            for (const ujs of dataUserJS.code_urls) {
              const a = make('mujs-a', {
                title: ujs.code_url,
                textContent: ujs.name,
                dataset: {
                  command: 'prompt-install',
                  code_url: ujs.code_url
                }
              });
              list.append(a);
            }
            container.makePrompt('Multiple detected:', dataset, false, list);
          } else {
            doProcess.install(dataUserJS.code_url);
          }
        } else if (/open-tab|more-info/.test(cmd) && dataset.webpage) {
          if (cmd === 'more-info') evt.preventDefault();
          const options =
            ($GM.isGM && {
              active: true,
              insert: true
            }) ||
            '_blank';
          return $GM.openInTab(dataset.webpage, options);
        } else if (cmd === 'navigation') {
          for (const e of [...qsA('mujs-btn', target.parentElement)].filter(
            (e) => !dom.cl.has(e, 'nav')
          )) {
            dom.cl.toggle(e, 'hidden');
          }
        } else if (cmd === 'list-description') {
          const arr = [];
          const ignoreTags = new Set(['TD', 'MUJS-A', 'MU-JS']);
          /**
           * @type { import("../typings/types.d.ts").NameElement }
           */
          const p = target.parentElement;
          for (const node of Object.values(p._mujs)) {
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
        } else if (cmd === 'fullscreen') {
          if (dom.cl.has(btnfullscreen, 'expanded')) {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.rmChildren(btnfullscreen);
            IconSVG.load('expand', btnfullscreen);
          } else {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.rmChildren(btnfullscreen);
            IconSVG.load('collapse', btnfullscreen);
          }
        } else if (cmd === 'hide-list') {
          dom.cl.add(main, 'hidden');
          dom.cl.remove(mainframe, 'hidden');
          container.timeoutFrame();
        } else if (cmd === 'save') {
          container.setCache(null, true);
          dom.rmChildren(container.rateContainer);
          if (!dom.prop(target, 'disabled')) {
            const config = await container.save();
            if (container.cache.rebuild && config.autofetch) respHandles.build();
            container.cache = null;
          }
        } else if (cmd === 'reset') {
          cfg = DEFAULT_CONFIG;
          dom.remove(qsA('.error', container.footer));
          container.cache = true;
          container.reloadConfig();
        } else if (cmd === 'settings') {
          if (container.cache.unsaved) {
            showError('Unsaved changes');
          }
          Tabs.create('mujs:settings');
          container.setCache(null);
        } else if (cmd === 'new-tab') {
          Tabs.create();
        } else if (cmd === 'switch-tab') {
          Tabs.active(target);
        } else if (cmd === 'close-tab' && target.parentElement) {
          Tabs.close(target.parentElement);
        } else if (cmd === 'download-userjs') {
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          if (isNull(dataUserJS)) {
            return;
          }

          if (dataUserJS.code_urls.length > 1) {
            const list = make('mujs-list', {
              style: 'display: flex; flex-direction: column;'
            });
            for (const ujs of dataUserJS.code_urls) {
              const a = make('mujs-a', {
                title: ujs.code_url,
                textContent: ujs.name,
                dataset: {
                  command: 'prompt-download',
                  code_url: ujs.code_url,
                  userjs: dataset.userjs
                }
              });
              list.append(a);
            }
            container.makePrompt('Multiple detected:', dataset, false, list);
          } else {
            const code_obj = await dataUserJS._mujs.code.request(false);
            if (typeof code_obj.code === 'string')
              doProcess.download({
                url: code_obj.code,
                filename: `${dataUserJS.name}-${Date.now()}.user.${isUserCSS(dataUserJS.code_url) ? 'css' : 'js'}`
              });
          }
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
              const { current } = Language;
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
              const shadow = pageArea.attachShadow({ mode: 'closed' });
              const div = make('div', {
                innerHTML: page
              });
              shadow.append(div);
              return;
            } else {
              pageURL = dataUserJS.url;
            }
            if (!pageURL) {
              return;
            }
            /** @type {Document} */
            const page = await Network.req(pageURL, 'GET', 'document');
            const getContent = () => {
              // Sanitize remote description HTML before it is inserted via innerHTML
              // below. A <script> tag or on* handler in the fetched page would
              // otherwise execute in the context of whatever site you are browsing
              // — a closed shadow root does NOT block script execution.
              const sanitizeRemoteHTML = (html) => {
                const t = document.createElement('template');
                t.innerHTML = html; // inert: template content never executes
                t.content
                  .querySelectorAll('script, iframe, object, embed, link, meta')
                  .forEach((e) => e.remove());
                t.content.querySelectorAll('*').forEach((e) => {
                  for (const a of Array.from(e.attributes)) {
                    if (/^on/i.test(a.name)) e.removeAttribute(a.name);
                  }
                  for (const attr of ['href', 'src', 'action']) {
                    const v = e.getAttribute(attr);
                    if (v && /^\s*(javascript|data|vbscript):/i.test(v)) e.removeAttribute(attr);
                  }
                });
                return t.innerHTML;
              };
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
                return sanitizeRemoteHTML(root.innerHTML);
              }
              return 'No additional info available';
            };
            const shadow = pageArea.attachShadow({ mode: 'closed' });
            const div = make('div', {
              style: 'pointer-events: none;',
              innerHTML: getContent()
            });
            shadow.append(div);
            return;
          }
          if (!dom.cl.has(pageArea, 'hidden')) {
            dom.cl.add(pageArea, 'hidden');
            return;
          }
          dom.cl.remove(pageArea, 'hidden');
        } else if (/export-/.test(cmd)) {
          const toCfg = cmd === 'export-config';
          doProcess.download({
            url: toCfg ? cfg : cfg.theme,
            filename: `Magic_Userscript_${toCfg ? 'config' : 'theme'}-${Date.now()}.json`
          });
        } else if (/import-/.test(cmd)) {
          if (qs('input', target.parentElement)) {
            qs('input', target.parentElement).click();
            return;
          }
          const inpJSON = make('input', 'hidden', {
            type: 'file',
            accept: '.json'
          });
          ael(
            inpJSON,
            'change',
            function () {
              if (isNull(this.files)) return;
              const [file] = this.files;
              if (file === undefined || file.name === '') return;
              const fr = new FileReader();
              fr.onload = function () {
                try {
                  /** @type { import("../typings/types.d.ts").config | null } */
                  const content = JSON.parse(typeof this.result === 'string' ? this.result : null);
                  if (!isObj(content))
                    throw new Error(`Invalid file contents in "${file.name}"`, {
                      cause: 'FileReader'
                    });
                  const DEFAULT_CFG = copyObject(DEFAULT_CONFIG);
                  if (
                    Object.keys(content).find((c) => Object.keys(DEFAULT_CFG.theme).includes(c))
                  ) {
                    cfg.theme = { ...DEFAULT_CFG.theme, ...content };
                    container.setTheme().save();
                  } else {
                    cfg = { ...DEFAULT_CFG, ...content };
                    container.cache = true;
                    container
                      .reloadConfig()
                      .save()
                      .then((config) => {
                        if (config.autofetch) respHandles.build();
                        container.cache = null;
                      });
                  }
                } catch (e) {
                  showError(e);
                } finally {
                  inpJSON.remove();
                }
              };
              fr.readAsText(file);
            },
            false
          );
          target.parentElement.append(inpJSON);
          inpJSON.click();
        } else if (cmd === 'sort_by' && target.dataset.sort) {
          target.dataset.asc = MUList.sortBy(target.dataset.sort, target.dataset.asc === 'true');
        }
      } catch (ex) {
        showError(ex);
      }
    });
    // #endregion
    // #region UserJS Parser
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
    /**
     * @type { typeof import("../typings/types.d.ts").ParseUserJS }
     */
    const ParseUserJS = class {
      /**
       * @param {string} code
       * @param {boolean} [isCSS]
       */
      constructor(code, isCSS) {
        this.isUserCSS = isCSS === true;
        this.META_START_COMMENT = this.isUserCSS ? '/* ==UserStyle==' : '// ==UserScript==';
        this.META_END_COMMENT = this.isUserCSS ? '==/UserStyle== */' : '// ==/UserScript==';
        if (typeof code === 'string') {
          this.code = code;
          this.get_meta_block();
          this.get_code_block();
          this.parse_meta();
          this.calculate_applies_to_names();
        }
      }
      get_meta_block() {
        if (isEmpty(this.code)) {
          return '';
        }
        if (this.data_meta_block) {
          return this.data_meta_block;
        }
        const start_block = this.code.indexOf(this.META_START_COMMENT);
        if (isNull(start_block)) {
          return '';
        }
        const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return '';
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
          return '';
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
        this.data_code_block = code_block.split('\n').filter(Boolean).join('\n');
        return this.data_code_block;
      }
      parse_meta() {
        if (isEmpty(this.code)) {
          return {};
        }
        if (this.data_meta) {
          return this.data_meta;
        }
        /**
         * @type { { [meta: string]: string | string[] | { [resource: string]: string }; } }
         */
        const meta = {};
        const meta_block_map = new Map();
        const reg = (this.isUserCSS && /@([a-zA-Z:-]+)\s+(.*)/) || /\/\/\s+@([a-zA-Z:-]+)\s+(.*)/;
        for (const meta_line of this.get_meta_block().split('\n').filter(Boolean)) {
          let [, key, value] = reg.exec(meta_line) ?? [];
          if (!key) continue;
          key = key.trim();
          value = value.trim();
          if (!meta_block_map.has(key)) meta_block_map.set(key, []);
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
          return [];
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
        this.data_names = ParseUserJS.getNames(patterns);
        return this.data_names;
      }
      intersect(a, ...arr) {
        const aSet = new Set(a);
        return !isBlank([...aSet].filter((v) => arr.every((b) => b.includes(v))));
      }
      static getNames(patterns = []) {
        const name_map = new Map();
        const addObj = (obj) => {
          if (name_map.has(obj.text)) {
            return;
          }
          name_map.set(obj.text, obj);
        };
        for (let p of patterns) {
          const original_pattern = p;
          // eslint-disable-next-line no-useless-assignment
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
            } catch {
              addObj({ text: original_pattern, domain: false, tld_extra: false });
            }
          }
        }
        return [...name_map.values()];
      }
      async request(translate = false, code_url, obj) {
        if (this.data_code_block) {
          return this;
        }
        /** @type { string } */
        const code = await Network.req(code_url, 'GET', 'text').catch(con.err);
        if (typeof code !== 'string') {
          return this;
        }
        this.isUserCSS = isUserCSS(code_url);
        this.META_START_COMMENT = this.isUserCSS ? '/* ==UserStyle==' : '// ==UserScript==';
        this.META_END_COMMENT = this.isUserCSS ? '==/UserStyle== */' : '// ==/UserScript==';
        this.code = code;
        this.get_meta_block();
        this.get_code_block();
        this.parse_meta();
        this.calculate_applies_to_names();

        const { data_meta } = this;
        if (translate) {
          if (data_meta[`name:${Language.current}`]) {
            Object.assign(obj, {
              name: data_meta[`name:${Language.current}`]
            });
            this.translated = true;
          }
          if (data_meta[`description:${Language.current}`]) {
            Object.assign(obj, {
              description: data_meta[`description:${Language.current}`]
            });
            this.translated = true;
          }
        }
        if (Array.isArray(data_meta.grant)) {
          data_meta.grant = [...new Set(data_meta.grant.flat())];
        }
        if (data_meta.resource) {
          const obj = {};
          if (typeof data_meta.resource === 'string') {
            const [, key, value] = /(.+)\s+(.+)/.exec(data_meta.resource) ?? [];
            if (key) {
              obj[key.trim()] = value;
            }
          } else {
            for (const r of data_meta.resource) {
              const [, key, value] = /(.+)\s+(http.+)/.exec(r) ?? [];
              if (key) {
                obj[key.trim()] = value;
              }
            }
          }
          data_meta.resource = obj;
        }
        Object.assign(this, {
          code_size: [Network.format(code.length)],
          meta: data_meta
        });

        return this;
      }
    };
    // #endregion
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
      if (!obj.root || !obj.type) return;
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
    // #region Create UserJS
    /**
     * @param { import("../typings/types.d.ts").GSForkQuery } ujs
     * @param { string } engine
     */
    const createjs = (ujs, engine) => {
      const a = [
        ujs.deleted === true,
        /** No need to list our UserScript */
        ujs.id === 421603,
        cfg.recommend.blacklist.includes(ujs.id),
        cfg.recommend.blacklist.includes(ujs.url)
      ].some((t) => t === true);
      if (a) return;
      if (!container.userjsCache.has(ujs.id)) {
        container.userjsCache.set(ujs.id, ujs);
      }
      const eframe = make('td', 'install-btn');
      const uframe = make('td', 'mujs-uframe');
      const fdaily = make('td', 'mujs-list', {
        textContent: ujs.daily_installs,
        dataset: {
          name: 'daily_installs'
        }
      });
      const fupdated = make('td', 'mujs-list', {
        textContent: Language.toDate(ujs.code_updated_at),
        dataset: {
          name: 'code_updated_at',
          value: new Date(ujs.code_updated_at).toISOString()
        }
      });
      /**
       * @type { import("../typings/types.d.ts").NameElement }
       */
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
        textContent: `${i18n$('created_date')}: ${Language.toDate(ujs.created_at)}`,
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
        textContent: `${i18n$('total_installs')}: ${Language.toNumber(ujs.total_installs)}`,
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
        title: `${i18n$('install')} "${ujs.name}"`,
        textContent: i18n$('install') + ' ',
        dataset: {
          command: 'install-script',
          userjs: ujs.id
        }
      });
      IconSVG.load('install', scriptInstall);
      const scriptDownload = make('mu-jsbtn', {
        textContent: i18n$('saveFile') + ' ',
        dataset: {
          command: 'download-userjs',
          userjs: ujs.id,
          userjsName: ujs.name
        }
      });
      IconSVG.load('download', scriptDownload);
      const tr = make('tr', 'frame', {
        dataset: {
          engine,
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
        textContent: i18n$('code') + ' ',
        dataset: {
          command: 'load-userjs',
          userjs: ujs.id
        }
      });
      IconSVG.load('code', loadCode);
      const loadMetadata = make('mu-jsbtn', {
        textContent: i18n$('metadata') + ' ',
        dataset: {
          command: 'load-header',
          userjs: ujs.id
        }
      });
      IconSVG.load('code', loadMetadata);
      if (
        !engine.includes('fork') &&
        cfg.recommend.others &&
        cfg.recommend.list.includes(ujs.url)
      ) {
        tr.dataset.good = 'upsell';
      }
      for (const u of ujs.users) {
        const user = make('mujs-a', {
          textContent: u.name + ' ',
          title: u.url,
          dataset: {
            command: 'open-tab',
            webpage: u.url
          }
        });
        if (
          cfg.recommend.author &&
          (u.id === cfg.recommend.authorID || u.url === cfg.recommend.authorUrl)
        ) {
          tr.dataset.author = 'upsell';
          IconSVG.load('verified', user);
        }
        uframe.append(user);
      }
      if (cfg.recommend.others && cfg.recommend.list.includes(ujs.id)) {
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
      fname._mujs = { fmore, fBtns, codeArea };

      const loadPage = make('mu-jsbtn', {
        textContent: 'Page ',
        dataset: {
          command: 'load-page',
          userjs: ujs.id
        }
      });
      IconSVG.load('pager', loadPage);
      fBtns.append(loadPage);

      if (ujs._mujs.code?.translated) tr.classList.add('translated');

      for (const e of [fname, uframe, fdaily, fupdated, eframe]) tr.append(e);
      ujs._mujs.root = tr;
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
    /**
     * @type { typeof import("../typings/UserJS.d.ts").List }
     */
    const List = class {
      #intEngines;
      #intHost;
      constructor(hostname = undefined) {
        this.build = this.build.bind(this);
        this.groupBy = this.groupBy.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.sortRecords = this.sortRecords.bind(this);
        this.#intEngines = cfg.engines ?? [];
        this.setHost(hostname);
      }

      /**
       * @template { import("../typings/types.d.ts").UserJSEngine } E
       * @param {E[]} engines
       */
      setEngines(engines = []) {
        const { host } = this;
        this.#intEngines = engines.filter((e) => {
          if (e.enabled && Array.isArray(e.unsupported) && e.unsupported.includes(host)) {
            container.timeoutFrame();
            showError(`[${e.name}]: Unsupported on "${host}"`);
            return false;
          }
          return e.enabled;
        });
        return this.#intEngines;
      }

      setHost(hostname) {
        hostname ??= container.host;
        this.#intHost = hostname;
        this.blacklisted = container.checkBlacklist(hostname);
        this.#intEngines = this.setEngines(this.engines);
        this.domain = this.getDomain(this.#intHost);
        if (this.blacklisted) {
          showError(`Blacklisted "${hostname}"`);
          container.timeoutFrame();
        }
        return hostname;
      }

      dispatch(ujs) {
        main.dispatchEvent(new CustomEvent('updateditem', { detail: ujs }));
        return this;
      }

      get engines() {
        return this.#intEngines;
      }

      get host() {
        return this.#intHost;
      }

      getDomain(str = '') {
        if (str === '*') {
          return 'all-sites';
        }
        return str.split('.').at(-2) ?? BLANK_PAGE;
      }

      // #region Builder
      build() {
        try {
          container.refresh();
          const { blacklisted, engines, host, domain, dispatch } = this;
          if (blacklisted || isEmpty(engines)) {
            container.opacityMin = '0';
            mainframe.style.opacity = container.opacityMin;
            return this;
          }
          const fetchRecords = [];
          const bsFilter = loadFilters();
          const hostCache = Array.from(this);

          con.info('Building list', { hostCache, engines, container, list: this });

          const gb = this.groupBy();
          const toFetch = engines.filter((engine) => !gb[engine.name]);
          const isCached = toFetch.filter((engine) =>
            hostCache.find(({ _mujs }) => engine.name === _mujs.info.engine.name)
          );
          if (!isBlank(toFetch) && isBlank(isCached)) {
            for (const engine of engines) {
              con.info(`Fetching from "${engine.name}" for "${host}"`);
              const sourceURL = decode(engine.query)
                .replace(/\{host\}/g, host)
                .replace(/\{domain\}/g, domain);
              /**
               * @param {Error} error
               */
              const respError = (error) => {
                if (!error.cause) error.cause = engine.name;
                let msg = error;
                if (error.message.startsWith('status: 429')) {
                  msg = `reason: "Too many requests..." ${error}`;
                } else if (error.message.startsWith('status: 403')) {
                  msg = `reason: "Forbidden" ${error}`;
                }
                showError(`[${engine.name}]:`, msg);
              };
              const _mujs = (d) => {
                /**
                 * @type {import("../typings/types.d.ts").GSForkQuery}
                 */
                const ujs = {
                  ...template,
                  ...d,
                  code_urls: [],
                  _mujs: {
                    root: {},
                    info: {
                      engine,
                      host
                    },
                    code: {
                      meta: {}
                    }
                  }
                };
                ujs._mujs.code.request = async (translate = false, code_url) => {
                  if (typeof ujs._mujs.code.data_code_block === 'string') {
                    return ujs._mujs.code;
                  }
                  const p = await new ParseUserJS().request(
                    translate,
                    code_url ?? ujs.code_url,
                    ujs
                  );
                  if (code_url) {
                    return p;
                  }
                  for (const [k, v] of Object.entries(p)) ujs._mujs.code[k] = v;
                  return ujs._mujs.code;
                };
                return ujs;
              };
              /**
               * @param { import("../typings/types.d.ts").GSFork } dataQ
               */
              const forkFN = async (dataQ) => {
                if (!dataQ) {
                  showError('Invalid data received from the server, check internet connection');
                  return;
                }
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
                const g = _self.groupBy(dataA.map(_mujs), ({ locale }) => {
                  const [current = locale] = locale.split('-');
                  return current;
                });
                for (const [k, list] of Object.entries(g)) {
                  if (list) {
                    for (const ujs of list) {
                      if (cfg.filterlang && k !== Language.current) {
                        const c = await ujs._mujs.code.request(true);
                        if (!c.translated) continue;
                      }
                      if (
                        !ujs._mujs.code.data_code_block &&
                        (cfg.preview.code || cfg.preview.metadata)
                      ) {
                        ujs._mujs.code.request().then(() => {
                          dispatch(ujs);
                        });
                      }
                      if (isUserCSS(ujs.code_url)) {
                        ujs.code_urls.push(
                          {
                            name: `${ujs.name} (.user.css)`,
                            code_url: ujs.code_url
                          },
                          {
                            name: `${ujs.name} (.user.js)`,
                            code_url: ujs.code_url.replace(/\.user\.css$/, '.user.js')
                          }
                        );
                      }
                      createjs(ujs, engine.name);
                    }
                  }
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
                  const d = htmlDocument.documentElement;
                  if (/openuserjs/gi.test(engine.name)) {
                    const col = qsA('.col-sm-8 .tr-link', d) ?? [];
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
              /**
               * Scrape a Greasy Fork / Sleazy Fork `by-site` listing page.
               * The JSON by-site endpoint currently returns an empty array for every
               * domain, and the JSON search endpoint matches free text, so it also
               * returns scripts that merely mention the host. The listing page is
               * domain-accurate, so parse it the way the openuserjs branch does.
               * Each row carries `data-code-url`, so no slug reconstruction is needed.
               */
              const forkPage = async (htmlDocument) => {
                if (!htmlDocument) {
                  showError('Invalid data received from the server');
                  return;
                }
                const origin = /sleazy/gi.test(engine.name)
                  ? 'https://sleazyfork.org'
                  : 'https://greasyfork.org';
                const d = htmlDocument.documentElement;
                const bsFilter = loadFilters();
                for (const row of qsA('li[data-script-id]', d)) {
                  const codeURL = dom.attr(row, 'data-code-url');
                  const link = qs('.script-link', row);
                  if (!codeURL || !link) continue;
                  const pageURL = new URL(dom.prop(link, 'href') ?? '', origin).href;
                  let users = [];
                  const authors = dom.attr(row, 'data-script-authors');
                  if (authors) {
                    try {
                      users = Object.values(JSON.parse(authors)).map((name) => ({
                        name,
                        url: ''
                      }));
                    } catch {
                      users = [];
                    }
                  }
                  const ujs = _mujs({
                    id: Number(dom.attr(row, 'data-script-id') ?? 0),
                    name: dom.attr(row, 'data-script-name') ?? '',
                    description: dom.text(qs('.script-description', row)),
                    url: pageURL,
                    page_url: pageURL,
                    code_url: codeURL,
                    version: dom.attr(row, 'data-script-version'),
                    created_at: dom.attr(row, 'data-script-created-date'),
                    code_updated_at: dom.attr(row, 'data-script-updated-date'),
                    daily_installs: Number(dom.attr(row, 'data-script-daily-installs') ?? 0),
                    total_installs: Number(
                      dom.attr(row, 'data-script-total-installs')?.replace(/,/g, '') ?? 0
                    ),
                    users
                  });
                  ujs._mujs.code.url = ujs.url;
                  // Same exclusion check the openuserjs branch applies: a true
                  // result means the user's List Filters exclude this entry.
                  if (bsFilter.match(ujs)) continue;
                  createjs(ujs, engine.name);
                }
              };
              const gitFN = (data) => {
                try {
                  if (isBlank(data.items)) {
                    return;
                  }
                  for (const r of data.items) {
                    const ujs = _mujs({
                      id: r.id ?? 0,
                      name: r.name,
                      description: isEmpty(r.description) ? i18n$('no_license') : r.description,
                      url: r.html_url,
                      code_url: r.html_url,
                      page_url: `${r.url}/contents/README.md`,
                      created_at: r.created_at,
                      code_updated_at: r.updated_at || Date.now(),
                      daily_installs: r.watchers_count ?? 0,
                      good_ratings: r.stargazers_count ?? 0,
                      users: [
                        {
                          name: r.owner.login,
                          url: r.owner.html_url
                        }
                      ]
                    });
                    if (r.license?.name) ujs.license = r.license.name;
                    const rootPath = r.contents_url.replace(/\{\+path\}/, '');
                    const fetchContent = async (dir) => {
                      const contents = await Network.req(dir, 'GET', 'json', {
                        headers: {
                          Accept: 'application/vnd.github+json',
                          Authorization: `Bearer ${engine.token}`,
                          'X-GitHub-Api-Version': '2022-11-28'
                        }
                      }).catch(respError);
                      for (const content of contents) {
                        if (content.type === 'file') {
                          if (isUserJS(content.name)) {
                            ujs.code_urls.push({
                              name: content.name,
                              code_url: content.download_url
                            });
                          } else if (isUserCSS(content.name)) {
                            ujs.code_urls.push({
                              name: content.name,
                              code_url: content.download_url
                            });
                          }
                        } else if (content.type === 'dir') {
                          await fetchContent(`${rootPath}/${content.path}`);
                        }
                      }
                    };
                    fetchContent(rootPath).then(() => {
                      if (isEmpty(ujs.code_urls)) {
                        ujs.deleted = true;
                      } else if (
                        !ujs._mujs.code.data_code_block &&
                        (cfg.preview.code || cfg.preview.metadata)
                      ) {
                        ujs._mujs.code.request().then(() => {
                          dispatch(ujs);
                        });
                        return;
                      }
                      dispatch(ujs);
                    });
                    createjs(ujs, engine.name);
                  }
                } catch (ex) {
                  showError(ex);
                }
              };
              let netFN;
              if (/github/gi.test(engine.name)) {
                if (isEmpty(engine.token)) {
                  showError(`[${engine.name}]: Token required for use`);
                  continue;
                }
                Network.req(
                  `https://api.github.com/search/repositories?q=topic:${domain}+topic:userstyle`,
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
                  .catch(respError);
                netFN = Network.req(sourceURL, 'GET', 'json', {
                  headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${engine.token}`,
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                })
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
                          container.rateContainer.append(txt);
                        }
                      })
                      .catch(respError);
                  });
              } else if (/openuserjs/gi.test(engine.name)) {
                netFN = Network.req(sourceURL, 'GET', 'document').then(openuserjs);
              } else if (/(greasy|sleazy)fork/gi.test(engine.name)) {
                netFN = Network.req(sourceURL, 'GET', 'document').then(forkPage);
              } else {
                netFN = Network.req(sourceURL).then(forkFN);
              }
              if (netFN) {
                fetchRecords.push(netFN.catch(respError));
              }
            }
          }

          container.urlBar.placeholder = i18n$('search_placeholder');
          container.urlBar.value = '';

          if (isBlank(fetchRecords)) {
            Promise.resolve().then(this.sortRecords);
          } else {
            Promise.allSettled(fetchRecords).then(this.sortRecords).catch(showError);
          }
        } catch (ex) {
          showError(ex);
        }
        return this;
      }
      // #endregion

      /**
       * @param {string} sortType
       * @param {boolean} asc
       */
      sortBy(sortType = cfg.autoSort, asc = false) {
        const hostCache = Array.from(this);
        const arr = hostCache.flat().sort((a, b) => {
          if (/code_updated_at|created_at/.test(sortType)) {
            return a[sortType] > b[sortType];
          } else if (/name|users|description/.test(sortType)) {
            if (Array.isArray(a[sortType])) {
              return a[sortType][0].name.localeCompare(b[sortType][0].name);
            }
            return a[sortType].localeCompare(b[sortType]);
          }
          return b[sortType] - a[sortType];
        });
        const sorted = asc ? arr.reverse() : arr;

        for (const ujs of sorted) {
          if (isElem(ujs._mujs.root)) container.tabbody.append(ujs._mujs.root);
        }

        return `${!asc}`;
      }

      sortRecords() {
        this.sortBy(cfg.autoSort);
        for (const [name, value] of Object.entries(this.groupBy())) {
          Counter.update(value.length, { name });
        }
        return this;
      }

      groupBy() {
        return _self.groupBy(Array.from(this), ({ _mujs }) => _mujs.info.engine.name);
      }

      *[Symbol.iterator]() {
        const { host, engines } = this;
        const arr = Array.from(container).filter(
          ({ _mujs }) =>
            _mujs.info.host === host &&
            engines.find((engine) => engine.enabled && engine.name === _mujs.info.engine.name)
        );
        for (const userjs of arr) {
          yield userjs;
        }
      }
    };
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
        if (tag === 'filters') {
          const svg = IconSVG.load('info', divDesc);
          formAttrs(svg, {
            dataset: { command: 'more-info', webpage: 'https://greasyfork.org/scripts/12179' }
          });
        }
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
        container.cfgpage.append(sec);
        if (!container.cfgpage._mujs.sections.has(sec)) container.cfgpage._mujs.sections.add(sec);
        return sec;
      };
      const sections = {
        general: makesection('General', 'general'),
        load: makesection('Automation', 'load'),
        list: makesection('List', 'list'),
        filters: makesection('List Filters ', 'filters'),
        blacklist: makesection('Blacklist (READONLY)', 'blacklist'),
        engine: makesection('Search Engines', 'engine'),
        theme: makesection('Theme Colors', 'theme'),
        exp: makesection('Import / Export', 'exp')
      };
      const makeRow = (text, value, type = 'checkbox', tag = 'general', attrs = {}) => {
        const [name, CONFIG, SUB_CONFIG] = /^(\w+)-(.+)/.exec(value) ?? [];
        const lb = make('label', 'sub-section hidden', {
          dataset: {
            [tag]: text
          }
        });
        const txt = make('mu-js', {
          innerHTML: text
        });
        lb.append(txt);
        const getDefault = () => {
          if (tag === 'engine') {
            const engine = DEFAULT_CONFIG.engines.find((engine) => engine.name === value);
            if (engine) {
              return engine;
            }
          }
          if (CONFIG) return DEFAULT_CONFIG[CONFIG][SUB_CONFIG];
          return DEFAULT_CONFIG[value];
        };
        const getValue = () => {
          if (tag === 'engine') {
            const engine = cfg.engines.find((engine) => engine.name === value);
            if (engine) {
              return engine;
            }
          }
          if (CONFIG) return cfg[CONFIG][SUB_CONFIG];
          return cfg[value];
        };
        const obj = {
          text,
          tag,
          value,
          type,
          attrs,
          default: getDefault(),
          cache: getValue()
        };
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
          obj.elem = inp;
          container.cfgpage._mujs.base.push(obj);
          ael(
            inp,
            'change',
            function () {
              container.cache = true;
              cfg[value] = this.value;
            },
            false
          );
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

          if (CONFIG) {
            if (CONFIG === 'filters') {
              inp.checked = cfg[CONFIG][SUB_CONFIG].enabled;
            } else {
              inp.checked = cfg[CONFIG][SUB_CONFIG];
            }
          } else {
            inp.checked = cfg[value];
          }
          ael(
            inp,
            'change',
            function () {
              container.setCache(true, /filterlang/i.test(value));
              if (CONFIG) {
                if (CONFIG === 'filters') {
                  cfg[CONFIG][SUB_CONFIG].enabled = this.checked;
                } else {
                  cfg[CONFIG][SUB_CONFIG] = this.checked;
                }
              } else {
                cfg[value] = this.checked;
              }
            },
            false
          );

          if (tag === 'engine') {
            const engine = cfg.engines.find((engine) => engine.name === value);
            if (engine) {
              inp.checked = engine.enabled;
              inp.dataset.engine = engine.name;
              ael(
                inp,
                'change',
                function () {
                  container.cache = true;
                  engine.enabled = this.checked;
                  MUList.setEngines(cfg.engines);
                },
                false
              );

              if (engine.query) {
                const d = DEFAULT_CONFIG.engines.find((e) => e.name === engine.name);
                const urlInp = make('input', {
                  type: 'text',
                  defaultValue: '',
                  value: decode(engine.query),
                  placeholder: decode(d.query),
                  dataset: {
                    name,
                    engine: engine.name
                  }
                });
                ael(
                  urlInp,
                  'change',
                  function () {
                    container.cache = true;
                    try {
                      engine.query = encodeURIComponent(new URL(this.value).toString());
                      MUList.setEngines(cfg.engines);
                    } catch (ex) {
                      con.err(ex);
                    }
                  },
                  false
                );
                obj.elemUrl = urlInp;
                lb.append(urlInp);
              }
              if (engine.name === 'github') {
                const ghToken = make('input', {
                  type: 'text',
                  defaultValue: '',
                  value: engine.token ?? '',
                  // TODO: add translation
                  placeholder: 'Paste Access Token',
                  dataset: {
                    engine: 'github-token'
                  }
                });
                ael(
                  ghToken,
                  'change',
                  function () {
                    container.cache = true;
                    engine.token = this.value;
                    MUList.setEngines(cfg.engines);
                  },
                  false
                );
                obj.elemToken = ghToken;
                lb.append(ghToken);
              }
            }
          }
        } else {
          if (type === 'text') {
            inp.defaultValue = '';
            inp.value = value ?? '';
            inp.placeholder = value ?? '';

            if (tag === 'theme') {
              inp.dataset[tag] = text;
              ael(
                inp,
                'change',
                function () {
                  let isvalid = true;
                  try {
                    const sty = container.root.style;
                    const str = `--mujs-${text}`;
                    const prop = sty.getPropertyValue(str);
                    if (isEmpty(this.value)) {
                      cfg.theme[text] = DEFAULT_CONFIG.theme[text];
                      sty.removeProperty(str);
                      return;
                    }
                    if (prop === this.value) return;
                    sty.removeProperty(str);
                    sty.setProperty(str, this.value);
                    cfg.theme[text] = this.value;
                  } catch (ex) {
                    con.err(ex);
                    isvalid = false;
                  } finally {
                    if (isvalid) {
                      dom.cl.remove(this, 'mujs-invalid');
                      dom.prop(savebtn, 'disabled', false);
                    } else {
                      dom.cl.add(this, 'mujs-invalid');
                      dom.prop(savebtn, 'disabled', true);
                    }
                  }
                },
                false
              );
            }
          }

          lb.append(inp);
        }
        obj.elem = inp;
        container.cfgpage._mujs.base.push(obj);
        return lb;
      };
      if ($GM.isGM) {
        makeRow(i18n$('userjs_sync'), 'cache');
        makeRow(i18n$('userjs_autoinject'), 'autoinject', 'checkbox', 'load');
      }
      makeRow(
        `${i18n$('redirect')} ${IconSVG.load('info', { dataset: { command: 'more-info', webpage: 'https://greasyfork.org/scripts/23840' } })}`,
        'sleazyredirect'
      );
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
          container.setCache(true);
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
            dom.rmChildren(btnfullscreen);
            IconSVG.load('collapse', btnfullscreen);
          } else {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.rmChildren(btnfullscreen);
            IconSVG.load('expand', btnfullscreen);
          }
        }
      });
      // TODO: add translation
      makeRow('Clear on Tab close', 'clearTabCache', 'checkbox', 'load');

      makeRow(i18n$('default_sort'), 'autoSort', 'select', 'list');
      makeRow(i18n$('filter'), 'filterlang', 'checkbox', 'list');
      makeRow(i18n$('preview_code'), 'preview-code', 'checkbox', 'list');
      makeRow(i18n$('preview_metadata'), 'preview-metadata', 'checkbox', 'list');
      makeRow(i18n$('recommend_author'), 'recommend-author', 'checkbox', 'list');
      makeRow(i18n$('recommend_other'), 'recommend-others', 'checkbox', 'list');

      for (const [k, v] of Object.entries(cfg.filters))
        makeRow(v.name, `filters-${k}`, 'checkbox', 'filters');

      const engNames = {
        greasyfork: 'Greasy Fork',
        sleazyfork: 'Sleazy Fork',
        openuserjs: 'Open UserJS',
        github: `GitHub API ${IconSVG.load('info', { dataset: { command: 'more-info', webpage: 'https://docs.github.com/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens' } })}`
      };
      for (const [k, v] of Object.entries(engNames)) makeRow(v, k, 'checkbox', 'engine');

      for (const [k, v] of Object.entries(cfg.theme)) makeRow(k, v, 'text', 'theme');

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
      //       con.err(ex);
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

      /**
       * @template { import("../typings/types.d.ts").UserJSBlacklist } B
       * @param {B} blacklist
       * @param {string} v
       * @param {boolean} disabled
       * @param {string} type
       */
      const createList = (blacklist, v = '', disabled = false, type = 'String') => {
        let txt = blacklist;
        if (typeof blacklist === 'string' && blacklist.startsWith('userjs-')) {
          disabled = true;
          const s = blacklist.substring(7);
          txt = `Built-in "${s}"`;
          v = builtinList[s];
        } else if (isObj(blacklist)) {
          if (!blacklist.enabled) return;
        }
        type = objToStr(v);
        v = (isRegExp(v) ? v.toString() : JSON.stringify(v)) ?? '';
        const lb = make('label', 'hidden', {
          textContent: txt,
          dataset: { blacklist }
        });
        const inp = make('input', {
          type: 'text',
          defaultValue: '',
          value: v,
          placeholder: v,
          dataset: { blacklist }
        });
        ael(
          inp,
          'change',
          function () {
            let isvalid = true;
            try {
              if (isEmpty(this.value)) return;
              isvalid = true;
            } catch (ex) {
              con.err(ex);
              isvalid = false;
            } finally {
              if (isvalid) {
                dom.cl.remove(this, 'mujs-invalid');
                dom.prop(savebtn, 'disabled', false);
              } else {
                dom.cl.add(this, 'mujs-invalid');
                dom.prop(savebtn, 'disabled', true);
              }
            }
          },
          false
        );
        const selType = make('select', {
          dataset: { blacklist },
          disabled
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
      for (const key of cfg.blacklist) createList(key);
      for (const type of ['import', 'export']) {
        for (const key of ['config', 'theme']) {
          const v = make('mujs-btn', `mujs-${type} sub-section hidden`, {
            textContent: i18n$(`${type}_${key}`),
            dataset: {
              command: `${type}-${key}`,
              exp: `${type}-${key}`
            }
          });
          sections.exp.append(v);
        }
      }
      container.cfgpage.append(cbtn);
    };
    // #endregion
    container.Tabs.custom = (host) => {
      MUList.setHost(host);
      respHandles.build();
    };
    ael(
      container.urlBar,
      'input',
      function () {
        if (this.placeholder === i18n$('newTab')) return;
        if (isEmpty(this.value)) {
          dom.cl.remove([...container.toElem(), ...container.cfgpage._mujs.sections], 'hidden');
          return;
        }
        const finds = new Set();
        if (!dom.cl.has(container.cfgpage, 'hidden')) {
          const reg = new RegExp(this.value, 'gi');
          for (const elem of container.cfgpage._mujs.sections) {
            if (!isElem(elem)) continue;
            if (finds.has(elem)) continue;
            if (elem.textContent.match(reg)) finds.add(elem);
          }
          dom.cl.add(container.cfgpage._mujs.sections, 'hidden');
          dom.cl.remove([...finds], 'hidden');
          return;
        }
        const cacheValues = Array.from(container).filter(({ _mujs }) => {
          return !finds.has(_mujs.root);
        });
        /**
         * @param {RegExp} regExp
         * @param {string} key
         */
        const ezQuery = (regExp, key) => {
          const reg = new RegExp(this.value.replace(regExp, ''), 'gi');
          cacheValues.filter((ujs) => `${ujs[key]}`.match(reg) && finds.add(ujs._mujs.root));
        };
        const [, q, p] = /^(id|license|name|description):(.+)/.exec(this.value) ?? [];
        if (q) {
          const reg = new RegExp(p, 'gi');
          cacheValues.filter((ujs) => `${ujs[q]}`.match(reg) && finds.add(ujs._mujs.root));
        }
        if (this.value.match(/^(code_url|url):/)) {
          ezQuery(/^(code_url|url):/, 'code_url');
        } else if (this.value.match(/^(author|users?):/)) {
          const [, parts] = /^[\w_]+:(.+)/.exec(this.value) ?? [];
          if (parts) {
            const reg = new RegExp(parts, 'gi');
            for (const v of cacheValues.filter((v) => !isEmpty(v.users))) {
              for (const user of v.users) {
                for (const value of Object.values(user)) {
                  if (
                    (typeof value === 'string' && value.match(reg)) ||
                    (typeof value === 'number' && `${value}`.match(reg))
                  ) {
                    finds.add(v._mujs.root);
                  }
                }
              }
            }
          }
        } else if (this.value.match(/^(locale|i18n):/)) {
          ezQuery(/^(locale|i18n):/, 'locale');
        } else if (this.value.match(/^(search_engine|engine):/)) {
          const [, parts] = /^[\w_]+:(\w+)/.exec(this.value) ?? [];
          if (parts) {
            const reg = new RegExp(parts, 'gi');
            for (const { _mujs } of cacheValues)
              if (_mujs.info.engine.name.match(reg)) finds.add(_mujs.root);
          }
        } else if (this.value.match(/^filter:/)) {
          const [, parts] = /^\w+:(.+)/.exec(this.value) ?? [];
          if (parts) {
            const bsFilter = loadFilters();
            const filterType = bsFilter.get(parts.trim().toLocaleLowerCase());
            if (filterType) {
              const { reg } = filterType;
              for (const { name, users, _mujs } of cacheValues) {
                if ([{ name }, ...users].find((o) => o.name.match(reg))) continue;
                finds.add(_mujs.root);
              }
            }
          }
        } else if (this.value.match(/^recommend:/)) {
          for (const { url, id, users, _mujs } of cacheValues) {
            if (
              users.find((u) => u.id === cfg.recommend.authorID) ||
              cfg.recommend.list.includes(url) ||
              cfg.recommend.list.includes(id)
            ) {
              finds.add(_mujs.root);
            }
          }
        } else {
          const reg = new RegExp(this.value, 'gi');
          for (const v of cacheValues) {
            if (v.name && v.name.match(reg)) finds.add(v._mujs.root);
            if (v.description && v.description.match(reg)) finds.add(v._mujs.root);
            if (v._mujs.code.data_meta)
              for (const key of Object.keys(v._mujs.code.data_meta))
                if (/name|desc/i.test(key) && key.match(reg)) finds.add(v._mujs.root);
          }
        }
        dom.cl.add(container.toElem(), 'hidden');
        dom.cl.remove([...finds], 'hidden');
      },
      false
    );
    ael(
      container.urlBar,
      'change',
      function () {
        const tabElem = Tabs._active;
        if (this.placeholder === i18n$('newTab') && tabElem) {
          const tabHost = tabElem.firstElementChild;
          const host = formatURL(normalizedHostname(this.value));
          if (Tabs.protoReg.test(this.value)) {
            const createdTab = Tabs.getTab(this.value);
            Tabs.close(tabElem);
            if (createdTab) {
              Tabs.active(createdTab);
            } else {
              Tabs.create(this.value);
            }
            this.placeholder = i18n$('search_placeholder');
            this.value = '';
          } else if (host === '*') {
            tabElem.dataset.host = host;
            tabHost.title = tabHost.textContent = '<All Sites>';
            MUList.setHost(host);
            respHandles.build();
          } else if (container.checkBlacklist(host)) {
            showError(`Blacklisted: "${host}"`);
          } else {
            tabElem.dataset.host = tabHost.title = tabHost.textContent = host;
            MUList.setHost(host);
            respHandles.build();
          }
        }
      },
      false
    );
    scheduler.postTask(makecfg, { priority: 'background' });
    respHandles.build = async () => {
      await scheduler.postTask(MUList.build, { priority: 'background' });
      container.timeoutFrame();
    };
    if (cfg.autofetch) {
      respHandles.build();
    } else {
      container.timeoutFrame();
    }
  } catch (ex) {
    con.err(ex);
    container.remove();
  }
  return respHandles;
}
// #endregion
/**
 * @template F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (typeof onDomReady === 'function') {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomReady(document);
    } else {
      document.addEventListener('DOMContentLoaded', (evt) => onDomReady(evt.target), {
        once: true
      });
    }
  }
};
async function init() {
  const strPolicy = (string) => string;
  if (typeof window.trustedTypes !== 'undefined') {
    /**
     * Delay `trustedTypes.createPolicy` creation
     */
    const toDelay = [
      /** Microsoft Outlook */
      'outlook'
    ].join('|');
    const delayReg = new RegExp(toDelay, 'gi');
    if (delayReg.test(winURL.hostname)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (window.trustedTypes.defaultPolicy == null) {
      window.trustedTypes.createPolicy('default', {
        createHTML: strPolicy,
        createScript: strPolicy,
        createScriptURL: strPolicy
      });
    }
  }

  const config = copyObject(DEFAULT_CONFIG);
  cfg = {
    ...config,
    ...(await jsStorage.getValue('Config', config))
  };
  cfg.engines = cfg.engines.map((e) => {
    if (!Array.isArray(e.unsupported))
      e.unsupported = e.name.includes('fork') ? ['pornhub.com'] : [];
    return e;
  });
  con.info('Config:', cfg);
  loadDOM((doc) => {
    try {
      if (typeof doc === 'undefined')
        throw new Error('"doc" is null, reload the webpage or use a different one', {
          cause: 'loadDOM'
        });
      container.redirect();
      if (cfg.autoinject) {
        container.inject(primaryFN, doc);
      } else {
        container.timeoutFrame();
      }
      Command.register(i18n$('userjs_inject'), () => {
        container.inject(primaryFN, doc);
      }).register(i18n$('userjs_close'), () => {
        container.remove();
      });
      if (!isNativeHTMLElement(window.HTMLElement)) {
        con.info('This location overwrites "HTMLElement", using the native "HTMLElement" instead');
      }
    } catch (ex) {
      con.err(ex);
    }
  });
}
init();
