const express = require('express');
const next = require('next');
const url = require('url');
const lruCache = require('lru-cache');

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const port = 3000;
// 노드 환경에 따라 개발모드/프로덕션모드 구분
const dev = process.env.NODE_ENV !== 'production';
// 넥스트를 실행하기 위한 객체생성
const app = next({ dev });
// 넥스트 실행하기 위한 함수 생성 : 공식 문서에서 쓰는데로 사용함
const handle = app.getRequestHandler();

// 넥스트 준비과정이 끝나면 입력한 함수 실행
app.prepare().then(() => {
  const server = express();
  server.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
  });
  // express 웹 서버가 처리할 url패턴 등록 : 이부분이 없다면 기본 넥스트 설정과 동일하게 처리한다
  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`);
  });
  server.get(/^\/page[1-9]/, (req, res) => {
    // 해당 url로 접근시 랜더 & 캐시 실행
    return renderAndCashe(req, res);
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

// 렌더&캐시하는 로직 분리
const renderAndCashe = async (req, res) => {
  const parseURL = url.parse(req.url, true);
  const cacheKey = parseURL.path;
  if (ssrCache.has(cacheKey)) {
    console.log('used cache!');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  try {
    const { query, pathname } = parseURL;
    const html = await app.renderToHTML(req, res, pathname, query);
    if (res.statusCode === 200) {
      ssrCache.set(cacheKey, html);
    }
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pathname, query);
  }
};
