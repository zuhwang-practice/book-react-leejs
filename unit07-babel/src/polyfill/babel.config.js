// @babel/preset-env 프리셋으로 폴리필 설정하는 방식

const presets = [['@babel/preset-env', { targets: '>0.25%, not dead' }]];
const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        chrome: '40',
      },
      useBuiltIns: 'entry', // 폴리필 관련 설정 : 지원하는 브라우저에 필요한 폴리필만 포함
    },
  ],
];

module.exports = { presets };
