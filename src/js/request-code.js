'use strict';

import { err } from './logger.js';
import Network from './network.js';
import { isNull, isBlank, isEmpty, union } from './util.js';

const TLD_EXPANSION = ['com', 'net', 'org', 'de', 'co.uk'];
const APPLIES_TO_ALL_PATTERNS = [
  'http://*',
  'https://*',
  'http://*/*',
  'https://*/*',
  'http*://*',
  'http*://*/*',
  '*',
  '*://*',
  '*://*/*',
  'http*'
];
class ParseUserJS {
  /**
   * @type { string }
   */
  code;
  /**
   * @type { string }
   */
  data_meta_block;
  /**
   * @type { string }
   */
  data_code_block;
  /**
   * @type { { [meta: string]: string | string[] | { [resource: string]: string } } }
   */
  data_meta;
  /**
   * @type { {text: string;domain: boolean;tld_extra: boolean}[] }
   */
  data_names;
  constructor(code, isUserCSS) {
    this.isUserCSS = isUserCSS ?? false;
    this.META_START_COMMENT = this.isUserCSS ? '/* ==UserStyle==' : '// ==UserScript==';
    this.META_END_COMMENT = this.isUserCSS ? '==/UserStyle== */' : '// ==/UserScript==';
    if (code) {
      this.code = code;
      this.get_meta_block();
      this.get_code_block();
      this.parse_meta();
      this.calculate_applies_to_names();
    }
  }
  get_meta_block() {
    if (isEmpty(this.code)) {
      return null;
    }
    if (this.data_meta_block) {
      return this.data_meta_block;
    }
    const start_block = this.code.indexOf(this.META_START_COMMENT);
    if (isNull(start_block)) {
      return null;
    }
    const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
    if (isNull(end_block)) {
      return null;
    }
    const meta_block = this.code.substring(start_block + this.META_START_COMMENT.length, end_block);
    this.data_meta_block = meta_block;
    return this.data_meta_block;
  }
  get_code_block() {
    if (isEmpty(this.code)) {
      return null;
    }
    if (this.data_code_block) {
      return this.data_code_block;
    }
    const start_block = this.code.indexOf(this.META_START_COMMENT);
    if (isNull(start_block)) {
      return null;
    }
    const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
    if (isNull(end_block)) {
      return null;
    }
    const code_block = this.code.substring(
      end_block + this.META_END_COMMENT.length,
      this.code.length
    );
    this.data_code_block = code_block
      .split('\n')
      .filter((l) => !isEmpty(l))
      .join('\n');
    return this.data_code_block;
  }
  parse_meta() {
    if (isEmpty(this.code)) {
      return null;
    }
    if (this.data_meta) {
      return this.data_meta;
    }
    const meta = {};
    const meta_block_map = new Map();
    for (const meta_line of this.get_meta_block().split('\n')) {
      const meta_match = /\/\/\s+@([a-zA-Z:-]+)\s+(.*)/.exec(meta_line);
      if (!meta_match) {
        continue;
      }
      const key = meta_match[1].trim();
      const value = meta_match[2].trim();
      if (!meta_block_map.has(key)) {
        meta_block_map.set(key, []);
      }
      const meta_map = meta_block_map.get(key);
      meta_map.push(value);
      meta_block_map.set(key, meta_map);
    }
    for (const [key, value] of meta_block_map) {
      if (value.length > 1) {
        meta[key] = value;
      } else {
        meta[key] = value[0];
      }
    }
    this.data_meta = meta;
    return this.data_meta;
  }
  calculate_applies_to_names() {
    if (isEmpty(this.code)) {
      return null;
    }
    if (this.data_names) {
      return this.data_names;
    }
    let patterns = [];
    for (const [k, v] of Object.entries(this.parse_meta())) {
      if (/include|match/i.test(k)) {
        if (Array.isArray(v)) {
          patterns = patterns.concat(v);
        } else {
          patterns = patterns.concat([v]);
        }
      }
    }
    if (isEmpty(patterns)) {
      return [];
    }
    if (this.intersect(patterns, APPLIES_TO_ALL_PATTERNS)) {
      this.data_names = [
        {
          domain: false,
          text: 'All sites',
          tld_extra: false
        }
      ];
      return this.data_names;
    }
    this.data_names = ParseUserJS.getNames(patterns);
    return this.data_names;
  }
  intersect(a, ...arr) {
    return !isBlank([...new Set(a)].filter((v) => arr.every((b) => b.includes(v))));
  }
  static getNames(patterns = []) {
    const name_map = new Map();
    const addObj = (obj) => {
      if (name_map.has(obj.text)) {
        return;
      }
      name_map.set(obj.text, obj);
    };
    for (let p of patterns) {
      try {
        const original_pattern = p;
        let pre_wildcards = [];
        if (p.match(/^\/(.*)\/$/)) {
          pre_wildcards = [p];
        } else {
          let m = /^\*(https?:.*)/i.exec(p);
          if (m) {
            p = m[1];
          }
          p = p
            .replace(/^\*:/i, 'http:')
            .replace(/^\*\/\//i, 'http://')
            .replace(/^http\*:/i, 'http:')
            .replace(/^(https?):([^/])/i, '$1://$2');
          m = /^([a-z]+:\/\/)\*\.?([a-z0-9-]+(?:.[a-z0-9-]+)+.*)/i.exec(p);
          if (m) {
            p = m[1] + m[2];
          }
          m = /^\*\.?([a-z0-9-]+\.[a-z0-9-]+.*)/i.exec(p);
          if (m) {
            p = `http://${m[1]}`;
          }
          m = /^http\*(?:\/\/)?\.?((?:[a-z0-9-]+)(?:\.[a-z0-9-]+)+.*)/i.exec(p);
          if (m) {
            p = `http://${m[1]}`;
          }
          m = /^([a-z]+:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)*\.))\*(.*)/.exec(p);
          if (m) {
            if (m[2].match(/A([0-9]+\.){2,}z/)) {
              p = `${m[1]}tld${m[3]}`;
              pre_wildcards = [p.split('*')[0]];
            } else {
              pre_wildcards = [p];
            }
          } else {
            pre_wildcards = [p];
          }
        }
        for (const pre_wildcard of pre_wildcards) {
          try {
            const urlObj = new URL(pre_wildcard);
            const { host } = urlObj;
            if (isNull(host)) {
              addObj({ text: original_pattern, domain: false, tld_extra: false });
            } else if (!host.includes('.') && host.includes('*')) {
              addObj({ text: original_pattern, domain: false, tld_extra: false });
            } else if (host.endsWith('.tld')) {
              for (let i = 0; i < TLD_EXPANSION.length; i++) {
                const tld = TLD_EXPANSION[i];
                addObj({
                  text: host.replace(/tld$/i, tld),
                  domain: true,
                  tld_extra: i != 0
                });
              }
            } else if (host.endsWith('.')) {
              addObj({
                text: host.slice(0, -1),
                domain: true,
                tld_extra: false
              });
            } else {
              addObj({
                text: host,
                domain: true,
                tld_extra: false
              });
            }
            // eslint-disable-next-line no-unused-vars
          } catch (ex) {
            addObj({ text: original_pattern, domain: false, tld_extra: false });
          }
        }
      } catch (ex) {
        err(ex);
      }
    }
    return [...name_map.values()];
  }
  async request(code_url) {
    if (this.data_code_block) {
      return this;
    }
    /** @type { string } */
    const code = await Network.req(code_url, 'GET', 'text').catch(err);
    if (typeof code !== 'string') {
      return this;
    }
    this.isUserCSS = /\.user\.css$/.test(code_url);
    this.META_START_COMMENT = this.isUserCSS ? '/* ==UserStyle==' : '// ==UserScript==';
    this.META_END_COMMENT = this.isUserCSS ? '==/UserStyle== */' : '// ==/UserScript==';

    this.code = code;
    this.get_meta_block();
    this.get_code_block();
    this.parse_meta();
    this.calculate_applies_to_names();

    const { data_meta } = this;
    if (Array.isArray(data_meta.grant)) {
      data_meta.grant = union(data_meta.grant);
    }
    if (data_meta.resource) {
      const obj = {};
      if (typeof data_meta.resource === 'string') {
        const reg = /(.+)\s+(.+)/.exec(data_meta.resource);
        if (reg) {
          obj[reg[1].trim()] = reg[2];
        }
      } else {
        for (const r of data_meta.resource) {
          const reg = /(.+)\s+(http.+)/.exec(r);
          if (reg) {
            obj[reg[1].trim()] = reg[2];
          }
        }
      }
      data_meta.resource = obj;
    }
    Object.assign(this, {
      code_size: [Network.format(code.length)],
      meta: data_meta
    });

    return this;
  }
}

export { ParseUserJS };
