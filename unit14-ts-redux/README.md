- [리엑트 & 리덕스에 타입스크립트 적용하기](#리엑트--리덕스에-타입스크립트-적용하기)
- [CRA 파일 정리](#cra-파일-정리)
- [connect함수의 타입지정](#connect함수의-타입지정)

# 리엑트 & 리덕스에 타입스크립트 적용하기

`npx create-react-app 프로젝트명 --typescript`

- CRA로 리액트+타입스크립트 프로젝트 시작

`npm i redux react-redux immer`

- 리덕스를 위한 패키지 설치
- Immer는 불변객체를 위한 패키지

`npm i @types/react @types/react-redux`

- 타입스크립트를 위한 패키지별 타입설정 설치
- `react` 타입
- `react-redux` 패키지는 타입 설정이 필요함
- react-dom 리액트 돔은 브라우저용이기 때문에 타입스크립트는 필욥나봄 ?
- `redux`, `Immer` 는 자체 내장하고 있기에 설치안함

# CRA 파일 정리

src폴더 내부의 `index.tsx`, `app.tsx`, `react-app-env.d.ts` 파일 제외한 나무지 지움

> ## 폴더구조 만들기
>
> - src
>   - index.tsx : 엔트리
>   - App.tsx :
>   - common : 공통파일모음
>     - redux.ts
>     - store.ts
>   - person : person
>     - component
>       - Person.tsx
>     - state
>       - actions.ts
>       - reducer.ts
>   - product
>     - component
>       - Product.tsx
>     - state
>       - actions.ts
>       - reducer.ts

# connect함수의 타입지정
