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
// @version      3.5.15
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @downloadURL  https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/userscript/dist/magic-userjs.dev.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/userscript/dist/magic-userjs.dev.user.js
// @supportURL   https://github.com/magicoflolis/Userscript-Plus/issues/new
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @homepageURL  https://github.com/magicoflolis/Userscript-Plus
// @license      MIT
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @connect      cdn.jsdelivr.net
// @include      *
// @exclude      *://paypal.com/*
// @exclude      *://mega.nz
// @exclude      *://*.alipay.com/*
// @exclude      *://*bank.*/*
// @exclude      *://*perfectmoney.*/*
// @exclude      *://*stripe.com/*
// @exclude      *://*ica.yandex.com/*
// @exclude      *://*authorize.net/*
// @exclude      *://*2checkout.com/*
// @exclude      *://192.168*
// @exclude      *://127.0.0*
// @exclude      *://router.*.*/*
// @exclude      *://gitlab.com/*
// @exclude      *://10.0.0*
// @exclude      *://*skrill.com/*
// @exclude      *://*zalo.me/*
// @exclude      *://pay.amazon.*/*
// @exclude      *://*.opayo.co.uk/*
// @exclude      *://*.payza.org/*
// @exclude      *://*.bluesnap.com/*
// @exclude      *://securionpay.com/*
// @exclude      *://*.unionpayintl.*/*
// @exclude      *://*.99bill.com/*
// @exclude      *://*.yeepay.com/*
// @exclude      *://*payoneer.com/*
// @exclude      *://*myetherwallet.com/*
// @exclude      *://bitpay.com/*
// @exclude      *://*.*/login
// @exclude      *://*.*/join
// @exclude      *://*.*/signin
// @exclude      *://*.*/signup
// @exclude      *://*.*/sign-up
// @exclude      *://*.*/cart
// @exclude      *://*.*.gov/*
// @exclude      *://*.*/password_reset
// @exclude      *://*.*/checkout*
// @exclude      *://*.*/settings/*
// @exclude      *://*.*/options/*
// @exclude      *://*.*.*/login
// @exclude      *://*.*.*/join
// @exclude      *://*.*.*/signin
// @exclude      *://*.*.*/signup
// @exclude      *://*.*.*/sign-up
// @exclude      *://*.*.*/cart
// @exclude      *://*.*.*/checkout*
// @exclude      *://*.*.*/settings/*
// @exclude      *://*.*.*/options/*
// @exclude      *://*.*.*.gov/*
// @exclude      *://*.*.*/password_reset
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   opera
// @compatible   safari
// @noframes
// @run-at       document-end
// ==/UserScript==

