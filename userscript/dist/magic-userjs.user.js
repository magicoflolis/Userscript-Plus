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
// @version      3.7.15
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
// @connect      cdn.jsdelivr.net
// @match        https://*/*
// @exclude      http*://*stripe.com/*
// @exclude      http*://*ica.yandex.com/*
// @exclude      http*://*skrill.com/*
// @exclude      http*://*zalo.me/*
// @exclude      http*://*.bluesnap.com/*
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
// @run-at       document-end
// ==/UserScript==

/**
* Injected stylesheet
* https://github.com/magicoflolis/Userscript-Plus/tree/master/userscript/src/sass
*/
const main_css = `magic-userjs{cursor:default}magic-userjs *{line-height:normal}.hidden{display:none !important;z-index:-1 !important}.main{position:fixed;height:492px;margin-left:1rem;margin-right:1rem;bottom:1rem;right:1rem;background:#495060 !important;border:1px solid rgba(0,0,0,0);border-radius:10px;font-size:14px !important;font-family:arial,sans-serif !important}.main:not(.hidden){z-index:100000000000000020 !important;display:grid !important}.main *:not(magicuserjs-a,magicuserjs-btn,count-frame,.counterframe,.count,label,.magicuserjs-switch){background:#495060 !important}.main *:not(magicuserjs-a,magicuserjs-btn,count-frame,.counterframe,.count){color:#fff !important}.counterframe{border-radius:100%;padding:.5%;width:25px !important;height:25px !important}.count{background:rgba(0,0,0,0)}.mainframe{background:#495060 !important;color:#fff !important;border:2px solid rgba(0,0,0,0);border-radius:100%;padding:.5% !important;position:fixed;bottom:1rem;right:1rem;width:25px !important;height:25px !important}.mainframe:not(.hidden){z-index:100000000000000020 !important;display:block}count-frame{border:2px solid rgba(0,0,0,0);font-size:16px;font-weight:400;display:block;text-align:center}count-frame{line-height:normal !important;width:auto !important;height:auto !important}.magicuserjs-header{display:flex;gap:10px;border-bottom:1px solid #fff;border-top-left-radius:10px;border-top-right-radius:10px;height:fit-content;padding:10px;font-size:1em;justify-content:space-between}.magicuserjs-body{overflow-y:scroll;overflow-x:hidden}.magicuserjs-cfg,.magicuserjs-body{scrollbar-color:#fff #2e323d;scrollbar-width:thin;border:1px solid rgba(0,0,0,0);border-bottom-left-radius:10px;border-bottom-right-radius:10px}.magicuserjs-cfg{height:fit-content}.magicuserjs-cfg mujs-section>label{display:flex;justify-content:space-between;padding:.5em}.magicuserjs-cfg mujs-section>label input[type*=number]{position:relative;border-radius:4px;border:1px solid #fff}.magicuserjs-cfg .magicuserjs-inlab{position:relative;width:38px;border-radius:20px;margin:5px}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]{display:none}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]:checked+label{margin-left:0;background-color:rgba(255,255,255,.568)}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]:checked+label:before{right:0px}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#greasyfork:checked+label,.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#sleazyfork:checked+label{background-color:rgba(0,183,255,.568)}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#openuserjs:checked+label{background-color:rgba(237,63,20,.568)}.magicuserjs-cfg .magicuserjs-inlab input[type*=checkbox]#github:checked+label{background-color:rgba(36,41,47,.568)}.magicuserjs-cfg .magicuserjs-inlab label{display:block;overflow:hidden;height:16px;padding:0;border-radius:20px;border:1px solid #fff;background-color:#495060}.magicuserjs-cfg .magicuserjs-inlab label:before{content:"";display:block;width:20px;height:20px;margin:-2px;background:#fff;position:absolute;top:0;right:20px;border-radius:20px}.magicuserjs-eframe,.frame{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;font-size:1em}.frame{border-bottom:1px solid #fff}@media screen and (max-width: 800px){.frame{display:flow-root !important;height:fit-content !important}}.frame:not(.sf) magicuserjs-a{color:#00b7ff !important}.frame:not(.sf) magicuserjs-btn{color:#fff;background-color:#2d8cf0;border-color:#2d8cf0}.frame.sf magicuserjs-a{color:#e75531 !important}.frame.sf magicuserjs-btn{background-color:#ed3f14 !important;border-color:#ed3f14 !important}.magicuserjs-name{font-size:inherit !important;display:grid;margin-left:1%;margin-top:.67em;margin-bottom:.67em}.magicuserjs-name span{font-size:.8em !important}.magicuserjs-eframe{margin-right:1%;margin-top:.67em;margin-bottom:.67em}@media screen and (max-width: 800px){.magicuserjs-eframe{height:fit-content !important}}.magicuserjs-uframe{display:grid;grid-auto-flow:column;grid-gap:1em}mujs-btn{font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-rendering:auto;border:1px solid #fff;font-size:16px;border-radius:4px;line-height:1;padding:6px 15px}mujs-column{display:flex;gap:10px}@media screen and (max-width: 800px){mujs-column{flex-flow:row wrap}mujs-column.btnframe{flex-flow:row wrap-reverse !important}}mujs-row{display:flex;gap:10px;flex-direction:column}mujs-btn svg{fill:#fff;width:14px;height:14px}input[type*=number],input[type*=text]{border:rgba(0,0,0,0);outline:none !important}magicuserjs-btn{font-size:12px;border-radius:3px;font-style:normal;padding:6px 15%;font-weight:400;font-variant:normal;line-height:21px}magicuserjs-a,magicuserjs-btn,.magicuserjs-cfg *:not(input[type*=text],input[type*=number]),.mainbtn,.mainframe,mujs-btn{cursor:pointer !important}.magicuserjs-cfg *:not(input[type*=text],input[type*=number]){user-select:none !important}mujs-btn,input,.magicuserjs-uframe,.magicuserjs-list,.install,.magicuserjs-homepage{width:fit-content;height:fit-content}`;

