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
    method = Network.bscStr(method, false);
    responseType = Network.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    return await new Promise((resolve, reject) => {
      /**
       * @param { Response } response
       * @returns { Response | Document }
       */
      const fetchResp = (response_1) => {
        if (!response_1.ok) reject(response_1);
        const check = (str_2 = 'text') => {
          return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
        };
        if (responseType.match(/buffer/i)) {
          resolve(check('arrayBuffer'));
        } else if (responseType.match(/json/i)) {
          resolve(check('json'));
        } else if (responseType.match(/text/i)) {
          resolve(check('text'));
        } else if (responseType.match(/blob/i)) {
          resolve(check('blob'));
        } else if (responseType.match(/formdata/i)) {
          resolve(check('formData'));
        } else if (responseType.match(/clone/i)) {
          resolve(check('clone'));
        } else if (responseType.match(/document/i) && isFN(response_1.text)) {
          const domParser = new DOMParser();
          const respTxt = response_1.text();
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
      };
      fetch(url, params).then(fetchResp).catch(reject);
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${Network.sizes[i]}`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  }
};

export default Network;