/**
* Enable built-in "Greasyfork Search with Sleazyfork Results include"
* 启用内置"使用 Sleazyfork 搜索"结果包括"
* 組み込みの「スライジーフォークの結果を含む脂っこく検索」を有効にする
* Включить встроенный "Greasyfork Поиск с Sleazyfork Результаты включают"
* https://greasyfork.org/scripts/23840
*/
const sleazyfork_redirect = true, // 'true' to enable, 'false' to disable
/**
* Injected stylesheet
* https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass
*/
main_css = `magic-userjs{cursor:default}magic-userjs *{line-height:normal}.hidden{display:none !important;z-index:-1 !important}.main{position:fixed;height:492px;margin-left:1rem;margin-right:1rem;bottom:1rem;right:1rem;background:#495060 !important;color:#fff !important;border:1px solid rgba(0,0,0,0);border-radius:10px;font-size:14px !important;font-family:arial,sans-serif !important}.main:not(.hidden){z-index:100000000000000020 !important;display:grid !important}.main *:not(magicuserjs-a,magicuserjs-btn,count-frame,.counterframe,.count){background:#495060 !important;color:#fff !important}.counterframe{border-radius:100%;padding:.5%;width:25px !important;height:25px !important}.count{background:rgba(0,0,0,0)}.mainframe{background:#495060 !important;color:#fff !important;border:2px solid rgba(0,0,0,0);border-radius:100%;padding:.5% !important;position:fixed;bottom:1rem;right:1rem;width:25px !important;height:25px !important}.mainframe:not(.hidden){z-index:100000000000000020 !important;display:block}count-frame{border:2px solid rgba(0,0,0,0);font-size:16px;font-weight:400;display:block;text-align:center}count-frame{line-height:normal !important;width:auto !important;height:auto !important}.magicuserjs-header{display:flex;gap:10px;border-bottom:1px solid #fff;border-top-left-radius:10px;border-top-right-radius:10px;height:fit-content;padding:10px;font-size:1em;justify-content:space-between}.magicuserjs-body{overflow-y:scroll;overflow-x:hidden;scrollbar-color:#fff #2e323d;scrollbar-width:thin;border:1px solid rgba(0,0,0,0);border-bottom-left-radius:10px;border-bottom-right-radius:10px}.magicuserjs-eframe,.frame{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;font-size:1em}.frame{border-bottom:1px solid #fff}@media screen and (max-width: 580px){.frame{display:flow-root !important;height:fit-content !important}}.frame:not(.sf) magicuserjs-a{color:#00b7ff !important}.frame:not(.sf) magicuserjs-btn{color:#fff;background-color:#2d8cf0;border-color:#2d8cf0}.frame.sf magicuserjs-a{color:#ed3f14 !important}.frame.sf magicuserjs-btn{background-color:#ed3f14 !important;border-color:#ed3f14 !important}.magicuserjs-name{font-size:inherit !important;display:grid;margin-left:1%;margin-top:.67em;margin-bottom:.67em}.magicuserjs-name span{font-size:.8em !important}.magicuserjs-eframe{margin-right:1%;margin-top:.67em;margin-bottom:.67em}@media screen and (max-width: 580px){.magicuserjs-eframe{height:fit-content !important}}.magicuserjs-uframe{display:grid;grid-auto-flow:column;grid-gap:1em}magic-btn{font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-rendering:auto;border:1px solid #fff;font-size:16px;border-radius:4px;line-height:1;padding:6px 15px;width:fit-content}magic-column{display:flex;gap:10px}magic-btn svg{fill:#fff;width:12px;height:12px}.searcher{border:1px solid #fff;border-radius:4px;line-height:1;width:170px;outline:0px !important}magicuserjs-btn{font-size:12px;border-radius:3px;font-style:normal;padding:6px 15%;font-weight:400;font-variant:normal;line-height:21px}magicuserjs-a,magicuserjs-btn,.mainbtn,.mainframe,magic-btn{cursor:pointer !important}.magicuserjs-uframe,.magicuserjs-daily,.magicuserjs-updated,.install,.magicuserjs-homepage,.magicuserjs-fver,.magicuserjs-fdesc{width:fit-content;height:fit-content}`;

