/**
 * @author SessionLand
 * @namespace Webpack
 * @description Webpack
 */

import * as Path from "path";
import * as ServerLessWebpack from "serverless-webpack";
import * as NodeExternals from "webpack-node-externals";

const isLocal: boolean = ServerLessWebpack.lib.webpack.isLocal;
const entries: any = ServerLessWebpack.lib.entries;
const mappedEntries = Object.keys(entries).reduce((previous, key) => {
  return {
    ...previous,
    [key]: Path.join(__dirname, '..', entries[key]),
  }
}, {});

module.exports = {

  context: __dirname,
  mode: isLocal ? 'development' : 'production',
  entry: mappedEntries,
  devtool: isLocal ? 'cheap-module-eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: Path.join(__dirname, '..', '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [
    NodeExternals(),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            Path.resolve(__dirname, '..', 'node_modules'),
            Path.resolve(__dirname, '..', 'script'),
            Path.resolve(__dirname, '..', '.serverless'),
            Path.resolve(__dirname, '..', '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
};
