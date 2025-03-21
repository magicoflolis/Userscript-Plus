'use strict';
import path from 'path';
import { URL } from 'node:url';
import fs from 'node:fs';
import Watchpack from 'watchpack';
import minimist from 'minimist';
import { loadLanguages } from '@userjs/i18n';
import { compile } from 'sass-embedded';

/**
 * @typedef { import('../typings/index.d.ts').UserJS } CFG
 */

const replaceTemplate = /\[\[(.*?)\]\]/g;
const metaStr = '[[metadata]]';

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
/**
 * @template { string | { msg: string; } } T
 * @template D
 * @param { T } template
 * @param { D } data
 */
const nano = (template, data) => {
  if (typeof template === 'string') {
    return template.replace(replaceTemplate, (_match, key) => {
      const keys = key.split('.');
      let v = data[keys.shift()];
      for (const i in keys.length) v = v[keys[i]];
      return isEmpty(v) ? '' : v;
    });
  }
  return '';
};
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {string} encoding
 */
const canAccess = async (filePath, encoding = 'utf-8') => {
  const testAccess = await fs.promises.access(
    filePath,
    fs.promises.constants.R_OK | fs.promises.constants.W_OK
  );
  if (isNull(testAccess)) {
    const data = await fs.promises.readFile(filePath, encoding);
    return data.toString(encoding);
  }
  return {
    msg: `Cannot access provided filePath: ${filePath}`
  };
};
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {string} encoding
 */
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (isObj(testAccess)) {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
/**
 * @param {import('node:fs').PathLike} destinationFilePath
 * @param data
 */
const writeUserJS = async (destinationFilePath, data) => {
  return await fs.promises.writeFile(destinationFilePath, data);
};
const toTime = () => {
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3
  }).format(new Date());
};
/**
 * @type { Map<string, any> }
 */
const dataMap = new Map();
const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
/**
 * @template {string} K
 * @template V
 * @param {K} key
 * @param {...V} values
 */
const addTo = (key, ...values) => {
  if (values.length === 0) {
    return '';
  }
  if (dataMap.has(key)) {
    if (compareArrays(dataMap.get(key), values)) {
      return dataMap.get(key);
    }
  }
  dataMap.set(key, values);
  return dataMap.get(key);
};

