import React from 'react';

// ~ 함수형 컴포넌트 타입지정하기

// Props의 타입지정
interface Props {
  name: string;
  age?: number;
}

//! React.FunctionComponent를 사용해 함수컴포넌트 타입지정 + 제네릭으로 프롭스 타입지정
const FuncCompo: React.FunctionComponent<Props> = function ({
  name,
  age = 24,
}) {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
};

export default FuncCompo;
