import React from 'react';
// css-module 식 스타일 적용 eg. style.클래스지정이름
import style from './Button2.module.css';

function Button2({ size }) {
  if (size === 'big') {
    return <button className={`${style.button} ${style.big}`}>큰 버튼</button>;
  } else {
    return (
      <button className={`${style.button} ${style.small}`}>작은 버튼</button>
    );
  }
}

export default Button2;
console.log(style);
