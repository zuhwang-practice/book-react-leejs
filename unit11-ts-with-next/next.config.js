const withTs = require('@zeit/next-typescript');

// ! 모듈을 감싸주고 내보내면 간단하게 설정완료!

module.exports = withTs({
  // 여기에 추가할 설정을 작성하면 된다~!
  webpack(config, options) {
    // 여기에 웹팩설정
    return config;
  },
});
