const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    index3: './src/index3.js',
    index4: './src/index4.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].chunk.js', // 동적임포팅 되는 녀석들의 이름규칙을 나타냄
  },
  module: {
    rules: [
      // node_modules 폴더 제외, js or jsx 확장자를 같은 모든 파일에 babel-loader 적용
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif)$/, use: 'file-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: 'url-loader', options: { limit: 8192 } }],
      },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.csv$/, use: './my-csv-loader' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('1.2.3'), // Ehsms JSON.stringify('1.2.3')
      TEN: 10,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      styled: 'styled-components',
    }),
  ],
  optimization: { minimizer: [] },
};
