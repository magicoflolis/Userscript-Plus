const webpack = require("webpack"),
  path = require("path"),
  root = path.resolve(__dirname, ".."),
  { VueLoaderPlugin } = require('vue-loader'),
  CopyPlugin = require("copy-webpack-plugin"),
  config = {
    mode: "production",
    devtool: "source-map",
    context: path.resolve(root, "src/userscript"),
    entry: {
      ui: "./main.js"
    },
    output: {
      path: path.resolve(root, "dist"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".vue"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: "url-loader",
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
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

module.exports = (env, argv) => {
  (argv.mode === "development") ? ((config.mode = "development")) : false;
  // (argv.mode === "production") ? ((config.mode = "production")) : false;
  console.log(config.mode);
  return config;
};
