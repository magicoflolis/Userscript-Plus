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
  const brws = env.brws;
  const webExtDir = `tests/${brws}`;
  const webExtSrc = 'src';
  const compileSass = async () => {
    const rootPath = file('tests/compiled');
    const dir = await fs.promises.opendir(rootPath);
    for await (const dirent of dir) {
      if (!dirent.isFile()) continue;
      const result = await canAccess(path.join(rootPath, dirent.name));
      await fs.promises.writeFile(path.join(file(webExtDir), 'css', dirent.name), result, 'utf8');
    }
  };
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
  const commonConfig = {
    context: file(webExtSrc),
    entry: {
      start: './js/start.js'
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
  const productionConfig = {
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
  const developmentConfig = {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    watch: true,
    watchOptions: {
      // poll: 1000,
      // aggregateTimeout: 500,
      ignored: /(node_modules|bower_components)/
    }
  };
  await compileSass();
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
