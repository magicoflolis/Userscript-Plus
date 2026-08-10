'use strict';
import { isEmpty, isFN } from './util.js';

export class NetworkError extends Error {
  constructor(response, url) {
    super(`${response.status} ${response.statusText || 'Request failed'}: ${url}`);
    this.name = 'NetworkError';
    this.response = response;
    this.status = response.status;
    this.url = url;
  }
}

/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data = {}) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }

    const requestUrl = String(url);
    const params = {
      method: this.bscStr(method, false),
      ...Object.assign({}, data)
    };
    const normalizedResponseType = this.bscStr(responseType);
    const response = await fetch(requestUrl, params);

    if (!response.ok) {
      throw new NetworkError(response, requestUrl);
    }

    const read = (reader = 'text') => {
      return isFN(response[reader]) ? response[reader]() : response;
    };

    if (normalizedResponseType.match(/buffer/)) {
      return read('arrayBuffer');
    }
    if (normalizedResponseType.match(/json/)) {
      return read('json');
    }
    if (normalizedResponseType.match(/text/)) {
      return read('text');
    }
    if (normalizedResponseType.match(/blob/)) {
      return read('blob');
    }
    if (normalizedResponseType.match(/formdata/)) {
      return read('formData');
    }
    if (normalizedResponseType.match(/clone/)) {
      return read('clone');
    }
    if (normalizedResponseType.match(/document/)) {
      const domParser = new DOMParser();
      return domParser.parseFromString(await read('text'), 'text/html');
    }

    return response;
  },
  format(bytes, decimals = 2) {
    if (!Number.isFinite(bytes) || bytes <= 0) return `0 ${this.sizes[0]}`;
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
