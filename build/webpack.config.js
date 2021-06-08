const { VueLoaderPlugin } = require('vue-loader'),
CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    ui: "./src/main.js",
  },
  output: {
    publicPath: '',
    path: __dirname + "/../dist",
    filename: "[name].js",
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
        use: ["vue-style-loader", "css-loader"],
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
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/ui.html",
          to: __dirname + "/../dist",
        },
      ],
    }),
  ],
};