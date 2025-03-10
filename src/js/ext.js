export const webext =
  self.browser instanceof Object && self.browser instanceof Element === false
    ? self.browser
    : self.chrome;
export const runtime = webext.runtime;

/******************************************************************************/

// The extension's service worker can be evicted at any time, so when we
// send a message, we try a few more times when the message fails to be sent.

export function sendMessage(msg) {
  return new Promise((resolve, reject) => {
    let i = 5;
    const send = () => {
      runtime
        .sendMessage(msg)
        .then((response) => {
          resolve(response);
        })
        .catch((reason) => {
          i -= 1;
          if (i <= 0) {
            reject(reason);
          } else {
            setTimeout(send, 200);
          }
        });
    };
    send();
  });
}

/******************************************************************************/
