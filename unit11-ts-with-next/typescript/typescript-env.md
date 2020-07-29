- [타입스크립트 환경구축하기](#타입스크립트-환경구축하기)
- [타입스크립트 with 프레임워크](#타입스크립트-with-프레임워크)
  - [CRA](#cra)
  - [nextjs](#nextjs)
    - [`@zeit/next-typescript` 설정](#zeitnext-typescript-설정)
    - [타입스크립트 설정하기](#타입스크립트-설정하기)
    - [타입스크립트 적용 확인하기](#타입스크립트-적용-확인하기)

# 타입스크립트 환경구축하기

# 타입스크립트 with 프레임워크

## CRA

`npx create-react-app <프로젝트명> --typescript`
프로젝트를 생성할때 타입스크립트 옵션을 추가하여 생성한다

## nextjs

`npm i next react react-dom @zeit/next-typescript`
`npm i @types/react @types/react-dom @types/next`

### `@zeit/next-typescript` 설정

- `@zeit/next-typescript` 넥스트 공식지원 타입스크립트 플러그인
- 리액트와 넥스트의 타입정의 파일로, 리엑트나 넥스트에서 API를 사용할 때 타입정보를 알려줌
- [`next.config.js`](./next.config.js) : `@zeit/next-typescript` 패키지로 감싸주어야함!
- [`babel.config.js`](./babel.config.js) : `@zeit/next-typescript`는 내부적으로 `@babel/preset-typescript`를 사용함으로 바벨설정 또한 필요하다
  - next에서 바벨설정시 `next/babel`은 꼭꼭 무조건 넣어야 한다
  - `@zeit/next-typescript/babel` 프리셋 추가

```js
// next.config.js
const withTs = require('@zeit/next-typescript');
module.exports = withTs({
  webpack(config, options) {
    return config;
  },
});
```

```js
// babel.config.js
module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
};
```

### 타입스크립트 설정하기

- [`tsconfig.json`](./tsconfig.json) 작성
- [한국어 타입스크립트](https://typescript-kr.github.io/pages/tsconfig.json.html) 문서에서 상세 설명을 확인 할 수 있다.

```json
{
  "compilerOptions": {
    "module": "esnext", // 모듈시스템 ESM
    "target": "esnext", // 쵝신문법 바벨한테시킴 - next자체 절정에 따름
    "jsx": "preserve", // jsx문법도 바벨이 변환하도록
    "noEmit": true, // 타입스크립트 컴파일후 결과 파일을 만들지 않음
    "strict": true // 스트릭트 모드 켬
  }
}
```

### 타입스크립트 적용 확인하기

타입스크립트 파일에서 jsx를 사용한다면 꼭 `.tsx` 확장자 사용하기

- [유틸모음](./src/util.ts) 모듈 생성
- [tsx 페이지](./pages/index.tsx) 생성
- `npx next` 서버를 켜고 확인해보쟈 화면 잘나오면 굳굳굳!

> 프레임 워크 없이 타입스크립트 설정하기는 [unit12-ts-withoutFW](../../unit12-ts-without-FW/README.md) 에서 확인하기
