# CRA(create-react-app)

CRA로 리액트앱 생성하게 되면 웹팩, 바벨설정과 같은 어려운 부분을 자동설치해주기때문에 편하게 작업할 수 있다.

## 명령어

`npx create-react-app .` : **npx**를 통해 실행 시켰으며 마지막에 `.` 은 현재 폴더에 설치를 뜻한다. 만약 새로운 폴더를 생성한다면 폴더명을 입력하도록 한다.

> 만약 버전에 따라 실행이 안된다면 `npm i -g create-react-app`를 통해 CRA를 전역에 설치후 `create-react-app <프로젝트명>` 글로벌 명령으로 실행시킬수 있다.

## 스크립트 살펴보기

### `npm run start`

이 명령은 **개발모드**에서만 사용하는 명령으로, 빌드 후 자동으로 브라우저를 실행시켜주며 최종 렌더링된 웹페이지를 볼수 있게 된다. 수정과 동시에 화면에 반영되기 때문에 편하게 작업할 수 있다.

> https 로 개발서버를 띄울 수도 있기때문에 API에서 https를 사용해야 한다면 다음 명령으로 실행시키도록 한다. **서명된 인증서가 필요**하며 안전관련 경고문구가 뜨면 무시하고 진행하면 된다.
> 맥 : `HTTPS=true npm run start`
> 윈도우 : `set HTTPS=true && npm run start`

### `npm run build`

이 명령은 배포환경에서 사용할 파일을 만드는 명령이다. 빌드후 생성된 js파일과 css파일을 열어보면 읽기 힘든 형태로 압축 되어 있는 것을 확인할 수 있으며, 빌드를 통해 생성된 정적파일을 웹서벌르 통해 사용자가 내려받을 수 있게 하면 된다.
로컬에서 웹서버를 띄워 확인하기 위해서는 `npx serve -s build` 명령을 사용한다.

- serve 패키지 : 노드환경에서 동작하는 웹 서버 애플리케이션으로 정적파일을 서비스할때 간단하게 사용하기 좋다.

빌드된 파일은 build/static 폴더에 위치하며 파일이름에는 해시값이 포함되어 있어, 업데이트 된파일과 구분하게 된다. 재방문할경우 업뎃되지 않았다면 이전 캐싱된 파일을 불러들이기 때문에 빠른 로딩효과가 있다.

- 해쉬된 파일 모습 : `build/static/css/main.{해시값}.chunk.css`
- .js파일에서 import된 파일의 위치 : `build/static/media`

### `npm run test`

CRA에서 테스트 하기위해서 실행하는 명령이다. 기본적으로 JEST가 설치되어 있다. `App.test.js` 파일이 테스트 파일로 생성된다. 기본적으로 아래와 같은 조건의 파일을 테스트파일로 인식하게 된다.

- `__test__` 폴더 밑에 있는 모든 자바스크립트 파일
- `파일명.test.js` 인 파일
- `파일명.spec.js` 인 파일

`util.js`와 `util.test.js`를 확인한뒤 테스트 스크립트 명령을 실행시켜 결과를 확인하자.

> 만약 CI(continuous integration)과 같이 watch모드가 필요없는 환경이라면 다음 명령어로 테스트 코드를 실행한다.
> 맥 : `CI=true npm run test`
> 윈도우 : `set "CI=true" && npm run test`

### `npm run eject`

위 명령을 실행하면 숨겨있던 CRA의 내부 설정파일이 밖으로 노출된다. 이 명령을 한 번 실행하게 되면 되돌릴수 없으니 주의하자. 리액트 툴체인에 익숙하지않다면 건들지말자.
웹팩이나 바밸설정을 변경할 수 있다. 이 명령 말고 CRA의 설정을 변경하기 위해서는

- react-scripts 프로젝트를 포트(fork)해서 나만의 스크립트를 작성 : 자유도가 높으며 부분수정이 용이하다.
- react-app-rewired 패키지를 사용 : 자유도 낮지만, 비교적 쉬운 설정

## CRA의 폴리필(polyfill)

CRA에서는 폴리필을 지원하지 않기때문에 직접 폴리필을 추가해 주어야 한다.

- 1. `core-js`
- 2. `@babel/polyfil`, `@babel/preset-env`

### `core-js` 설치

**`core-js` 패키지를 사용하면 다양한 폴리필을 선택적으로 사용** 할 수 있다.
`npm i core-js`

### `core-js` 사용법

먼저 `index.js` 최상위 js파일에 임포트 하여 이하 컴포넌트에서 자유롭게 사용되도록 하자.

```js
// index.js
import 'core-js/features/string/pad-start';
```

### `@babel/polyfil`

바벨 폴리필의 경우 사용하지 않는 기능의 폴리필까지 모두 포함되기 때문에 크기가 커지는 단점이 있다.

### `@babel/preset-env`

바벨 프리셋 env는 필요한 폴리필만 추가할 수 있지만 동적타입언어의 한계 때문에 `core-js` 보다 불필요한 폴리필도 포함되긴 한다.

## 이미지/폰트 파일 사용

정적데이터는 `src` 폴더안의 컴포넌트에서 `import` 키워드를 통해 추가하도록 한다. 웹팩에서 해시값을 사용해 url을 생성해 주기 때문에 파일내용이 변경되지 않는 이상 브라우저 캐싱 효과를 볼수 있게 된다.

## `seviceWorker.js`

위 파일에는 PWA(progressive web app)과 관련된 코드가 들어 있다. **PWA는 오프라인에서도 잘 동작하는 웹앱을 위한 기술**이다. 필요없으면 해당 내용을 삭제해도 되며, 필요하다면 `Index.js`에 `serviceWorker.register()`코드를 삽입한다.

## 환경변수 사용하기

환경변수는 개발 - 테스트 - 배포 단계 각각의 환경별로 다른 값을 적용할때 유용하다. `process.env.{환경변수이름}` 으로 접근 할 수 있다. CRA에서는 `NODE_ENV` 환경변수를 기본으로 제공하기 때문에 일르 활용하여 설정해보자.
환경변수는 shell(커멘드라인)을 통해 작성할수 있지만 .env파일을 이용하기를 추천한다. 프로젝트루트 밑에 `.env.development`,`.env.test`,`.env.production`

- `npm run start` : development mode
- `npm run test` : test mode
- `npm run build` : production mode

## 그밖의 환경변수

CRA에서는 `REACT_APP_` 접두사를 통해 환경변수에 접근할수 있다. (`precess.env.REACT_APP_{...}`)

## autoprefixer

CRA에서는 auto-pre-fixer가 적용된다. 이는 css에 벤더접두사를 자동으로 붙여주는 것을 말한다.
