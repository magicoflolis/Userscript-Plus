import { URL } from 'node:url';
import { access, constants, readFile, writeFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import watch from 'node-watch';
import { loadLanguages } from './languageLoader.js';

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
const userJS = {
  /**
   * `//@compatible {{Web Browser}}`
   * @type { S[] }
   */
  compatible: ['chrome', 'firefox', 'edge', 'opera', 'safari'],
  /**
   * `//@connect {{URL}}`
   * @type { string[] }
   */
  connect: ['greasyfork.org', 'sleazyfork.org', 'github.com', 'openuserjs.org'],
  /**
   * `//@exclude {{URL}}`
   * @type { string[] }
   */
  exclude: [],
  /**
   * `//@exclude-match {{URL}}`
   * @type { string[] }
   */
  'exclude-match': [],
  /**
   * `//@grant {{GM Permission}}`
   * @type { string[] }
   */
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
  /**
   * `//@include {{URL}}`
   * @type { string[] }
   */
  include: [],
  /**
   * `//@match {{URL}}`
   * @type { string[] }
   */
  match: [ 'https://*/*' ],
  /**
   * `//@noframes`
   * @type { boolean }
   */
  noframes: true,
  /**
   * `//@resource {{name}} {{URL}}`
   * @type { object }
   */
  resource: {},
  /**
   * `//@run-at {{execute}}`
   * @type { string }
   */
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
    const lngList = await loadLanguages(new URL('../src/_locales', import.meta.url));
    const buildUserJS = async () => {
      try {
        const jsonData = await fileToJSON('./package.json', 'utf-8');
        const compileMetadata = () => {
          const metaData = [];
          try {
            for (const [key, value] of Object.entries(userJS)) {
              if (Array.isArray(value)) {
                for (const v of value) {
                  metaData.push(`// @${key}     ${v}`);
                }
              } else if (isObj(value)) {
                for (const [k, v] of Object.entries(value)) {
                  metaData.push(`// @${key}     ${k} ${v}`);
                }
              } else if (typeof value === 'boolean') {
                if (value === true) {
                  metaData.push(`// @${key}`);
                }
              } else {
                metaData.push(`// @${key}     ${value}`);
              }
            }
          } catch (ex) {
            err(ex)
          }
          return metaData.join('\n');
        };
        const transformLanguages = () => {
          try {
            const resp = {};
            for (const obj of lngList) {
              for (const [k, v] of Object.entries(obj)) {
                if (k.includes('_')) {
                  continue;
                }
                const o = {};
                for (const [key, value] of Object.entries(v)) {
                  if (key.startsWith('ext')) {
                    continue;
                  }
                  if (key.startsWith('userjs')) {
                    continue;
                  }
                  if (isEmpty(value.message)) {
                    continue;
                  }
                  o[key] = value.message;
                }
                resp[k] = o;
              }
            }
            return JSON.stringify(resp);
          } catch (ex) {
            err(ex)
          }
        }
        const compileLanguage = (type = 'userjsName') => {
          try {
            const resp = [];
            for (const obj of lngList) {
              for (const [k, v] of Object.entries(obj)) {
                if (v[type]) {
                  if (isEmpty(v[type].message)) {
                    continue;
                  }
                  if (k.startsWith('en')) {
                    continue;
                  }
                  const t = type.toLowerCase().replace('userjs', '');
                  if (type === 'userjsName') {
                    resp.push(`// @${t}:${k.replace('_', '-')}      ${js_env ? '[Dev] ' : ''}${v[type].message}`);
                  } else {
                    resp.push(`// @${t}:${k.replace('_', '-')}      ${v[type].message}`);
                  }
                }
              }
            }
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
              return 'ERROR "jsonData" IS NOT A JSON OBJECT';
            }
            const resp = [];
            for (const str of arr) {
              const param = 'userJS' in jsonData && jsonData.userJS[str] ? jsonData.userJS[str] : jsonData[str] ?? null;
              if (!param) {
                continue;
              }
              if (str === 'name') {
                resp.push(`// @${str}         ${js_env ? '[Dev] ' : ''}${param}`, ...compileLanguage('userjsName'));
              } else if (str === 'description') {
                resp.push(`// @${str}  ${param}`, ...compileLanguage('userjsDescription'));
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
            }
            return resp.join('\n')
          } catch (ex) {
            err(ex)
          }
        };
        const userJSHeader = `// ==UserScript==\n${getData(['name', 'description', 'author', 'icon', 'version', 'url', 'homepage', 'bugs', 'license'])}\n${compileMetadata()}\n// ==/UserScript==`;
        const headerFile = await canAccess(sDir.head);
        const mainFile = await canAccess(sDir.body);
        const nanoCFG = {
          jshead: userJSHeader,
          languageList: transformLanguages(),
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
