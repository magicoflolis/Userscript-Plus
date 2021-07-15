"use strict";
const brws = typeof browser === "undefined" ? chrome : browser,
qs = element => {
  return document.querySelector(element);
},
sleazy = () => {
  let otherSite = /greasyfork\.org/.test(location.hostname) ? "sleazyfork" : "greasyfork";
  return qs('span.sign-in-link') ? /scripts\/\d+/.test(location.href) ? !qs("#script-info") && (otherSite == "greasyfork" || qs("div.width-constraint>section>p>a")) ? location.href = location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/, "//$1" + otherSite + "\.org") : false : false : false;
};

let config = {
  sleazyfork: false,
  theme: "dark"
};

try {
  brws.storage.local.get((storedConfig) => {
    Object.assign(config, storedConfig);
    config.sleazyfork ? sleazy() : false;
    config.theme === "light" ? console.log("WIP") : false;
  });
} catch (error) {
  console.log(error);
}
