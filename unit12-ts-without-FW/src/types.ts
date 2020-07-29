// ! window객체에 사용할 속성을 추가하고, 타입을 지정한다.
interface Window {
  myValue: number;
}

// ! 이미지 확장자를 갖는 모듈의 타입이 문자열이라 지정한다
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.gif' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
