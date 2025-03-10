'use strict';
import { isEmpty, isFN } from './util.js';

/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data = {}) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
    data = Object.assign({}, data);
    method = this.bscStr(method, false);
    responseType = this.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then((response_1) => {
          if (!response_1.ok) reject(response_1);
          const check = (str_2 = 'text') => {
            return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
          };
          if (responseType.match(/buffer/)) {
            resolve(check('arrayBuffer'));
          } else if (responseType.match(/json/)) {
            resolve(check('json'));
          } else if (responseType.match(/text/)) {
            resolve(check('text'));
          } else if (responseType.match(/blob/)) {
            resolve(check('blob'));
          } else if (responseType.match(/formdata/)) {
            resolve(check('formData'));
          } else if (responseType.match(/clone/)) {
            resolve(check('clone'));
          } else if (responseType.match(/document/)) {
            const respTxt = check('text');
            const domParser = new DOMParser();
            if (respTxt instanceof Promise) {
              respTxt.then((txt) => {
                const doc = domParser.parseFromString(txt, 'text/html');
                resolve(doc);
              });
            } else {
              const doc = domParser.parseFromString(respTxt, 'text/html');
              resolve(doc);
            }
          } else {
            resolve(response_1);
          }
        })
        .catch(reject);
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return `0 ${this.sizes[0]}`;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${this.sizes[i]}`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  }
};

export default Network;
