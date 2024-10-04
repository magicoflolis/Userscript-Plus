/* eslint-disable prefer-const, no-unused-vars */
'use strict';

/** @type { import("../typings/WebExt.d.ts").webext } */
let webext = (self.webext = typeof browser == 'undefined' ? chrome : browser);
/** @type { import("../typings/WebExt.d.ts").userjs } */
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

void 0;