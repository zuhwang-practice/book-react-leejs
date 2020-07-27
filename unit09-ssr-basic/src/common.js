import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ServerStyleSheet } from 'styled-components';

const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8',
);

export const prerenderPages = ['home'];

export const renderPage = (page) => {
  // server.js에서 작성했던대로, 스타일 정보 변환하고, 태그 string으로 받아서 태그 교체해 주는 작업을 즌행한다.
  const sheet = new ServerStyleSheet();
  const renderSTR = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags();
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderSTR}</div>`)
    .replace('__STYLE_FROM_SERVER__', styles);
  return result;
};
