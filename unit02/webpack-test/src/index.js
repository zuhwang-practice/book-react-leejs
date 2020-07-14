import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

function Container() {
  //! state변화없이 돔요소 렌더링만 필요한 경우 함수형 컴포넌트를 사용하면 가볍다.
  // state변경이 필요하면 hook을 사용하자. 함수형으로 가볍게 클래스형 컴포넌트처럼 사용할 수 있다.
  return React.createElement(
    'div',
    null,
    React.createElement('p', null, '버튼클릭'),
    React.createElement('Button', { label: '좋아요' }),
    React.createElement('Button', { label: '싫어요' })
  );
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);
