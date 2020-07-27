import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
import { renderPage, prerenderPages } from './common';

// ? SSR 캐싱 인스턴스생성 + 규칙 지정
const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const app = express();

// ? pre-render 확인하고 해당 프리렌더 페이지 불러들임
const prerenderHTML = {};
for (const page of prerenderPages) {
  const pageHTML = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}`.html),
  );
  prerenderHTML[page] = pageHTML;
}

// ? 스타일 변수 제거
const HTML = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html', 'utf8'))
  .replace('__STYLE_FROM_SERVER__', '');

// ? 익스프레스 미들웨어 실행
app.use('/dist', express.static('dist'));
app.get('/favicom.ico', (req, res) => {
  res.sendStatus(204);
});
app.get('*', (req, res) => {
  // ? url 정보 분석
  const parsedURL = url.parse(req.url, true);
  // ? 캐시-키는 파라미터를 할당함
  const cacheKey = parsedUrl.path;
  // ? SSR캐시에서 파라미터 정보 확인하여
  if (ssrCache.has(cacheKey)) {
    console.log('캐시사용');
    // ? 해당 url파라미터에 맞는 데이터를 추출하여 응답처리
    res.send(ssrCache.get(cacheKey));
  }

  // ? 요청 url의 파라미터가 있는 지 확인하여 초기 페이지 정보를 변수화
  const page = parsedURL.pathname ? parsedURL.pathname.substr(1) : 'home';
  // ? 초기 데이터에 페이지 정보 담는다
  const initialData = { page };

  // ? 프리렌더 여부 변수 생성
  const isPrerender = prerenderPages.includes(page);
  // ? 결과로 보낼 변수 생성 : 프리렌더 있으면 프리렌더사용, 없으면 indexHTML사용
  const result = (isPrerender ? prerenderHTML[page] : HTML).replace(
    // ? 초기데이터 담기
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData),
  );

  // ? 프리렌더일때
  if (isPrerender) {
    // ? 캐시데이터를 저장
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    // ? 루트 div를 기준으로 문자열을 나눔
    const ROOT_TEXT = '<div id="root"></div>';
    const prefix = result.substr(
      0,
      result.indexOf(ROOT_TEXT) + ROOT_TEXT.length,
    );
    const postfix = result.substr(prefix.length);
    // ? 루트 이전 문자열은 바로 전송
    res.write(prefix);
    // ? 스타일 객체 생성
    const sheet = new ServerStyleSheet();
    // ? 최상위 컴포 App의 내용 & 스타일 추출
    const reactElement = sheet.collectStyles(<App page={page} />);
    // ? styled-components또한 스트림용으로 호출
    const renderStream = sheet.interleaveWithNodeStream(
      renderToNodeStream(reactElement),
    );
    // ? 렌더스트림 데이터를  res에게 데이터 전송 & res.end()메서드가 호출되지 않도록 end 옵션 설정
    renderStream.pipe(res, { end: false });
    // ? 스트림이 종료됬을때 엔드 호출하며 루트div 이후 바닥 정보를 보낸다
    renderStream.on('end', () => {
      res.end(postfix);
    });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
