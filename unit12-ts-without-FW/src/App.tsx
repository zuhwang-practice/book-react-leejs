import React from 'react';
import { getValue } from './legacy';
import PIC from '../../unit10-next/static/c.png';

function App({ name, age }: { name: string; age: number }) {
  const data = getValue();
  window.myValue = 123;
  console.log('123'.padStart(5, '0')); // ! 최신문법 사용해보기
  return (
    <div>
      <h1>타입스크립트로 만둘꿴뛔?!</h1>
      <p>props.name : {name}</p>
      <p>props.age : {age}</p>
      <p>js 레거시 데이터 : {data}</p>
      <p>
        기타 이미지 불러오기 : <img src={PIC} />
      </p>
      <p>window 객체타입 사용하기 </p>
    </div>
  );
}

export default App;
