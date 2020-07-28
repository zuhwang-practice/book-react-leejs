module.exports = {
  // 웹팩설정을 변경하기 위한 함수
  webpack: (config) => {
    // 매개변수로 웹팩설정을 받는다
    // 설정의 모듈/룰에 로더를 추가한다
    config.module.rules.push({
      // 이하 설정은 웹팩과 동일하다
      test: /.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // 쿼리파라미터 부분에 패해시를 추가하여 파일 내용이 변경될때 파일경로도 수정되도록 한다
            name: '[path][name].[ext]?[hash]',
            // 넥스트는 static폴더의 정적파일을 그대로 서비스 하기 때문에 파일 복사는 필요없다!
            emitFile: false,
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
};
