let babel = require("babel-core"),
  fs = require("fs"),
  tpl = fs.readFileSync("./userscript/tpl.js").toString(),
  code = babel.transformFileSync("./userscript/main.js").code;

var nano = function(template, data) {
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    let keys = key.split("."),
      v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
};

var renderOut = function(outFile, ljs) {
  var ujs = nano(tpl, {
    ljs: ljs,
    code: code,
    time: +new Date(),
  });

  fs.writeFile(outFile, ujs, function(err) {
    if (err) {
      return console.log(err);
    }
    return console.log("build-out:" + outFile);
  });
};

var time = +new Date();

let ljs = `// @require     https://cdn.jsdelivr.net/gh/jae-jae/l.js/userjs/l.userjs.min.js
// @require     https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.js?_=${time}`,
	ljs_GF = `// @require      https://greasyfork.org/scripts/23419-l-js/code/ljs.js
// @require      https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/dist/ui.gf.js`;


renderOut("./dist/magic-userjs.user.js", ljs);
//greasyfork version
renderOut("./dist/magic-userjs.gf.user.js", ljs_GF);
