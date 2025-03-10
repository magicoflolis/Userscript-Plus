'use strict';

// #region i18n
const i18n =
  self.browser instanceof Object && self.browser instanceof Element === false
    ? self.browser.i18n
    : self.chrome.i18n;

const i18n$ = (...args) => {
  return i18n.getMessage(...args);
};
/**
 * @param {string | Date | number} str
 */
const toDate = (str = '') => {
  return new Intl.DateTimeFormat(navigator.language).format(
    typeof str === 'string' ? new Date(str) : str
  );
};
/**
 * @param {number | bigint} number
 */
const toNumber = (number) => {
  return new Intl.NumberFormat(navigator.language).format(number);
};
// #endregion

const isBackgroundProcess = document && document.title === 'Magic UserJS+ Background Page';

if (isBackgroundProcess !== true) {
  // Helper to deal with the i18n'ing of HTML files.
  i18n.render = function (context) {
    const docu = document;
    const root = context || docu;
    for (const elem of root.querySelectorAll('[data-i18n]')) {
      const text = i18n$(elem.getAttribute('data-i18n'));
      if (!text) {
        continue;
      }
      elem.textContent = text;
    }
    for (const elem of root.querySelectorAll('[placeholder]')) {
      const text = i18n$(elem.getAttribute('placeholder'));
      if (text === '') {
        continue;
      }
      elem.setAttribute('placeholder', text);
    }
  };
  i18n.render();
}
const language = { i18n$, toDate, toNumber };

export { i18n, i18n$, toDate, toNumber, language };