(() => {
  const log = (...msg) => console.log('[%cUserJS%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', ...msg),
err = (...msg) => {console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg)};

let checkGMSupport = typeof GM !== 'undefined' || typeof VM !== 'undefined',
MU = {};

if(checkGMSupport) {
  MU = {
    // getValue: GM_getValue,
    // setValue: GM_setValue,
    openInTab: GM_openInTab,
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
  },
},
sitegfcount = 0,
sitesfcount = 0,
lang = langs[navigator.language.split('-')[0] ?? 'en'];

const win = self ?? window,
doc = win.document,
/** Can create various elements */
make = (element,cname,attrs = {}) => {
  let el = doc.createElement(element);
  cname ? (el.className = cname) : false;
  if(attrs) {for(let key in attrs) {el[key] = attrs[key]}};
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
if(container.attachShadow) {
  container.attachShadow({ mode: 'open' });
  doc.body.append(container);
} else {
  doc.body.append(ifram);
  ifram.onload = () => {
    ifram.contentDocument.body.append(container);
    if(container.attachShadow) {
      container.attachShadow({ mode: 'open' });
    } else {
      ifram.contentDocument.body.setAttribute('style','background-color: black;color: white;');
      ifram.contentDocument.body.innerHTML = '[ERROR] Unsupported { attachShadow }... yeah still need to work on that :)';
      delay(5000).then(() => {
        ifram.remove()
      })
    };
  };
}

const qs = (element, selector) => {
  selector = selector ?? doc ?? doc.body;
  return selector.querySelector(element);
},
shA = (element) => {
  return container.shadowRoot.querySelectorAll(element);
},
estr = (str) => str === null || str.trim() === '',
delay = ms => new Promise(resolve => setTimeout(resolve, ms)),
fetchURL = async (url,method = 'GET',responseType = 'json',params = {}) => {
  try {
    return new Promise((resolve, reject) => {
      if(checkGMSupport) {
        MU.xmlhttpRequest({
          method: method,
          url,
          responseType,
          ...params,
          onprogress: p => log(`Progress: ${p.loaded} / ${p.total}`),
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
          if(responseType.includes('json')) {
            resolve(response.json());
          } else if(responseType.includes('text')) {
            resolve(response.text());
          } else if(responseType.includes('blob')) {
            resolve(response.blob());
          };
          resolve(response);
        });
      }
    });
  } catch (error) {err(error);}
},
sleazy = () => {
  let otherSite = /greasyfork\.org/.test(document.location.hostname) ? 'sleazyfork' : 'greasyfork';
  return qs('span.sign-in-link') ? /scripts\/\d+/.test(document.location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
},
openpage = (url) => {
  if(checkGMSupport) {
    MU.openInTab(url, {
      active: true,
      insert: true,
    });
  } else {
    let dwnbtn = make('a','magicuserjs-dwnbtn', {
      href: url,
      target: '_blank',
      rel: 'noopener',
    });
    dwnbtn.click();
    dwnbtn.remove();
  }
},
countsite = async () => {
  try {
    if(!container.attachShadow) return false;
    let host = location.hostname.split('.').splice(-2).join('.'),
    gfCount = await fetchURL(`https://greasyfork.org/scripts/by-site/${host}.json`),
    sfCount = await fetchURL(`https://sleazyfork.org/scripts/by-site/${host}.json`),
    siteujs = [],
    main = make('magic-userjs','main hidden'),
    usercss = make('style', 'primary-stylesheet', {innerHTML: main_css,}),
    tbody = make('magic-userjs','magicuserjs-body'),
    header = make('magic-userjs','magicuserjs-header'),
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
    searcher = make('input','searcher hidden', {
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: lang.searcher,
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
    searchbtn = make('magic-btn','search', {
      title: lang.search,
      innerHTML: `<svg viewBox='0 0 487.95 487.95'><g><path d='M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1 c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4 c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z'/></g></svg>`,
      onclick: (e) => {
        e.preventDefault();
        searcher.classList.toggle('hidden');
      }
    }),
    closebtn = make('magic-btn','close', {
      title: lang.close,
      innerHTML: 'X',
      onclick: (e) => {
        e.preventDefault();
        main.classList.add('hidden');
        mainframe.classList.remove('hidden');
        delay(10000).then(() => {
          mainframe.classList.add('hidden');
          ifram.setAttribute('style','display:none;');
        })
      }
    }),
    countframe = make('magic-column'),
    gfcountframe = make('magic-userjs', 'counterframe', {
      style: 'background: #00b7ff;'
    }),
    sfcountframe = make('magic-userjs', 'counterframe', {
      style: 'background: #ed3f14;'
    }),
    gfcounter = make('count-frame','count', {
      title: 'https://greasyfork.org',
    }),
    sfcounter = make('count-frame','count', {
      title: 'https://sleazyfork.org',
    }),
    btnframe = make('magic-column', 'btnframe'),
    btnhome = make('magic-btn','github', {
      title: 'GitHub',
      innerHTML: `<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
      onclick: (e) => {
        e.preventDefault();
        openpage('https://github.com/magicoflolis/Userscript-Plus');
      }
    }),
    btnissue = make('magic-btn','issue', {
      title: lang.issue,
      innerHTML: `<svg viewBox="0 0 24 24"><path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/></svg>`,
      onclick: (e) => {
        e.preventDefault();
        openpage('https://github.com/magicoflolis/Userscript-Plus/issues/new');
      }
    }),
    btngreasy = make('magic-btn','greasy', {
      title: 'Greasy Fork',
      innerHTML: `<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>`,
      onclick: (e) => {
        e.preventDefault();
        openpage('https://greasyfork.org/scripts/421603');
      }
    }),
    btnlegacy = make('magic-btn','legacy', {
      title: lang.legacy,
      innerHTML: `<svg viewBox="0 0 510.4 510.4"><g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g></svg>`,
      onclick: (e) => {
        e.preventDefault();
        openpage('https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/archive/magic-userjs.user.js');
      }
    }),
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
      fver = make('magic-userjs','magicuserjs-fver', {
        innerHTML: `${lang.version}: ${ujs.version}`,
      }),
      fdesc = make('magic-userjs','magicuserjs-fdesc', {
        title: ujs.description,
        innerHTML: ujs.description,
      }),
      eframe = make('magic-userjs','magicuserjs-eframe'),
      uframe = make('magic-userjs','magicuserjs-uframe'),
      fdaily = make('magic-userjs','magicuserjs-daily', {
        title: lang.daily,
        innerHTML: ujs.daily_installs,
      }),
      fupdated = make('magic-userjs','magicuserjs-updated', {
        title: lang.updated,
        innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at)),
      }),
      fdwn = make('magicuserjs-btn','install', {
        title: `${lang.install} '${ujs.name}'`,
        innerHTML: lang.install,
        onclick: async (e) => {
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
      fname.append(ftitle,fver,fdesc);
      frame.append(fname,eframe);
      tbody.append(frame);
    };
    gfcountframe.append(gfcounter);
    sfcountframe.append(sfcounter);
    countframe.append(gfcountframe,sfcountframe);
    btnframe.append(searcher,searchbtn,btnissue,btnhome,btngreasy,btnlegacy,closebtn);
    header.append(countframe,btnframe);
    main.append(header,tbody);
    mainframe.append(mainbtn);
    container.shadowRoot.append(usercss,mainframe,main);
    for(let ujs of gfCount) {
      if(ujs.deleted) continue;
      siteujs.push(
        {
          url: ujs,
          sleazy: false,
        },
      );
      sitegfcount++;
    };
    for(let ujs of sfCount) {
      if(ujs.deleted) continue;
      siteujs.push(
        {
          url: ujs,
          sleazy: true,
        },
      );
      sitesfcount++;
    };
    for(let ujs of siteujs) {
      createjs(ujs.url,ujs.sleazy);
    };
    if(sitegfcount > sitesfcount) {
      mainbtn.innerHTML = sitegfcount
    } else {
      mainbtn.innerHTML = sitesfcount
    };
    gfcounter.innerHTML = sitegfcount;
    sfcounter.innerHTML = sitesfcount;
    delay(10000).then(() => {
      if(!mainframe.classList.contains('hidden')) {
        mainframe.classList.add('hidden');
        ifram.setAttribute('style','display:none;');
      };
    });
  } catch(error) {err(error)}
};

if(/greasyfork\.org/.test(doc.location.hostname) && sleazyfork_redirect) {
  sleazy()
};

if (doc.readyState == 'complete') {
  countsite();
} else {
  win.addEventListener('load', countsite);
};
})();
