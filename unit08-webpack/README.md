- [웹팩](#웹팩)
- [웹팩이 필요한 이유](#웹팩이-필요한-이유)
- [웹팩 초급](#웹팩-초급)
  - [설치](#설치)
  - [실행](#실행)
  - [설정파일](#설정파일)
    - [번들파일 output](#번들파일-output)
    - [로더(loader) 사용하기](#로더loader-사용하기)
      - [1) babel-loader](#1-babel-loader)
        - [설정 방법 1](#설정-방법-1)
        - [설정 방법 2](#설정-방법-2)
      - [2) css-loader & style-loader](#2-css-loader--style-loader)
      - [3) 기타 파일 로더](#3-기타-파일-로더)
    - [플러그인 적용](#플러그인-적용)
      - [babel-loader 플로그인적용](#babel-loader-플로그인적용)
      - [html-webpack-plugin & clean-webpack-plugin](#html-webpack-plugin--clean-webpack-plugin)
      - [define-plugin](#define-plugin)
      - [provide-plugin](#provide-plugin)
- [웹팩 고급](#웹팩-고급)
  - [나무흔들기(tree-shaking)](#나무흔들기tree-shaking)
  - [코드 분할(code-split)](#코드-분할code-split)
    - [SplitChunks 옵션](#splitchunks-옵션)
  - [동적 임포트(dynamic import)](#동적-임포트dynamic-import)
    - [prefetch & preload](#prefetch--preload)
  - [로더 제작하기](#로더-제작하기)
  - [웹팩 플러그인 제작하기](#웹팩-플러그인-제작하기)

# 웹팩

웹팩 : 모듈 번들러(module bundler)
번들 : 모듈을 하나의 파일로 합쳐 나온 결과파일

# 웹팩이 필요한 이유

- js 파일의 갯수가 증가함에 따라, 관리어려움, 전역변수 덮어씀에 따른 위험 해결

# 웹팩 초급

## 설치

`npm init` : npm 초기화(필수 node_modules 받기)
`npm i webpack webpakc-cli` : webpack, webpack-cli 설치

- webpack-cli : cli(command line interface), 커멘드라인(콘솔)에서 webpack명령어를 실행할 수 있다.

## 실행

`npx webpack <루트.js경로>` 을 통해 웹팩을 실행 할 수 있다. webpack명령어 다음에는 `root.js` 경로를 작성하게 되는데, 기본 값으로 `src/index.js`가 적용된다. 따라서 입력값이 없을경우 웹팩은 src폴더에서 Index.js 파일을 찾아 웹팩을 실행하게 되며, 프로젝트 루트에 dist하위폴더를 생성하여 번들파일인 main.js 를 새로 작성한다.

## 설정파일

- `webpack.config.js`는 전역 설정파일을 나타낸다._- 전역 설정 / 지역 설정에 대한 내용은 바벨과 동일 -_ 프로젝트 루트에 설정파일을 작성해보자.

### 번들파일 output

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, '번들폴더명'),
    // 기본사용
    filname: '파일명.확장자',
    // 또는 아래와 같이 [원본파일명] + [해쉬값].확장자 사용가능
    filname: '[name].[chunkhash].확장자',
  },
  // ...생략
};
```

- filename : 파일명을 지정할때는 단일이름 지정과, 원본이름과 해쉬값을 포함하여 생성 할 수 있다.
- chunkhash : 웹팩이 실행되어 번들파일을 생성할때마다 새로운 해쉬값을 파일을 만든다. 즉 덮어쓰지 않고, 새로 작성
  - chunkhash방식을 사용할 경우 [html-webpack-plugin & clean-webpack-plugin](#html-webpack-plugin--clean-webpack-plugin) 설치, 웹팩설정이 필요하다. (왜 ? 해쉬값이 새로 작성되기때문에, 이를 반영한 index.html을 자동으로 생성해 주어야 하기 때문에)

### 로더(loader) 사용하기

- 로더는 모듈을 입력으로 받아서 원하는 형태로 변환 후 새로운 모듈을 출력해 주는 함수
- 예: babel-loader, css-loader, sass-loader, ts-loader, csv-loader...
- 자세한 것은 [웹팩 공식문서 - 로더](https://webpack.js.org/concepts/#loaders) 확인하기

#### 1) babel-loader

js 최신 문법과 jsx를 js로 변환하기 위해 babel-loader를 설치하고 설정하는 법을 알아보자(이미 바벨에 살짝 다룬 적 있지요!)

##### 설정 방법 1

아래 설명 할 [플러그인 적용](#플러그인-적용)에서 다룬다. 이 방식은 바벨설정/웹팩설정을 따로 작성하지 않고, 웹팩설정에 통합하여 관리하기 때문에 더 편리함.

##### 설정 방법 2

babel-loader를 설정을 위해 `babel.coonfig.js`에 바벨 전역설정(presets, plugins 등..)을 해주고 `webpack.config.js` 에 loader 사용 설정을 해주어야 한다.
`npm i babel-loader @babel/core @babel/preset-react`

- babel-loader : 웹팩에 적용할 로더 설치
- @babel/core : 바벨 초기값 다운로드
- @babel/preset-react : 리액트 프리셋 다운로드

```js
// webpack.config.js modules 키/값
module.exports = {
  // ... 생략
  module: {
    rules: [
      // node_modules 폴더 제외, js or jsx 확장자를 같은 모든 파일에 babel-loader 적용
      { test: /\.js|jsx$/, exclude: /node_modules/, use: 'babel-loader' },
    ],
  },
};
```

설정을 다 마췄다면, dist(지정한 output폴더)에 index.html을 작성하여 리액트로 작성된 페이지를 위치할 div와 불러들일 `번들.js`을 불러온다.

```html
<!-- ...생략 -->
<body>
  <div id="root"></div>
  <script src="./main.js"></script>
</body>
<!-- ...생략 -->
```

- id가 root인 div에 리액트 화면 렌더
- 번들파일인 main.js 스크립트를 불러들임

#### 2) css-loader & style-loader

스타일 적용을 위한 로더 설정을 알아보자. 먼저 css-loader뿐만아닌 스타일 적용을 위해서는 style-loader 2개의 로더를 필요로 한다.
2개를 설치, 적용하자

1. css-loader를 설치 : `npm i css-loader style-loader`
2. App.js에 적용할 App.css를 작성
3. webpack.config.js 에서 로더 설정 : style-loader > css-loader 순으로 배열안에 작성
   - 마지막 로더(오른쪽 끝, 인덱스가 큰수인 로더)먼저 실행이 된다. 즉, css-loader실행 > style-loader 실행
   - css-loader로 **css 데이터 변환** / css코드에 사용된 **`@import`, `url()`등 처리**
   - style-loader로 css데이터를 **style 태그를 추가하여 index.html에 삽입**

#### 3) 기타 파일 로더

png, txt, json 모듈 을 사용해보자.

1. 설치: `npm i file-loader raw-loader`
   - file-loader : 코디에 사용된 파일을 dist(지정 output폴더)에 복사-저장하며, 모듈을 사용하는 쪽에 해당 모듈경로를 넘겨준다.(보통 이미지파일 : jpg, png, gif)
   - raw-loader : 모듈의 자바스크립트 코드를 그대로 가져온다. (보통 : `.txt`파일)
   - url-loader : 작은 이미지 파일만 번들에 포함시켜 이미지 로딩이 지연되는 것을 막는데 사용

> **번들 폴더 이미지 해쉬**
> 웹팩이 실행된 이후 번들폴더(dist)에 포함된 이미지이름에는 각 해쉬값이 포함된다. 이 해시값은 이미지 파일을 수정하는 경우에만 변경되기 때문에 사용자에게 전달된 이미지 파일은 브라우저 캐싱 효과를 최대한 활용 할수 있다. 즉. 이미 불러들인 이미지를 가지고 있으면 사용자는 추가로 다운받지 않는다.

> **file-loader & url-loader**
> 파일로더를 사용하여 이미지파일을 번들(퍼블릭)폴더에 포함시키면 브라우저의 파일 요청 횟수를 줄일 수 있다. 이때 번들파일의 크기가 너무 커지면 자바스크립트가 늦게 실행됨으로(화면 로딩 지연), **번들에는 작은크기의 이미지만 포함싴키는 것이 좋다**. 이럴때는 url-loader를 이용하여 작은 크기의 이미지만 번들에 포함 시킬수 있다.

1. 설정 : webpack.config.js > module > rules 추가

```js
// webpack.config.js

module.exports = {
  // ...생략
  module: {
    rules: [
      // ...생략
      { test: /\.(png|jpg|gif)$/, use: 'file-loader' },
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        // 로더에 옵션을 적용할때는 배열>객체화를 해야 한다! 자세한 옵션은 웹팩 공홈을 확인하자!
        use: [{ loader: 'url-loader', options: { limit: 8192 } }],
      },
    ],
  },
};
```

### 플러그인 적용

플러그인은 로더보다 훨씬 강력함. 왜? 로더는 특정파일에 한해 실행 하지만, 플러그인은 전체에 웹팩실행에 영향을 미친다.
몇가지 유용한 플러그인에 대해 알아보자.

#### babel-loader 플로그인적용

- babel-loader에 프리셋 @babel/preset-react를 웹팩을 통해 적용시켜 보자.

```js
//... Module > rules
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
```

#### html-webpack-plugin & clean-webpack-plugin

번들파일 생성시 chunkhash 옵션을 사용할 경우 번들파일은 웹팩이 실행 될때마다 해쉬값이 변하며, 이를 index.html에도 반영하여 수정하여야 한다. 이를 돕는 플러그인이 html-webpack-plugin & clean-webpack-plugin이다.

- clean-webpack-plugin : 웹팩이 실행 될 때마다 dis 폴더 정리하도록 설정
- html-webpack-plugin : index.html 파일이 생성 되도록 설정

1. 프로젝트 루트에 템플릿/index.html 파일을 생성하자. 이 파일을 기반으로 번들 index.html파일이 작성된다.
   - `<div id='root'>` 와 같이 리액트 요소를 적용할 곳을 지정한다.
2. 웹팩 설정에 html/clean-webpack-plugin 설정을 하자
   - 플러그인은 설치하고 **모듈 import를 해야 함** 주의!
   - 플러그인은 생성자 **new** 키워드와 함께 사용하며, **설치 > 작성하면 모듈 임포트가 자동으로 적용!**
3. 템플릿으로 작성된 html을 기반으로, 웹팩을 실행하여 생성된 `번들+해쉬.js` 자바스크립트 파일을 포함하는 `번들.html`이 새로 구성된다.

```js
// 플러그인 임포트
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  // ...설정 생략
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
  ],
};
```

#### define-plugin

> 디파인 플러그인은 모든 자바스크립트 코드에서 접근 가능한 **전역 변수를 선언하기 위해 사용**된다. 디파인 플러그인으로 선언된 변수는 웹팩으로 소스코드 빌드하는 동안만 사용한다. 즉, 브라우저 런타임에서는 접근이 불가능하다!(**콘솔로그 사용불가**)

디파인 플러그인은 이미 node_modules에 내장되어 있기때문에 따로 설치할 필요는 없다.
디파인 플러그인이 하는 일은 모듈 내부에 있는 문자열을 대채해주는 일을 한다. 해당 플러그인을 사용하기 위해 먼저 리액트 컴포넌트에서 전역 변수를 사용하여 대체할 문자열을 작성하여 보자

```js
// App.js
<div>
  <p>{`앱 버전은 ${APP_VERSION}입니다`}</p>
  <p>{`10*10= ${TEN * TEN}`}</p>
</div>
```

- 웹팩 설정 작성시 문자열은 `JSON.stringify()`사용을 하도록 한다.

```js
// webpack.config.js 플러그인 설정
module.exports = {
  // 생략
  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('1.2.3'),
      TEN: 10,
    }),
  ],
};
```

#### provide-plugin

**자주 사용되는 모듈**을 import 하여 가저오는 것이 귀찮을 때, provide-plugin으로 미리 설정한 모듈을 **자동으로 등록**할 수 있다.
웹팩 기본 모듈로 추가 설치할 필요 없음. 아래와 같이 설정하여 사용해보자.

- jsx 문법 사용을 위해 react모듈을 항상 불러와 사용한다.

```js
import React from 'react'; //.. 맨날 씀.. 귀찮음
import Styled from 'styled-components'; // 컴포넌트마다 씀.. 귀차나
```

```js
// webpack.config.js
module.exports = {
  // 플러그인 설정
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
  ],
};
```

# 웹팩 고급

## 나무흔들기(tree-shaking)

불필요한 코드 제거하는 기능을 나무흔들기라고 표현한다. 웹팩에서 기본제공하는 기능이지만, 완벽하게 구동하지 않을때가 있다. 따라서 어느 정도 알고 사용해야 번들 파일크기를 최적화하여 유지할 수 있다.

- ESM(ecma-script-module-system)으로 작성된 파일만 나무흔들기가 잘 적용된다.
- commonjs 작성된 파일은 나무흔들기가 적용되지 않는다. 주의하자!
- 외부 패키지(모듈)의 경우에도 commonjs로 작성됬다면 나무흔들기가 적용되지 않는다.
- 동적임포팅(dynamic-import)하는 경우에도 나무흔들기 적용 안됨!
- 불러온 함수A 내부에서 함수B가 사용 될 경우, 함수 A, B 모두 불러옴

> **동적임포팅** > `import('./util_exm.js).then(util => util.func1());` 이렇게 사용하는 것

> 나무흔들기 관련 **바벨 사용시 주의할 점**
> 작성한 코드를 바벨로 컴파일 한 후에도 ESM을 유지하고싶다면!
> @babel/preset-env 프리셋을 적용하고 있다면 아래와 같이 babel.comfig.js설정이 필요하다.
>
> ```js
> const presets = [
>   [
>     '@babel/preset-env',
>     {
>       modules: false,
>       // .. 기타설정
>     },
>   ],
> ];
> ```
>
> `modules:false` 는 모듈 시스템을 변경하지 않도록 설정한다.

## 코드 분할(code-split)

프로젝트 단위가 클 때, 동시 사용자가 많을 때, 첫 페이지 로딩에 많은 시간이 소요된다면 ? 코드 분할을 고려하도록 하자.
모든 코드를 하나로 번들하여 사용하는 것은 비효율 적일 수 있다.

- 웹팩 entry 설정을 수정하여 여러파일로 관리한다.
- 웹팩 optimization에 SplitChunks 사용 설정

```js
module.exports = {
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 기본 값 : async (동적 임포트만 분리), 우린 모두 설정하기위해 all 적용
      name: 'vendor', // 기타 모듈, 리액트 모듈은 vendor.js파일로 작성
    },
  },
  // .. 나머지 생략
};
```

### SplitChunks 옵션

- chunks : 기본값=async(동적 임포팅 만 코드분리), all(전제 코드 분리 적용)
- minSize : 30000,(30000 = 30kb) 해당값 이상인 모듈만 분할 대상
- minChunks : 1, 한개 이상의 chunks(번들파일)를 포함한
- cacheGroups : { 파일 분할을 그룹별로 나누어 설정, 외부모듈 = vender, 내부모듈 = default
  - default : { 내부 모듈 설정
    - minChunks 2 , 내부모듈은 2개이상 청크를 포함해야함
    - priority :-20 },
  - vender : { 외부 모듈 설정
    - test : /[\\/]node_nodules[\\/]/,
    - priority:-10,
  - }}

## 동적 임포트(dynamic import)

동적으로 모듈을 가저올 수 있는 기능, **웹팩에서 동적 임포팅을 사용하면 자동으로 코드 분리가 적용**되며, 오래된 브라우저에서도 잘 동작함.

- [`src/index3.js`](./src/index3.js)확인하기
- webpack.config.js에서 entry에 위 index3.js추가, output에 filename, chunkFilename() 분리
  - chunkFilename : 동적 임포트하는 모듈의 번들링 네임규칙을 나타냄
  - filename : entry파일의 번들링 네임규칙
- 웹팩실행후 번들 index.html을 확인하면 스크립트 파일이 2개로 분리된 것을 확인할 수있으며
- 번들 폴더에서 2.chunk.js, 3.chunk.js 와 같이 동적 임포트한 util.js, lodash.js가 각각 분리되어 번들링되었다

### prefetch & preload

`2.chunk.js`와 `3.chunk.js`는 동적 임포트을 통해 분리된 번들이다. 2.3청크 파일을 담은 `myFunc()`가 이벤트 처리 함수로 사용된다면 이벤트가 발생하기 전에 위 2개의 모듈은 가져오지 않는다 이를 **게으른 로딩(lazy loading)**으로 부른다.

웹팩에서는 동적 임포트을 사용할 때 prefetch, preload기능을 활용할수 있도록 옵션을 제공한다.

- prefetch : 가까운 미래 필요한 파일이라고 브라우저에게 알리는 기능, 브라우저가 한가할 때 미리 다운로드 한다. 게으른 로딩 보안
- preload : 지금 당장 필요한 파일을 브라우저에게 알리는 기능, 브라우저는 첫페이지가 로딩될 때 preload를 즉시 다운로드, 남발할 경우 로딩속도가 느려짐!
- 특정컴포넌트에 prefetch, preload 적용법 : `impot(/* webpackPrefetch: true */ '임포팅할것 경로')` : 주석 `/* webpackPrefetch: true */`을 사용하여 설정을 적용한다

- [`src/index4.js`](./src/index4.js)에서 preload, prefetch에 대한 설정을 확인하자... 근대 안됨. 이게 아닌가..?.. 좀더 알아보기 ㅠㅠ

## 로더 제작하기

- 개별 로더 : 모듈을 입력으로 받기 > 원하는 형태로 변경 > 자바스크립트 코드 반환
- 여러 로도 합체 : 모듈입력받기 > 로더 n개 적용 > 마지막 로더는 자바스크립트 코드 반환

* 예제 : [index5.js](./src/index5.js) ... 앙됌ㅋㅋ 다음에 다시 ..!

## 웹팩 플러그인 제작하기

다음에!
