/* eslint-disable */
import { access, constants, readFile, writeFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import watch from 'node-watch';

/** @type { dotenv.DotenvConfigOutput } */
let result = {};

/** Source Directories */
const sDir = {
  head: './src/UserJS/header.js',
  body: './src/UserJS/main.js',
  /**
   * FORMAT
   * `name`: `file location`
   */
  extras: {
    'mainCSS': './tests/compiled/magicuserjs.css',
  },
};
/** Watch Directories */
const wDir = ['./src/sass/', './src/UserJS/'];
const buildPaths = {
  /** File Name */
  name: 'magic-userjs',
  dev: {
    url: 'https://localhost:9090',
    env: './src/UserJS/.env',
    dir: './tests/userscript'
  },
  public: {
    env: './dist/.env',
    dir: './dist'
  }
};
const languages = [
  {
    'zh': {
      name: 'Magic Userscript+ ：显示站点所有 UserJS',
      description: '显示站点的用户脚本 (UserJS)。 为 Tampermonkey 安装自定义脚本的简单方法。',
    }
  },
  {
    'zh-CN': {
      name: 'Magic Userscript+ ：显示站点所有 UserJS',
      description: '显示站点的用户脚本 (UserJS)。 为 Tampermonkey 安装自定义脚本的简单方法。',
    }
  },
  {
    'zh-TW': {
      name: 'Magic Userscript+ ：显示站点所有 UserJS',
      description: '显示站点的用户脚本 (UserJS)。 为 Tampermonkey 安装自定义脚本的简单方法。',
    }
  },
  {
    'ja': {
      name: 'Magic Userscript+ : サイトをすべて表示 UserJS',
      description: 'サイトのユーザー スクリプト (UserJS) を表示します。 Tampermonkey のカスタム スクリプトをインストールする簡単な方法。',
    }
  },
  {
    'ru-RU': {
      name: 'Magic Userscript+: показать сайт всем UserJS',
      description: 'Показывает пользовательские скрипты (UserJS) для сайта. Простой способ установки собственных скриптов для Tampermonkey.',
    }
  },
  {
    'ru': {
      name: 'Magic Userscript+: показать сайт всем UserJS',
      description: 'Показывает пользовательские скрипты (UserJS) для сайта. Простой способ установки собственных скриптов для Tampermonkey.',
    }
  }
];
const userJS = {
  /** `//@compatible {{Web Browser}}` */
  compatible: ['chrome', 'firefox', 'edge', 'opera', 'safari'],
  /** `//@connect {{URL}}` */
  connect: ['greasyfork.org', 'sleazyfork.org', 'github.com', 'openuserjs.org'],
  /** `//@exclude-match {{URL}}` */
  'exclude-match': [],
  /** `//@grant {{GM Permission}}` */
  grant: [
    'GM.xmlHttpRequest',
    'GM.openInTab',
    'GM.getValue',
    'GM.setValue',
    'GM.info',
    'GM_xmlhttpRequest',
    'GM_openInTab',
    'GM_getValue',
    'GM_setValue',
    'GM_info'
  ],
  /** `//@match {{URL}}` */
  match: [ 'https://*/*' ],
  /** `//@noframes` */
  noframes: true,
  /** `//@resource {{name}} {{URL}}` */
  resource: {},
  /** `//@run-at {{execute}}` */
  'run-at': 'document-start',
};
const log = (...msg) => {
  console.log('[LOG]', ...msg);
};
const err = (...msg) => {
  console.error('[ERROR]', ...msg);
};
/**
 * Object is typeof `object` / JSON Object
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isObj = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Object');
};
/**
 * Object is `null` or `undefined`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * Object is Blank
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isBlank = (obj) => {
  return (
    (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
    ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (isObj(obj) && Object.is(Object.keys(obj).length, 0))
  );
};
/**
 * Object is Empty
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
const canAccess = async (filePath, encoding = 'utf-8') => {
  const testAccess = await access(filePath, constants.R_OK | constants.W_OK);
  if (isNull(testAccess)) {
    const data = await readFile(filePath, encoding);
    return data.toString(encoding);
  }
  return {
    msg: `Cannot access provided filePath: ${filePath}`,
  };
};
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (isObj(testAccess)) {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
const watcher = watch(wDir, {
  recursive: true,
  delay: 2000,
  filter: /\.(js|[s]css)$/
});
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3
};
const initUserJS = async (env) => {
  try {
    /** Build Paths */
    const p = {
      dev: `${buildPaths.dev.dir}/${buildPaths.name}.dev.user.js`,
      pub: `${buildPaths.public.dir}/${buildPaths.name}.user.js`,
    };
    const nano = (template, data) => {
      return template.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
        const keys = key.split('.');
        let v = data[keys.shift()];
        for (const i in keys.length) v = v[keys[i]];
        return isEmpty(v) ? '' : v;
      });
    };
    const js_env = env.JS_ENV === 'development';
    const outFile = js_env ? p.dev : p.pub;
    const compileMetadata = () => {
      const resp = [];
      for (const [key, value] of Object.entries(userJS)) {
        if (Array.isArray(value)) {
          for (const v of value) {
            resp.push(`// @${key}     ${v}`);
          }
        } else if (isObj(value)) {
          for (const [k, v] of Object.entries(value)) {
            resp.push(`// @${key}     ${k} ${v}`);
          }
        } else if (typeof value === 'boolean') {
          if (value === true) {
            resp.push(`// @${key}`);
          }
        } else {
          resp.push(`// @${key}     ${value}`);
        }
      }
      return resp.join('\n');
    };
    const buildUserJS = async () => {
      try {
        const jsonData = await fileToJSON('./package.json', 'utf-8');
        const compileLanguage = (type = 'name') => {
          try {
            const resp = [];
            for (const obj of languages) {
              for (const [k, v] of Object.entries(obj)) {
                if (type === 'name') {
                  resp.push(`// @${type}:${k}      ${js_env ? '[Dev] ' : ''}${v[type]}`)
                } else {
                  resp.push(`// @${type}:${k}      ${v[type]}`)
                }
              }
            }
            // return resp.join('\n')
            return resp;
          } catch (ex) {
            err(ex)
          }
        };
        /**
         * @template { import('../package.json') } J
         * @template { string } S
         * @param { S[] } arr
         * @returns { J["userJS"][S] }
         */
        const getData = (arr = []) => {
          try {
            if (!isObj(jsonData)) {
              return `ERROR "jsonData" IS NOT A JSON OBJECT`;
            }
            const resp = [];
            for (const str of arr) {
              const param = 'userJS' in jsonData && jsonData.userJS[str] ? jsonData.userJS[str] : jsonData[str] ?? null;
              if (!param) {
                continue;
              }
              if (str === 'name') {
                resp.push(`// @${str}         ${js_env ? '[Dev] ' : ''}${param}`, ...compileLanguage(str));
              } else if (str === 'description') {
                resp.push(`// @${str}  ${param}`, ...compileLanguage(str));
              } else if (str === 'author') {
                resp.push(`// @${str}       ${param}`);
              } else if (str === 'icon') {
                resp.push(`// @${str}         ${param}`);
              } else if (str === 'url') {
                const userjsURL = js_env ? `${buildPaths.dev.url ?? 'https://localhost:8080'}/${buildPaths.name}.dev.user.js` : param;
                resp.push(`// @downloadURL  ${userjsURL}`, `// @updateURL    ${userjsURL}`);
              } else if (str === 'version') {
                resp.push(`// @${str}      ${js_env ? +new Date() : param}`);
              } else if (str === 'homepage') {
                resp.push(`// @namespace    ${param}`, `// @homepageURL  ${param}`);
              } else if (str === 'bugs') {
                resp.push(`// @supportURL   ${param}`);
              } else if (str === 'license') {
                resp.push(`// @${str}      ${param}`);
              } else {
                resp.push(param);
              }

              // return 'userJS' in jsonData && jsonData.userJS[str] ? jsonData.userJS[str] : jsonData[str] ?? `ERROR "${str}" NOT FOUND`;
              // if ('userJS' in jsonData) {
              //   if (jsonData.userJS[str]) {
              //     return jsonData.userJS[str]
              //   }
              // }
              // return jsonData[str] ?? `ERROR "${str}" NOT FOUND`;
            }
            return resp.join('\n')
          } catch (ex) {
            err(ex)
          }
        };
        const userJSHeader = `// ==UserScript==\n${getData(['name', 'description', 'author', 'icon', 'version', 'url', 'homepage', 'bugs', 'license'])}\n${compileMetadata()}\n// ==/UserScript==`;
//         const userjsURL = js_env ? `${buildPaths.dev.url ?? 'https://localhost:8080'}/${buildPaths.name}.dev.user.js` : getData('url');
//         const userJSHeader = `// ==UserScript==\n// @name         ${js_env ? '[Dev] ' : ''}${getData('name')}
// // @name:zh      Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// // @name:zh-CN   Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// // @name:zh-TW   Magic Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// // @name:ja      Magic Userscript+ : 現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// // @name:ru-RU   Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// // @name:ru      Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// // @description  ${getData('description')}
// // @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// // @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// // @description:zh-TW   顯示當前網站的所有可用UserJS(Tampermonkey)腳本,交流QQ群:104267383
// // @description:ja      現在のサイトで利用可能なすべてのUserJS（Tampermonkey）スクリプトを表示します。
// // @description:ru-RU   Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// // @description:ru      Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// // @author       ${getData('author')}
// // @version      ${js_env ? +new Date() : getData('version')}
// // @icon         ${getData('icon')}
// // @downloadURL  ${userjsURL}
// // @updateURL    ${userjsURL}
// // @namespace    ${getData('homepage')}
// // @homepageURL  ${getData('homepage')}
// // @supportURL   ${getData('bugs')}
// // @license      ${getData('license')}
// ${compileMetadata()}
// // ==/UserScript==`;

        const headerFile = await canAccess(sDir.head);
        const mainFile = await canAccess(sDir.body);
        const nanoCFG = {
          jshead: userJSHeader,
          code: mainFile,
        };
        for (const [k, v] of Object.entries(sDir.extras)) {
          const extraFile = await canAccess(v);
          if (typeof extraFile === 'string') {
            nanoCFG[k] = extraFile;
          }
        }
        const wfConfig = nano(headerFile, nanoCFG);

        await writeFile(outFile, wfConfig);
        log('Build:', {
          path: outFile,
          time: new Intl.DateTimeFormat('default', dateOptions).format(new Date())
        });
      } catch (ex) {
        err(ex);
      }
    };
    //#region Start Process
    log(`Node ENV: ${env.JS_ENV}`);

    if (js_env) {
      watcher.on('change', buildUserJS);
      watcher.on('error', (ex) => {
        err(ex);
        watcher.close();
      });
      watcher.on('ready', buildUserJS);
      return;
    }
    await buildUserJS();
    process.exit(0);
    //#endregion
  } catch (ex) {
    err(ex);
  }
};

try {
  result = isEmpty(process.env.JS_ENV)
    ? dotenv.config({ path: buildPaths.dev.env })
    : dotenv.config({ path: buildPaths.public.env });
  if (result.error) {
    throw result.error;
  }
  if (isNull(result.parsed.JS_ENV)) {
    dotenv.populate(
      result.parsed,
      {
        JS_ENV: 'development'
      },
      { override: true, debug: true }
    );
  }
  initUserJS(result.parsed);
} catch (ex) {
  err(ex);
}
