/* eslint-env node */
import { readFileSync, writeFile } from 'fs';
import watch from 'node-watch';
const log = (...msg) => console.log(`[NodeJS] DBG ${[...msg]} ${performance.now()}ms`),
delay = ms => new Promise(resolve => setTimeout(resolve,ms)),
nano = (template, data) => {
  // eslint-disable-next-line no-useless-escape
  return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
    let keys = key.split('.'),
    v = data[keys.shift()];
    for(let i in keys.length) v = v[keys[i]];
    return typeof v !== 'undefined' && v !== null ? v : '';
  });
},
p = {
  dev: './userscript/dist/magic-userjs.dev.user.js',
  pub: './userscript/dist/magic-userjs.user.js',
},
js_env = process.env.JS_ENV === 'development',
jsonData = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' })),
// eslint-disable-next-line no-unused-vars
buildUserJS = (evt, name) => {
  let header = readFileSync('./userscript/src/header.js', { encoding: 'utf8' }).toString(),
  main_css = readFileSync('./tests/compiled/magicuserjs.css', { encoding: 'utf8' }).toString(),
  code = readFileSync('./userscript/src/main.js', { encoding: 'utf8' }).toString(),
  time = +new Date(),
  langND = `// @name         ${js_env ? `[Dev] ${jsonData.userJS.name}` : jsonData.userJS.name}
// @name:zh      Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-TW   Magic Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// @name:ja      Magic Userscript+ : 現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// @name:ru-RU   Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @name:ru      Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @description  ${jsonData.description}
// @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-TW   顯示當前網站的所有可用UserJS(Tampermonkey)腳本,交流QQ群:104267383
// @description:ja      現在のサイトで利用可能なすべてのUserJS（Tampermonkey）スクリプトを表示します。
// @description:ru-RU   Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @description:ru      Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.`,
  buildScript = `// ==UserScript==
${langND}
// @author       ${jsonData.author}
// @version      ${js_env ? time : jsonData.userJS.version}
// @icon         ${jsonData.userJS.icon}
// @downloadURL  ${jsonData.userJS.url}
// @updateURL    ${jsonData.userJS.url}
// @supportURL   ${jsonData.userJS.bugs}
// @namespace    ${jsonData.userJS.homepage}
// @homepageURL  ${jsonData.userJS.homepage}
// @license      ${jsonData.license}
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @connect      github.com
// @connect      openuserjs.org
// @match        https://*/*
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
// @run-at       document-start
// ==/UserScript==`;
  const ujs = nano(header, {
    jshead: buildScript,
    main_css: main_css,
    code: code,
  }),
  outFile = js_env ? p.dev : p.pub;
  // Development version : Release version
  writeFile(outFile, ujs, e => log(e ?? `Build-path: ${outFile}`));
},
watcher = watch(['./userscript/src/'], { delay: 2000, filter: /\.js$/ });

log(`ENV: ${process.env.JS_ENV}`);

if(js_env) {
  watcher.on('change',buildUserJS);
  watcher.on('error', (e) => {
    log('ERROR',e);
    watcher.close();
    delay(5000).then(buildUserJS);
  });
  watcher.on('ready',buildUserJS);
} else {
  buildUserJS();
};
