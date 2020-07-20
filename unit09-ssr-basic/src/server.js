import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import App from './App';
import * as url from 'url';

// ? react-dom/server에 서버에서 사용되는 기능이 모여있다.
import { renderToString } from 'react-dom/server';
// ? styled-components의 SSR 설정을 위한 임포트
import { ServerStyleSheet } from 'styled-components';

// express를 app변수에 담아 미들웨어/url설정을 하게 된다.
const app = express();

// 서버에서 구동될 html불러오기 = 번들된 index.html!
// SSR에서는 불러드린 번들.html을 기반으로 새로운 indexSSR.html을 생성!
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);

// 엔드포인트별 설정
// root/dist 경로일때 루트/dist 폴더에서 정적파일 연결
app.use('/dist', express.static('dist'));

// 파비콘 연결 = 204 : no Content
// 브라우저가 자동으로 요청하는 favicon.ico파일이 다음 '*'에서 처리되지 않도록 하는 코드
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// 나머지 모든 경로에 대해(*) 처리하는 함수등록
app.get('*', (req, res) => {
  // url을 분석하기위한 url모듈 사용
  const parsedUrl = url.parse(req.url, true);
  // url.pathname위치에 값이 있으면 그 값의 경로로 페이지 보여준다! 없으면 기본 home 적용
  console.log('서버 패스네임은 ', parsedUrl.pathname);
  const page =
    parsedUrl.pathname === '/' ? 'home' : parsedUrl.pathname.substr(1);
  // 스타일을 추출하는데 사용할 인스턴스를 생성
  const sheet = new ServerStyleSheet();
  // App컴포넌트를 문자열로 반환하여 변수에 담음
  // 추가+ 스타일드컴포넌트를 위한 sheet.ㅋ(컴포넌트)적용
  const renderSTR = renderToString(sheet.collectStyles(<App page={page} />));
  //
  const styles = sheet.getStyleTags();
  // 클라이언트에 전달할 초기데이터 initialData
  const initialData = { page };
  console.log('서버 initialData는 ', initialData);
  // html에서 id가 루트인 코드에 App컴포넌트 문자열을 삽입한다
  // replace체이닝을 통해 초기값 데이터를 __DATA_FROM_SERVER__변수에 담는다
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderSTR}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialData))
    .replace('__STYLE_FROM_SERVER__', styles);
  // 결과를 response에 담아 보낸다
  res.send(result);
});

app.listen(3000, () => console.log('http://localhost:3000')); // 3000포트로 들어오는 요청을 듣고있는 중
