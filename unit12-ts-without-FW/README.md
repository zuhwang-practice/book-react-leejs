- [타입스크립트 without 프레임워크](#타입스크립트-without-프레임워크)
  - [`tsconfig.json` 파일 설정](#tsconfigjson-파일-설정)
- [기타 환성 설정](#기타-환성-설정)
  - [자바스크립트와 타입스크립트 함께 사용하기](#자바스크립트와-타입스크립트-함께-사용하기)
  - [타입스크립트에서 외부 패키지 사용하기](#타입스크립트에서-외부-패키지-사용하기)
  - [자바스크립트가 아닌 모듈과 window 객체의 타입정의하기](#자바스크립트가-아닌-모듈과-window-객체의-타입정의하기)
  - [자바스크립트 최신 문법 사용하기](#자바스크립트-최신-문법-사용하기)
- [리액트 & 리덕스와 타입스크립트](#리액트--리덕스와-타입스크립트)
- [타입지정하기](#타입지정하기)
  - [타입스크립트 웹팩설정 작성하기](#타입스크립트-웹팩설정-작성하기)
    - [devtool & sourceMap 설정](#devtool--sourcemap-설정)

# 타입스크립트 without 프레임워크

`npm init -y`
`npm i typescript react react-dom` : 타입스크립트/리액트/리액트돔 설치
`npm i @types/react @types/react-dom` : 추가 설정?프리셋 받기
`npx tsc --init` : `tsconfig.json` 파일이 생성됨. 리액트사용을 위해 jsx문법에 관한 설정이 필요함

## `tsconfig.json` 파일 설정

```json
{
  // .. 자동추가된 내용 생략
  "jsx": "react",
  "outDir": "./dist"
}
```

- `"jsx": "react"` : jsx문법으로 작성된 코드가 `React.createElement()` 함수호출로 변환
- `"outDir": "./dist"` : 컴파일된 파일은 지정 폴더에 생성됨

# 기타 환성 설정

## 자바스크립트와 타입스크립트 함께 사용하기

기존에 자바스크립트를 사용하는 프로젝트에 타입스크립트를 도입하거나, 일부 자바스크립트 코드를 가져와서 사용해야 하는 경우라면 아래 설정을 해주도록 한다

- 1. [`src/legacy`](./src/legacy.js) 파일 작성 : 예전 자바스크립트 코드 준비
- 2. [`src/App.tsx`](./src/App.tsx)파일에서 에서 [`src/legacy`](./src/legacy.js)를 가져와서 사용
- 3. `npx tsc` 컴파일 하면 에러발생!
- 4. [`tsconfig.json`](./tsconfig.json)에서 `"allowjs" :true`옵션을 추가 하고 다시 컴파일! 하면 정상작동됨!

## 타입스크립트에서 외부 패키지 사용하기

외부패키지 **로대시 (lodash)** 사용하기

- 설치 : `npm i lodash @types/lodash`
- 패키지와 `@types/패키지명`과 같은 타입 패키지를 추가 받기 : 해당 패키지의 타입 정보가 있다.

## 자바스크립트가 아닌 모듈과 window 객체의 타입정의하기

자바스크립트 이외 모듈,window객체의 타입을 지정할때는 [src/types.ts](./src/types.ts) 파일에 타입을 정의한다

- **이미지**나 **폰트** 등 자바스크립트가 아닌 모듈의 타입정의
- **window**객체의 타입정의

```ts
// src/types.ts

// ! window객체에 사용할 속성을 추가하고, 타입을 지정한다.
interface Window {
  myValue: number;
}
> [웹팩 공홈 import other-assets 여기를 확인하자 ](https://webpack.js.org/guides/typescript/#importing-other-assets)
// ! png 확장자를 갖는 모듈의 타입이 문자열이라 지정한다
declare module '*.png' {
  const content: string;
  export default content;
}
declare module "*.svg" {
  const content: any;
  export default content;
}
```

## 자바스크립트 최신 문법 사용하기

- [`src/App.tsx`](./src/App.tsx)에 자바스크립트 최신 문법을 추가
- 해당 최신문법이 컴파일 되며 에러를 발생시킨다
- [/tsconfig.json](./tsconfig.json) 타입스크립트 설정 파일에서 JS 최신문법 옵션을 추가
- `lib`옵션의 기본값은 `["DOM", "ES5", "ScriptHost",]`이며 최신문업 옵션 `"ES2017"`추가!
  > **☠️☠️자바스크립트 최신문법을 사용하게 했을뿐 폴리필은 추가해주진 않음! 폴리필 설정 따로 해야한다☠️☠️**

```json
// tsconfig.json
{
  // .. 이외 옵션 생략
  "lib": ["DOM", "ES5", "ScriptHost", "ES2017"]
}
```

# 리액트 & 리덕스와 타입스크립트

[타입스크립트 공식문서- 리액트& 웹팩설정하기](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

리액트 컴포넌트와 리덕스에 타입정보를 추가하는 방법을 알아보자

- `@types/react` : 리액트에서 타입을 정의할때 사용
- 리덕스는 `@types/react-redux`패키지와 리덕스에 내장된 타입정보를 사용

# 타입지정하기

- 리액트
  - 함수형 컴포넌트
  - 클래스형 컴포넌트
  - 고차컴포넌트
  - 렌더속성값
- 리덕스
  - 액션생성자 함수
  - 리듀서
  - connect함수 사용시 타입정의

## 타입스크립트 웹팩설정 작성하기

### devtool & sourceMap 설정

- [웹팩 공식문서](https://webpack.js.org/guides/typescript/#source-maps)
- webpack 설정에 devtool 옵션추가후 inline-source-map 추가함, tsconfig파일에도 sourceMap옵션켜기
