[[metadata]]
(() => {
'use strict';
/******************************************************************************/
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
if (inIframe()) {
  return;
}
let userjs = self.userjs;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [Source Code](https://github.com/gorhill/uBlock/blob/master/platform/common/vapi.js)
 */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS)) {
  return;
}
const createPolicy = () => {
  // Native implementation exists
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (string) => string
    });
  }
};
createPolicy();
/**
 * Uncompressed locales + compiler
 *
 * [_locales](https://github.com/magicoflolis/Userscript-Plus/tree/master/src/_locales)
 *
 * [languageLoader.js](https://github.com/magicoflolis/Userscript-Plus/blob/master/tools/languageLoader.js)
 */
const translations = [[languageList]];
/**
 * To compile this CSS `pnpm run build:Sass`
 *
 * [Uncompiled Cascading Style Sheet](https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass)
 */
const main_css = `[[mainCSS]]`;
/******************************************************************************/
[[code]]
})();
