- [배운거 복습하기](#배운거-복습하기)
- [리액트 타입스크립트- 타입 지정하기](#리액트-타입스크립트--타입-지정하기)
  - [함수형 컴포넌트 타입 정의하기](#함수형-컴포넌트-타입-정의하기)
  - [클래스형 컴포넌트 타입 정의하기](#클래스형-컴포넌트-타입-정의하기)
  - [고차컴포넌트 타입](#고차컴포넌트-타입)
  - [랜더 속성값 타입정의](#랜더-속성값-타입정의)

# 배운거 복습하기

- CRA/NEXT 없이 프로젝트 세팅하기
- 리액트
  `npm i react react-dom express`
- 웹서버 구동 : `webpack-dev-server` 쓰면 필요없다
  [제로초 사이트 참고](https://www.zerocho.com/category/NodeJS/post/578b5a36d8316615006bee0f)

  - express 설치, 화면띄우기
  - 대표미들웨어 설정 :npm에서 받을수 있뜸
    - Morgan : 익스프레스가 구동되며 나오는 메세지들을 콘솔에 표시
    - Compression : 페이지를 압축해서 전송
    - Session : 세션 사용하게 해줌
    - Body-parser : 폼에서 전송되는 POST값을 사용하게 해줌
    - Cookie-parser: 쿠키를 사용할수 있게 해줌
    - Method-override : REST_API에서 PUT과 DELETE 메소드를 사용할 수 있게함
    - Cors : 크로스오리진(다른도메인간 AJAX요청)을 가능하게 해줌
    - Multer :파일 업로드를 할때 주로 쓰임

- 웹팩
  - 파일 변환하여 아웃풋 실행
  - `webpack-dev-server` : 코드 변경하면 자동 빌드하는 플러그인
    - 스크립트에 `webpack-dev-server --open` 추가, 자동업뎃됨! 굳
  - typescript
    - ts-loader
  - [styled-component 공식문서 바벨 설정](https://styled-components.com/docs/tooling#babel-plugin)
  - [styled-component 타입스크립트 깃헙](https://github.com/Igorbek/typescript-plugin-styled-components)
  - - style-loader
    - css-loader
  - babel
    - babel-loader
    - plugins
  - image & file
    - file-loader
    - raw-loader
- 바벨
- SSR 구현
-

# 리액트 타입스크립트- 타입 지정하기

먼저 리액트 컴포넌트에서 자주사용하는 이벤트 타입을 지정하여 임포트 하여 사용하자

```ts
// 리엑트에서 발생하는 모든 이벤트 객체는 EventObject타입으로 정의
// ! 특정 이벤트에 특화된 타입을 원한다면 제네릭으로 입력된 HTMLElement를 원하는 타입으로 교체
export type EventObject = React.SyntheticEvent<HTMLElement>;

// 리액트의 모든 이벤트 처리함수롤 EventFunc로 정의
// ! 이 타입은 이벤트 처리 함수를 속성값으로 전달할때 유용하게 사용한다
export type EventFunc = (e: EventObject) => void;
```

## 함수형 컴포넌트 타입 정의하기

[FuncCompo](./src/FuncCompo.tsx)

## 클래스형 컴포넌트 타입 정의하기

[ClassCompo](./src/ClassCompo.tsx)

## 고차컴포넌트 타입

- 고차 컴포 타입 정의 : [HOCTypes](./src/HOCTypes.tsx)
- 고차 컴포 임력할 컴포: [HOCSource](./src/HOCSource.tsx)
- 고차 컴포 적용된 컴포: [HOCApplied](./src/HOCApplied.tsx)

## 랜더 속성값 타입정의

[RenderTypes](./RenderTypes.tsx)