async function build() {
  try {
    const getEnv = () => {
      const argv = minimist(process.argv.slice(2));
      if (argv.JS_ROOT && argv.JS_ENV) {
        return {
          JS_ROOT: argv.JS_ROOT,
          JS_ENV: argv.JS_ENV,
          JS_i18n: `${argv.JS_ROOT}src/_locales`
        };
      }
      return process.env;
    };
    const { JS_ENV, JS_i18n } = getEnv();
    const jsonRecords = await Promise.all([
      // fileToJSON('./package.json').then(({ userJS }) => {
      //   return userJS ?? {};
      // }),
      fileToJSON('./UserJS.json')
        .then((userJS) => {
          return userJS ?? {};
        })
        .catch(() => {
          return {};
        })
    ]);
    if (isEmpty(jsonRecords))
      throw new Error('"UserJS.json" not found + no "userJS" key in package.json');
    /**
     * @type { CFG }
     */
    const userJS = {};
    for (const r of jsonRecords) Object.assign(userJS, r);
    const isDev = isEmpty(JS_ENV) || JS_ENV === 'development';
    const buildUserJS = async () => {
      try {
        const i18n = userJS.build.paths.i18n;
        const i18nList = await loadLanguages(new URL(i18n.dir ?? JS_i18n, import.meta.url));
        const compileLanguage = (type = 'userjs_name') => {
          const resp = [];
          for (const [key, obj] of i18nList.entries()) {
            const value = obj[type];
            if (!value || isEmpty(value) || key.startsWith(i18n.default)) {
              continue;
            }
            const t = type.toLowerCase().replace('userjs_', '');
            if (type === 'userjs_name') {
              resp.push(
                `// @${t}:${key.replace('_', '-')}      ${isDev ? '[Dev] ' : ''}${value}`
              );
            } else {
              resp.push(`// @${t}:${key.replace('_', '-')}      ${value}`);
            }
          }
          return resp;
        };
        const compileData = () => {
          if (isDev && !isEmpty(dataMap)) {
            addTo('version', `// @version      ${+new Date()}`);
            return `// ==UserScript==\n${[...dataMap.values()].flat().join('\n')}\n// ==/UserScript==`;
          }
          for (const [k, v] of Object.entries(userJS)) {
            if (k === 'metadata') {
              const metaData = [];
              for (const [key, value] of Object.entries(v)) {
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
              addTo('metaData', metaData.join('\n'));
            }
            if (typeof v !== 'string') {
              continue;
            }
            if (k === 'name') {
              addTo(
                k,
                `// @${k}         ${isDev ? '[Dev] ' : ''}${v}`,
                ...compileLanguage('userjs_name')
              );
            } else if (k === 'description') {
              addTo(k, `// @${k}  ${v}`, ...compileLanguage('userjs_description'));
            } else if (k === 'author') {
              addTo(k, `// @${k}       ${v}`);
            } else if (k === 'icon') {
              if (v.startsWith('.') || v.startsWith('/')) {
                const buff = new Buffer.from(fs.readFileSync(v));
                const base64data = buff.toString('base64');
                if (v.endsWith('.png')) {
                  addTo(k, `// @${k}         data:image/png;base64,${base64data}`);
                } else if (v.endsWith('.svg')) {
                  addTo(k, `// @${k}         data:image/svg+xml;base64,${base64data}`);
                }
              } else {
                addTo(k, `// @${k}         ${v}`);
              }
            } else if (k === 'downloadURL') {
              addTo(k, `// @downloadURL  ${v}`);
            } else if (k === 'updateURL') {
              addTo(k, `// @updateURL    ${v}`);
            } else if (k === 'url_source') {
              addTo(k, `// @url_source    ${v}`);
            } else if (k === 'url') {
              addTo(k, `// @downloadURL  ${v}`, `// @updateURL    ${v}`);
            } else if (k === 'version') {
              addTo(k, `// @${k}      ${isDev ? +new Date() : v}`);
            } else if (k === 'homepage') {
              addTo(k, `// @namespace    ${v}`, `// @homepageURL  ${v}`);
            } else if (k === 'bugs') {
              addTo(k, `// @supportURL   ${v}`);
            } else if (k === 'license') {
              addTo(k, `// @${k}      ${v}`);
            } else {
              addTo(k, v);
            }
          }
          return `// ==UserScript==\n${[...dataMap.values()].flat().join('\n')}\n// ==/UserScript==`;
        };
        const cfg = {
          nano: {
            languageList: {},
            metadata: compileData()
          },
          path: {
            fileName: 'main-userjs',
            dir: './dist'
          },
          file: '',
          meta: '',
          metaPath: ''
        };
        for (const [k, v] of Object.entries(userJS.build.source)) {
          if (/\.s[ac]ss$/i.test(v)) {
            cfg.nano[k] = compile(v, {
              sourceMap: false,
              style: 'expanded'
            }).css;
            continue;
          }
          const f = await canAccess(v);
          if (typeof f !== 'string') continue;
          if (k === 'metadata') {
            cfg.meta = f;
          } else {
            cfg.nano[k] = f;
          }
        }
        if (!isEmpty(i18nList)) {
          for (const [k, obj] of i18nList.entries()) {
            const o = {};
            for (const [key, value] of Object.entries(obj)) {
              if (isEmpty(value)) {
                continue;
              }
              if (/^ext[A-Z_]|^userjs_(name|description)/.test(key)) {
                continue;
              }
              o[key] = value;
            }
            cfg.nano.languageList[k] = o;
          }
        }
        for (const [k, v] of Object.entries(userJS.build.paths)) {
          if (isEmpty(v)) continue;
          if (isDev && /dev/i.test(k)) {
            for (const [key, value] of Object.entries(v)) {
              cfg.path[key] = value;
            }
          } else {
            cfg.path[k] = v;
          }
        }
        cfg.file = `${cfg.path.dir}/${cfg.path.fileName}.user.js`;
        cfg.metaPath = `${cfg.path.dir}/${cfg.path.fileName}.meta.js`;
        cfg.nano.languageList = JSON.stringify(cfg.nano.languageList, null, ' ');

        await writeUserJS(cfg.file, nano(cfg.meta, cfg.nano));
        log('UserJS File:', {
          path: cfg.file,
          time: toTime()
        });
        if (!isDev) {
          await writeUserJS(
            cfg.metaPath,
            nano(metaStr, {
              metadata: cfg.nano.metadata
            })
          );
          log('UserJS Metadata:', {
            path: cfg.metaPath,
            time: toTime()
          });
        }
      } catch (ex) {
        err(ex);
      }
    };
    log(`Node ENV: ${JS_ENV}`);
    await buildUserJS();
    if (isDev) {
      const wp = new Watchpack();
      let changed = new Set();
      if (isEmpty(userJS.build.watch.files)) {
        wp.watch(userJS.build.watch.dirs);
      } else {
        wp.watch(userJS.build.watch.files, userJS.build.watch.dirs);
      }
      wp.on('change', (changedFile, mtime) => {
        if (mtime === null) {
          changed.delete(changedFile);
        } else {
          changed.add(changedFile);
        }
      });
      wp.on('aggregated', async () => {
        // Filter out files that start with a dot from detected changes
        // (as they are hidden files or temp files created by an editor).
        const changes = Array.from(changed).filter((filePath) => {
          return !path.basename(filePath).startsWith('.');
        });
        changed = new Set();

        if (changes.length === 0) {
          return;
        }

        await buildUserJS();
      });
    } else {
      process.exit(0);
    }
  } catch (ex) {
    err(ex);
  }
}

export { build };
export default build;
