import React from 'react';

// ! window 객체에 속성 추가하기
interface Window {
  myValue: number;
}

// ! 이미지 모듈로 사용하기
// declare module '*.png' {
//   const content: string;
//   export default content;
// }
// declare module '*jpg' {
//   const content: string;
//   export default content;
// }
// declare module '*.jpeg' {
//   const content: string;
//   export default content;
// }
// declare module '*.gif' {
//   const content: string;
//   export default content;
// }
// declare module '*.svg' {
//   const content: string;
//   export default content;
// }

// ! 리엑트에서 발생하는 모든 이벤트 객체는 EventObject타입으로 정의
// ! 특정 이벤트에 특화된 타입을 원한다면 제네릭으로 입력된 HTMLElement를 원하는 타입으로 교체
export type EventObject = React.SyntheticEvent<HTMLElement>;

// ! 리액트의 모든 이벤트 처리함수롤 EventFunc로 정의
// ! 이 타입은 이벤트 처리 함수를 속성값으로 전달할때 유용하게 사용한다
export type EventFunc = (e: EventObject) => void;
