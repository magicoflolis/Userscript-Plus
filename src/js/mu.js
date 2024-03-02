'use strict';

// eslint-disable-next-line prefer-const, no-unused-vars
let webext = (self.webext = typeof browser == 'undefined' ? chrome : browser);
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