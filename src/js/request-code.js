'use strict';

import Network from './network.js';
import { intersect, isNull, isEmpty, normalizeTarget } from './util.js';
import { language } from './language.js';

const META_START_COMMENT = '// ==UserScript==';
const META_END_COMMENT = '// ==/UserScript==';
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
/**
 * @param { string } code
 */
const get_meta_block = (code) => {
  if (isEmpty(code)) {
    return null;
  }
  const start_block = code.indexOf(META_START_COMMENT);
  if (isNull(start_block)) {
    return null;
  }
  const end_block = code.indexOf(META_END_COMMENT, start_block);
  if (isNull(end_block)) {
    return null;
  }
  return code.substring(start_block + META_START_COMMENT.length, end_block);
};
/**
 * @param { string } code
 */
const parse_meta = (code) => {
  if (isEmpty(code)) {
    return null;
  }
  const meta = {};
  const meta_block = get_meta_block(code);
  const meta_block_map = new Map();
  for (const meta_line of meta_block.split('\n')) {
    const meta_match = meta_line.match(/\/\/\s+@([a-zA-Z:-]+)\s+(.*)/);
    if (isNull(meta_match)) {
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
  return meta;
};
/**
 * @template { string } S
 * @param { S } code
 * @returns { S[] }
 */
const calculate_applies_to_names = (code) => {
  if (isEmpty(code)) {
    return null;
  }
  const meta = parse_meta(code);
  let patterns = [];
  for (const [k, v] of Object.entries(meta)) {
    if (/include|match/.test(k)) {
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
  if (intersect(patterns, APPLIES_TO_ALL_PATTERNS)) {
    return [];
  }
  const name_set = new Set();
  const addObj = (obj) => {
    if (name_set.has(obj)) {
      return;
    }
    name_set.add(obj);
  };
  for (let p of patterns) {
    try {
      const original_pattern = p;
      let pre_wildcards = [];
      if (p.match(/^\/(.*)\/$/)) {
        pre_wildcards = [p];
      } else {
        let m = p.match(/^\*(https?:.*)/i);
        if (!isNull(m)) {
          p = m[1];
        }
        p = p
          .replace(/^\*:/i, 'http:')
          .replace(/^\*\/\//i, 'http://')
          .replace(/^http\*:/i, 'http:')
          .replace(/^(https?):([^/])/i, '$1://$2');
        m = p.match(/^([a-z]+:\/\/)\*\.?([a-z0-9-]+(?:.[a-z0-9-]+)+.*)/i);
        if (!isNull(m)) {
          p = m[1] + m[2];
        }
        m = p.match(/^\*\.?([a-z0-9-]+\.[a-z0-9-]+.*)/i);
        if (!isNull(m)) {
          p = `http://${m[1]}`;
        }
        m = p.match(/^http\*(?:\/\/)?\.?((?:[a-z0-9-]+)(?:\.[a-z0-9-]+)+.*)/i);
        if (!isNull(m)) {
          p = `http://${m[1]}`;
        }
        m = p.match(/^([a-z]+:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)*\.))\*(.*)/);
        if (!isNull(m)) {
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
          const uri = new URL(pre_wildcard);
          if (isNull(uri.host)) {
            addObj({ text: original_pattern, domain: false, tld_extra: false });
          } else if (!uri.host.includes('.') && uri.host.includes('*')) {
            addObj({ text: original_pattern, domain: false, tld_extra: false });
          } else if (uri.host.endsWith('.tld')) {
            for (let i = 0; i < TLD_EXPANSION.length; i++) {
              const tld = TLD_EXPANSION[i];
              addObj({
                text: uri.host.replace(/tld$/i, tld),
                domain: true,
                tld_extra: i != 0
              });
            }
          } else if (uri.host.endsWith('.')) {
            addObj({
              text: uri.host.slice(0, -1),
              domain: true,
              tld_extra: false
            });
          } else {
            addObj({
              text: uri.host,
              domain: true,
              tld_extra: false
            });
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          addObj({ text: original_pattern, domain: false, tld_extra: false });
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  return [...name_set];
};
const reqCode = async (obj = {}, translate = false) => {
  if (obj.code_data) {
    return obj.code_data;
  }
  /** @type { string } */
  const code = await Network.req(obj.code_url, 'GET', 'text');
  if (typeof code !== 'string') {
    return;
  }
  Object.assign(obj, {
    code_data: code,
    code_meta: {},
    code_size: [Network.format(code.length)],
    code_match: [],
    code_grant: [],
    antifeatures: []
  });
  const grantSet = new Set();
  const afSet = new Set();
  const meta = parse_meta(code);
  const applies_to_names = calculate_applies_to_names(code);

  if (translate) {
    for (const lng of language.cache) {
      if (meta[`name:${lng}`]) {
        Object.assign(obj, {
          name: meta[`name:${lng}`],
          translated: true
        });
      }
      if (meta[`description:${lng}`]) {
        Object.assign(obj, {
          description: meta[`description:${lng}`],
          translated: true
        });
      }
    }
  }

  for (const [key, value] of Object.entries(meta)) {
    if (/grant/.test(key)) {
      for (const v of normalizeTarget(value, false)) {
        if (grantSet.has(v)) {
          continue;
        }
        grantSet.add(v);
      }
    } else if (/antifeature/.test(key)) {
      for (const v of normalizeTarget(value, false)) {
        if (afSet.has(v)) {
          continue;
        }
        afSet.add(v);
      }
    }
  }
  Object.assign(obj, {
    code_meta: meta,
    code_match: applies_to_names,
    code_grant: [...grantSet],
    antifeatures: [...afSet]
  });
  return code;
};

export {
  calculate_applies_to_names,
  get_meta_block,
  parse_meta,
  reqCode
}