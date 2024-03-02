'use strict';

//#region Console
const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cUserJS%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cUserJS%c] %cERROR',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  let alertBrowser = false;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex) {
      alertBrowser = true;
      break;
    }
  }
  if (/Mobile|Tablet/.test(navigator.userAgent) || alertBrowser) {
    alert(...msg);
  }
};
const info = (...msg) => {
  console.info(
    '[%cUserJS%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};
const log = (...msg) => {
  console.log(
    '[%cUserJS%c] %cLOG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(219, 160, 73);',
    ...msg
  );
};
//#endregion

export { dbg, err, info, log };
