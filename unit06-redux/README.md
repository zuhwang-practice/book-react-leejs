- [객체, 배열의 불변객체 유지하기](#객체-배열의-불변객체-유지하기)
- [불변객체 관리 패키지 immer](#불변객체-관리-패키지-immer)
  - [install](#install)
  - [import](#import)
  - [`produce()`](#produce)
  - [redux에서 immer사용](#redux에서-immer사용)
- [리덕스에서 API 호출](#리덕스에서-api-호출)
- [`createReducer()` 로 리듀서 작성하기](#createreducer-로-리듀서-작성하기)

# 객체, 배열의 불변객체 유지하기

- 객체 : 전개연산자 사용(`...`)
- 배열 : 전개연산자 사용(`...`), `concat`, `filter`, `map` 등 함수사용 (**push, splice등 인덱스 직접 수정 안됨!**)

리덕스나, state를 객체로 변경하게 되면 아래와 같은 코스 모습이 보이게 된다!

```js
return {
  ...state, // userName 이외의 객체 안의 key-value를 복사해 넣고,
  userName: action.payload, // userName의 key에 입력받은 값으로 대체하여
}; // 새로운 객체를 반환한다
```

> 객체 내부가 단순할 땐 문제 없지만 2차 3차 ...객체의 depth가 생긴다면? 복잡시럽! 코드가독성 떨어지면서~ 코드가 보기 싫어지죠?! 이럴 땐 불변객체 관리 패키지를 사용할 것을 추천!
>
> - 객체의 depth가 깊다 : **immer사용 추천**
> - 객체의 depth가 없다 : **내장함수, 전개연산자 사용(`...`) 사용 추천**
>
> _불필요한 상황에 Immer 사용은 코드를 더 복잡하게 만든다._

# 불변객체 관리 패키지 immer

immer는 javascript 엔진의 [proxy](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 기능을 사용한다. 구형브라우저, react-native 환경에서는 지원되지 않음으로 ES5-fallback(속도느린편)을 사용하게 된다.

**속도 비교**
js 내장함수(map과 같은) > immer > ES5-fallback

## install

`npm i immer`

## import

`import produce from 'immer'`

보통 produce라는 이름으로 immer를 불러온다.

## `produce()`

`produce(수정하고 싶은 상태, 어떻게 업데이트하고싶은지 CB)`

```js
const state = {
  name: 'mimi',
  age: 22,
};
const nextState = produce(state, (studunt) => {
  studunt.name = 'zuzu';
});

console.log(nextState);
```

## redux에서 immer사용

```js
// reducer.js

function reducer(state = initState, action) {
  // produce로 switch문을 감싸는 것이 코드가 간결해진다
  // draft는 객체를 생각하면 됨
  return produce(state, (draft) => {
    switch (action.type) {
      case `CREATE`:
        draft.users.push(action.payload);
        break;
      case `UPDATE`:
        draft.users = draft.user.filter(
          (user) =>
            (user.id === action.payload.id && user.name = action.payload.name)
        );
        break;

      case `DELETE`:
        draft.users = draft.users.filter((user) => user.id !== action.payload);
        break;

      case `DELETE_ALL`:
        draft.users = [];
        break;

      default:
        break;
    }
  });
}
```

> 위 예제에서도 불필요한 상황에 immer를 사용했기 때문에 코드가 더 복잡스럽게 보인다. 꼭 필요한 상황에서만 골라 사용하도록 한다!

# 리덕스에서 API 호출

**리듀서는 꼭 순수함수로 작성**되어야 한다. 그러므로 결과값이 항상 다른 API호출은 리듀서에서 할 수 없다.
그럼 어디에서 API호출을 하죠 ? _액션-크리에이터함수나 미들웨어에서 함_

# `createReducer()` 로 리듀서 작성하기

switch문 보다 간결한 리듀서 작성법 `createReducer()` 함수에 대해 알아보자.

[리덕스 툴킷 공식문서-createReducer](https://redux-toolkit.js.org/api/createReducer)

```js
const reducer = createReducer(initState, {
  [CREAT]: (state, action) => state.users.push(action.payload),
  [UPDATE]: (state, action) =>
    (users.users = users.users.filter(
      (user) =>
        (user.id === action.payload.id && user.name = action.payload.name)
    )),
  [DELETE]: (state, action) =>
    (users.users = users.users.filter((user) => user.id !== action.payload)),
  [DELETE_ALL]: (state) => (state.users = []),
});
```
