const express = require('express');
const next = require('next');
const url = require('url');
const fs = require('fs');
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
    console.log(`
    http://localhost:3000
    http://localhost:3000/page3
    http://localhost:3000/page3-hi
    http://localhost:3000/page3-bye
    `);
  });
});

// ? next.config.js의 exportPathMap과 동일한 내용
// const prerenderList = [
//   { name: 'page2', path: '/page2' },
//   { name: 'page3', path: '/page3' },
//   { name: 'page3-hi', path: '/page3?text=hi' },
//   { name: 'page3-bye', path: '/page3?text=bye' },
// ];

// 웹팩의 라우터 설정 값 가저오기
const { exportPathMap } = require('./next.config');
const prerenderList = exportPathMap();

// ? out 폴더에 정적파일을 프리렌더캐쉬 목록에 저장,
const prerenderCache = {};
if (!dev) {
  // 프로덕션 모드일때
  for (const name in prerenderList) {
    const html = fs.readFileSync(`./out/${name}.html`, 'utf8');
    prerenderCache[name] = html;
  }
}

const renderAndCashe = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const cacheKey = parsedURL.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  if (prerenderCache.hasOwnProperty(cacheKey)) {
    console.log('미리 랜더링한 HTML 사용');
    res.send(prerenderCache[cacheKey]);
    return;
  }
  try {
    const { query, pathname } = parsedURL;
    const html = await app.renderToHTML(req, res, pathname, query);
    if ((res.statusCode = 200)) {
      ssrCache.set(cacheKey, html);
    }
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pathname, query);
  }
};
