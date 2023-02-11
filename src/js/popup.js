'use strict';
import { err } from './logger.js';
// eslint-disable-next-line no-unused-vars
import { qs } from './querySelector.js';
let config = {};

let siteujs = [];
let sitegfcount = 0;
let lang = (txt) => webext.i18n.getMessage(txt);
let createjs = (ujs, issleazy) => {
  let frame = MU.make('magic-userjs',`frame webext-page ${issleazy ? 'sf' : ''}`),
  fname = MU.make('magic-userjs','magicuserjs-name'),
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
    style: 'border-color: rgb(51, 155, 51); background-color: #339b331a; color: #339b33;',
  }),
  fok = MU.make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
    title: lang('muOk'),
    innerHTML: ujs.ok_ratings,
    style: 'border-color: rgb(155, 155, 0); background-color: #9b9b001a; color: #9b9b00;',
  }),
  fbad = MU.make('magic-userjs','magicuserjs-list magicuserjs-ratings', {
    title: lang('muBad'),
    innerHTML: ujs.bad_ratings,
    style: 'border-color: red; background-color: #9b33331a; color: red;',
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
  eframe = MU.make('magic-userjs', 'install-btn'),
  uframe = MU.make('magic-userjs','magicuserjs-uframe'),
  fdaily = MU.make('magic-userjs','magicuserjs-list', {
    title: lang('muDailyInstalls'),
    innerHTML: ujs.daily_installs,
  }),
  fupdated = MU.make('magic-userjs','magicuserjs-list', {
    title: lang('muUpdated'),
    innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at)),
  }),
  fdwn = MU.make('magicuserjs-btn','install', {
    title: `${lang('muInstall')} '${ujs.name}'`,
    // `${iconSVG.install} ${lang('muInstall')}`
    innerHTML: lang('muInstall'),
    onclick: (e) => {
      MU.halt(e);
      MU.openInTab(ujs.code_url, '_blank', 'noopener');
    },
  });
  for(let u of ujs.users) {
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
  frame.append(fname,uframe,fdaily,fupdated,eframe);
  qs('.magicuserjs-body').append(frame);
};

function main(data = {}) {
  try {
    if(!MU.isEmpty(data)) {
      data = Array.isArray(data) ? data : [data];
      for(let ujs of data) {
        siteujs.push(
          {
            url: ujs,
            sleazy: false,
          },
        );
        sitegfcount++;
      };
      for(let ujs of siteujs) {
        createjs(ujs.url,ujs.sleazy);
      };
      qs('count-frame.gf').innerHTML = sitegfcount;
    };
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
  } catch (ex) {
    err(ex)
  }
};

MU.load = main;

MU.hermes.getPort().onMessage.addListener((root = {}) => {
  const m = root.msg;
  if (root.channel === 'Config' && MU.isEmpty(config)) {
    config = m.cfg || config;
  }
});
webext.runtime.sendMessage({}).then(main);
