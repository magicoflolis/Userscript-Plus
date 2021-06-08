const { VueLoaderPlugin } = require('vue-loader'),
  config = {
    mode: "production",
    entry: {
      ui: "./src/main.js",
    },
    output: {
      path: __dirname + "/extension/js",
      filename: "popup.js",
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
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
    plugins: [
        new VueLoaderPlugin()
    ]
  };

module.exports = config;