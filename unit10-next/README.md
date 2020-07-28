- [nextjs](#nextjs)
- [next 번들파일 분석](#next-번들파일-분석)
  - [1) `.next`](#1-next)
  - [2) `_app.js` : 페이지 공통기능 구현하기](#2-_appjs--페이지-공통기능-구현하기)
  - [3) `_document.js`](#3-_documentjs)
  - [3) `_error.js` : 404 에러페이지 구현](#3-_errorjs--404-에러페이지-구현)
- [next 기본 기능](#next-기본-기능)
  - [1) 각 페이지별 `<Head>` 설정](#1-각-페이지별-head-설정)
  - [2) 정적파일 사용](#2-정적파일-사용)
  - [3) 스타일시트 작성](#3-스타일시트-작성)
  - [4) 웹팩 설정 변경하기](#4-웹팩-설정-변경하기)
  - [5) 서버데이터 전달: `getInitialProps`](#5-서버데이터-전달-getinitialprops)
  - [6) 페이지 이동](#6-페이지-이동)
    - [`<Link>`](#link)
    - [`Router`](#router)
  - [7) 넥스트의 코드분할](#7-넥스트의-코드분할)
    - [pages 폴더별 분할](#pages-폴더별-분할)
    - [동적임포팅 사용 모듈 분할](#동적임포팅-사용-모듈-분할)
    - [`getInitialProps()`에서 동적임포트 사용하기](#getinitialprops에서-동적임포트-사용하기)
    - [공통사용 모듈 분할](#공통사용-모듈-분할)
  - [8) 서버사이드 캐싱 - 웹서버 직접 구현](#8-서버사이드-캐싱---웹서버-직접-구현)
  - [9) 페이지 미리 랜더링하기](#9-페이지-미리-랜더링하기)
    - [정적페이지 서비스하는 웹서버 작성](#정적페이지-서비스하는-웹서버-작성)
  - [10) `exportPathMap` : 정적페이지에서 쿼리파라미터 사용하기](#10-exportpathmap--정적페이지에서-쿼리파라미터-사용하기)
  - [11) styled-components 적용](#11-styled-components-적용)
    - [서버와 클라이언트 결과값 일치시키기](#서버와-클라이언트-결과값-일치시키기)

# nextjs

- React 프로젝트에서 SSR은 필요한데, 직접 구현은 어렵을 때!
- SSR 특화된 프레임워크
- pages폴더가 라우터 역할을 함 : url이 `도메인/page` 의 경우 `pages/page/index.js`또는 `page/page.js` 파일이 화면에 보여짐
- page 별로 번들파일이 생성됨
- 프리-랜더 된 페이지는 하단에 번개모양 아이콘이 생성된다!

`npm init -y`
`npm i next read react-dom`

# next 번들파일 분석

넥스트는 프로젝트 루트에 .next 폴더에 번들파일을 생성한다. 개발모드에서 생성된 폴더를 지우고 넥스트를 실행해 번들파일을 확인해보자!

1. 먼저 루트의 `.next` 폴더를 삭제 : `rm -rf .next`로 지움
2. `npx next build && npx next start`로 넥스트 실행 & 콘솔을 확인하자

```bash
%  npx next build && npx next start
[Browserslist] Could not parse /Users/hwang/project/package.json. Ignoring it.
[Browserslist] Could not parse /Users/hwang/project/package.json. Ignoring it.
Creating an optimized production build

Compiled successfully.

Automatically optimizing pages

Page                                                           Size     First Load JS
┌ ○ /                                                          272 B          58.7 kB
├ ○ /404                                                       3.41 kB        61.9 kB
└ ○ /about                                                     271 B          58.7 kB
+ First Load JS shared by all                                  58.5 kB
  ├ chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.12144e.js  10.3 kB
  ├ chunks/framework.de5b92.js                                 40 kB
  ├ chunks/main.cefadb.js                                      6.42 kB
  ├ chunks/pages/_app.a4a908.js                                1.01 kB
  └ chunks/webpack.488dc2.js                                   751 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)

Redirects

┌ source: /:path+/
├ destination: /:path+
└ permanent: true


ready - started server on http://localhost:3000
```

## 1) `.next`

`.next/static/[hash]/pages/파일들` : 기본값이 설정된 파일들이 위치한다.

- `_app.js` : 모든 페이지 최상단에서 실행되는 리액트컴포넌트
- `_document.js` : 모든 페이지 최상단에서 실행되는 리액트컴포넌트
- `commons.[hash].js` : 여러페이지에 공통으로 사용되는 내부 모듈과 외부 모듈
- `webpack-[hash].js` : 웹팩 런타임 코드
- `main-[hash].js` : 웹팩 런타임 코드

## 2) `_app.js` : 페이지 공통기능 구현하기

- `/pages/_app.js` 에 위치
- 페이지를 변경해도 지속적인 레이아웃 설정
- 페이지를 탐색할때 상태 유지
- 추가 데이터 페이지에 주입
- 전역 상태값 관리 (스토어 위치)
- 글로벌 스타일 설정 : reset-css, Theme
- `getInitialProps()`를 최초로 로딩
  > `_app.js`에서 최초로 `getInitialProps()`를 호출하며, 사이트 최초 접속한 URL에서 불러올 컴포넌트(or페이지)의 **서버에서 실행될 `getInitialProps()`**에게 context를 넘기며, **최초 접속URL이 아닌 경우에의 `getInitialProps()`들은 `componentDidMount()`와 동일한 역할을 하며, 클라이언트에서 실행**된다. 확인은 서버콘솔과, 브라우저 콘솔을 확인하면 됨!
-

## 3) `_document.js`

## 3) `_error.js` : 404 에러페이지 구현

[next 공식문서 - 에러페이지 커스텀하여 구현](https://nextjs.org/docs/advanced-features/custom-error-page)
넥스트느 기본적으로 404페이지 기능을 구현한다. 만약 직접 페이지를 구현하고 싶다면 `pages/_error.js`경로에 해당 파일을 생성하고 코드를 작성한다. ` _app.js``_document.js `와 마찬가지로 기본값이 존재하며, pages폴더에 작성된 동일 파일명이 있다면 기본값이 무시되며 해당파일로 실행된다.

- `getInitialProps`와 함께 사용하여 에러페이지 띄운다
- 상태코드 별로 컴포넌트를 따로 작성한 뒤, 상태코드에 따라 컴포넌트 출력하면 된다.
- 내장 오류페이지를 사용하기 위해선 `next/error`모듈의 `<Error />`컴포넌트를를 사용한다.

# next 기본 기능

## 1) 각 페이지별 `<Head>` 설정

`next/head` 모듈의 `Head` 컴포넌트로 각 페이지 별 title, meta등 설정할 수 있다.
[page1파일](./pages/page1.js) 확인

## 2) 정적파일 사용

프로젝트 루트에 `static`폴더를 생성하고 원하는 이미지를 위치시키고 사용!

```js
```

- 이 방식의 단점은 파일 내용과 상관없이 항상 같은 경로가 사용 됨으로 **브라우저 캐싱에 불리**! [page1파일](./pages/page1.js) 확인
- [3) 웹팩 설정 변경하기](#3-웹팩-설정-변경하기) 방식을 보고 정적파일 해시하기 & 모듈로 이미지 임포트 하기를 참고하여 사용하기 추천

## 3) 스타일시트 작성

넥스트에서는 styled-jsx 패키지를 제공한다. **css-in-js 방식으로 스타일 시트를 작성**할 수 있다. 각페이지에서 작성된 스타일은 해당 파일에서만 적용된다. `p`, `div` 같은 태그 선택자를 사용한다 해도 해당 컴포넌트의 태그에만 적용된다.

## 4) 웹팩 설정 변경하기

CRA로 리액트앱을 만들떼는 웹팩설정이 불가능 했지만(eject해야함), 넥스트에서는 웹팩설정을 가능하도록 했다.
먼저, 넥스트에서 정적파일을 서비스 하기 위해서는 프로젝트 루트의 static폴더를 이용한다. **브라우저캐싱을 최대로 활용**하기 위해서 파일의 내용이 변경되면 파일 경로도 변경하는 것이 좋다. **웹팩의 file-loader를 사용**해서 이 기능을 구현하자!

- [nextjs 공식문서 next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)
- `npm i file-loader` 설치
- `next.config.js` 생성 & 웹팩설정 [`프로젝트루트/next.comfig.js`확인](./next.config.js)하기
  - `module.exports ={webpack:()={}}` 를 통해 해당 값을 변경한다.
- `file-loader`가 동작하기 위해서는 **이미지를 모듈로 다뤄야(import Image from '경로')**함 [page2.js](./pages/page2.js)확인

## 5) 서버데이터 전달: `getInitialProps`

> 최신 버전에서는 [`getStaticPropsNext`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)와 [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)를 구별하여 사용함을 추천

넥스트에서는 정적메서드 `getInitialProps`를 통해 서버데이터를 페이지의 `props`로 값을 전달한다.
`getInitialProps`는 **페이지 진입직전에 호출**한다. 사용자는 해당 사이트에서 첫페이지(어디든)를 요청하면 `getInitialProps`메서드는 **서버에서 호출**된다. 이후 클라이언트에서 페이지 전환을 하면 그때부터는 클라이언트에서 `getInitialProps`가 호출된다.

- [page3.js](./pages/page3.js)파일 확인
- `getInitialProps` 에 매개변수인 `context`에는 `err`,`req`,`res`,`pathname`,`query`, `asPath`, `AppTree` 가 포함된다!
  - `err` : 에러 내용이 담김
  - `req` : 요청 정보 담김(url, method, header 등 콘솔확인하기)
  - `res` : 응답 내용
  - `pathname` : url 중 pathname 영역 = `/page3` 같은
  - `query` : 브라우저 주소창에 입력되는 쿼리파라미터 `?key=value` 같은 여러개가 객체에 담겨진다!
  - `asPath` : pathname + query으로 `/page3?key=value`와 같은
  - `AppTree` :함수가 담김, 뭐하는지 모르겠음

## 6) 페이지 이동

넥스트는 페이지 이동을 위해 `<Link>` 컴포넌트와 `Router` 객체를 제공한다

### `<Link>`

[nextjs 공홈 - next/link API](https://nextjs.org/docs/api-reference/next/link)

[Page4.js](./pages/page4.js)파일 확인

- `next/link` 모듈사용
- `<Link href='/about' passHref><a>이름</a></Link>`
- `<Link>`를 사용하면 버튼이 생성된다.
- **속성**
  - `href` : 파라미터를 전달된 페이지로 이동 (**pages폴더의 파일 경로**)
  - `passHref` : 자식요소에도 href속성이 적용된다, SEO 최적화를 위해 붙이기를 권장, [`React.forwardRef()`와 함께 이럴때 특히 꼭 쓰기](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component)
  - `as` : 브라우저 url에 표시될 경로 지정, `href`는 pages폴더의 내부 경로
  - `prefetch`
  - `replace` : urlpath의 history에 push 하지 않고 지정 파라미터로 대체하도록 함!
  - `scroll` : 링크를 통해 페이지 이동시 스크롤이 자동 맨위로 이동함, 이를 막기위해 `scroll={false}`속성을 사용함
  - `shallow`

### `Router`

[nextjs 공홈 - next/router API](https://nextjs.org/docs/api-reference/next/router)

**useRouter hooks를 사용**
`const router = useRouter();`
`router.push(url경로, as속성, 옵션)`

- url 경로 : pages 폴더의 경로, 실제 페이지 값
- as 속성 : 브라우저 주소창에 표시될 내용 기본값은 url 경로
- options : shallow 속성에 대한.. `getStaticProps`,`getServerSideProps`, `getInitialProps` 와 연관, 기본값 false

> 외부 URL로 이동시에는 라우터 사용하는 것이 아닌 **window.location**을 사용하는 것이 적합하다

## 7) 넥스트의 코드분할

### pages 폴더별 분할

넥스트에서는 pages폴더의 파일별로 번들파일을 생성(코드분할 됨)

### 동적임포팅 사용 모듈 분할

동적임포팅(dynamicImport)로 사용된 모듈(파일, 컴포넌트) 또한 별도의 번들로 분할
[dynamicImport.js](./src/dynamicImport.js)파일 확인하기

- 동적임포팅 한 뒤 빌드된(`.next/chunks/[해쉬].js`) 파일을 보자 동적임포팅 한 모듈과 같은 내용을 확인 할 수 있다.
- `.next/server/[해쉬].js`에서 또한 분리된 동적임포팅 파일을 확인 할 수 있다.
- 즉, 동적임포팅 사용할 경우 서버/클라이언트 두곳에서 사용하는 파일이 각각 번들링함

### `getInitialProps()`에서 동적임포트 사용하기

[dynamicImport2.js](./src/dynamicImport2.js)파일을 추가로 작성하여 `getInitialProps()`에 추가하였다.[index.js](./pages/index.js)를 확인하자

- 사이트 첫 페이지가 로딩될 땐 SSR을 하기 때문에 코드분할 파일을 내려받지 않는다.
- 이후 다시 `home`버튼을 클릭하여 페이지에 진입했을때 CSR을 하기 때문에 코드분할 파일을 내려받는다.(개발자보-네트워크 확인)

### 공통사용 모듈 분할

공식 : `모듈이 사용된 페이지수 >= 전체페이지수/2` 때 공통모듈 코드분할

여러 페이지에 공통으로 사용되는 모듈 또한 별도의 파일로 분할

- 공통 모듈로 사용할 파일 생성 : [`src/util.js`](./src/util.js)

## 8) 서버사이드 캐싱 - 웹서버 직접 구현

[nextjs 공식문서 커스텀 서버](https://nextjs.org/docs/advanced-features/custom-server)

- **SSR 캐싱을 위해** 웹서버를 직접 띄우자!
- `express` 프레임워크 사용 : `npm i express`
- [`프로젝트루트/server.js`](./server.js) 만들어 서버 구현
  - express, next, lru-cache, url 모듈 사용
  - lru-cache 초기 설정 : max 100, age 60초
  - `넥스트실행객채.prepare().then()` : 넥스트 준비과정이 끝나면 `then`의 콜백함수 실행
  -

## 9) 페이지 미리 랜더링하기

페이지를 미리 렌더링하면 서버의 cpu자원을 절얄할 수 있음. 미리 렌더링한 페이지는 서버에서 next를 실행하지 않고도 **정적페이지를 서비스** 할 수 있다.

- [nextjs 공식문서 static HTML 내보내기](https://nextjs.org/docs/advanced-features/static-html-export)
- 넥스트에서는 `next export`명령어로 페이지를 미리 렌더링
- **렌더링 전 빌드는 필수**!
- `npx next build && npx next export` 로 페이지를 렌더링 하자
- 미리 렌더링한 페이지는 `/out`폴더에 위치, 각페이지별 html파일이 생성된다

### 정적페이지 서비스하는 웹서버 작성

아래 예제 코드는 단순히 정적페이지만 서비스하는 웹서버 로직이다.

- express를 통해 static폴더를 설정
- ilsten()을 통해 서버를 열어두면 미리 렌더링된 html파일로만 사이트가 구현
- `node <웹서퍼-파일명>.js`를 통해 서버를 실행시켜 확인하자!
  > **정적페이지 사이트와 동적페이지 어떻게 구분해 ?**
  > 정적 웹서버를 열고 `http:localhost:3000/page3?text=여기에글을입력해서` 와 같이 **주소창에 쿼리파라미터를 포함하여 접속**해보자! 쿼리파라미터가 제대로 작동하지 않으며 화면에 `Cannot GET /page3`라는 안내 문구와 콜솔창에 404 에러를 확인 할 수 있다.
  > 하지만 넥스트에서는 쿼리파라미터를 활용한 정적페이지 구현을 할수 있도록 `exportPathMap`을 사용하니 아래에서 확인하도록 하자!

```js
// server.js

const express = require('express');

const server = express();
server.use(express.static('out'));
server.listen(3000, (err) => {
  if (err) throw err;
});
```

## 10) `exportPathMap` : 정적페이지에서 쿼리파라미터 사용하기

`exportPathMap`는 넥스트에서 제공하는 옵션으로 쿼리파라미터를 활용해 정적페이지를 만들수 있도록 한다. 설정은 웹팩파일을 수정해야 한다.

- `async` 콜백을 사용할 경우 `defaultPathMap`와 `{dev, dir, outDir, distDir, buildId}` 2개의 매개변수를 를 사용할 수 있다. 자세한 설명은 [next 공식문서 `exportPathMap`사용법](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap)를 확인하여, 각 매개변수사용법을 확인하자
- `next.config.js`를 프로젝트 루트에 생성하여 필요한 `exportPathMap` 옵션을 추가해 보도록 하자
  - [`./next.config.js`](./next.config.js)

```js
module.exports = {
  webpack: (config) => {
    // 웹팩설정
  },
  exportPathMap: async (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) => {
    return {
      '브라우저-URL-경로': {
        page: 'pages폴더의-페이지-경로',
        query: { 파라미터key: '값' },
      },
    };
  },
};
```

- 위 코드와 같이 `/page3`,`/page3-hi`,`/page3-bye` url에 쿼리 정보를 미리 입력하여 설정
- **설정한 다음 `npx next build && npx next export` 빌드와 내보내기를 꼭하고 `out`폴더 HTML정적파일에 반영해야 한다!**
- 노드 환경을 **프로덕션 모드로 서버를 실행**시키자!(**데브 모드에서는 정적페이지 확인이 안된다**) : `NODE_ENV=production node server.js`
- 주소창에 `localhost:3000/page3-hi`와 같이 내가 지정한 path로 접속해보자! 해당 지정한 파라미터가 화면에 표시된 것이 확인된다! = 이방식으로 블로그포스팅 페이지 조정이 가능한건가?

> 여기 까지 진행한 뒤 서버를 확인하면 지정한 page이외의 경로가 먹통이 된 것을 확인 할 수 있다.
> `out`폴더를 보고 확인할 수 있지만, `next.config.js`에서 `exportPathMap`으로 설정한 페이지만 HTML파일이 생성된 것 때문인데, `server.js`의 코드에서 정적페이지와 동적페이지를 동시에 서비스 할수 있도록 로직을 수정해야 한다~!

## 11) styled-components 적용

SSR에서 스타일을 적용하기 위해서는 스타일 코드를 추출하여 html에 삽입하는 과정이 필요하다.(앞에서 해봤음~!)

- 넥스트에서 기본으로 제공하는 styled-jsx는 `_document.js`에서 스타일코드를 추출한다.
- [`/pages/_document.js`](./pages/_document.js)에 styled-components를 사용하는 코드를 작성하자
- `_document` 파일은 서버에서만 렌더링 되며 onClick은 작동하지 안음

### 서버와 클라이언트 결과값 일치시키기

스타일 시트를 SSR적용을 한 뒤 살펴보면, 클라이언트와 서버간 생성하는 해쉬값이 다르기 때문에 콘솔창에 에러가 출력된다.

```bash
// 콘솔창 에러내용
react-dom.development.js?61bb:88 Warning: Prop `className` did not match. Server: "sc-AxiKw frxxRJ" Client: "sc-AxjAm kQkuzO"
    in h1 (created by styled.h1)
    in styled.h1 (created by Index)
    in div (created by Index)
    in Index (created by MyApp)
    in Layout (created by MyApp)
    in MyApp
    ...
```

이 문제를 해결하기 위해 `bable-plugin-styled-components`패키지를 설치하고 바벨 설정을 수정하도록하자!

> next는 CRA와 다르게 바벨/웹팩 설정을 자유롭게 할 수 있음!

- `npm i babel-plugin-styled-components`
- [`/.babelrc`](./.babelrc) 파일을 프로젝트 루트에생성 & 아래 내용 기입
  - `next/babel` 프리셋은 next에서 바벨설정을 하기위해 항상 포함시켜야 한다
  - `"plugins"`에 플러그인을 추가해준다!
  - 콘솔에 뜨던 에러창이 사라진 것이 확인된다~ 굳굳굳!!
