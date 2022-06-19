"use strict";
const brws = (typeof browser=="undefined"?chrome:browser),
win = self ?? window,
doc = win.document,
err = (...error) => {
  console.error('[%cUserJS%c] %cERROR', 'color: rgb(237,63,20);', '', 'color: rgb(249, 24, 128);', ...error);
},
info = (...message) =>{
  console.info('[%cUserJS%c] %cINF', 'color: rgb(237,63,20);', '', 'color: rgb(0, 186, 124);', ...message);
},
getConfig = async (n) => {
  let sender = brws.runtime.sendMessage({
    name: n
  }),
  response = await sender.then(r => r.value);
  return response;
},
qs = element => doc.querySelector(element);

getConfig("sleazyfork").then((r) => {
  if(r) {
    let otherSite = /greasyfork\.org/.test(location.hostname) ? "sleazyfork" : "greasyfork";
    return qs('span.sign-in-link') ? /scripts\/\d+/.test(location.href) ? !qs("#script-info") && (otherSite == "greasyfork" || qs("div.width-constraint>section>p>a")) ? location.href = location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/, "//$1" + otherSite + "\.org") : false : false : false;
  }
});
getConfig("theme").then((r) => {
  r === "light" ? info("WIP") : false;
});
