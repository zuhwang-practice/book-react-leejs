- [SSR과 CSR 혼합 사용](#ssr과-csr-혼합-사용)
  - [부분 CSR 처리하기](#부분-csr-처리하기)
  - [SSR 캐싱하기](#ssr-캐싱하기)
  - [리액트 SSR 함수 `renderToNodeStream()`](#리액트-ssr-함수-rendertonodestream)
  - [`renderToNodeStream()` 적용하여 server.js 구성](#rendertonodestream-적용하여-serverjs-구성)
  - [`renderToNodeStream()` 사용하며 SSR 캐시하기](#rendertonodestream-사용하며-ssr-캐시하기)

# SSR과 CSR 혼합 사용

SSR은 cpu자원을 많이 사용하는데, 특히 렌더링 연산시 사용량이 증가한다.
한순간 트래픽이 몰려 모든 요청을 처리할 수 없을때 프로젝트 상황에 맞는 적절한 방법을 사용해 처리해야 한다.

1. 평소 SSR 처리, 트래픽 장애 시 CSR 처리하기 : SEO가 중요한 사이트에서는 추천하지 않음
2. 데이터 의존성이 전혀 없는 페이지는 빌드시 미리 렌더링 > 정적페이지 서비스

## 부분 CSR 처리하기

1. `Home` 컴포넌트에서 `username`이 표시되길 바란다면 이 부분만 마운트 이후 데이터패치 진행
2. `renderPage`, `prerenderPages` 함수를 작성하여 공통모듈(`common.js`)작성
3. [`prerender.js`](./src/prerender.js) 파일을 생성하여 데이터의존도 낮은 일부 페이지만 미리 렌더링 하도록 리팩토링 하자.
4. 미리렌더링한 페이지를 활용할수 있도록 `renderPage()`메서드 적용하도록 [`server.js`](./src/server-prerender-ssrcache.js.js) 파일 수정
5. 웹팩 설정수정 : `prerender.js`파일도 웹팩으로 빌드하도록 [webpakc.config.js](./webpack.config.js) 수정하자
6. package.json의 - 스크립트 수정 : build는 웹팩과 prerender.js를 동시해 실행하도록 한다

## SSR 캐싱하기

데이터 의존도가 높은 페이지는 정적페이지 서비스를 사용할 수 없다. 하지만 데이터 의존도는 높지만, 자주 변하지 않는 데이터라면 SSR 결과를 캐싱하여 활용할 수 있다.

- 제한된 메모리 안에 캐싱데이터를 저장하려면 지울 데이터를 결정하는 알고리즘이 필요하다. 이를 위한 패키지를 설치하도록 한다!(만드는건...😅)
  `npm i lru-cache`

> ### lru-cache 패키지
>
> 정해진 최대 캐시 개수를 초과하면 LRU(least recently used) 알고리즘에 따라 가장 오래동안 사용하지 않는 캐시를 제거함

- [server.js](./src/server-prerender-ssrcache.js.js)를 수정하도록 한다.
- 서버를 열고 사이트를 확인해보자, 먼저 첫페이지에서는 캐싱데이터가 없음으로 콘솔에 아무런 반응이 없지만, 두번째 같은패이지를 방문(새로고침)했을때는 콘솔에 '캐시사용'이 출력된다.

## 리액트 SSR 함수 `renderToNodeStream()`

리액트에서 제공하는 SSR 함수는 2종류가 있다.

- `renderToString()` : 모든 렌더링 과정이 끝나야 문자열로 된 결과값을 반환
- `renderToNodeStream()` : 호출 즉시 노드의 스트림 객체를 반환한다. 스트림객체는 조각난 데이터를 보낼 수 있음으로 렌더링이 끝날때 까지 기다리지않고 조각만 만들어지면 데이터 전송을 시작한다, 즉 렌더링중 데이터 전송을 함으로 로딩지연이 짧아진다

> **Node's STREAM**
> 스트림은 배열이나 문자열 같은 데이터 컬렉션, 크기가 큰 데이터를 다룰 때 유용. 스트림은 데이터를 청크 단위로 쪼개 전달하기 때문에, 데이터가 완전히 준비되지 않아도 전송 시작할 수 있다(스트리밍, 버퍼 같은 개념)
>
> - 일반 파일 보내기
>
> ```js
> app.get('/readfile', (req, res) => {
>   fs.readFile('./big_file.zip', (err, data) => {
>     if (err) throw err;
>     res.end(data);
>   });
> });
> ```
>
> - 스트림 활용 파일보내기
>
> ```js
> app.get('/readfile', (req, res) => {
>   // 파일을 읽기위해 스트림으로 파일객체 생성
>   const filestream = fs.createReadStream('./big_file.zip');
>   filestream.pipe(res);
> });
> ```
>
> **노드의 http-response 객체는 쓰기가능한 스트림객체(writable-stream)**임으로 읽기스트림으로 생성한 filestream은 pipe()를 통해 쓰기가능한 객체 res로 데이터를 전달한다.
>
> > `read-stream` => `transform-stream` => `transform-stream` => `writable-stream`
>
> - 여려 개의 스트림 연결하기
>
> ```js
> readableStream
>   .pipe(transformStream1) // 추가작업1
>   .pipe(transformStream) // 추가작업2
>   .pipe(writableStream);
> ```

## `renderToNodeStream()` 적용하여 server.js 구성

[server.js](./src/server-node-stream.js)의 내용을 확인하자.

- 이전에 renderToString때 분리했던 코드를 다시 가져온 것이 많다.
- 스트림방식에서는 `__STYLE_FROM_SERVER__`를 사용하지 않음으로 삭제하는 코드를 작성한다.

## `renderToNodeStream()` 사용하며 SSR 캐시하기

[server.js](./src/server-node-stream-cache.js)의 내용을 확인하자.

스트림으로 전송된 데이터는 캐싱하지 못한다.
스트림방식에서 캐싱 구현하기 위해서는 스트림으로 전송되는 청크데이터에 접근해야 한다. 이를 위해 두 스트림 사이에 직접구현한 스트림을 끼워 넣어야 한다!
