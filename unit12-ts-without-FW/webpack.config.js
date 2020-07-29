const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map', // 오류메세지 어디서 났는지 볼라고 tsconfi
  resolve: {
    extentions: ['.tsx', '.ts', '.js'],
  },
  entry: './src/index',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(css|scss|sass)$/,
        user: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{ loader: 'url-loader', options: { limit: 8192 } }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            emitFile: false,
          },
        },
      },
      { test: /\.txt$/, use: 'raw-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templata/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      styled: 'styled-componts',
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
