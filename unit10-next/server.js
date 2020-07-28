const express = require('express');
const next = require('next');

const port = 3000;
// 노드 환경에 따라 개발모드/프로덕션모드 구분
const dev = process.env.NODE_ENV !== 'production';
// 넥스트를 실행하기 위한 객체생성
const app = next({ dev });
// 넥스트 실행하기 위한 함수 생성
const handle = app.getRequestHandler();

// 넥스트 준비과정이 끝나면 입력한 함수 실행
app.prepare().then(() => {
  const server = express();
  // express 웹 서버가 처리할 url패턴 등록 : 이부분이 없다면 기본 넥스트 설정과 동일하게 처리한다
  server.get('/:pg', (req, res) => {
    res.redirect(`/${req.params.pg}`);
  });
  // 위에서 지정한 패턴 이외의 모든 패턴은 handle()가 처리
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // 서버열고 대기~
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> ready on http://localhost:${port}`);
  });
});
