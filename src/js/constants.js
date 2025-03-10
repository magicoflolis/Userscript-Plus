'use strict';

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
  url: 'about:blank',
  code_url: 'about:blank',
  created_at: Date.now(),
  code_updated_at: Date.now(),
  locale: 'NOT FOUND',
  deleted: false,
  users: []
};
/** Unsupport host for search engines */
const engineUnsupported = {
  greasyfork: ['pornhub.com'],
  sleazyfork: ['pornhub.com'],
  openuserjs: [],
  github: []
};
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
const BLANK_PAGE = 'about:blank';
/** Lets highlight me :) */
const authorID = 166061;
/**
 * Some UserJS I personally enjoy - `https://greasyfork.org/scripts/{id}`
 */
const goodUserJS = [
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
];
/** Remove UserJS from banned accounts */
const badUserJS = [478597];

export {
  authorID,
  template,
  engineUnsupported,
  builtinList,
  BLANK_PAGE,
  goodUserJS,
  badUserJS
}
