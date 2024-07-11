import { URL } from 'node:url';
import fs from 'node:fs';
import dotenv from 'dotenv';
import watch from 'node-watch';
import { loadLanguages } from './languageLoader.js';

/**
 * @typedef { import('../package.json') } CFG
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
const nano = (template, data) => {
  return template.replace(replaceTemplate, (_match, key) => {
    const keys = key.split('.');
    let v = data[keys.shift()];
    for (const i in keys.length) v = v[keys[i]];
    return isEmpty(v) ? '' : v;
  });
};
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
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (isObj(testAccess)) {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
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
const dataMap = new Map();
const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
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
const filterData = [
  'name',
  'description',
  'author',
  'icon',
  'version',
  'url',
  'homepage',
  'bugs',
  'license'
];

(async () => {
  /** @type { dotenv.DotenvConfigOutput } */
  let result = {};
  try {
    // const args = process.argv.filter((val, i) => i >= 2);

    // if ('USERJS_META' in process.env) {
    //   args.push(process.env.USERJS_META);
    // }

    // if (Object.is(args.length, 0)) {
    //   args.push('./package.json');
    // }

    /**
     * @type { CFG }
     */
    const jsonData = await fileToJSON('./package.json');
    if (!isObj(jsonData)) {
      throw new Error('"jsonData" must be an object.');
    }
    if (!jsonData.userJS) {
      throw new Error('Missing "userJS" key');
    }
    const userJS = jsonData.userJS;
    const { build } = userJS;

    result = dotenv.config({
      path: isEmpty(process.env.JS_ENV) ? build.paths.dev.env : build.paths.public.env
    });
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
    const compileMetadata = () => {
      const metaData = [];
      for (const [key, value] of Object.entries(userJS.metadata)) {
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
      return metaData.join('\n');
    };
    const buildUserJS = async () => {
      try {
        const lngList = await loadLanguages(new URL('../src/_locales', import.meta.url));
        const transformLanguages = () => {
          const resp = {};
          for (const obj of lngList) {
            for (const [k, v] of Object.entries(obj)) {
              const o = {};
              for (const [key, value] of Object.entries(v)) {
                if (key.startsWith('ext')) {
                  continue;
                }
                if (/userjs_(name|description)/i.test(key)) {
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
        };
        const compileLanguage = (type = 'userjs_name') => {
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
                const t = type.toLowerCase().replace('userjs_', '');
                if (type === 'userjs_name') {
                  resp.push(
                    `// @${t}:${k.replace('_', '-')}      ${js_env ? '[Dev] ' : ''}${v[type].message}`
                  );
                } else {
                  resp.push(`// @${t}:${k.replace('_', '-')}      ${v[type].message}`);
                }
              }
            }
          }
          return resp;
        };
        const getData = () => {
          for (const [k, v] of Object.entries(userJS)) {
            if (typeof v !== 'string') {
              continue;
            }
            if (k === 'name') {
              addTo(
                k,
                `// @${k}         ${js_env ? '[Dev] ' : ''}${v}`,
                ...compileLanguage('userjs_name')
              );
            } else if (k === 'description') {
              addTo(k, `// @${k}  ${v}`, ...compileLanguage('userjs_description'));
            } else if (k === 'author') {
              addTo(k, `// @${k}       ${v}`);
            } else if (k === 'icon') {
              const buff = new Buffer.from(fs.readFileSync(v));
              const base64data = buff.toString('base64');
              if (v.endsWith('.png')) {
                addTo(k, `// @${k}         data:image/png;base64,${base64data}`);
              } else if (v.endsWith('.svg')) {
                addTo(k, `// @${k}         data:image/svg+xml;base64,${base64data}`);
              }
            } else if (k === 'downloadURL') {
              addTo(k, `// @downloadURL  ${v}`);
            } else if (k === 'updateURL') {
              addTo(k, `// @updateURL    ${v}`);
            } else if (k === 'url') {
              addTo(k, `// @downloadURL  ${v}`, `// @updateURL    ${v}`);
            } else if (k === 'version') {
              addTo(k, `// @${k}      ${js_env ? +new Date() : v}`);
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
          for (const [k, v] of Object.entries(jsonData)) {
            if (typeof v !== 'string') {
              continue;
            }
            if (!filterData.includes(k)) {
              continue;
            }
            if (dataMap.has(k)) {
              continue;
            }
            if (k === 'license') {
              addTo(k, `// @${k}      ${v}`);
            }
          }
          if (userJS.metadata) {
            addTo('metaData', compileMetadata());
          }
          return [...dataMap.values()].flat().join('\n');
        };
        const userJSHeader = `// ==UserScript==\n${getData()}\n// ==/UserScript==`;
        const headerFile = await canAccess(build.source.head);
        const mainFile = await canAccess(build.source.body);
        const nanoCFG = {
          metadata: userJSHeader,
          languageList: transformLanguages(),
          code: mainFile
        };
        if (build.source.extras) {
          for (const [k, v] of Object.entries(build.source.extras)) {
            const extraFile = await canAccess(v);
            if (typeof extraFile === 'string') {
              nanoCFG[k] = extraFile;
            }
          }
        }
        const outFile = `${build.paths[dp].dir}/${build.paths[dp].fileName}.user.js`;
        await writeUserJS(outFile, nano(headerFile, nanoCFG));
        log('UserJS Build:', {
          path: outFile,
          time: toTime()
        });
        if (!js_env) {
          const outMeta = `${build.paths[dp].dir}/${build.paths[dp].fileName}.meta.js`;
          await writeUserJS(outMeta, nano(metaStr, { metadata: userJSHeader }));
          log('UserJS Metadata:', {
            path: outMeta,
            time: toTime()
          });
        }
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
})();
