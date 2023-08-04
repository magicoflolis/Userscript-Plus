'use strict';
import { err } from './logger.js';
import { qs, qsA } from './querySelector.js';
let config = {};
let switchRows = true;

const iconSVG = {
  install: '<svg viewBox="0 0 16 16"><g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g></svg>',
},
table = MU.make('table'),
tabbody = MU.make('tbody'),
tabhead = MU.make('thead'),
makeTHead = (rows = []) => {
  let tr = MU.make('tr');
  for(let r of rows) {
    let tparent = MU.make('th', r.class ?? '', r);
    tr.append(tparent);
  };
  tabhead.append(tr);
  table.append(tabhead, tabbody);
},
sortRowBy = (cellIndex) => {
  const rows = Array.from(tabbody.rows);
  rows.sort((tr1, tr2) => {
    const t1cell = tr1.cells[cellIndex],
    t2cell = tr2.cells[cellIndex],
    tr1Text = (t1cell.firstElementChild ?? t1cell).textContent,
    tr2Text = (t2cell.firstElementChild ?? t2cell).textContent,
    t1pDate = Date.parse(tr1Text),
    t2pDate = Date.parse(tr2Text);
    if(!Number.isNaN(t1pDate) && !Number.isNaN(t2pDate)) {
      return new Date(t1pDate) - new Date(t2pDate);
    };
    if(Number(tr1Text) && Number(tr2Text)) {
      return tr1Text - tr2Text;
    };
    return tr1Text.localeCompare(tr2Text);
  });
  if(switchRows) {
    rows.reverse()
  };
  switchRows = !switchRows;
  tabbody.append(...rows);
};

let siteujs = [];
let lang = (txt) => webext.i18n.getMessage(txt);
let createjs = (ujs, issleazy) => {
  // let frame = MU.make('magic-userjs',`frame webext-page ${issleazy ? 'sf' : ''}`);
  let fname = MU.make('td','magicuserjs-name'),
  ftitle = MU.make('magicuserjs-a','magicuserjs-homepage', {
    title: ujs.name,
    innerHTML: ujs.name,
    onclick: (e) => {
      MU.halt(e);
      MU.openInTab(ujs.url);
    }
  }),
  fver = MU.make('magic-userjs','magicuserjs-list', {
    innerHTML: `${lang('muVersion')}: ${ujs.version}`,
  }),
  fcreated = MU.make('magic-userjs','magicuserjs-list', {
    innerHTML: `${lang('muCreated')}: ${new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.created_at))}`,
  }),
  fmore = MU.make('mujs-column','magicuserjs-list hidden', {
    style: 'margin-top: 3px;',
  }),
  ftotal = MU.make('magic-userjs','magicuserjs-list', {
    innerHTML: `${lang('muTotalInstalls')}: ${ujs.total_installs}`,
  }),
  fratings = MU.make('magic-userjs','magicuserjs-list', {
    title: lang('muRating'),
    innerHTML: `${lang('muRating')}:`,
  }),
  fgood = MU.make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
    title: lang('muGood'),
    innerHTML: ujs.good_ratings,
    style: 'border-color: rgb(51, 155, 51); background-color: #339b331a; color: rgb(51, 255, 51);',
  }),
  fok = MU.make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
    title: lang('muOk'),
    innerHTML: ujs.ok_ratings,
    style: 'border-color: rgb(155, 155, 0); background-color: #9b9b001a; color: rgb(255, 255, 0);',
  }),
  fbad = MU.make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
    title: lang('muBad'),
    innerHTML: ujs.bad_ratings,
    style: 'border-color: rgb(155, 0, 0); background-color: #9b33331a; color: rgb(255, 0, 0);',
  }),
  fdesc = MU.make('magic-userjs','magicuserjs-list', {
    style: 'cursor: pointer; margin-top: 3px;',
    title: ujs.description,
    innerHTML: ujs.description,
    onclick: (e) => {
      MU.halt(e);
      if(fmore.classList.contains('hidden')) {
        fmore.classList.remove('hidden');
      } else {
        fmore.classList.add('hidden');
      }
      },
  }),
  eframe = MU.make('td', 'install-btn'),
  uframe = MU.make('td','magicuserjs-uframe'),
  fdaily = MU.make('td','magicuserjs-list', {
    title: lang('muDailyInstalls'),
    innerHTML: ujs.daily_installs,
  }),
  fupdated = MU.make('td','magicuserjs-list', {
    title: lang('muUpdated'),
    innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at)),
  }),
  fdwn = MU.make('magicuserjs-btn','install', {
    title: `${lang('muInstall')} '${ujs.name}'`,
    innerHTML: `${iconSVG.install} ${lang('muInstall')}`,
    onclick: (e) => {
      MU.halt(e);
      MU.openInTab(ujs.code_url, '_blank', 'noopener');
    },
  });
  for(const u of ujs.users) {
    let user = MU.make('magicuserjs-a','magicuserjs-euser', {
      innerHTML: u.name,
      onclick: (e) => {
        MU.halt(e);
        MU.openInTab(u.url, '_blank', 'noopener');
      },
    });
    uframe.append(user);
  };
  eframe.append(fdwn);
  fmore.append(ftotal,fratings,fgood,fok,fbad,fver,fcreated);
  fname.append(ftitle,fdesc,fmore);
  let tr = MU.make('tr', `frame ${issleazy ? 'sf' : ''}`);
  for(let e of [fname,uframe,fdaily,fupdated,eframe]) {
    tr.append(e);
  };
  tabbody.append(tr);
};

