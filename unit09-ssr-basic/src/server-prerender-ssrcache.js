import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
// * 프리렌더를 위한 모듈 임포트
import { renderPage, prerenderPages } from './common';

// ? SSR 캐싱을 위한 lru패키지 임포트
import lruCache from 'lru-cache';

// ? SSR 캐싱 인스턴스 생성 : 캐싱 규칙을 담는다
const ssrCache = new lruCache({
  max: 100, // 최대 100개 페이지 캐싱
  maxAge: 1000 * 60, // 단위:밀리초, 각아이템은 60초 동안 캐싱됨
});

const app = express();

// * 프리랜더 : 프리렌더 페이지 모음 객체
const prerenderHtml = {};
// * 프리랜더 : 프리렌더 페이지 목록을 가져와 HTML추출
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8',
  );
  // 프리렌더 페이지 모음 객체에 값 저장
  prerenderHtml[page] = pageHtml;
}
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    // ? 캐시-키 : 쿼리파라미터를 포함하는 url, SSR캐시를 구분하는 기준이됨
    const cacheKey = parsedUrl.path;
    // ? SSR캐시가 해당 url 정보를 갖고있다면, 해당정보 읽어들여 응답
    if (ssrCache.has(cacheKey)) {
      console.log(cacheKey + '캐시사용');
      res.send(ssrCache.get(cacheKey)); // 캐싱된 내용 가저와서 응답에 싫어보냄
    }
    const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
    const initialData = { page };
    // * 프리랜더 : 프리랜데 객체에서 현재페이지 검색, 있으면 프리랜더 사용, 없으면 랜더링 진행
    const pageHtml = prerenderPages.includes(page)
      ? prerenderHtml[page]
      : renderPage(page);
    const result = pageHtml.replace(
      '__DATA_FROM_SERVER__',
      JSON.stringify(initialData),
    );
    // ? SSR캐시에 해당 url 정보를 SSR을 마친 최종값으로 추가!
    ssrCache.set(cacheKey, result);
    res.send(result);
  } catch {
    (err) => {
      console.log(err);
      res.status(500).json({ error: err.toString() });
    };
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
