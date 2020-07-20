const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer) {
  return {
    entry: isServer
      ? { server: './src/server.js' }
      : { main: './src/index.js' },
    output: {
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    target: isServer ? 'node' : 'web',
    externals: isServer ? [nodeExternals()] : [],
    node: {
      __dirname: false,
    },
    optimization: isServer
      ? { splitChunks: false, minimize: false }
      : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js'
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: isServer ? false : true,
            },
          },
        },
      ],
    },
    plugins: isServer
      ? []
      : [
          // new CleanWebpackPlugin(), // server.bundle.js 삭제문제로 주석처리함!
          new HtmlWebpackPlugin({
            template: './template/index.html',
          }),
          new webpack.ProvidePlugin({
            React: 'react',
          }),
        ],
    mode: 'production',
  };
}

module.exports = [getConfig(false), getConfig(true)];

// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/dist/',
//     filename: '[name].[chunkhash].js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               // 클라이언트에서만 실행되도록 설정
//               configFile: path.resolve(__dirname, '.babelrc.client.js'),
//             },
//           },
//         ],
//       },
//       { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({ template: './template/index.html' }),
//     new webpack.ProvidePlugin({
//       React: 'react',
//       styled: 'styled-components',
//     }),
//   ],
// };