function main(data = {}) {
  try {
    let sitegfcount = 0;
    if(!MU.isEmpty(data)) {
      data = Array.isArray(data) ? data : [data];
      siteujs = data.map((ujs) => {
        sitegfcount++;
        return {
          url: ujs,
          sleazy: false,
        };
      });
      // for(const ujs of data) {
      //   siteujs.push(
      //     {
      //       url: ujs,
      //       sleazy: false,
      //     },
      //   );
      //   sitegfcount++;
      // };
      for(const ujs of siteujs) {
        createjs(ujs.url,ujs.sleazy);
      };
      qs('count-frame.gf').innerHTML = sitegfcount;
    };
  } catch (ex) {
    err(ex)
  }
};

// MU.load = main;

qs('.magicuserjs-body').append(table);
makeTHead([
  {
    class: 'mujs-header-name',
    textContent: 'Name'
  },
  {
    textContent: 'Created by',
  },
  {
    textContent: lang('muDailyInstalls'),
  },
  {
    textContent: lang('muLastUpdated'),
  },
  {
    textContent: lang('muInstall'),
  },
]);
for (const th of tabhead.rows[0].cells) {
  if(th.textContent === lang('muInstall')) continue;
  th.classList.add('mujs-pointer');
  MU.ael(th, 'click', () => {
    sortRowBy(th.cellIndex);
  });
};
sortRowBy(2);

MU.ael(qs('.settings'), 'click', (e) => {
  MU.halt(e);
  if(qs('.magicuserjs-cfg').classList.contains('hidden')) {
    qs('.magicuserjs-cfg').classList.remove('hidden');
    qs('.magicuserjs-body').classList.add('hidden');
  } else {
    qs('.magicuserjs-cfg').classList.add('hidden');
    qs('.magicuserjs-body').classList.remove('hidden');
  };
});

let thisHost = location.hostname.split('.').splice(-2).join('.'),
siteSearcher = qs('.ssearch input.searcher'),
filterList = qs('.fsearch input.searcher'),
siteSearchbtn = qs('mujs-btn.search'),
filterBtn = qs('mujs-btn.filter'),
btngreasy = qs('mujs-btn.greasy'),
btnissue = qs('mujs-btn.issue'),
btnhome = qs('mujs-btn.github');

MU.ael(qs('mujs-btn.nav'), 'click', (e) => {
  MU.halt(e);
  if(btngreasy.classList.contains('hidden')) {
    btnissue.classList.remove('hidden');
    btnhome.classList.remove('hidden');
    btngreasy.classList.remove('hidden');
  } else {
    btnissue.classList.add('hidden');
    btnhome.classList.add('hidden');
    btngreasy.classList.add('hidden');
  };
});
MU.ael(btngreasy, 'click', (e) => {
  MU.halt(e);
  MU.openInTab('https://greasyfork.org/scripts/421603');
});
MU.ael(btnissue, 'click', (e) => {
  MU.halt(e);
  MU.openInTab('https://github.com/magicoflolis/Userscript-Plus/issues/new');
});
MU.ael(btnhome, 'click', (e) => {
  MU.halt(e);
  MU.openInTab('https://github.com/magicoflolis/Userscript-Plus');
});
siteSearcher.placeholder = thisHost;
MU.ael(siteSearcher, 'change', (e) => {
  e.preventDefault();
  tabbody.innerHTML = '';
  webext.runtime.sendMessage({
    location: e.target.value
  }).then(main);
});
MU.ael(siteSearchbtn, 'click', (e) => {
  e.preventDefault();
  qs('.ssearch').classList.toggle('hidden');
});

MU.ael(filterBtn, 'click', (e) => {
  e.preventDefault();
  qs('.fsearch').classList.toggle('hidden');
});
filterList.placeholder = lang('muSearchDesc');
MU.ael(filterList, 'input', (e) => {
  e.preventDefault();
  let v = e.target.value;
  if(!MU.isEmpty(v)) {
    let reg = new RegExp(v,'gi');
    for(let ujs of qsA('.frame')) {
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
    for(let ujs of qsA('.frame')) {
      ujs.classList.remove('hidden')
    };
  };
});

MU.hermes.getPort().onMessage.addListener((root = {}) => {
  const m = root.msg;
  if (root.channel === 'Config' && MU.isEmpty(config)) {
    config = m.cfg || config;
  }
});

webext.runtime.sendMessage({}).then(main);
