'use strict';

let api = webext.storage.local;

/** @type {{ [prefix: string]: StorageArea }} */
export const storageByPrefix = {};

/**
 * @param {function} [fnValue] - (value, newKey, obj) => newValue
 * @param {function} [fnKey] - (key, val, obj) => newKey (if newKey is falsy the key is skipped)
 * @param {Object} [thisObj] - passed as `this` to both functions
 * @return {Object}
 */
function mapEntry(fnValue, fnKey, thisObj) {
  const res = {};
  for (let key of Object.keys(this)) {
    const val = this[key];
    if (!fnKey || (key = thisObj[fnKey](key, val, this))) {
      res[key] = fnValue ? thisObj[fnValue](val, key, this) : val;
    }
  }
  return res;
}

class StorageArea {
  constructor(name, prefix) {
    storageByPrefix[prefix] = this;
    this.name = name;
    this.prefix = prefix;
  }

  /** @return {string} */
  toKey(id) {
    return this.prefix + id;
  }

  /** @return {string} */
  toId(key) {
    return key.startsWith(this.prefix) ? key.slice(this.prefix.length) : '';
  }

  /**
   * @param {string|number} id
   * @return {Promise<?>}
   */
  async getOne(id) {
    const key = this.toKey(id);
    return (await api.get([key]))[key];
  }

  /**
   * @param {?string[]} [ids] - if null/absent, the entire storage is returned
   * @param {function(val:?,key:string):?} [transform]
   * @return {Promise<?>} - single value or object of id:value
   */
  async getMulti(ids, transform) {
    const keys = ids?.map(this.toKey, this);
    const data = await api.get(keys);
    return transform || this.prefix
      ? mapEntry.call(data, transform, 'toId', this)
      : data;
  }

  /**
   * @param {string|number|Array<string|number>} id
   * @return {Promise<void>}
   */
  async remove(id) {
    const keys = (Array.isArray(id) ? id : [id]).filter(Boolean).map(this.toKey, this);
    if (keys.length) await api.remove(keys);
  }

  async setOne(id, value) {
    if (id) return this.set({ [id]: value });
  }

  /**
   * @param {Object} data
   * @return {Promise<Object>} same object
   */
  async set(data) {
    await api.set(this.prefix ? mapEntry.call(data, null, 'toKey', this) : data);
    return data;
  }
}

const storage = {
  get api() {
    return api;
  },
  set api(val) {
    api = val;
  },
  /** @return {?StorageArea} */
  forKey: key => storageByPrefix[/^\w+:|$/.exec(key)[0]],
  base: new StorageArea('base', ''),
  config: new StorageArea('config', 'cfg:'),
  cache: new StorageArea('cache', 'cac:'),
};

export default storage;
