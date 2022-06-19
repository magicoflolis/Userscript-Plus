/* eslint-env node */
const {merge} = require('webpack-merge'),
{ VueLoaderPlugin } = require('vue-loader'),
CopyPlugin = require('copy-webpack-plugin'),
path = require("path"),
TerserPlugin = require("terser-webpack-plugin"),
webpack = require("webpack"),
root = path.resolve(__dirname, ".."),
brws = process.env.NODE_ENV,
plugins = [
  new VueLoaderPlugin(),
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(root,`src/manifest/${brws}.json`),
        to: path.resolve(root,`tests/${brws}/manifest.json`),
        transform(content) {
          const { version, author, homepage: homepage_url } = require('../package.json')
          const manifest = JSON.parse(content)
          return JSON.stringify(
            Object.assign(manifest, { version, author, homepage_url }),
          )
        },
      },
      {
        from: path.resolve(root, "src/locales"),
        to: path.resolve(root,`tests/${brws}/_locales`),
      },
      {
        from: path.resolve(root, "src/html"),
        to: path.resolve(root,`tests/${brws}`),
      },
      {
        from: path.resolve(root, "tests/compiled"),
        to: path.resolve(root,`tests/${brws}/css`),
      },
      {
        from: path.resolve(root, "src/img"),
        to: path.resolve(root, `tests/${brws}/img`),
      },
      {
        from: path.resolve(root, "src/web_accessible_resources"),
        to: path.resolve(root, `tests/${brws}/web_accessible_resources`),
        force: true,
      },
      {
        from: path.resolve(root, "src/js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
    ],
  }),
  // new webpackEnv(),
],
commonConfig = {
  context: path.resolve(root, "src"),
  entry: {
    start: "./js/start.js",
    popup: "./vue/main.js",
  },
  output: {
    path: path.resolve(root,`tests/${brws}/js`),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "swc-loader",
          options: {
            // This makes swc-loader invoke swc synchronously.
            sync: true,
            jsc: {
              parser: {
                syntax: "ecmascript"
              },
              target: "es2020",
            },
            module: {
              type: "es6",
            },
          },
        },
        exclude: file => (
          /(node_modules|bower_components)/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".vue"]
  },
  plugins,
},
productionConfig = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
      parallel: true,
    })],
  },
},
developmentConfig = {
  mode: "development",
  devtool: 'source-map',
  optimization: {
    minimize: false,
    minimizer: [
    new TerserPlugin({
      test: /\.m?js$/,
      // minify: TerserPlugin.swcMinify,
      terserOptions: {
        format: {
          comments: true,
        },
      },
      extractComments: true,
      parallel: true,
    })],
  },
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  },
};

module.exports = (env,args) => {
  // log(env)
  // log("Mode: " + args.mode);
  switch(args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
