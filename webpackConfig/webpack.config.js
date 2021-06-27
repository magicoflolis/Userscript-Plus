const webpack = require("webpack"),
  path = require("path"),
  root = path.resolve(__dirname, ".."),
  { VueLoaderPlugin } = require('vue-loader'),
  config = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(root, "src"),
    entry: {
      popup: "./main.js",
      options: "./options.js"
    },
    output: {
      path: path.resolve(root, "dist/extension/js"),
      filename: "[name].js",
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
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new VueLoaderPlugin(),
    ],
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
  };

module.exports = (env, argv) => {
  //(argv.mode === "development") ? ((config.mode = "development")) : false;
  (argv.mode === "production") ? ((config.mode = "production")) : false;
  console.log(config.mode);
  return config;
};
