'use strict';

import { webext } from './ext.js';

let api = webext.storage.local;

// #region DEFAULT_CONFIG
/**
 * @type { import("../typings/types.d.ts").config }
 */
export const DEFAULT_CONFIG = {
  autofetch: true,
  // autoinject: true,
  autoSort: 'daily_installs',
  clearTabCache: true,
  // cache: true,
  // autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  // time: 10000,
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
    // {
    //   enabled: false,
    //   name: 'openuserjs',
    //   query: encodeURIComponent('https://openuserjs.org/?q={host}')
    // },
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

/** @type {{ [prefix: string]: StorageArea }} */
export const storageByPrefix = {};

/**
 * @param {function} [fnValue] - (value, newKey, obj) => newValue
 * @param {function} [fnKey] - (key, val, obj) => newKey (if newKey is falsy the key is skipped)
 * @param {Object} [thisObj] - passed as `this` to both functions
 * @return {Object}
 */
function mapEntry(fnValue, fnKey, thisObj) {
  const res = {};
  for (let key of Object.keys(this)) {
    const val = this[key];
    if (!fnKey || (key = thisObj[fnKey](key, val, this))) {
      res[key] = fnValue ? thisObj[fnValue](val, key, this) : val;
    }
  }
  return res;
}

class StorageArea {
  constructor(name, prefix) {
    storageByPrefix[prefix] = this;
    this.name = name;
    this.prefix = prefix;
  }

  /** @return {string} */
  toKey(id) {
    return this.prefix + id;
  }

  /** @return {string} */
  toId(key) {
    return key.startsWith(this.prefix) ? key.slice(this.prefix.length) : '';
  }

  /**
   * @param {string|number} id
   * @return {Promise<?>}
   */
  async getOne(id) {
    const key = this.toKey(id);
    return (await api.get([key]))[key];
  }

  /**
   * @param {?string[]} [ids] - if null/absent, the entire storage is returned
   * @param {function(val:?,key:string):?} [transform]
   * @return {Promise<?>} - single value or object of id:value
   */
  async getMulti(ids, transform) {
    const keys = ids?.map(this.toKey, this);
    const data = await api.get(keys);
    return transform || this.prefix ? mapEntry.call(data, transform, 'toId', this) : data;
  }

  /**
   * @param {string|number|Array<string|number>} id
   * @return {Promise<void>}
   */
  async remove(id) {
    const keys = (Array.isArray(id) ? id : [id]).filter(Boolean).map(this.toKey, this);
    if (keys.length) await api.remove(keys);
  }

  async setOne(id, value) {
    if (id) return this.set({ [id]: value });
  }

  /**
   * @param {Object} data
   * @return {Promise<Object>} same object
   */
  async set(data) {
    await api.set(this.prefix ? mapEntry.call(data, null, 'toKey', this) : data);
    return data;
  }
}

const storage = {
  get api() {
    return api;
  },
  set api(val) {
    api = val;
  },
  /** @return {?StorageArea} */
  forKey: (key) => storageByPrefix[/^\w+:|$/.exec(key)[0]],
  base: new StorageArea('base', ''),
  config: new StorageArea('config', 'cfg:'),
  cache: new StorageArea('cache', 'cac:')
};

export default storage;
