# unit 1.2 리액트 개발 환경 직접 구축하기

## `React.createElement()`

## JSX문법
`React.createElement()` 대신 JSX문법을 사용하면 더 편하게 컴포넌트를 작성 할 수 있다. 
* 하지만 JSX는 js표준이 아니기 때문에 바벨로 컴파일/변환해주어야 한다. 바벨모듈을 설치하자

## 바벨
`npm i @babel/core @babel/cli @babel/preset-react`

### 기능
- 바벨은 자바스크립트 코드를 변환해주는 컴파일러
- 최신 자바스크립트 문법을 지원하지 않는 환경에서, 최신문법을 쓸수 있게 해줌
- 코드에서 주석을 제거
- 코드 압축

> `@babel/cli` : 커멘드라인에서 바벨을 실행할 수 있는 바이너리 파일이 들어있다.
> `@babel/preset-react` : jsx로 작성된 코드를 `React.createElement()`로 변환하여주는 플러그인
> `@babel/core` : 

## 플러그인과 프리셋
js파일을 변환해주는 작업은 플러그인(plugin) 단위로 이루어진다.
두번 변환이 필요하다면 두개의 플러그인을 사용한다. 
하나의 목적을 위해 여러 플러그인이 필요할 수 있는데 이런 **플러그인의 집합을 프리셋(preset)**이라 한다. 
예를들어 바벨에는 자바스크립트 코드를 압축하는 플러그인을 모아놓은 `babel-preset-minify` 프리셋을 제공한다.
`@babel/preset-react`는 리액트 애플리케이션을 만들때 필요한 플러그인의 집합, **프리셋**이다.

> 설치된 패키지를 이요해 자바스크립트 파일을 변환해 보자
> `npx babel --watch src --out-dir, --presets @babel/preset-react`

## `npx`
`npx`는 외부 패키지에 포함된 실행파일을 실행할때 사용된다.
외부패키지의 실행 파일은 `./node_modules/.bin/` 밑에 저장된다. 
따라서 `npx babel`은 `./node_modules/.bin/babel`을 입력하는 것과 같다.

## 웹팩
웹팩은 자바스크립트로 만든 프로그램을 배포하기 좋은 형태, 즉 수많은 많은 피일을 각각의 `.js`, `.css`, `.html` 하나의 파일로 묶어주는 툴이다. SPA 웹개발이 성행하면서 js의 파일 갯수가 많아지기 시작했고, 관리가 어려워 졌다. (**파일갯수, 전역변수의 혼동을 야기하는 문제**)

## 모듈시스템? `commonJS`? `import`, `exports`
`exports`, `import` 와 같은 명령어로 다른 파일(모듈)을 불러 사용할수 있게 하는 것을 말하며,
자바스크립트는 es6이후 모듈시스템이 지원되었다. 이전 버전에서는 모듈시스템을 사용할수 없었기 때문에 이전 버전에서는 `commonJS` 를 많이 사용했다. **웹팩은 `commonJS`와 `ESM`(es6 모듈시스템)을 모두 지원한다**

 