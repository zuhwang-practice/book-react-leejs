# 1) 설치

- 기본 설치
  - react
  - react-dom
  - @babel/core
  - @babel/plugin-proposal-class-properties
  - @babel/preset-react
  - @babel/preset-env
  - webpack
  - webpack-cli
  - babel-loader
  - html-webpack-plugin
  - clean-webpack-plugin : 최근 버전업 되면서 생성된 번들코드를 제거하는 이슈가 있음. 사용하지 말도록!(나도 자꾸 server.bundle.js가 삭제됨 ㅠ)
- SSR을 위한 설치
  - express : 웹서버를 띄우기 위한 express 설치
  - @babel/cli : 서버에서 사용될 자바스크립트 파일 컴파일 할때 사용
  - @babel/plugin-transform-modules-commonjs : ESM으로 작성된 모듈시스템을 commonjs모듈시스템으로 변환 플러그인(서버 node환경은 commonjs 모듈시스템을 사용하기에)
- 기타 설치
  - file-loader : 이미지 모듈을 사용하기 위해 설치
  - webpack-node-externals : node 환경일때 node_modules파일 웹팩번들링에 제외하는 설정

# 2) SSR 함수

- 최초 렌더 이후 동적 상태변화 페이지 렌더링 (state변화에 따른 렌더링 필요)
  - renderToString (from 'react-dom/server')
  - renderToNodeStream

* 정적 페이지 렌더링
  - renderToStaticMarkup
  - rendertoStaticNodeStream

