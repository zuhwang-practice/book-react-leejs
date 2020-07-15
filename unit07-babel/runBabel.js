const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-transform-template-literals',
];

const { code } = babel.transformSync(source, {
  filename,
  presets,
  plugins,
  configFile: false,
});

console.log(code);
