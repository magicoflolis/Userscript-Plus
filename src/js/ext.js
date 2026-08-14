'use strict';

const globalScope = globalThis;
const browserApi = globalScope.browser;
const chromeApi = globalScope.chrome;
const hasRuntime = (api) => api && typeof api === 'object' && api.runtime;

export const webext = hasRuntime(browserApi) ? browserApi : chromeApi;

if (!webext?.runtime) {
  throw new Error('WebExtension runtime API is unavailable');
}

export const runtime = webext.runtime;

/*******************************************************************************/

// The extension's service worker can be evicted at any time, so when we
// send a message, we try a few more times when the message fails to be sent.

export function sendMessage(msg, { attempts = 5, delay = 200 } = {}) {
  return new Promise((resolve, reject) => {
    let remainingAttempts = attempts;
    const send = () => {
      Promise.resolve(runtime.sendMessage(msg))
        .then(resolve)
        .catch((reason) => {
          remainingAttempts -= 1;
          if (remainingAttempts <= 0) {
            reject(reason);
          } else {
            setTimeout(send, delay);
          }
        });
    };
    send();
  });
}

/*******************************************************************************/
