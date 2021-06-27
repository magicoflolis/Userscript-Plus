const webpack = require("webpack"),
  path = require("path"),
  root = path.resolve(__dirname, ".."),
  { VueLoaderPlugin } = require('vue-loader'),
  CopyPlugin = require("copy-webpack-plugin"),
  babel = require("@babel/core"),
  fs = require("fs"),
  config = {
    mode: "production",
    devtool: "source-map",
    context: path.resolve(root, "src/userscript"),
    entry: {
      ui: { import: './main.js', filename: '[name].js' },
      gf: { import: './main.js', filename: 'ui.[name].js' },
    },
    resolve: {
      extensions: [".js", ".vue"],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: "url-loader",
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new VueLoaderPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./ui.html",
            to: path.resolve(root, "dist"),
          },
        ],
      }),
    ],
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
  };

  let tpl = fs.readFileSync("./webpackConfig/tpl.js").toString(),
  code = babel.transformFileSync("./webpackConfig/main.js").code,
  nano = function(template, data) {
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    let keys = key.split("."),
      v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
},
renderOut = (outFile, ljs) => {
  let ujs = nano(tpl, {
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
},
time = +new Date(),
ljs_dev = `// @require     https://cdn.jsdelivr.net/gh/jae-jae/l.js/userjs/l.userjs.min.js
// @require     https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   http://localhost:8080/ui.js?_=${time}`,
ljs = `// @require     https://cdn.jsdelivr.net/gh/jae-jae/l.js/userjs/l.userjs.min.js
// @require     https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.js?_=${time}`,
ljs_GF = `// @require      https://greasyfork.org/scripts/23419-l-js/code/ljs.js
// @require      https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.gf.js?_=${time}`;

// renderOut("./dist/magic-userjs.user.js", ljs)
// //greasyfork version
// renderOut("./dist/magic-userjs.gf.user.js", ljs_GF)

module.exports = (env, argv) => {
  (argv.mode !== "development") ? (config.mode = "production") : (config.mode = "development", ljs = ljs_dev);
  console.log(config.mode);
  renderOut("./dist/magic-userjs.user.js", ljs)
  //greasyfork version
  renderOut("./dist/magic-userjs.gf.user.js", ljs_GF)
  return config;
};

// module.exports = (env, argv) => {
//   (argv.mode === "development") ? ((config.mode = "development")) : false;
//   //(argv.mode === "production") ? ((config.mode = "production")) : false;
//   console.log(config.mode);
//   return config;
// };
