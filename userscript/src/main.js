const win = window,
// /**
//  * Network Format Bytes
//  * @param {number} bytes - Number of total bytes
//  * @param {number} decimals - toFixed decimal point
//  * @example <caption>Example usage</caption>
//  * // returns 1 KB
//  * formatBytes(1024); // OR formatBytes(1024,2);
//  * @returns {string} Formated bytes
//  */
// formatBytes = (bytes, decimals = 2) => {
//   if (!+bytes) return '0 Bytes';
//   const k = 1024,
//   dm = decimals < 0 ? 0 : decimals,
//   sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
//   i = Math.floor(Math.log(bytes) / Math.log(k));
//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
// },
// /**
//  * Network Progress Indicator
//  * @param {Object} evt - Onprogress event for XHR
//  * @example <caption>Example usage</caption>
//  * // returns 1%
//  * pbar({total: ..., loaded: 1024});
//  * // returns 1 KB
//  * pbar({total: 0, loaded: 1024});
//  * @returns {string} Returns bytes, if evt.total === 0 then file size format, otherwise % format
//  */
// pbar = (evt) => {
//   let forumla = Object.is(evt.total,0) ? formatBytes(evt.loaded) : `${+(evt.loaded / evt.total * 100).toFixed(2)}%`;
//   dbg(forumla);
//   return forumla;
// },
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

