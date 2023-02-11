'use strict';
/**
 * Prefix for document.querySelectorAll()
 * @param {Object} element - Elements for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelectorAll(element)
 */
const qsA = (element, root) => {
    root = root ?? document;
    return root.querySelectorAll(element);
  },
  /**
   * Prefix for document.querySelector()
   * @param {Object} element - Element for query selection
   * @param {Object} [root=document] - Root selector Element
   * @returns {Object} Returns root.querySelector(element)
   */
  qs = (element, root) => {
    root = root ?? document;
    return root.querySelector(element);
  },
  /**
   * Prefix for document.querySelector() w/ Promise
   * @param {Object} element - Element for query selection
   * @param {Object} [root=document] - Root selector Element
   * @returns {Object} Returns root.querySelector(element)
   */
  query = async (element, root) => {
    root = root ?? document ?? document.body;
    while (
      Object.is(root.querySelector(element), null) ||
      Object.is(root.querySelector(element), undefined)
    ) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return root.querySelector(element);
  };

export { qs, qsA, query };
