import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';
import App from './App';
import { renderPage, prerenderPages } from './common';
// ? 읽기-스트림과 쓰기-스트림은 연결시킬 읽기쓰기-가능-스트림 : Transform 스트림 임포트
import { renderToNodeStream } from 'react-dom/server';
import { Transform } from 'stream';

// ? 중간에 삽입할 스트림을 생성하는 함수로직
const createCacheStream = (cacheKey, prefix, postfix) => {
  // ? 청크 모아서 청크를 SSR cache에 저장할거다
  const chunks = [];
  return new Transform({
    // ? 청크데이터를 받으면 호출되는 함수
    transform(data, _, callback) {
      chunks.push(data);
      callback(null, data);
    },
    // ? 청크데이터가 모두 전달되면 호출되는 함수
    flush(callback) {
      const data = [prefix, Buffer.concat(chunks).toString(), postfix];
      ssrCache.set(cacheKey, data.join(''));
      callback();
    },
  });
};

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const app = express();

const prerenderHTML = {};

for (const page of prerenderPages) {
  const pageHTML = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8',
  );
  prerenderHTML[page] = pageHTML;
}
const html = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  .replace('__STYLE_FROM_SERVER__', '');

app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const cacheKey = parsedURL.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const page = parsedURL.pathname ? parsedURL.pathname.substr(1) : 'home';
  const initialData = { page };
  const isPrerender = prerenderPages.includes(page);
  const curHTML = isPrerender ? prerenderHTML[page] : html;
  const result = curHTML.replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData),
  );
  if (isPrerender) {
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    const ROOT_TEXT = '<div id="root">';
    const prefix = result.substr(
      0,
      result.indexOf(ROOT_TEXT) + ROOT_TEXT.length,
    );
    const postfix = result.substr(prefix.length);
    res.write(prefix);
    const sheet = new ServerStyleSheet();
    const reactElement = sheet.collectStyles(<App page={page} />);
    const renderStream = sheet.interleaveWithNodeStream(
      renderToNodeStream(reactElement),
    );
    // ?
    const cacheStream = createCacheStream(cacheKey, prefix, postfix);
    cacheStream.pipe(res);
    renderStream.pipe(cacheStream, { end: false });
    renderStream.on('end', () => {
      res.end(postfix);
    });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
