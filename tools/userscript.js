import { URL } from 'node:url';
import { access, constants, readFile, writeFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import watch from 'node-watch';
import { loadLanguages } from './languageLoader.js';

/** @type { dotenv.DotenvConfigOutput } */
let result = {};

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
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3
};
const initUserJS = async () => {
  try {
    const jsonData = await fileToJSON('./package.json', 'utf-8');
    if (!jsonData.userJS) {
      throw new Error('Missing "userJS" key in package.json')
    }
    const userJS = jsonData.userJS;
    const { build } = userJS;

    result = isEmpty(process.env.JS_ENV)
      ? dotenv.config({ path: build.paths.dev.env })
      : dotenv.config({ path: build.paths.public.env });
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
    const env = result.parsed;

    const js_env = env.JS_ENV === 'development';
    const dp = js_env ? 'dev' : 'public';

    const lngList = await loadLanguages(new URL('../src/_locales', import.meta.url));
    const nano = (template, data) => {
      return template.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
        const keys = key.split('.');
        let v = data[keys.shift()];
        for (const i in keys.length) v = v[keys[i]];
        return isEmpty(v) ? '' : v;
      });
    };


    /** Build Paths */
    const outFile = `${build.paths[dp].dir}/${build.paths[dp].fileName}.user.js`;
    const buildUserJS = async () => {
      try {
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
        const compileMetadata = () => {
          const metaData = [];
          try {
            for (const [key, value] of Object.entries(userJS.metadata)) {
              // if (/build|name|version|url|icon|bugs|homepage/.test(key)) {
              //   continue;
              // }
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
                // resp.push(`// @${str}         ${js_env ? '[Dev] ' : ''}${param}`);
              } else if (str === 'description') {
                resp.push(`// @${str}  ${param}`, ...compileLanguage('userjsDescription'));
                // resp.push(`// @${str}  ${param}`);
              } else if (str === 'author') {
                resp.push(`// @${str}       ${param}`);
              } else if (str === 'icon') {
                resp.push(`// @${str}         ${param}`);
              } else if (str === 'url') {
                resp.push(`// @downloadURL  ${param}`, `// @updateURL    ${param}`);
                // const userjsURL = js_env ? `${buildPaths.dev.url ?? 'https://localhost:8080'}/${buildPaths.name}.dev.user.js` : param;
                // resp.push(`// @downloadURL  ${userjsURL}`, `// @updateURL    ${userjsURL}`);
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
        const headerFile = await canAccess(build.source.head);
        const mainFile = await canAccess(build.source.body);
        const nanoCFG = {
          jshead: userJSHeader,
          languageList: transformLanguages(),
          code: mainFile,
        };
        for (const [k, v] of Object.entries(build.source.extras)) {
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
    const watcher = watch(build.watchDirs, {
      recursive: true,
      delay: 2000,
      filter: /\.(js|[s]css)$/
    });
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

initUserJS();
