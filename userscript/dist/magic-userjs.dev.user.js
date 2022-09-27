// ==UserScript==
// @name         [Dev] Magic Userscript+ : Show Site All UserJS
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
// @version      1664244945507
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @downloadURL  https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @updateURL    https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
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
// @compatible   Chrome
// @compatible   Firefox
// @compatible   Opera
// @compatible   Safari
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
main_css = `magic-userjs{cursor:default}magic-userjs *{line-height:normal}.hidden{display:none !important;z-index:-1 !important}.main{position:fixed;height:492px;max-width:100%;min-width:500px;margin-left:1rem;margin-right:1rem;bottom:1rem;right:1rem;background:#495060 !important;color:#fff !important;border:1px solid rgba(0,0,0,0);border-radius:10px;font-size:14px !important;font-family:arial,sans-serif !important}.main:not(.hidden){z-index:9999999 !important;display:grid !important}.main *:not(magicuserjs-a,magicuserjs-btn,.count){background:#495060 !important;color:#fff !important}.mainbtn{line-height:2.5rem;background:#495060 !important;color:#fff !important;border:2px solid rgba(0,0,0,0);border-radius:100%;width:3rem;height:3rem;text-align:center;position:fixed;bottom:1rem;right:1rem}.mainbtn:not(.hidden){z-index:9999999 !important;display:block}.count{border:2px solid rgba(0,0,0,0);border-radius:100%;width:2rem !important;height:2rem !important;line-height:2rem !important;text-align:center !important}.magicuserjs-header{border-bottom:1px solid #fff;border-top-left-radius:10px;border-top-right-radius:10px;height:fit-content;padding:10px}.magicuserjs-body{overflow-y:scroll;scrollbar-color:#fff #2e323d;scrollbar-width:thin;border:1px solid rgba(0,0,0,0);border-bottom-left-radius:10px;border-bottom-right-radius:10px}.magicuserjs-eframe,.magicuserjs-header,.frame{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;font-size:1em}.frame{border-bottom:1px solid #fff}@media screen and (max-width: 580px){.frame{grid-auto-flow:row !important;grid-auto-rows:1fr !important;height:fit-content !important}}.frame:not(.sf) magicuserjs-a{color:#00b7ff !important}.frame:not(.sf) magicuserjs-btn{color:#fff;background-color:#2d8cf0;border-color:#2d8cf0}.frame.sf magicuserjs-a{color:#ed3f14 !important}.frame.sf magicuserjs-btn{background-color:#ed3f14 !important;border-color:#ed3f14 !important}.magicuserjs-name{font-size:inherit !important;display:grid;margin-left:1%;margin-top:.67em;margin-bottom:.67em}.magicuserjs-name span{font-size:.8em !important}.magicuserjs-eframe{margin-right:1%;margin-top:.67em;margin-bottom:.67em}@media screen and (max-width: 580px){.magicuserjs-eframe{height:fit-content !important}}.magicuserjs-uframe{display:grid;grid-auto-flow:column;grid-gap:1em}magic-btn{font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-rendering:auto;border:1px solid #fff;font-size:16px;border-radius:4px;line-height:1;padding:6px 15px;width:fit-content}magic-column{display:grid;grid-auto-flow:column;width:fit-content;grid-gap:1rem}.search svg{fill:#fff;width:.8rem;height:.8rem}.searcher{right:9.5rem;border:1px solid #fff;border-radius:4px;line-height:1;padding:6px 15px;width:200px;outline:0px !important}.close{position:fixed;right:2.5rem}magicuserjs-btn{font-size:12px;border-radius:3px;font-style:normal;padding:6px 15%;font-weight:400;font-variant:normal;line-height:21px}magicuserjs-a,magicuserjs-btn,.mainbtn,magic-btn{cursor:pointer !important}.magicuserjs-uframe,.magicuserjs-daily,.magicuserjs-updated,.install,.magicuserjs-homepage,.magicuserjs-fver,.magicuserjs-fdesc{width:fit-content;height:fit-content}
`;

