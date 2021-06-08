const path = require("path"),
webpack = require('webpack'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
{ VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: "production",
    entry: {
        ui:path.join(__dirname, "./src/main.js"),
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test:/\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            {
                from: './src/ui.html',
                to: 'ui.html'
            }
        ])
    ]
}

// let webpack = require('webpack'),
//     CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = {
//     entry: {
//         ui:"./src/main.js"
//     },
//     output: {
//         path: __dirname + '/../dist',
//         filename: "[name].js"
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader"
//             },
//             {
//                 test:/\.vue$/,
//                 loader: "vue-loader"
//             },
//             {
//                 test: /\.css$/,
//                 use: [ 'style-loader', 'css-loader' ]
//             },
//             {
//                 test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//                 loader: 'url-loader'
//             },
//             {
//                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//                 loader: 'url-loader'
//             }
//         ]
//     },
//     plugins: [
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new CopyWebpackPlugin([
//             {
//                 from: './src/ui.html',
//                 to: 'ui.html'
//             }
//         ])
//     ]
// }