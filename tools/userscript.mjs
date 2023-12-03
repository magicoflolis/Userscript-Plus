import { readFileSync, writeFile } from 'fs'
import watch from 'node-watch'

const p = {
    dev: './tests/userscript/magic-userjs.dev.user.js',
    pub: './dist/magic-userjs.user.js',
  },
  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  /**
   * Object is Null
   * @param {Object} obj - Object
   * @returns {boolean} Returns if statement true or false
   */
  isNull = (obj) => {
    return Object.is(obj, null) || Object.is(obj, undefined)
  },
  /**
   * Object is Blank
   * @param {(Object|Object[]|string)} obj - Array, Set, Object or String
   * @returns {boolean} Returns if statement true or false
   */
  isBlank = (obj) => {
    return (
      (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
      (obj instanceof Set && Object.is(obj.size, 0)) ||
      (Array.isArray(obj) && Object.is(obj.length, 0)) ||
      (obj instanceof Object &&
        typeof obj.entries !== 'function' &&
        Object.is(Object.keys(obj).length, 0))
    )
  },
  /**
   * Object is Empty
   * @param {(Object|Object[]|string)} obj - Array, object or string
   * @returns {boolean} Returns if statement true or false
   */
  isEmpty = (obj) => isNull(obj) || isBlank(obj),
  nano = (template, data) => {
    return template.replace(/\{([\w.]*)\}/g, (str, key) => {
      const keys = key.split('.')
      let v = data[keys.shift()]
      for (const i in keys.length) v = v[keys[i]]
      return isEmpty(v) ? '' : v
    })
  },
  js_env = process.env.JS_ENV === 'development',
  jsonData = JSON.parse(readFileSync('./package.json', 'utf-8')),
  watcher = watch([
    './src/sass',
    './userscript/'
  ], {
    recursive: true,
    delay: 2000,
    filter: /\.(js|[s]css)$/,
  }),
  // eslint-disable-next-line no-unused-vars
  buildUserJS = async (evt, name) => {
    const outFile = js_env ? p.dev : p.pub,
      header = readFileSync('./userscript/header.js', 'utf-8').toString(),
      main_css = readFileSync(
        './tests/compiled/magicuserjs.css',
        'utf-8'
      ).toString(),
      code = readFileSync('./userscript/main.js', 'utf-8').toString(),
      buildScript = `// ==UserScript==\n// @name         ${js_env ? `[Dev] ${jsonData.userJS.name}` : jsonData.userJS.name}
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
// @description:ru      Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @author       ${jsonData.author}
// @version      ${js_env ? +new Date() : jsonData.userJS.version}
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
// @grant        GM.xmlHttpRequest
// @grant        GM.openInTab
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.info
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
// ==/UserScript==`
    const ujs = nano(header, {
      jshead: buildScript,
      main_css: main_css,
      code: code,
    })
    try {
      return await new Promise((resolve, reject) => {
        writeFile(outFile, ujs, (ex) => {
          if (ex) {
            reject(ex)
          }
          resolve(log(`Build-path: ${outFile}`))
        })
      })
    } catch (msg) {
      return err(msg)
    }
  }

log(`ENV: ${process.env.JS_ENV}`)

if (js_env) {
  watcher.on('change', buildUserJS)
  watcher.on('error', (ex) => {
    err(ex)
    watcher.close()
    delay(5000).then(buildUserJS)
  })
  watcher.on('ready', buildUserJS)
} else {
  buildUserJS()
}

function log(...msg) {
  return console.log(`[NodeJS] DBG ${[...msg]} ${performance.now()}ms`)
}

function err(...msg) {
  return console.error('[NodeJS] ERROR', ...msg)
}