(() => {
  const log = (...msg) => console.log('[%cUserJS%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', ...msg),
err = (...msg) => {console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg)};

let checkGMSupport = typeof GM !== 'undefined' || typeof VM !== 'undefined',
// checkWinSupport = typeof unsafeWindow !== 'undefined',
MU = {};

if(checkGMSupport) {
  MU = {
    // getValue: GM_getValue,
    // setValue: GM_setValue,
    openInTab: GM_openInTab,
    xmlhttpRequest: GM_xmlhttpRequest,
  };
};
const win = self ?? window,
doc = win.document,
/** Can create various elements */
make = (element,cname,attrs = {}) => {
  let el = doc.createElement(element);
  cname ? (el.className = cname) : false;
  if(attrs) {for(let key in attrs) {el[key] = attrs[key]}};
  return el;
},
container = make('magic-userjs'),
// qsA = (element, selector) => {
//   selector = selector ?? doc ?? doc.body;
//   return selector.querySelectorAll(element);
// },
qs = (element, selector) => {
  selector = selector ?? doc ?? doc.body;
  return selector.querySelector(element);
},
// sh = (element) => {
//   let shadow = container.shadowRoot;
//   return shadow.querySelector(element);
// },
shA = (element) => {
  let shadow = container.shadowRoot;
  return shadow.querySelectorAll(element);
},
// isMobile = () => {
//   let a = navigator.userAgent||navigator.vendor||win.opera;
//   return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4));
// },
// ael = (elm, event, callback) => {
//   try {
//     elm = elm ?? doc;
//     if(isMobile()) {
//       if(event === 'click') {
//         event = 'mouseup';
//         // elm.addEventListener('mouseup', callback);
//         elm.addEventListener('touchstart', callback);
//         elm.addEventListener('touchend', callback);
//       };
//     };
//     if(event === 'fclick') {event = 'click'};
//     return elm.addEventListener(event, callback);
//   } catch(error) {
//     err(error);
//   };
// },
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
countsite = async () => {
  try {
    let siteujs = [],
    host = location.hostname.split('.').splice(-2).join('.'),
    gfCount = await fetchURL(`https://greasyfork.org/scripts/by-site/${host}.json`),
    sfCount = await fetchURL(`https://sleazyfork.org/scripts/by-site/${host}.json`),
    main = make('magic-userjs','main hidden'),
    usercss = make('style', 'primary-stylesheet', {innerHTML: main_css,}),
    tbody = make('magic-userjs','magicuserjs-body'),
    header = make('magic-userjs','magicuserjs-header'),
    mainbtn = make('magic-userjs','mainbtn', {
      innerHTML: '0',
      onclick: (e) => {
        e.preventDefault();
        main.classList.remove('hidden');
        mainbtn.classList.add('hidden');
      }
    }),
    searchframe = make('magic-column'),
    searcher = make('input','searcher hidden', {
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: 'Enter title、description、author...',
      oninput: (e) => {
        e.preventDefault();
        let v = e.target.value;
        if(!estr(v)) {
          let reg = new RegExp(v,'gi');
          // log('input',v);
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
      title: 'Search',
      innerHTML: `<svg class='searchicon' viewBox='0 0 487.95 487.95'><g><path d='M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1 c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4 c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z'/></g></svg>`,
      onclick: (e) => {
        e.preventDefault();
        searcher.classList.toggle('hidden');
      }
    }),
    closebtn = make('magic-btn','close', {
      title: 'No longer show',
      innerHTML: 'X',
      onclick: (e) => {
        e.preventDefault();
        main.classList.add('hidden');
        mainbtn.classList.remove('hidden');
        delay(10000).then(() => {
          mainbtn.classList.add('hidden');
        })
      }
    }),
    countframe = make('magic-column'),
    gfcounter = make('magic-userjs','count', {
      title: 'https://greasyfork.org',
      innerHTML: gfCount.length,
      style: 'background: #00b7ff;'
    }),
    sfcounter = make('magic-userjs','count', {
      title: 'https://sleazyfork.org',
      innerHTML: sfCount.length,
      style: 'background: #ed3f14;'
    }),
    createjs = (ujs, issleazy) => {
      let frame = make('magic-userjs',`frame ${issleazy ? 'sf' : ''}`),
      fname = make('magic-userjs','magicuserjs-name'),
      ftitle = make('magicuserjs-a','magicuserjs-homepage', {
        title: ujs.name,
        innerHTML: ujs.name,
        onclick: (e) => {
          e.preventDefault();
          if(checkGMSupport) {
            MU.openInTab(ujs.url, {
              active: true,
              insert: true,
            });
          } else {
            let dwnbtn = make('a','magicuserjs-dwnbtn', {
              href: ujs.url,
              target: '_blank',
              rel: 'noopener',
            });
            dwnbtn.click();
            dwnbtn.remove();
          }
        }
      }),
      fver = make('magic-userjs','magicuserjs-fver', {
        innerHTML: `Version: ${ujs.version}`,
      }),
      fdesc = make('magic-userjs','magicuserjs-fdesc', {
        title: ujs.description,
        innerHTML: ujs.description,
      }),
      eframe = make('magic-userjs','magicuserjs-eframe'),
      uframe = make('magic-userjs','magicuserjs-uframe'),
      fdaily = make('magic-userjs','magicuserjs-daily', {
        innerHTML: ujs.daily_installs,
      }),
      fupdated = make('magic-userjs','magicuserjs-updated', {
        innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at)),
      }),
      fdwn = make('magicuserjs-btn','install', {
        title: `Install '${ujs.name}'`,
        innerHTML: 'Install',
        onclick: (e) => {
          e.preventDefault();
          if(checkGMSupport) {
            MU.openInTab(ujs.code_url, {
              active: true,
              insert: true,
            });
          } else {
            let dwnbtn = make('a','magicuserjs-dwnbtn', {
              href: ujs.code_url,
              target: '_blank',
              rel: 'noopener',
            });
            dwnbtn.click();
            dwnbtn.remove();
          }
        },
      });
      for(let u of ujs.users) {
        let user = make('magicuserjs-a','magicuserjs-euser', {
          innerHTML: u.name,
          onclick: (e) => {
            e.preventDefault();
            if(checkGMSupport) {
              MU.openInTab(u.url, {
                active: true,
                insert: true,
              });
            } else {
              let dwnbtn = make('a','magicuserjs-dwnbtn', {
                href: u.url,
                target: '_blank',
                rel: 'noopener',
              });
              dwnbtn.click();
              dwnbtn.remove();
            }
          },
        });
        uframe.append(user);
      };
      eframe.append(uframe,fdaily,fupdated,fdwn);
      fname.append(ftitle,fver,fdesc);
      frame.append(fname,eframe);
      tbody.append(frame);
    };
    searchframe.append(searchbtn,searcher);
    countframe.append(gfcounter,sfcounter);
    header.append(countframe,searchframe,closebtn);
    main.append(header,tbody);
    doc.body.append(container);
    container.attachShadow({ mode: 'open' });
    container.shadowRoot.append(usercss,mainbtn,main);
    for(let ujs of gfCount) {
      if(ujs.deleted) continue;
      siteujs.push(
        {
          url: ujs,
          sleazy: false,
        },
      );
    };
    for(let ujs of sfCount) {
      if(ujs.deleted) continue;
      siteujs.push(
        {
          url: ujs,
          sleazy: true,
        },
      );
    };
    for(let ujs of siteujs) {
      if(ujs.sleazy) {
        createjs(ujs.url,true)
      } else {
        createjs(ujs.url)
      }
    };
    if(gfCount.length > sfCount.length) {
      mainbtn.innerHTML = gfCount.length
    } else {
      mainbtn.innerHTML = sfCount.length
    };
    delay(10000).then(() => {
      mainbtn.classList.add('hidden');
    });
  } catch(error) {err(error)}
};

if(/greasyfork\.org/.test(doc.location.hostname) && sleazyfork_redirect) {
  sleazy()
};

countsite();

// loadCSS = (css, name = 'common') => {
//   let s = make('style', `magicuserjscss-${name}`, {
//     innerHTML: css,
//   });
//   return (!doc.head.contains(s)) ? doc.head.appendChild(s) : false;
// },

})();
