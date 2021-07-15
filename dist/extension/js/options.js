/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./options.js ***!
  \********************/
const brws = typeof browser === "undefined" ? chrome : browser;
brws.storage.local.get(storedConfig => {
  $form = document.querySelector("form") ?? console.log(`[UserJS] can't find ${target}`), config = {
    theme: "dark",
    sleazyfork: false,
    ...storedConfig
  };

  for (let prop in config) {
    prop in $form.elements ? $form.elements[prop].type == "checkbox" ? $form.elements[prop].checked = config[prop] : $form.elements[prop].value = config[prop] : false;
  }

  $form.addEventListener("change", e => {
    let $el =
    /** @type {HTMLInputElement} */
    e.target;
    $el.type == "checkbox" ? config[$el.name] = $el.checked : config[$el.name] = $el.value;
    brws.storage.local.set(config);
  });
});
/******/ })()
;
//# sourceMappingURL=options.js.map