- [hydrate](#7-hydrate-사용) : DOM에 이벤트 함수 연결 (ReactDOM.render에서 render 대신 사용한다)

# 3) server.js 작성

[`ser/server.js`](./src/server.js)를 생성하여 웹서버를 구동한다.

- @babel/plugin-transform-modules-commonjs 플러그인 사용으로 ESM 모듈시스템으로 작성하면 자동 commonjs로 변형된다.

# 4) 바벨 설정

클라이언트/서버를 위한 각각의 바벨 설정이 필요하다.

**클라이언트는 아래 3가지 필수로 설정 필요**

- @babel/preset-env : 오래된 브라우저 지원하기 위한 용도, 즉 서버엔 필요없음
- @babel/preset-react
- @babel/plugin-proposal-class-properties

**서버에서는 아래 3가지 필수로 설정 필요**

- @babel/preset-react
- @babel/plugin-proposal-class-properties
- @babel/plugin-transform-modules-commonjs : 서버 Node환경에서만 필요! 클라이언트에선 필요없음

결국 필요한 바벨 설정은 아래와 같이 각 환경별로 따로 작성하게 된다.

- 서버/클라이언트 공통 사용할 : [`babelrc.common.js`](babelrc.common.js)

```js
const presets = ['@babel/preset-react'];
const plugins = ['@babel/plugin-proposal-class-properties'];
module.exports = { presets, plugins };
```

- 서버에서만 적용할 : [`babelrc.server.js`](babelrc.server.js)

```js
const config = require('./babelrc.common.js');
config.plugins.push('@babel/plugin-transform-modules-commonjs');
module.exports = config;
```

- 클라이언트에서만 적용할 : [`babelrc.client.js`](babelrc.client.js)

```js
const config = require('./.babelrc.common.js');
config.presets.push('@babel/preset-env');
module.exports = config;
```

# 5) 웹팩 설정

[웹팩설정파일 `webpack.config.js`](./webpack.config.js)를 확인하도록 하자.

- html체 추가되는 번들 경로와 바벨설정 경로 추가
- output.publicPath 설정 : html-webpack-plugin이 html을 생헝할때 html내부 리소스 파일의 경로를 만들때 사용된다. path 경로를 CSR에서는 문제없이 사용가능하지만 SSR에서는 문제가 되기 때문에 server.js파일에서 url이 /dist로 시작한느 경우에만 dist폴더에 있는 파일을 서비스 하도록 설정했기에 publicPath도 같게 설정했다. 웹팩은 클라이언트 코드에서만 실행할 예정임으로 babel-loader가 클라이언트 설정으로 실행되도록 한다!
- modules.rules.use.options.configFile=기본 설정파일을 을러들인다. 여기서는 클리이언트 바벨설정(.babelrc.client.js)을 불러들였다.

**서버는 @babel/cli를 통해 바벨만 실행**
**클라이언트는 webpack을 실행**

# 6) package.json 스크립트 수정

원활하게 서버띄우고 상태를 확인하기 위해 스크립트 명령어를 수정하도록 한다.

```js
{
  // ... 생략
 "scripts": {
    "build-server": "babel src --out-dir dist-server --config-file ./.babelrc.server.js",
    "build": "npm run build-server && webpack",
    "start": "node dist-server/server.js"
  },
}
```

- build-server : `.babelrc.server.js` 바벨설정을 통해 서버코드 컴파일링 하여 `dist-server`폴더에 동일 파일 생성
- build : 스크립트 `build-server`를 실행하여 바벨파일 생성한 뒤 웹팩 실행
- start : 노드를 통해 `dist-server` 폴더의 `server.js`실행 = express 웹 서버를 띄움, **빌드후에 실행할 수 있다**..!ㄴ

# 7) `hydrate()` 사용

SSR이이후 분리되어 있는 이벤트 함수를 **hydrate()를 통해 DOM요소에 이벤트 처리 함수를 연결**해주는 역할을 한다.

```js
// index.js 에서 ReactDOM.hydrate()로 돔요소를 root에 붙이자
ReactDOM.hydrate(<App page='hone' />, document.getElementById('root'));
```

# 8) HTML에 서버 데이터 넣기

[`templete/index.html`](./template/index.html)을 수정하여 초기값 대이터를 잡을 수 있다.

```html
<!-- ... 생략 -->
<!-- template/index.html의 <head>태그 안에 <script>를 추가하자 -->

<script type="text/javascript">
  window.__INITIAL_DATA__ = __DATA_FROM_SERVER__;
</script>

<!-- ... 생략 -->
```

- 서버는 `__DATA_FROM_SERVER__`에 필요한 값을 채워 전달하자
- 클라이언트는 `window.__INITIAL_DATA__`를 통해 서버의 데이터를 받는다
- [`server.js`](./src/server.js)에 위 2개 설정을 반영하도록 한다.

```js
import * as url from 'url'; // url 모듈 추가임포팅

// ..생략

app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname === '/' ? 'home' : parseUrl.pathname.substr(1);
  const renderSTR = renderToString(<App page={page} />);
  const initialData = { page };
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderSTR}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialData));
  res.send(result);
});

// ..생략
```

# 9) 클라이언트에서 서버 데이터 사용하기

`__DATA_FROM_SERVER__`에 담긴 값을 클라이언트에서 사용하도록 하자! 우리는 `template/index.html`에서 서버데이터를 `window.__INITIAL_DATA__`에 담았음으로. 해당 속성값을 사용하여 서버데이터를 사용한다!

- **리덕스를 사용하는 경우** : 리덕스의 상태값을 `window.__INITIAL_DATA__`로 전달해서 사용!
- [`src/index.js`](./src/index.js)에서 아래와 같이 설정하자.
- App컴포넌트의 **props.page**에 값을 전달!!

```js
// src/index.js

// ? 서버에서 받은 데이터 사용하기
// 저정한 속성의 값을 변수화하여 사용하기 편하게 하였다
const initialData = window.__INITIAL_DATA__;

ReactDOM.hydrate(
  // page에 그려질 값을 아래 서버데이터에서 받아오도록 설정하였다
  <App page={initialData.page} />, // props.page에 값 전달
  document.getElementById('root'),
);
```

# 10) SSR에 style 적용

전통적인 css파일을 적용한다면 SSR 시 특별히 고민할 것이 없음. 하지만 그 밖에 경우 **css-modules, css-in-js** 에는 추가작업이 필요하다. 언급한 두가지 방식 모두 js가 실행되면 style 코드가 DOM에 삽입되는 방식이기 때문인데, 서버에는 DOM(브라우저에만 있음)이 없기 때문에 추가작업이 필요하다!

## styled-components 추가설정

가장많이 쓰는 css-in-js 방식의 styled-components 추가 설정을 알아보자

1. 우선 styled-component로 컴포넌트 작성 [src/App.js](./src/App.js) 확인
2. 1번을 localhost에서 확인하면 되다만 스타일 적용을 확인 할 수 있다.
3. [`template/index.html`](./template/index.html)에서 스타일 코드 넣을 곳에 변수작업(`__STYLE_FROM_SERVER__`)

```html
<head>
  <!-- ... 기타 내용 생략 -->
  <!-- ! 서버에서 받은 스타일 내용이 아래 작성된다  -->
  __STYLE_FROM_SERVER__
</head>
```

4. [`src/server.js`](./src/server.js)의 내용을 수정한다

```js
import { ServerStyleSheet } from 'styled-components';
app.get('*', (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
  const sheet = new ServerStyleSheet();
  const renderSTR = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags();
  const initialData = { page };
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderSTR}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialData))
    .replace('__STYLE_FROM_SERVER__', styles);
  res.send(result);
});
```

- `import {ServerStyleSheet} from 'styled-components'` : 스타일을 추출할 모듈 임포트
- `const sheet = new ServerStyleSheet()` : 객체 인스턴스화
- `sheet.collectStyles(<App page={page}>)` : `collectStyles()` 메서드에 인자로 넣은 컴포넌트에서 스타일을 추출하기 위한 코드가 리액트 요소(컴포넌트)에 삽입되며, 실제 정보는 `renderToString()`메서드 호출이 끝나야 수집 가능하다
- `sheet.getStyleTags()` : 스타일 정보 추출하는 메서드, 추출한 스타일 정보를 변수화 하여 최종 값으로 전달
- `replace('__STYLE_FROM_SERVER__', styles)` : 우리가 지정한 `__STYLE_FROM_SERVER__` 변수에 styles값을 담아 html에 보낸다.

5. 빌드후 서버열고 확인하도록 하자 : 스타일이 적용됨!

# 11) 이미지 모듈 적용

웹팩에서는 자바스크립트 파일 뿐만아닌 모든 파일이 모듈이 될수 있다. 그 중 이미지 파일은 file-loader, url-loader를 통해 처리하게 되는데, 로더에 전달된 리소스 파일은 output설정을 통해 번들 폴더에 복사되며, 자바스크립트 코드에는 복사된 이미지파일의 경로가 반환된다.

- 이미지 파일의 경우 서버/클라이언트는 같은 파일 경로를 공유해야 한다.
- 따라서 file-loader를 통해 처리한 파일은 서버/클라이언트 같은 로더로 처리!

## 웹팩으로 서버코드 빌드하기

- [webpack.config.js](./webpack.config.js) 을 아래와 같은 구조로 변경함

```js
// webpack.config.js

// 노드환경에서는 node_modules의 파일을 번들링할 필요가없기에, 그거 제외시키는 모듈 임포트
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer) {
  // ... 매게변수로 서버환경인지 확인하여 웹팩 설정을 한다
}
// false = 클라이언트일때, true = 서버일때 각 설정을 담는다
module.exports = [getConfig(false), getConfig(true)];
```

- `webpack-node-externals` : node환경은 node_modules의 기본 패키지를 모두 소유하고 있다. 그러므로 node(서버)환경는 node_modules의 패키지를 포함하여 웹팩 적용할 필요가 없다. node-externals를 통해 node_modules를 제외하여 웹팩을 적용하는 모듈이다.
- `getConfig()`를 통해 서버일때/클라이언트일때 환경설정을 각 적용한다.
- `module.exports`가 배열(`[]`)일때, 배열의 index만큼 웹팩이 실행된다. 여기서는 클라이언트가 먼저, 다음 서버용 번들링이 진행된다.

## `getConfig(isServer)` 작성하기

```js
function getConfig(isServer) {
  return {
    entry: isServer
      ? { server: './src/server.js' }
      : { main: './src/index.js' },
    output: {
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    target: isServer ? 'node' : 'web',
    externals: isServer ? [nodeExternals()] : [],
    node: {
      __dirname: false,
    },
    optimization: isServer
      ? { splitChunks: false, minimize: false }
      : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babalrc.server.js' : '.babelrc.client.js',
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: isServer ? false : true,
            },
          },
        },
      ],
    },
    plugins: isServer
      ? []
      : [
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            template: './template/index.html',
          }),
        ],
  };
  mode: 'production';
}
```

## 서버/클라이언트 웹팩 설정 옵션

> `isServer? 서버일때 옵션 : 클라이언트일때 옵션` 과 같이 **조건부 연산을 적용하여 작성**

- `entry` : 서버/클라의 엔트리는 server.js/index.js로 분리 적용
- `output.filename` : 브라우저의 캐싱 효과때문에 chunkhash 사용함, 서버는 필요없음!
- `target` : node릅 입력하여 웹팩에 서버 코드를 번들링 하는 것이라고 알려줄수 있다.(**웹팩은 node가 입력되면 node 특화된 번들링 과정을 거친다. 대표적 예로 fs, path 모듈과 같이 노드에 내장된 모듈은 번들 파일에 포함시키지 않는다.**)
- `externals` : node_modules 폴더를 제외시키이 위한 옵션 서버에만 적용
- `node.__dirname:false` : 이 옵션을 사용해야 절대경로인(`/`)가 제외되며, 노드에서처럼 `__dirname`이 적용, true일땐 `/__dirname`이 적용
- `optimization` : 코드압축 옵션, 클라이언트만 적용한다. 서버는 필요없음
- `babel-loader/options/configFile` : 서버용 바벨설정, 클라이언트용 바벨설정을 각각 적용
- `file-loader` 설정
- `plugins` : 플러그인별 적용 위치 지정, 위 예제에서는 클라이언트에서만 필요함!

## package.json 스크립트 수정

```js
{
  // ...  생략
  "scripts" : {
    "build" : "webpack",
    "start" : "node dist/server.bundle.js"
  }
}
```
