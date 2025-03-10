/* eslint-env node */
'use strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const access = fs.promises.access;
const constants = fs.promises.constants;
const readFile = fs.promises.readFile;
const file = (dir) => path.resolve(path.resolve(__dirname, '..'), dir);
const globOptions = {
  dot: true,
  gitignore: true,
  ignore: ['**/*.txt']
};
/**
 * Object is `null` or `undefined`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
const canAccess = (filePath, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    access(filePath, constants.R_OK | constants.W_OK).then((testAccess) => {
      if (isNull(testAccess)) {
        resolve(readFile(filePath, encoding).then((data) => data.toString()));
      }
      reject(new Error(`Cannot access provided filePath: ${filePath}`));
    });
  });
};
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  return JSON.parse(testAccess);
};
export default async (env, args) => {
  if (!env) {
    throw new Error('--env flag required')
  }
  if (!env.brws) {
    throw new Error('--env brws=<Web Browser> flag required')
  }
  const brws = env.brws;
  const webExtDir = `build/${brws}`;
  const webExtSrc = 'src';
  const plugins = [
    new CopyPlugin({
      patterns: [
        {
          from: file(`${webExtSrc}/manifest/${brws}.json`),
          to: file(`${webExtDir}/manifest.json`),
          async transform(content) {
            const { version, author, homepage: homepage_url } = await fileToJSON('./package.json');
            const manifest = JSON.parse(content);
            return JSON.stringify(
              Object.assign(manifest, {
                version,
                author,
                homepage_url
              }),
              null,
              ' '
            );
          }
        },
        {
          from: file(`${webExtSrc}/_locales`),
          to: file(`${webExtDir}/_locales`),
          globOptions
        },
        {
          from: file(`${webExtSrc}/html`),
          to: file(`${webExtDir}/[name][ext]`),
          globOptions
        },
        {
          from: file(`${webExtSrc}/img`),
          to: file(`${webExtDir}/img`),
          globOptions
        },
        {
          from: file(`${webExtSrc}/webfonts`),
          to: file(`${webExtDir}/webfonts`),
          globOptions
        },
        // {
        //   from: file(`${webExtSrc}/web_accessible_resources`),
        //   to: file(`${webExtDir}/web_accessible_resources`),
        //   globOptions
        // },
        {
          from: file(`${webExtSrc}/js`),
          to: file(`${webExtDir}/js`),
          globOptions
          // force: true,
        }
      ]
    })
  ];
  /**
   * @type { import('@types/webpack').Configuration }
   */
  const Config = {
    context: file(webExtSrc),
    entry: {
      mu: './js/mu.js'
    },
    output: {
      path: file(`${webExtDir}/js`),
      clean: true,
      filename: '[name].js',
      publicPath: `/${webExtDir}`
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'swc-loader',
            options: {
              sync: true,
              jsc: {
                parser: {
                  syntax: 'ecmascript'
                },
                target: 'es2020'
              },
              module: {
                type: 'es6'
              }
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    plugins,
    node: false,
    performance: {
      hints: false
    }
  };
  /**
   * @type { import('@types/webpack').Configuration }
   */
  const Production = {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false,
          parallel: true
        })
      ]
    }
  };
  /**
   * @type { import('@types/webpack').Configuration }
   */
  const Development = {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    watch: true,
    watchOptions: {
      ignored: /(node_modules|bower_components)/
    }
  };
  switch (args.mode) {
    case 'development':
      return merge(Config, Development);
    case 'production':
      return merge(Config, Production);
    default:
      throw new Error('No matching configuration was found!');
  }
};
