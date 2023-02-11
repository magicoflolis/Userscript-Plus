'use strict';

const dbg = (...msg) => {
  const dt = new Date(Date.now());
  return console.log('[%cAF%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}]`, ...msg);
},
err = (...msg) => console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...msg),
info = (...msg) => console.info('[%cUserJS%c] %cINF', 'color: rgb(29, 155, 240);', '', 'color: rgb(0, 186, 124);', ...msg),
log = (...msg) => console.log('[%cUserJS%c] %cDBG', 'color: rgb(29, 155, 240);', '', 'color: rgb(255, 212, 0);', ...msg);

export { dbg, err, info, log };
