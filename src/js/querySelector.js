'use strict';

const doc = document;
/**
 * Object is Null
 * @param {Object} obj - Object
 * @returns {boolean} Returns if statement true or false
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * setTimeout w/ Promise
 * @param {number} ms - Timeout in milliseconds (ms)
 * @returns {Promise} Promise object
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Prefix for document.querySelectorAll()
 * @param {Object} element - Elements for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelectorAll(element)
 */
const qsA = (element, root) => {
  root = (root || doc || doc.body);
  return root.querySelectorAll(element);
},
/**
 * Prefix for document.querySelector()
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
qs = (element, root) => {
  root = (root || doc || doc.body);
  return root.querySelector(element);
},
/**
 * Prefix for document.querySelector() w/ Promise
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
query = (element, root) => {
  root = (root || document || document.body);
  if(isNull(root.querySelector(element))) {
    const loop = async () => {
      while(isNull(root.querySelector(element))) {
        await new Promise(resolve=>requestAnimationFrame(resolve))
      };
      return root.querySelector(element);
    };
    return Promise.any([
      loop(),
      delay(5000).then(() => Promise.reject(new Error('Unable to locate element'))),
    ]);
  };
  return Promise.resolve(root.querySelector(element));
};

export { qs, qsA, query };
