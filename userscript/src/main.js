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
    let siteujs = [],
    host = location.hostname.split('.').splice(-2).join('.'),
    gfCount = await fetchURL(`https://greasyfork.org/scripts/by-site/${host}.json`),
    sfCount = await fetchURL(`https://sleazyfork.org/scripts/by-site/${host}.json`),
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
      placeholder: 'title | description | author...',
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
        mainframe.classList.remove('hidden');
        // delay(10000).then(() => {
        //   mainframe.classList.add('hidden');
        // })
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
      innerHTML: gfCount.length,
    }),
    sfcounter = make('count-frame','count', {
      title: 'https://sleazyfork.org',
      innerHTML: sfCount.length,
    }),
    btnframe = make('magic-column', 'btnframe'),
    btnhome = make('magic-btn','github', {
      title: 'GitHub',
      innerHTML: 'GitHub',
      onclick: (e) => {
        e.preventDefault();
        openpage('https://github.com/magicoflolis/Userscript-Plus');
      }
    }),
    btngreasy = make('magic-btn','greasy', {
      title: 'Greasy Fork',
      innerHTML: 'Greasy Fork',
      onclick: (e) => {
        e.preventDefault();
        openpage('https://github.com/magicoflolis/Userscript-Plus');
      }
    }),
    btnissue = make('magic-btn','issue', {
      title: 'New Issue',
      innerHTML: 'Issue',
      onclick: (e) => {
        e.preventDefault();
        openpage('https://github.com/magicoflolis/Userscript-Plus/issues/new');
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
    btnframe.append(searcher,searchbtn,btnissue,btnhome,btngreasy,closebtn);
    header.append(countframe,btnframe);
    main.append(header,tbody);
    doc.body.append(container);
    container.attachShadow({ mode: 'open' });
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
      // ujs.url.description
      // ujs.url.name
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
    // delay(10000).then(() => {
    //   mainframe.classList.add('hidden');
    // });
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
