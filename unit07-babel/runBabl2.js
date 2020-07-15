// AST 활용하여 효율적인 바벨실행파일을 작성해보자

const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];

// 코드 생성하지 않고 AST만 생성 : 동일한 옵션 적용
const { ast } = babel.transformSync(source, {
  filename,
  presets,
  configFile,
  ast: true,
  code: false,
});

// ast 설정과 + code.js + 개별설정 에 따라 컴파일된 code1 반환 : 화살표 함수 적용
const { code: code1 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-arrow-functions'],
  configFile: false,
});

// ast 설정과 + code.js + 개별설정 에 따라 컴파일된 code2 반환 : 템플릿 문자열적용
const { code: code2 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-template-literals'],
  configFile: false,
});

console.log(code1);
console.log(code2);
