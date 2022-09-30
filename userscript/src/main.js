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
      //if(!ujs.locale.includes(navigator.language.split('-')[0] ?? 'en')) continue;
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
      //if(!ujs.locale.includes(navigator.language.split('-')[0] ?? 'en')) continue;
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
// loadCSS = (css, name = 'common') => {
//   let s = make('style', `magicuserjscss-${name}`, {
//     innerHTML: css,
//   });
//   return (!doc.head.contains(s)) ? doc.head.appendChild(s) : false;
// },