(() => {
const log = (...msg) => console.log('[%cUserJS%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', ...msg),
/** Information handling for UserJS */
info = (...msg) => console.info('[%cUserJS%c] %cINF', 'color: rgb(29, 155, 240);', '', 'color: rgb(0, 186, 124);', ...msg),
err = (...msg) => console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg);
let checkGMSupport = !Object.is(GM,undefined),
MU = {
  getValue: false,
  info: {
    script: {
      version: 'Bookmarklet'
    }
  },
  openInTab: false,
  setValue: false,
  xmlhttpRequest: false,
};
if(checkGMSupport) {
  MU = {
    getValue: GM_getValue,
    info: GM_info,
    openInTab: GM_openInTab,
    setValue: GM_setValue,
    xmlhttpRequest: GM_xmlhttpRequest,
  };
};

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
defcfg = {
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
      url: 'https://greasyfork.org/scripts/by-site',
    },
    {
      enabled: true,
      name: 'sleazyfork',
      url: 'https://sleazyfork.org/scripts/by-site',
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
sitegfcount = 0,
sitesfcount = 0;
function main() {
  const win = self ?? window,
  doc = win.document,
  estr = str => Object.is(str,null) || Object.is(str,undefined) || typeof str === 'string' && Object.is(str.trim(),''),
  save = () => {
    try {
      if(checkGMSupport) {
        if(!cfg.cache) {
          localStorage.setItem('MUJSConfig',JSON.stringify(cfg));
        } else {
          MU.setValue('Config',JSON.stringify(cfg));
        };
      } else {
        localStorage.setItem('MUJSConfig',JSON.stringify(cfg));
      };
      log('Saved:',cfg);
    } catch(e) {err(e)};
  },
  /** Can create various elements */
  make = (element,cname,attrs = {}) => {
    let el = doc.createElement(element);
    if(!estr(cname)) {
      el.className = cname;
    };
    if(attrs) {
      for(let key in attrs) {
        el[key] = attrs[key]
      }
    };
    return el;
  },
  ifram = make('iframe','', {
    src: 'about:blank',
    style: `position: fixed;
    bottom: 1rem;
    right: 1rem;
    height: 525px;
    width: 90%;
    margin-left: 1rem;
    margin-right: 1rem;
    z-index: 100000000000000020 !important;
    `
  }),
  container = make('magic-userjs');
  if(estr(container.attachShadow)) {
    doc.body.append(ifram);
    ifram.onload = () => {
      ifram.contentDocument.body.append(container);
      if(estr(container.attachShadow)) {
        ifram.contentDocument.body.setAttribute('style','background-color: black;color: white;');
        ifram.contentDocument.body.innerHTML = '[ERROR] Unsupported { attachShadow }... yeah still need to work on that :)';
        delay(5000).then(() => ifram.remove());
      } else {
        container.attachShadow({ mode: 'open' });
      };
    };
  } else {
    container.attachShadow({ mode: 'open' });
    doc.body.append(container);
  };
  const qs = (element, selector) => {
    selector = selector ?? doc ?? doc.body;
    return selector.querySelector(element);
  },
  qsA = (element, selector) => {
    selector = selector ?? doc ?? doc.body;
    return selector.querySelectorAll(element);
  },
  /** Waits until element exists */
  query = async (element, selector) => {
    selector = selector ?? doc ?? doc.body;
    while(estr(selector.querySelector(element))) {
      await new Promise(resolve => requestAnimationFrame(resolve) )
    };
    return selector.querySelector(element);
  },
  sh = element => container.shadowRoot.querySelector(element),
  shA = element => container.shadowRoot.querySelectorAll(element),
  delay = ms => new Promise(resolve => setTimeout(resolve, ms)),
  clk = e => e.dispatchEvent(new MouseEvent('click')),
  isMobile = () => {
    let a = navigator.userAgent || win.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4));
  },
  halt= (e) => {
    e.preventDefault();
    e.stopPropagation();
  },
  ael = (elm, event, callback) => {
    try {
      elm = elm ?? doc;
      if(isMobile()) {
        if(event === 'click') {
          event = 'mouseup';
          // elm.addEventListener('mouseup', callback);
          elm.addEventListener('touchstart', callback);
          elm.addEventListener('touchend', callback);
        };
      };
      if(event === 'fclick') {event = 'click'};
      return elm.addEventListener(event, callback);
    } catch(error) {
      err(error);
    };
  },
  pbar = (e) => {
    if(e.total === 0) {
      return info(`Loaded: ${e.loaded}`)
    };
    return info(`Progress: ${e.loaded / e.total}%`)
  },
  fetchURL = async (url,method = 'GET',responseType = 'json',params = {}, forcefetch) => {
    try {
      return new Promise((resolve, reject) => {
        if(checkGMSupport && !forcefetch) {
          MU.xmlhttpRequest({
            method: method,
            url,
            responseType,
            ...params,
            onprogress: pbar,
            onerror: e => reject(e),
            onload: (r) => {
              if(r.status !== 200) reject(`${r.status} ${url}`);
              resolve(r.response);
            },
          });
        } else {
          fetch(url, {
            method: method,
            ...params,
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
          });
        }
      });
    } catch (error) {err(error)}
  },
  openpage = (url) => {
    if(checkGMSupport) {
      return MU.openInTab(url, {
        active: true,
        insert: true,
      });
    };
    let dwnbtn = make('a','magicuserjs-dwnbtn', {
      href: url,
      target: '_blank',
      rel: 'noopener',
    });
    clk(dwnbtn);
    return dwnbtn.remove();
  },
  createjs = (ujs, issleazy) => {
    let frame = make('magic-userjs',`frame ${issleazy ? 'sf' : ''}`),
    fname = make('magic-userjs','magicuserjs-name'),
    ftitle = make('magicuserjs-a','magicuserjs-homepage', {
      title: ujs.name,
      innerHTML: ujs.name,
      onclick: (e) => {
        e.preventDefault();
        openpage(ujs.url);
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
        e.preventDefault();
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
      innerHTML: cfg.lang.install,
      onclick: (e) => {
        e.preventDefault();
        openpage(ujs.code_url);
      },
    });
    for(let u of ujs.users) {
      let user = make('magicuserjs-a','magicuserjs-euser', {
        innerHTML: u.name,
        onclick: (e) => {
          e.preventDefault();
          openpage(u.url);
        },
      });
      uframe.append(user);
    };
    eframe.append(uframe,fdaily,fupdated,fdwn);
    fmore.append(ftotal,fgood,fok,fbad,fver,fcreated);
    fname.append(ftitle,fdesc,fmore);
    frame.append(fname,eframe);
    sh('.magicuserjs-body').append(frame);
  },
  countsite = () => {
    try {
      if(/greasyfork\.org/.test(doc.location.hostname) && cfg.sleazyredirct) {
        let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
        qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
      };
      if(!container.attachShadow) return false;
      let host = location.hostname.split('.').splice(-2).join('.'),
      rebuild = false,
      siteujs = [],
      main = make('magic-userjs','main hidden'),
      usercss = make('style', 'primary-stylesheet', {innerHTML: main_css,}),
      tbody = make('magic-userjs','magicuserjs-body'),
      header = make('magic-userjs','magicuserjs-header'),
      cfgpage = make('mujs-row','magicuserjs-cfg hidden', {
        innerHTML: `<mujs-section>
        <label>
          <magic-userjs>Sync with GM</magic-userjs>
          <magic-userjs class="magicuserjs-inlab">
            <input type="checkbox" name="cache" id="cache">
            <label></label>
          </magic-userjs>
        </label>
      </mujs-section>
      <mujs-section>
          <label>
            <magic-userjs>${cfg.lang.redirect}</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="sleazyredirct" id="sleazyredirct">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>${cfg.lang.filter}</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="filter" id="filter">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>Greasy Fork</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="greasyfork" id="greasyfork">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>Sleazy Fork</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="sleazyfork" id="sleazyfork">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>Open UserJS</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="openuserjs" id="openuserjs">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>GitHub</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="github" id="github">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>Gist (GitHub)</magic-userjs>
            <magic-userjs class="magicuserjs-inlab">
              <input type="checkbox" name="gist" id="gist">
              <label></label>
            </magic-userjs>
          </label>
        </mujs-section>
        <mujs-section>
          <label>
            <magic-userjs>${cfg.lang.dtime} (ms)</magic-userjs>
            <input type="number" name="time" id="time" defaultValue="10000" value='${cfg.time}' min="0" step="500">
          </label>
        </mujs-section>`
      }),
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
        siteujs = [];
        sitegfcount = 0;
        sitesfcount = 0;
        tbody.innerHTML = '';
        gfcounter.innerHTML = sitegfcount;
        sfcounter.innerHTML = sitesfcount;
        mainbtn.innerHTML = sitegfcount;
        let sites = [],
        custom = [];
        for(let i of cfg.engines) {
          if(i.enabled) {
            if(i.url.match(/fork.org/gi)) {
              sites.push(fetchURL(`${i.url}/${host}.json`).catch(err),);
            };
            if(i.url.match(/(openuserjs.org|github.com)/gi)) {
              log(`${i.url}${host}`);
              custom.push(fetchURL(`${i.url}${host}`,'GET','text').catch(err),);
            };
          };
        };
        let data = await Promise.all(sites).catch(err);
        for(let d of data) {
          for(let ujs of d) {
            if(ujs.deleted) continue;
            if(cfg.filterlang && !ujs.locale.includes(navigator.language.split('-')[0] ?? 'en')) continue;
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
        gfcounter.innerHTML = sitegfcount;
        mainbtn.innerHTML = sitesfcount + sitegfcount;
        if(custom.length > 0) {
          let c = await Promise.all(custom).catch(err),
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
                if(!Object.prototype.hasOwnProperty.call(layout, key)) {
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
                if(!Object.prototype.hasOwnProperty.call(layout, key)) {
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
                  if(!Object.prototype.hasOwnProperty.call(layout, key)) {
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
        if(!isNaN(cfg.time)) {
          delay(cfg.time).then(() => {
            if(!mainframe.classList.contains('hidden')) {
              mainframe.classList.add('hidden');
              ifram.setAttribute('style','display:none;');
            };
          });
        };
        if(Object.is(data[0].length,0) && Object.is(data[1].length,0) && Object.is(custom.length,0)) {
          tbody.innerHTML = 'No available UserJS for this webpage';
        };
      },
      makecfg = () => {
        let savebtn = make('mujs-btn', 'save', {
          style: 'margin: auto;',
          innerHTML: cfg.lang.save,
          onclick: async (e) => {
            halt(e);
            let t = sh('input#time');
            if(t.validity.badInput || t.validity.rangeUnderflow && t.value !== '-1') {
              t.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
            } else {
              save();
              if(rebuild) {
                buildlist();
                rebuild = false;
              };
              if(/greasyfork\.org/.test(doc.location.hostname) && cfg.sleazyredirct) {
                let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
                qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
              };
            }
          },
        });
        cfgpage.append(savebtn);
        for(let i of cfg.engines) {
          if(sh(`#${i.name}`)) {
            sh(`#${i.name}`).checked = i.enabled;
            ael(sh(`#${i.name}`),'change', (e) => {
              i.enabled = e.target.checked;
              rebuild = true;
            });
          };
        };
        sh('input#cache').checked = cfg.cache;
        ael(sh('input#cache'),'change', (e) => {
          cfg.cache = e.target.checked;
          rebuild = true;
        });
        sh('input#sleazyredirct').checked = cfg.sleazyredirct;
        ael(sh('input#sleazyredirct'),'change', (e) => {
          cfg.sleazyredirct = e.target.checked;
        });
        ael(sh('input#time'),'beforeinput', (e) => {
          if(e.target.validity.badInput) {
            e.target.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
          } else {
            e.target.setAttribute('style','');
          }
        });
        ael(sh('input#time'),'input', (e) => {
          let t = e.target;
          log(t.value);
          if(t.validity.badInput || t.validity.rangeUnderflow && t.value !== '-1') {
            t.setAttribute('style','border-radius: 8px; border-width: 2px !important; border-style: solid; border-color: red !important;');
          } else {
            t.setAttribute('style','');
            cfg.time = estr(t.value) ? cfg.time : parseFloat(t.value);
          }
        });
        sh('input#filter').checked = cfg.filterlang;
        ael(sh('input#filter'),'change', (e) => {
          cfg.filterlang = e.target.checked;
          rebuild = true;
        });
      },
      mainframe = make('magic-userjs','mainframe', {
        onclick: (e) => {
          e.preventDefault();
          main.classList.remove('hidden');
          mainframe.classList.add('hidden');
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
          if(!estr(v)) {
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
        onclick: (e) => {
          e.preventDefault();
          main.classList.add('hidden');
          mainframe.classList.remove('hidden');
          if(!isNaN(cfg.time)) {
            delay(cfg.time).then(() => {
              mainframe.classList.add('hidden');
              ifram.setAttribute('style','display:none;');
            })
          };
        }
      }),
      btnframe = make('mujs-column', 'btnframe'),
      btncfg = make('mujs-btn','settings', {
        title: 'Settings',
        innerHTML: `<svg viewBox="0 0 28 28">
        <path d="M14 9.50006C11.5147 9.50006 9.5 11.5148 9.5 14.0001C9.5 16.4853 11.5147 18.5001 14 18.5001C15.3488 18.5001 16.559 17.9066 17.3838 16.9666C18.0787 16.1746 18.5 15.1365 18.5 14.0001C18.5 13.5401 18.431 13.0963 18.3028 12.6784C17.7382 10.8381 16.0253 9.50006 14 9.50006ZM11 14.0001C11 12.3432 12.3431 11.0001 14 11.0001C15.6569 11.0001 17 12.3432 17 14.0001C17 15.6569 15.6569 17.0001 14 17.0001C12.3431 17.0001 11 15.6569 11 14.0001Z"/>
        <path d="M21.7093 22.3948L19.9818 21.6364C19.4876 21.4197 18.9071 21.4515 18.44 21.7219C17.9729 21.9924 17.675 22.4693 17.6157 23.0066L17.408 24.8855C17.3651 25.273 17.084 25.5917 16.7055 25.682C14.9263 26.1061 13.0725 26.1061 11.2933 25.682C10.9148 25.5917 10.6336 25.273 10.5908 24.8855L10.3834 23.0093C10.3225 22.4731 10.0112 21.9976 9.54452 21.7281C9.07783 21.4586 8.51117 21.4269 8.01859 21.6424L6.29071 22.4009C5.93281 22.558 5.51493 22.4718 5.24806 22.1859C4.00474 20.8536 3.07924 19.2561 2.54122 17.5137C2.42533 17.1384 2.55922 16.7307 2.8749 16.4977L4.40219 15.3703C4.83721 15.0501 5.09414 14.5415 5.09414 14.0007C5.09414 13.4598 4.83721 12.9512 4.40162 12.6306L2.87529 11.5051C2.55914 11.272 2.42513 10.8638 2.54142 10.4882C3.08038 8.74734 4.00637 7.15163 5.24971 5.82114C5.51684 5.53528 5.93492 5.44941 6.29276 5.60691L8.01296 6.36404C8.50793 6.58168 9.07696 6.54881 9.54617 6.27415C10.0133 6.00264 10.3244 5.52527 10.3844 4.98794L10.5933 3.11017C10.637 2.71803 10.9245 2.39704 11.3089 2.31138C12.19 2.11504 13.0891 2.01071 14.0131 2.00006C14.9147 2.01047 15.8128 2.11485 16.6928 2.31149C17.077 2.39734 17.3643 2.71823 17.4079 3.11017L17.617 4.98937C17.7116 5.85221 18.4387 6.50572 19.3055 6.50663C19.5385 6.507 19.769 6.45838 19.9843 6.36294L21.7048 5.60568C22.0626 5.44818 22.4807 5.53405 22.7478 5.81991C23.9912 7.1504 24.9172 8.74611 25.4561 10.487C25.5723 10.8623 25.4386 11.2703 25.1228 11.5035L23.5978 12.6297C23.1628 12.95 22.9 13.4586 22.9 13.9994C22.9 14.5403 23.1628 15.0489 23.5988 15.3698L25.1251 16.4965C25.441 16.7296 25.5748 17.1376 25.4586 17.5131C24.9198 19.2536 23.9944 20.8492 22.7517 22.1799C22.4849 22.4657 22.0671 22.5518 21.7093 22.3948ZM16.263 22.1966C16.4982 21.4685 16.9889 20.8288 17.6884 20.4238C18.5702 19.9132 19.6536 19.8547 20.5841 20.2627L21.9281 20.8526C22.791 19.8538 23.4593 18.7013 23.8981 17.4552L22.7095 16.5778L22.7086 16.5771C21.898 15.98 21.4 15.0277 21.4 13.9994C21.4 12.9719 21.8974 12.0195 22.7073 11.4227L22.7085 11.4218L23.8957 10.545C23.4567 9.2988 22.7881 8.14636 21.9248 7.1477L20.5922 7.73425L20.5899 7.73527C20.1844 7.91463 19.7472 8.00722 19.3039 8.00663C17.6715 8.00453 16.3046 6.77431 16.1261 5.15465L16.1259 5.15291L15.9635 3.69304C15.3202 3.57328 14.6677 3.50872 14.013 3.50017C13.3389 3.50891 12.6821 3.57367 12.0377 3.69328L11.8751 5.15452C11.7625 6.16272 11.1793 7.05909 10.3019 7.56986C9.41937 8.0856 8.34453 8.14844 7.40869 7.73694L6.07273 7.14893C5.20949 8.14751 4.54092 9.29983 4.10196 10.5459L5.29181 11.4233C6.11115 12.0269 6.59414 12.9837 6.59414 14.0007C6.59414 15.0173 6.11142 15.9742 5.29237 16.5776L4.10161 17.4566C4.54002 18.7044 5.2085 19.8585 6.07205 20.8587L7.41742 20.2682C8.34745 19.8613 9.41573 19.9215 10.2947 20.4292C11.174 20.937 11.7593 21.832 11.8738 22.84L11.8744 22.8445L12.0362 24.3088C13.3326 24.5638 14.6662 24.5638 15.9626 24.3088L16.1247 22.8418C16.1491 22.6217 16.1955 22.4055 16.263 22.1966Z"/>
        </svg>`,
        onclick: (e) => {
          e.preventDefault();
          if(cfgpage.classList.contains('hidden')) {
            cfgpage.classList.remove('hidden');
            tbody.classList.add('hidden');
            main.setAttribute('style','height: auto !important;');
          } else {
            cfgpage.classList.add('hidden');
            tbody.classList.remove('hidden');
            main.setAttribute('style','');
          };
          rebuild = false;
        },
      }),
      btnhome = make('mujs-btn','github', {
        title: `GitHub (v${MU.info.script.version.includes('.') ? MU.info.script.version : MU.info.script.version.slice(0,5)})`,
        innerHTML: `<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
        onclick: (e) => {
          e.preventDefault();
          openpage('https://github.com/magicoflolis/Userscript-Plus');
        }
      }),
      btnissue = make('mujs-btn','issue', {
        title: cfg.lang.issue,
        innerHTML: `<svg viewBox="0 0 24 24"><path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/></svg>`,
        onclick: (e) => {
          e.preventDefault();
          openpage('https://github.com/magicoflolis/Userscript-Plus/issues/new');
        }
      }),
      btngreasy = make('mujs-btn','greasy', {
        title: 'Greasy Fork',
        innerHTML: `<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>`,
        onclick: (e) => {
          e.preventDefault();
          openpage('https://greasyfork.org/scripts/421603');
        }
      }),
      btnlegacy = make('mujs-btn','legacy', {
        title: cfg.lang.legacy,
        innerHTML: `<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>`,
        onclick: (e) => {
          e.preventDefault();
          openpage('https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/archive/magic-userjs.user.js');
        }
      });
      gfcountframe.append(gfcounter);
      sfcountframe.append(sfcounter);
      countframe.append(gfcountframe,sfcountframe);
      fsearch.append(searcher);
      btnframe.append(fsearch,searchbtn,btncfg,btnissue,btnhome,btngreasy,btnlegacy,closebtn);
      header.append(countframe,btnframe);
      main.append(header,tbody,cfgpage);
      mainframe.append(mainbtn);
      container.shadowRoot.append(usercss,mainframe,main);
      for(let b of cfg.blacklist) {
        if(!b.enabled) continue;
        const bhref = win.top.document.location.href;
        if(b.regex) {
          let reg = new RegExp(b.url,b.flags),
          testurl = reg.test(bhref);
          if(!testurl) buildlist();
          break;
        };
        if(!bhref.includes(b.url)) buildlist();
        break;
      }
      makecfg();
    } catch(error) {err(error)}
  };
  if(doc.readyState === 'complete') {
    countsite();
  } else {
    ael(win,'load',countsite);
  };
};


async function setupConfig() {
  try {
    let data = await Promise.all([
      checkGMSupport ? MU.getValue('Config',JSON.stringify(defcfg)) : JSON.stringify(defcfg)
    ]).catch(err);
    cfg = JSON.parse(localStorage.getItem('MUJSConfig') ?? data[0]);
    for (const key in defcfg) {
      if(!Object.prototype.hasOwnProperty.call(cfg, key)) {
        cfg[key] = defcfg[key];
      } else if (key === 'lang') {
        for (const keyl in defcfg[key]) {
          if(!Object.prototype.hasOwnProperty.call(cfg[key], keyl)) {
            cfg[key][keyl] = defcfg[key][keyl];
          };
        };
      } else if (key === 'engines') {
        for (const key2 in defcfg[key]) {
          if(!Object.prototype.hasOwnProperty.call(cfg[key], key2)) {
            cfg[key][key2] = defcfg[key][key2];
          };
        };
      } else if (key === 'blacklist') {
        for (const key3 in defcfg[key]) {
          if(!Object.prototype.hasOwnProperty.call(cfg[key], key3)) {
            cfg[key][key3] = defcfg[key][key3];
          };
        };
      }
    };
    log('Config:',cfg);
    main();
  } catch(error) {err(error)}
};

setupConfig();

})();
