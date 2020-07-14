# 웹팩 사용해보기!

- `npm init -y` : 프로젝트 초기화
- `npm i webpack webpack-cli react react-dom` : 리액트/리액트돔, 웹팩/웹팩cli 설치

# ESM(ES6 모듈시스템)

ESM을 사용하여 index.js에 리액트, 리액트돔, 컴포넌트 모듈을 불러 사용한다.

# webpack.config.js

웹팩의 최상위(전역) 설정 파일이다. webpackrc와 같은 rc가 붙는 파일은 지역설정을 말한다.
설정 파일을 통해 entry, output,plugin, preset, mode.. 등 설정할 수 있다.
실습을 위해 mode, entry와 output만 작성하고 아래 명령을 실행시켜 보자.

# package.json

## scripts

- `webpack`: 스크립트 명령을 추가했다. `webpack --config webpack.config.js` 로 웹팩 설정파일을 연결해 주었다.

# `npm run webpack`, `yarn webpack`

`npm run webpack` 명령을 입력하자. dist 폴더가 생성되며, `main.js` 파일이 생성되었다. `main.js`에는 `src/*.js` 2개의 파일이 합쳐진 것을 확인 할 수 있다.
