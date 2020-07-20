// import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 기본 CSR 방식 ReactDOM.render()
// ReactDOM.render(<App />, document.getElementById('root'));

// 서버에서 받은 데이터 사용하기
const initialData = window.__INITIAL_DATA__;

// ? SSR에서 사용하는 법 ReactDOM.hydrate()
ReactDOM.hydrate(
  <App page={initialData.page} />,
  document.getElementById('root')
);
