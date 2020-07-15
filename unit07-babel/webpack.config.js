// const path = require('path'); // path 모듈 임포트
// module.exports = {
//   mode: 'development',
//   entry: './src/code.js', // 웹팩 적용할 시작점 파일
//   output: {
//     // 웹팩 적용후 output 경로와 파일명
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'code.bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: 'babel-loader',
//       },
//     ],
//   },
//   // 웹팩의 압축기능을 잠시 꺼두기 위한 옵션
//   optimization: { minimizer: [] },
// };
