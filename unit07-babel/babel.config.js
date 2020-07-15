// const 옵션명 = [설치파일명, 설치파일명];
// 스크립트와 동일 내용 : "npx babel src/code.js --presets=@babel/preset-react --plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions",

// const presets = ['@babel/preset-react'];
// '@babel/plugin-transform-arrow-functions',
// '@babel/plugin-transform-template-literals',
// const plugins = ['./src/plugins/consolelog-remover.js']; // 콘솔로그 제거 플러그인
const plugins = [
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-runtime',
  './src/plugins/consolelog-insert.js',
]; // 콘솔로그 추가 플러그인

module.exports = { plugins };