// TODO: Add tabs allowing the ability to search multiple sites @ once
let langs = {
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
alang = [],
clang = navigator.language.split('-')[0] ?? 'en',
checkGMSupport = typeof GM !== 'undefined',
defcfg = {
  cache: true,
  autoexpand: false,
  lang: langs[clang],
  filterlang: false,
  sleazyredirct: false,
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
  getValue(key,def = {}) {
    return new Promise((resolve) => {
      def = JSON.stringify(def ?? {});
      if(checkGMSupport) {
        resolve(JSON.parse( GM_getValue(key,def) ));
      };
      try {
        if(key.includes('Config')) {
          resolve(JSON.parse( win.localStorage.getItem(`MUJS${key}`) ));
        };
        resolve(JSON.parse( win.localStorage.getItem(key) ));
      } catch(ex) {
        handleError(ex);
      };
      resolve(def);
    });
  },
  info: {
    script: {
      version: 'Bookmarklet'
    }
  },
  /**
  * @param {string} url - URL of webpage to open
  * @param {object} params - GM parameters
  */
  openInTab(url,params = {}) {
    if(checkGMSupport) {
      params = Object.is(params,{}) ? {
        active: true,
        insert: true,
      } : params;
    } else {
      params = Object.is(params,{}) ? '_blank' : params;
    };
    return checkGMSupport ? GM_openInTab(url, params) : win.open(url, params);
  },
  setValue(key,v) {
    return new Promise((resolve) => {
      v = typeof v !== 'string' ? JSON.stringify(v ?? {}) : v;
      if(checkGMSupport) {
        if(!cfg.cache) {
          if(key.includes('Config')) {
            resolve(win.localStorage.setItem(`MUJS${key}`,v));
          };
          resolve(win.localStorage.setItem(key,v));
        };
        resolve(GM_setValue(key,v));
      };
      if(key.includes('Config')) {
        resolve(win.localStorage.setItem(`MUJS${key}`,v));
      };
      resolve(win.localStorage.setItem(key,v));
    });
  },
  // .catch((error) => {
  //   info(url,method,responseType,params);
  //   showError(error);
  // });
  fetchURL(url,method = 'GET',responseType = 'json',extras = {},forcefetch) {
    return new Promise((resolve, reject) => {
      if(checkGMSupport && !forcefetch) {
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

if(checkGMSupport) {
  Object.assign(MU, {
    info: GM_info,
  });
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
container = make('main-userjs','mujs-primary'),
ifram = make('iframe','mujs-iframe', {
  src: 'about:blank',
  onload: main,
});

function main() {
  const injCon = container.attachShadow instanceof Function ? container.shadowRoot : ifram.contentDocument.body;
  let unsaved = false,
  isBlacklisted = false;
  const save = () => {
    try {
      MU.setValue('Config',cfg);
      unsaved = false;
      log('Saved:',cfg);
    } catch(e) {err(e)};
  },
  timeout = new Timeout(),
  timeoutFrame = async () => {
    if(typeof cfg.time === 'number' && !isNaN(cfg.time)) {
      timeout.clear(...timeout.ids);
      await timeout.set(isBlacklisted ? cfg.time/2 : cfg.time);
      // if(!mainframe.classList.contains('hidden')) {
      //   mainframe.classList.add('hidden');
      //   ifram.setAttribute('style','display:none;');
      // };
      container.remove();
      ifram.remove();
      return timeout.clear(...timeout.ids);
    }
  },
  sh = elem => injCon.querySelector(elem),
  shA = elem => injCon.querySelectorAll(elem),
  // clk = e => e.dispatchEvent(new MouseEvent('click')),
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
  createjs = (ujs, issleazy) => {
    let frame = make('magic-userjs',`frame ${issleazy ? 'sf' : ''}`),
    fname = make('magic-userjs','magicuserjs-name'),
    ftitle = make('magicuserjs-a','magicuserjs-homepage', {
      title: ujs.name,
      innerHTML: ujs.name,
      onclick: (e) => {
        halt(e);
        MU.openInTab(ujs.url);
      }
    }),
    fver = make('magic-userjs','magicuserjs-list', {
      innerHTML: `${cfg.lang.version}: ${ujs.version}`,
    }),
    fcreated = make('magic-userjs','magicuserjs-list', {
      innerHTML: `${cfg.lang.created}: ${new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.created_at))}`,
    }),
    fmore = make('mujs-column','magicuserjs-list hidden', {
      style: 'margin-top: 3px;',
    }),
    ftotal = make('magic-userjs','magicuserjs-list', {
      innerHTML: `${cfg.lang.total}: ${ujs.total_installs}`,
    }),
    fgood = make('magic-userjs','magicuserjs-list', {
      title: cfg.lang.good,
      innerHTML: `${cfg.lang.rating}: ${ujs.good_ratings}`,
    }),
    fok = make('magic-userjs','magicuserjs-list', {
      title: cfg.lang.ok,
      innerHTML: ujs.ok_ratings,
    }),
    fbad = make('magic-userjs','magicuserjs-list', {
      title: cfg.lang.bad,
      innerHTML: ujs.bad_ratings,
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
    eframe = make('magic-userjs','magicuserjs-eframe'),
    uframe = make('magic-userjs','magicuserjs-uframe'),
    fdaily = make('magic-userjs','magicuserjs-list', {
      title: cfg.lang.daily,
      innerHTML: ujs.daily_installs,
    }),
    fupdated = make('magic-userjs','magicuserjs-list', {
      title: cfg.lang.updated,
      innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at)),
    }),
    fdwn = make('magicuserjs-btn','install', {
      title: `${cfg.lang.install} '${ujs.name}'`,
      innerHTML: `<svg viewBox="0 0 16 16"><g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g></svg> ${cfg.lang.install}`,
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
    eframe.append(uframe,fdaily,fupdated,fdwn);
    fmore.append(ftotal,fgood,fok,fbad,fver,fcreated);
    fname.append(ftitle,fdesc,fmore);
    frame.append(fname,eframe);
    sh('.magicuserjs-body').append(frame);
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
    if(/greasyfork\.org/.test(doc.location.hostname) && cfg.sleazyredirct) {
      let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
      qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
    };
    let host = location.hostname.split('.').splice(-2).join('.'),
    rebuild = false,
    siteujs = [],
    main = make('magic-userjs','main hidden'),
    usercss = make('style', 'primary-stylesheet', {innerHTML: main_css,}),
    tbody = make('magic-userjs','magicuserjs-body'),
    header = make('magic-userjs','magicuserjs-header'),
    cfgpage = make('mujs-row','magicuserjs-cfg hidden'),
    makerow = (desc,type,nm,attrs = {}) => {
      let sec = make('mujs-section','', {
        style: nm === 'cache' ? 'display: none;' : ''
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
          if(nm.match(/(autoexpand|sleazyredirct)/gi)) {
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
    gfcountframe = make('magic-userjs', 'counterframe', {
      style: 'background: #00b7ff;'
    }),
    sfcountframe = make('magic-userjs', 'counterframe', {
      style: 'background: #ed3f14;'
    }),
    gfcounter = make('count-frame','count', {
      title: 'https://greasyfork.org + https://sleazyfork.org',
    }),
    sfcounter = make('count-frame','count', {
      title: 'https://openuserjs.org',
    }),
    buildlist = async () => {
      try {
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
          users: [{
            name: '',
            url: '',
          }]
        };
        let sites = [],
        custom = [],
        engines = cfg.engines.filter(e => e.enabled);
        for(let i of engines) {
          if(i.url.match(/fork.org/gi)) {
            if(cfg.filterlang) {
              if(alang.length > 1) {
                for(let a of alang) {
                  // log(`${i.url}/${a}/scripts/by-site/${host}.json`);
                  urls.push(`${i.url}/${a}/scripts/by-site/${host}.json`);
                  sites.push(MU.fetchURL(`${i.url}/${a}/scripts/by-site/${host}.json`),);
                };
              } else {
                urls.push(`${i.url}/${clang}/scripts/by-site/${host}.json`);
                sites.push(MU.fetchURL(`${i.url}/${clang}/scripts/by-site/${host}.json`),);
              };
            } else {
              urls.push(`${i.url}/scripts/by-site/${host}.json`);
              sites.push(MU.fetchURL(`${i.url}/scripts/by-site/${host}.json`),);
            }
          };
          if(i.url.match(/(openuserjs.org|github.com)/gi)) {
            urls.push(`${i.url}${host}`);
            custom.push(MU.fetchURL(`${i.url}${host}`,'GET','text'),);
          };
        };
        let data = await Promise.all(sites).catch((e) => {throw new MUError('Data',e)});
        if(data) {
          for(let d of data) {
            for(let ujs of d) {
              if(ujs.deleted) continue;
              if(cfg.filterlang) {
                if(alang.length > 1) {
                  for(let a of alang) {
                    if(!ujs.locale.includes(a)) continue;
                  };
                } else if(!ujs.locale.includes(clang)) continue;
              };
              siteujs.push(
                {
                  url: ujs,
                  sleazy: false,
                },
              );
              sitegfcount++;
            };
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
          let c = await Promise.all(custom).catch((e) => {throw new MUError('Custom',e)}),
          parser = new DOMParser(),
          htmlDocument = parser.parseFromString(c,'text/html'),
          selected = htmlDocument.documentElement;
          if(qs('.col-sm-8 .tr-link',selected)) {
            for(let i of qsA('.col-sm-8 .tr-link',selected)) {
              await query('.script-version',i);
              let fixurl = qs('.tr-link-a',i).href.replaceAll(doc.location.origin,'https://openuserjs.org'),
              layout = {
                name: qs('.tr-link-a',i).textContent,
                description: qs('p',i).textContent,
                version: qs('.script-version',i).textContent,
                url: fixurl,
                code_url: `${fixurl.replaceAll('/scripts','/install')}.user.js`,
                total_installs: qs('td:nth-child(2) p',i).textContent,
                created_at: qs('td:nth-child(4) time',i).getAttribute('datetime'),
                code_updated_at: qs('td:nth-child(4) time',i).getAttribute('datetime'),
                users: [{
                  name: qs('.inline-block a',i).textContent,
                  url: qs('.inline-block a',i).href,
                }]
              };
              for(const key in template) {
                if(!Object.hasOwn(layout, key)) {
                  layout[key] = template[key];
                };
              };
              createjs(layout, true);
              sitesfcount++;
              sfcounter.innerHTML = sitesfcount;
            };
          };
          if(qs('.repo-list-item',selected)) {
            for(let r of qsA('.repo-list-item',selected)) {
              let layout = {},
              fixurl = qs('a',r).href.replaceAll(doc.location.origin,'https://github.com');
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
              sitesfcount++;
              sfcounter.innerHTML = sitesfcount;
            };
          };
          if(qs('div.gist-snippet',selected)) {
            for(let g of qsA('div.gist-snippet',selected)) {
              if(qs('span > a:nth-child(2)',g).textContent.includes('.user.js')) {
                let layout = {},
                fixurl = qs('span > a:nth-child(2)',g).href.replaceAll(doc.location.origin,'https://gist.github.com');
                layout = Object.assign(layout, {
                  url: fixurl,
                  code_url: `${fixurl}/raw/${qs('span > a:nth-child(2)',g).textContent}`,
                  created_at: qs('time-ago.no-wrap',g).getAttribute('datetime'),
                  users: [{
                    name: qs('span > a[data-hovercard-type]',g).textContent,
                    url: qs('span > a[data-hovercard-type]',g).href.replaceAll(doc.location.origin,'https://gist.github.com'),
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
                sitesfcount++;
                sfcounter.innerHTML = sitesfcount;
              };
            };
          };
          sfcounter.innerHTML = sitesfcount;
          mainbtn.innerHTML = sitesfcount + sitegfcount;
        };
        if(isBlank(data) && isBlank(custom)) showError('No available UserJS for this webpage');
        timeoutFrame();
      } catch(ex) {
        showError(ex);
      };
    },
    preBuild = () => {
      const bhref = win.top.document.location.href;
      let blacklist = cfg.blacklist.filter(b => b.enabled);
      siteujs = [];
      urls = [];
      sitegfcount = 0;
      sitesfcount = 0;
      tbody.innerHTML = '';
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
      return buildlist();
    },
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
      makerow(cfg.lang.redirect,'checkbox','sleazyredirect');
      makerow(cfg.lang.filter,'checkbox','filter');
      makerow('Greasy Fork','checkbox','greasyfork');
      makerow('Sleazy Fork','checkbox','sleazyfork');
      makerow('Open UserJS','checkbox','openuserjs');
      makerow('GitHub','checkbox','github');
      makerow('Gist (GitHub)','checkbox','gist');
      let rtime = makerow(`${cfg.lang.dtime} (ms)`,'number','time', {
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
          } catch(error) {
            isvalid = false;
            err(error);
          };
        },
      }),
      cbtn = make('magic-userjs', 'b', {
        style: 'display: flex'
      }),
      savebtn = make('mujs-btn', 'save', {
        style: 'margin: auto;',
        innerHTML: cfg.lang.save,
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
            preBuild();
            rebuild = false;
          };
          if(/greasyfork\.org/.test(doc.location.hostname) && cfg.sleazyredirct) {
            let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
            qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
          };
        },
      }),
      resetbtn = make('mujs-btn', 'reset', {
        style: 'margin: auto;',
        innerHTML: 'Reset',
        onclick: async (e) => {
          halt(e);
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
    fcopen = `<svg viewBox="0 0 96 96"><g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g></svg>`,
    fcclose = `<svg viewBox="0 0 385.331 385.331"><g><path d="M264.943,156.665h108.273c6.833,0,11.934-5.39,11.934-12.211c0-6.833-5.101-11.85-11.934-11.838h-96.242V36.181 c0-6.833-5.197-12.03-12.03-12.03s-12.03,5.197-12.03,12.03v108.273c0,0.036,0.012,0.06,0.012,0.084 c0,0.036-0.012,0.06-0.012,0.096C252.913,151.347,258.23,156.677,264.943,156.665z"/><path d="M120.291,24.247c-6.821,0-11.838,5.113-11.838,11.934v96.242H12.03c-6.833,0-12.03,5.197-12.03,12.03 c0,6.833,5.197,12.03,12.03,12.03h108.273c0.036,0,0.06-0.012,0.084-0.012c0.036,0,0.06,0.012,0.096,0.012 c6.713,0,12.03-5.317,12.03-12.03V36.181C132.514,29.36,127.124,24.259,120.291,24.247z"/><path d="M120.387,228.666H12.115c-6.833,0.012-11.934,5.39-11.934,12.223c0,6.833,5.101,11.85,11.934,11.838h96.242v96.423 c0,6.833,5.197,12.03,12.03,12.03c6.833,0,12.03-5.197,12.03-12.03V240.877c0-0.036-0.012-0.06-0.012-0.084 c0-0.036,0.012-0.06,0.012-0.096C132.418,233.983,127.1,228.666,120.387,228.666z"/><path d="M373.3,228.666H265.028c-0.036,0-0.06,0.012-0.084,0.012c-0.036,0-0.06-0.012-0.096-0.012 c-6.713,0-12.03,5.317-12.03,12.03v108.273c0,6.833,5.39,11.922,12.223,11.934c6.821,0.012,11.838-5.101,11.838-11.922v-96.242 H373.3c6.833,0,12.03-5.197,12.03-12.03S380.134,228.678,373.3,228.666z"/></g></svg>`,
    btnHide = make('mujs-btn','hide-list', {
      title: 'Hide',
      innerHTML: `<svg viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" d="M3.5 7.75A.75.75 0 014.25 7h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" clip-rule="evenodd"/></svg>`,
      onclick: (e) => {
        halt(e);
        main.classList.add('hidden');
        mainframe.classList.remove('hidden');
        timeoutFrame();
      }
    }),
    btnfullscreen = make('mujs-btn','fullscreen', {
      title: 'Fullscreen',
      innerHTML: `<svg viewBox="0 0 96 96"><g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g></svg>`,
      onclick: (e) => {
        halt(e);
        if(btnfullscreen.classList.contains('expanded')) {
          btnfullscreen.classList.remove('expanded');
          main.classList.remove('expanded');
          btnfullscreen.innerHTML = fcopen;
        } else {
          btnfullscreen.classList.add('expanded');
          main.classList.add('expanded');
          btnfullscreen.innerHTML = fcclose;
        };
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
    searcher = make('input','searcher', {
      style: 'width: 170px;',
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: cfg.lang.searcher,
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
    searchbtn = make('mujs-btn','search', {
      title: cfg.lang.search,
      innerHTML: `<svg viewBox='0 0 487.95 487.95'><g><path d='M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1 c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4 c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z'/></g></svg>`,
      onclick: (e) => {
        e.preventDefault();
        fsearch.classList.toggle('hidden');
      }
    }),
    closebtn = make('mujs-btn','close', {
      title: cfg.lang.close,
      innerHTML: `<svg viewBox="0 0 47.971 47.971"><g><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88 c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242 C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879 s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/></g></svg>`,
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
      innerHTML: `<svg viewBox="0 0 28 28">
      <path d="M14 9.50006C11.5147 9.50006 9.5 11.5148 9.5 14.0001C9.5 16.4853 11.5147 18.5001 14 18.5001C15.3488 18.5001 16.559 17.9066 17.3838 16.9666C18.0787 16.1746 18.5 15.1365 18.5 14.0001C18.5 13.5401 18.431 13.0963 18.3028 12.6784C17.7382 10.8381 16.0253 9.50006 14 9.50006ZM11 14.0001C11 12.3432 12.3431 11.0001 14 11.0001C15.6569 11.0001 17 12.3432 17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001C12.3431 17.0001 11 15.6569 11 14.0001Z"/>
      <path d="M21.7093 22.3948L19.9818 21.6364C19.4876 21.4197 18.9071 21.4515 18.44 21.7219C17.9729 21.9924 17.675 22.4693 17.6157 23.0066L17.408 24.8855C17.3651 25.273 17.084 25.5917 16.7055 25.682C14.9263 26.1061 13.0725 26.1061 11.2933 25.682C10.9148 25.5917 10.6336 25.273 10.5908 24.8855L10.3834 23.0093C10.3225 22.4731 10.0112 21.9976 9.54452 21.7281C9.07783 21.4586 8.51117 21.4269 8.01859 21.6424L6.29071 22.4009C5.93281 22.558 5.51493 22.4718 5.24806 22.1859C4.00474 20.8536 3.07924 19.2561 2.54122 17.5137C2.42533 17.1384 2.55922 16.7307 2.8749 16.4977L4.40219 15.3703C4.83721 15.0501 5.09414 14.5415 5.09414 14.0007C5.09414 13.4598 4.83721 12.9512 4.40162 12.6306L2.87529 11.5051C2.55914 11.272 2.42513 10.8638 2.54142 10.4882C3.08038 8.74734 4.00637 7.15163 5.24971 5.82114C5.51684 5.53528 5.93492 5.44941 6.29276 5.60691L8.01296 6.36404C8.50793 6.58168 9.07696 6.54881 9.54617 6.27415C10.0133 6.00264 10.3244 5.52527 10.3844 4.98794L10.5933 3.11017C10.637 2.71803 10.9245 2.39704 11.3089 2.31138C12.19 2.11504 13.0891 2.01071 14.0131 2.00006C14.9147 2.01047 15.8128 2.11485 16.6928 2.31149C17.077 2.39734 17.3643 2.71823 17.4079 3.11017L17.617 4.98937C17.7116 5.85221 18.4387 6.50572 19.3055 6.50663C19.5385 6.507 19.769 6.45838 19.9843 6.36294L21.7048 5.60568C22.0626 5.44818 22.4807 5.53405 22.7478 5.81991C23.9912 7.1504 24.9172 8.74611 25.4561 10.487C25.5723 10.8623 25.4386 11.2703 25.1228 11.5035L23.5978 12.6297C23.1628 12.95 22.9 13.4586 22.9 13.9994C22.9 14.5403 23.1628 15.0489 23.5988 15.3698L25.1251 16.4965C25.441 16.7296 25.5748 17.1376 25.4586 17.5131C24.9198 19.2536 23.9944 20.8492 22.7517 22.1799C22.4849 22.4657 22.0671 22.5518 21.7093 22.3948ZM16.263 22.1966C16.4982 21.4685 16.9889 20.8288 17.6884 20.4238C18.5702 19.9132 19.6536 19.8547 20.5841 20.2627L21.9281 20.8526C22.791 19.8538 23.4593 18.7013 23.8981 17.4552L22.7095 16.5778L22.7086 16.5771C21.898 15.98 21.4 15.0277 21.4 13.9994C21.4 12.9719 21.8974 12.0195 22.7073 11.4227L22.7085 11.4218L23.8957 10.545C23.4567 9.2988 22.7881 8.14636 21.9248 7.1477L20.5922 7.73425L20.5899 7.73527C20.1844 7.91463 19.7472 8.00722 19.3039 8.00663C17.6715 8.00453 16.3046 6.77431 16.1261 5.15465L16.1259 5.15291L15.9635 3.69304C15.3202 3.57328 14.6677 3.50872 14.013 3.50017C13.3389 3.50891 12.6821 3.57367 12.0377 3.69328L11.8751 5.15452C11.7625 6.16272 11.1793 7.05909 10.3019 7.56986C9.41937 8.0856 8.34453 8.14844 7.40869 7.73694L6.07273 7.14893C5.20949 8.14751 4.54092 9.29983 4.10196 10.5459L5.29181 11.4233C6.11115 12.0269 6.59414 12.9837 6.59414 14.0007C6.59414 15.0173 6.11142 15.9742 5.29237 16.5776L4.10161 17.4566C4.54002 18.7044 5.2085 19.8585 6.07205 20.8587L7.41742 20.2682C8.34745 19.8613 9.41573 19.9215 10.2947 20.4292C11.174 20.937 11.7593 21.832 11.8738 22.84L11.8744 22.8445L12.0362 24.3088C13.3326 24.5638 14.6662 24.5638 15.9626 24.3088L16.1247 22.8418C16.1491 22.6217 16.1955 22.4055 16.263 22.1966Z"/>
      </svg>`,
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
          if(!main.classList.contains('expanded')) {
            main.setAttribute('style','height: auto;');
          };
          if(ifram) {
            ifram.setAttribute('style','height: 100%;');
          };
        } else {
          cfgpage.classList.add('hidden');
          tbody.classList.remove('hidden');
          main.setAttribute('style','');
          if(ifram) {
            ifram.setAttribute('style','');
          };
        };
        rebuild = false;
      },
    }),
    btnhome = make('mujs-btn','github hidden', {
      title: `GitHub (v${MU.info.script.version.includes('.') || MU.info.script.version.includes('Book') ? MU.info.script.version : MU.info.script.version.slice(0,5)})`,
      innerHTML: `<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
      onclick: (e) => {
        halt(e);
        MU.openInTab('https://github.com/magicoflolis/Userscript-Plus');
      }
    }),
    btnissue = make('mujs-btn','issue hidden', {
      title: cfg.lang.issue,
      innerHTML: `<svg viewBox="0 0 24 24"><path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/></svg>`,
      onclick: (e) => {
        e.preventDefault();
        MU.openInTab('https://github.com/magicoflolis/Userscript-Plus/issues/new');
      }
    }),
    btngreasy = make('mujs-btn','greasy hidden', {
      title: 'Greasy Fork',
      innerHTML: `<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>`,
      onclick: (e) => {
        e.preventDefault();
        MU.openInTab('https://greasyfork.org/scripts/421603');
      }
    }),
    btnnav = make('mujs-btn','nav', {
      title: 'Navigation',
      innerHTML: `<svg viewBox="0 0 24 24"><g><path d="M3,17 L21,17 C21.5522847,17 22,17.4477153 22,18 C22,18.5128358 21.6139598,18.9355072 21.1166211,18.9932723 L21,19 L3,19 C2.44771525,19 2,18.5522847 2,18 C2,17.4871642 2.38604019,17.0644928 2.88337887,17.0067277 L3,17 L21,17 L3,17 Z M2.99987969,11 L20.9998797,10.9978344 C21.5521644,10.9977679 22,11.4454293 22,11.997714 C22,12.5105499 21.6140635,12.9332676 21.1167397,12.9910926 L21.0001203,12.9978344 L3.00012031,13 C2.44783557,13.0000664 2.00000001,12.5524051 2.00000001,12.0001203 C2.00000001,11.4872845 2.38593645,11.0645667 2.88326032,11.0067418 L2.99987969,11 L20.9998797,10.9978344 L2.99987969,11 Z M3,5 L21,5 C21.5522847,5 22,5.44771525 22,6 C22,6.51283584 21.6139598,6.93550716 21.1166211,6.99327227 L21,7 L3,7 C2.44771525,7 2,6.55228475 2,6 C2,5.48716416 2.38604019,5.06449284 2.88337887,5.00672773 L3,5 L21,5 L3,5 Z"></path></g></svg>`,
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
    fsearch.append(searcher);
    btnHandles.append(btnHide,btnfullscreen,closebtn);
    btnframe.append(fsearch,searchbtn,btncfg,btnissue,btnhome,btngreasy,btnnav,btnHandles);
    header.append(countframe,btnframe);
    main.append(header,tbody,cfgpage);
    mainframe.append(mainbtn);
    injCon.append(usercss,mainframe,main);
    makecfg();
    preBuild();
  } catch(ex) {handleError(ex)}
};

function containerInject() {
  try {
    info('Injecting Container...');
    if(container.attachShadow instanceof Function) {
      doc.body.append(container);
      customElements.define('main-userjs',
      class MainFrame extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({mode: 'open'});
        }
      });
      return main();
    }
    let ifcss = make('style', 'frame-stylesheet', {
      innerHTML: `iframe.mujs-iframe {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        height: 525px;
        width: 90%;
        margin-left: 1rem;
        margin-right: 1rem;
        z-index: 100000000000000020 !important;
      }`,
    });
    doc.body.append(ifcss,ifram);
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
    cfg = await MU.getValue('Config',defcfg).catch(handleError);
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
function err(...msg) {
  return console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg);
};
function info(...msg) {
  return console.info('[%cUserJS%c] %cINF', 'color: rgb(29, 155, 240);', '', 'color: rgb(0, 186, 124);', ...msg);
};
function log(...msg) {
  return console.log('[%cUserJS%c] %cLOG', 'color: rgb(29, 155, 240);', '', 'color: rgb(219, 160, 73);', ...msg);
};
function dbg(...msg) {
  const dt = new Date(Date.now());
  return console.log('[%cAF%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}]`, ...msg);
};
//#endregion

/**
 * Displays error messages in webpage
 * @param {Object|string} error - Error Object or message
 */
// TODO expand upon function
function handleError(error) {
  const emsg = error.fn ? `${error.fn} ERROR: ${error.message}` : error;
  return err(emsg);
};

if(!win.frameElement) {
  setupConfig();
};
