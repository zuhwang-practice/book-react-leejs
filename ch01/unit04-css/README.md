- [unit04](#unit04)
  - [컴포넌트 파일 작성법](#컴포넌트-파일-작성법)
  - [속성값 타입 정의 `prop-types`](#속성값-타입-정의-prop-types)
  - [컴포넌트 - 관련작업 묶기](#컴포넌트---관련작업-묶기)
- [일반 css적용하기](#일반-css적용하기)
- [css-modules](#css-modules)
  - [classnames package](#classnames-package)
- [SASS 작성](#sass-작성)
  - [설치](#설치)
- [styled-components](#styled-components)

# unit04

**리액트 코딩은 결국 컴포넌트 작성이다!**

## 컴포넌트 파일 작성법

- 0. import(모듈 > 컴포넌트 > 스타일)
- 1. 속성값 타입 정의 코드 : `static propTypes = {}`
- 2. 상태값 초기화 코드 : `state = {}`
- 3. 생명주기 메서드 : `componentDidMount()`
- 4. 기타 메서드 : `onclick=()=>{}`
- 5. render 메서드 : `render(){ return () }`, props, state의 destructuring!
- 6. 컴포넌트 외부에서 정의하는 변수와 함수 : `const 상수 = '상수값'`

## 속성값 타입 정의 `prop-types`

prop-types는 property의 타입을 정의할 때 사용하는 리액트 공식 패키지.

- 대규모의 프로그램을 작성할 때 정적타입사용으로 생산성을 높이기 사용
- 타입 정의를 함으로서 코드를 전부 들여다 보지 않아도 됨!

```js
import PTypes from 'prop-types';

class MyApp extends React.Component {
  static propTypes = {
    name: PTypes.string.isRequired,
    title: PTypes.string,
    age: PTypes.number,
    editable: PTypes.bool,
    onChangeName: PTypes.func,
    onChangeTitle: PTypes.func,
  };
  // ...
}
```

- PTypes.element : tag 요소가능, 리액트 요소(컴포넌트) 만 가능
- PTypes.node : tag 요소가능, number, string 등 가능
- PTypes.instanceOf(Message) : Message클래스로 만든 인스턴스만 가능
- PTypes.oneOf(['a','b']): 전달된 배열에 포함된 값중 하나만 가능
- PTypes.oneOfTypes([PTypes.number, PTypes.string]): 전달된 배열에 포함된 타입만 가능
- PTypes.arrayOf(PTypes.number) : 지정 타입으로만 구성된 배열만 가능
- PTypes.shape({name:PTypes.string, age:PTypes.number}): 지정타입 객체만 가능
- PTypes.objectOf(PTypes.number) : 모든 **값**이 지정타입으로 구성된 객체만 가능(**key는 상관없음**)
- CB-function : 지정콜백함수로 커스텀 속성값 타입 정의 가능!

## 컴포넌트 - 관련작업 묶기

**컴포넌트 분할 기준?**

- UI 컴포넌트
- API 호출
- DB 관리

# 일반 css적용하기

- comp.js에 해당하는 comp.css 파일을 만들어 js 파일내에서 css를 import 하여 사용한다.
- **css selector 중복 문제** : 각각의 css파일속 css셀렉터가 겹칠 경우 웹팩으로 하나의 최종.css 파일로 만들었을때 css 속성이 뒤죽 박죽 적용된다.

# css-modules

`{이름}.modele.css` : 형식으로 css-module파일을 생성한다.

```js
import style from './style.module.css'; // style-sheet import

// ...생략
// jsx
<div className={`${style.클래스이름1} ${style.클래스이름2}`}>스타일 적용!</div>;

// ... 생략
```

- 클래스명을 모듈속성 쓰듯 사용(템플릿 문자열과 변수처리 방식)한다.
- 각 css-selector는 해쉬이름으로 대체되어 사용된다.
- 클래스명 쓰는것이 복잡할때는 `classnames 패키지`를 사용해보자

## classnames package

`npm install classnames`
클래스네임 속성지정을 각 각 변수를 감싸지 않고 `cn()`를 사용하여 처리할 수 있다.
어처피 이방식 잘 안씀.. 그냥 sass쓰든. styled-components쓰든!

```js
import cn from 'classnames';
import style from './style.module.css'; // style-sheet import

// ...생략
// jsx
<div className={cn(style.button, style.big)}>스타일 적용!</div>;
<div className={cn(style.button, style.small)}>스타일 적용!</div>;

// ... 생략
```

# SASS 작성

- 변수사용가능
- 함수화 가능: mixin
- 네스팅 가능
- 코드 재사용을 올린다고는 하나... 다른 프로젝트에서 거의 안씀!

## 설치

`npm i node-sass`

- CRA 로 진행해도 sass는 설치해야 한다.
- CRA는 .sass로 작성하든 .css로 작성하든 알아서 컴파일 하도록 웹팩이 짜여 있다

# styled-components

- `` ` ``백틱 기호를 사용한다.
- css-in-js 방식중 가장 유저가 많음
- 설치 필요 : `npm install styled-components`
- props를 통한 동적컴포넌트 설정가능
- 상속 가능 `` 부모컴포.extend`{스타일지정}` ``

```js
// src/Box4.js 를 확인하자!
import styled from 'styled-components';

// 아래와 같이 스타일이 적용된 컴포넌트를 생성하여 사용한다.
const BoxCommon = styled.div`
  height: 50px;
  background-color: #aaa;
`;
```
