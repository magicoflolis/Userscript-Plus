'use strict';

const i18n =
  self.browser instanceof Object && self.browser instanceof Element === false
    ? self.browser.i18n
    : self.chrome.i18n;

class i18nHandler {
  /**
   * @param {string | Date | number} str
   */
  static toDate(str = '') {
    return new Intl.DateTimeFormat(navigator.language).format(
      typeof str === 'string' ? new Date(str) : str
    );
  }
  /**
   * @param {number | bigint} number
   */
  static toNumber(number) {
    return new Intl.NumberFormat(navigator.language).format(number);
  }
  /**
   * @param {...string} args
   */
  static i18n$(...args) {
    return i18n.getMessage(...args);
  }
}

const { i18n$, toDate, toNumber } = i18nHandler;
const language = { i18n$, toDate, toNumber };

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

export { i18n, i18n$, language };
