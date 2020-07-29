- [타입스크립트 without 프레임워크](#타입스크립트-without-프레임워크)
  - [`tsconfig.json` 파일 설정](#tsconfigjson-파일-설정)

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
