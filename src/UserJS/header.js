{{metadata}}
'use strict';
(() => {
let userjs = (self.userjs = {});
/** Skip text/plain documents */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS && window && window.self === window.top)) {
  return;
}
/**
 * To compile this CSS `pnpm run build:Sass`
 * @desc Link to uncompiled Cascading Style Sheet
 * @link https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass
 */
const main_css = `{{mainCSS}}`;
/**
 * Link to uncompressed locales + compiler
 * @link https://github.com/magicoflolis/Userscript-Plus/tree/master/src/_locales
 * @link https://github.com/magicoflolis/Userscript-Plus/blob/master/tools/languageLoader.js
 */
const languageList = {{languageList}};
{{code}}
})();