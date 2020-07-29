const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: { index: './src/index.js' },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        exclude: /node_modules/,
        use:[{}]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-template-literals',
              '@babel/plugin-transform-arrow-functions',
              'babel-plugin-styled-components',
            ],
          },]
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
  ],
};
