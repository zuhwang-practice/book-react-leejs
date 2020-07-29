- [타입스크립트 basic](#타입스크립트-basic)
  - [교차(`&`)타입 & 유니온(`|`)타입](#교차타입--유니온타입)
  - [`type` 키워드로 타입지정](#type-키워드로-타입지정)
  - [`enum` 키워드로 열거 타입지정](#enum-키워드로-열거-타입지정)
  - [`enum` 타입 응용](#enum-타입-응용)
    - [`getEnumLength()`](#getenumlength)
    - [[`isValidEnumValue()`]](#isvalidenumvalue)
  - [`const enum` 상수 열거타입](#const-enum-상수-열거타입)
  - [함수 타입 정의하기](#함수-타입-정의하기)
    - [1) function 키워드 함수 타입지정](#1-function-키워드-함수-타입지정)
    - [2) 익명 함수 타입지정](#2-익명-함수-타입지정)
    - [3) 화살포 함수 타입지정](#3-화살포-함수-타입지정)
    - [4) 선택 매개변수 지정](#4-선택-매개변수-지정)
      - [`?` 매개변수지정 법](#-매개변수지정-법)
      - [`매개변수 : 타입 | undefined` - 언디파인드 유티온 방식](#매개변수--타입--undefined---언디파인드-유티온-방식)
    - [5) 전개연산자 (나머지) 매개변수](#5-전개연산자-나머지-매개변수)
    - [6) `this` 타입지정하기](#6-this-타입지정하기)
  - [원시타입 메서드 추가하기](#원시타입-메서드-추가하기)
  - [함수 오버로드 : 여러게 타입 정의하기](#함수-오버로드--여러게-타입-정의하기)
  - [명명된 매개변수 사용하기](#명명된-매개변수-사용하기)

# 타입스크립트 basic

변수를 1가지 or 여러 타입으로도 지정할 수 있다.

- [./basic.ts](./basic.ts)파일 예제를 확인하자

```js
let v1: number | string = 123;

v1 = '123'; // 문제없음
v1 = true; // boolean에 대한 설정 없음으로 타입에러
```

- `number`
- `string`
- `boolean`
- `Array<number| 또-다른-타입>` : 배열타입 (1개 또는 여러타입 가능)
- `[number, string]` : 배열타입 (1개 또는 여러타입 가능)
- `undefined` : 여러타입 설정할때 주로쓰인다
- `null` : 여러타입 설정할때 주로쓰인다
- `숫자리터럴` : 지정한 숫자 만 갖을 수 있다. `let NUM: 10 | 100;` : 10과 100중에 가능, 나머지는 다 에러
- `문자리터럴` : 지정한 문자 만 갖을 수 있다 `let STR: '이거나' | '저거나';` '이거나', '저거나' 값 2개중 하나만 가능
- `any` : 모든 타입 허용
- `void` : 리턴하지 않고 종료하는 함수의 반환 타입을 말함.
- `never` : 항상 예외발생하여 비정상으로 종료되거나, 무한루프되어 종료되지 않는 함수의 반환타입
- `object` : **인터페이스** 를 통해 객체 속성의 타입 지정이 가능하다

## 교차(`&`)타입 & 유니온(`|`)타입

```ts
let myNum: (1 | 3 | 5) & (3 | 5 | 7);
```

숫자 1-3-5와 숫자 3-5-7의 **교집합인 3|5 만 myNum변수 값**이 될 수 있다.

## `type` 키워드로 타입지정

말이 어렵지만 **type 키워드를 통해 변수화 > 타입할당 하는 방식**이다. 예제를 보고 이해하자

```js
type Width = number | string;
let width: Width; // let width:nuber|string 과 동일
```

## `enum` 키워드로 열거 타입지정

> 열거란? 난 이말이 어렵더라..

type 키워드와 같이 enum 키워드로 객채처럼 값을 지정하는 방식.....말이어렵다 예제를 보자

```js
enum Fruit {
  Orange,
  Orange2,
  Orange3,
  Apple = '나는야 사과야',
  Banana = 5,
  Kiwi = '키키킼키위',
  // Kiwi = ['abc', 'def'],
  // Kiwi = null,
  // Kiwi2 = undefined,
  // Kiwi3 = true,
  // Kiwi3 = () => {},
}

const Orange1: Fruit = Fruit.Orange;
const Orange2: Fruit = Fruit.Orange2;
const Orange3: Fruit = Fruit.Orange3;
const myFavoriteFruit: Fruit = Fruit.Apple;
const myFavoriteFruit1: Fruit = Fruit.Orange;
const myFavoriteFruit2: Fruit = Fruit.Banana;
const myFavoriteFruit3: Fruit.Apple | Fruit.Kiwi = Fruit.Kiwi;

console.log({
  Orange1,
  Orange2,
  Orange3,
  myFavoriteFruit,
  myFavoriteFruit1,
  myFavoriteFruit2,
  myFavoriteFruit3,
});
```

- enum 키워드로 Fruit란 이름의 열거타입을 만들었다
- enum 타입으로 지정한 변수는 let 으로 선언해도 재할당이 안되나보다!
- enum은 값을 지정할 수 있는데 **값이 없는 변수는 최상단에 위치해야 함**, 기본값은 **0**이며, 다음 변수는 이전 변수의 **+1**, 즉 **0부터 indexing**
- enum은 객체로 존재하지만, 변수집합이다 `:`이 아닌 `=`으로 값 할당! 하며, 타입의 값을 조회할때는 객체처럼 코드작성!

```js
console.log(Fruit.Banana, Fruit['Apple'], Fruit[5]);
// 5 - 나는야 사과야 - Banana
```

- enum은 **값이 숫자일때 양뱡향 맵핑**되어있기 때문에 값으로 key를 조회할 수 있다.`Fruit[5]`는 `Banana`가 출력됨
  - 하지만 **문자열로 값**을 지정하면 **단방향 맵핑**`undefiled`가 출력
- enum 내부 변수들은 string, number만 되나보다.. 배열/null/undefined/boolean/function이 안됨!
- enum은 컴파일 후에도 enum 지정타입이 컴파일된 `.js` 파일 **객체형태**로 내부에 위치하게 된다. [basic.js](./basic.js)파일을 확인하자!

## `enum` 타입 응용

열거타입을 자주 사용한다면 유틸리티 함수를 만들어 사용하는것을 추천

> **숫자 값을 갖을때 양방향 맵핑에 주의하여 로직 구현**

### `getEnumLength()`

[`getEnumLength()`](./util.ts)

- 열거타입의 원소 개수를 알려주는 함수
- 양방향 맵핑되는 값(**값지정 안한 변수들**)은 키와, 값 모두 `Object.keys()`에 반환된다. 해당값을 제거한 뒤, 열거타입의 원소 갯수를 구해야 한다!
  - `Object.keys(enumOBJ)` : 배열은 key + 양방향값 문자열-숫자이 모두 **문자열 배열** 구성
  - keys배열을 조회하여 문자열인 값만 겟수를 샘!
- 실수 방지 목적에서 사용함

### [`isValidEnumValue()`]

[`isValidEnumValue()`](./util.ts)

- 열거타입에 해당 값이 존재하는지 검사하는 함수
  - 서버로 부터 받은 데이터를 검증할때 유용함
  -

## `const enum` 상수 열거타입

일반 **열거 타입은 컴파일 후에도 남아있기 때문에 번들 파일의 크기가 커질** 수 있다. 열거형 타입이 객체에 접근하지 않는다면 굳이 컴파일 이후에 남겨놓을 필요가 없다. 이럴때는 상수형 열거타입을 사용한다. 컴파일 이후에는 `변수명 = 값`으로 압축되어 남겨진다.

> 상수 열거 타입은 컴파일 이후 사라지기 때문에 **enum 타입 객체(`enum Fruit{...}`)**를 사용할 수 없다, 즉, `getEnumLength()`함수와 같이 해당 열거타입 검사 함수의 인자로 호출 할 수 없다!

## 함수 타입 정의하기

- 매개변수 타입지정
- 리턴 값 타입지정 (각종 타입 + `never`, `void`)
- 여기서 부터는 [functionTypes.ts](./functionTypes.ts)파일을 확인하도록 한다!

### 1) function 키워드 함수 타입지정

```js
function printPersonData(name: string, age: number): string {
  const result = name + '는 ' + age + '짤!';
  return result;
}
```

단순하니 넘어감

### 2) 익명 함수 타입지정

```js
const getInfoText: (name: string, age: number) => string = function (
  name,
  age,
) {
  // ...
  return '';
};
```

**익명함수의 타입지정은 햇갈릴 수 있으니 주의**하자. (`:`) 콜론 다음 화살표 함수는 매개변수와 리턴의 타입을 나타내며, (`=`) 이후 `function(){}` 가 함수 선언부가 된다

### 3) 화살포 함수 타입지정

```js
```

### 4) 선택 매개변수 지정

#### `?` 매개변수지정 법

```js
function printPersonData2(name: string, age?: number): string {
  const result = name + '는 ' + age + '짤!';
  return result;
}
```

- `매개변수?`와 같이 `?`를 붙여 사용하면 선택 매개변수로 타입 지정
- 선택매개변수는 오늘쪽 끝으로 위치해야 오류를 출력하지 않는다.

#### `매개변수 : 타입 | undefined` - 언디파인드 유티온 방식

```js
function printPersonData3(name: string, age: number | undefined): string {
  const result = name + '는 ' + age + '짤!';
  return result;
}
```

- 만약 선택매개변수를 위치상관없이 사용하고 싶다면 타입에 `undefined`를 유니온타입으로 두면 선택 매개변수와 같은 기능을 한다지만, 호출할때마다 중간에 `undefined`를 넣어주어햐함으로 비추비추야 **그냥 `?` 랑 끝에 둬!**

### 5) 전개연산자 (나머지) 매개변수

```js
function printPersonData4(name: string, ...etc: string[]): string {
  console.log({ name, etc });
  const result = etc.reduce((acc, item) => {
    console.log({ item, acc });
    return acc.concat(' ' + item);
  }, name);
  return result;
}
console.log(printPersonData4('zuzu', '안녕', '잘가', '즐거웠다'));
// zuzu 안녕 잘가 즐거웠다
```

- **전개연산자는 배열에 담**아서 !

### 6) `this` 타입지정하기

- `this` 기본타입 : `any`
- `this` 타입은 함수 **매개변수의 첫번째 자리에 위치하여 지정**, `this`는 매개변수로 인식되지 않음으로, `this`다음 매개변수가 첫번째 매개변수로 인식된다.

```js
function thisType(this: string, index: number) {
  const params1 = this.split('');
  const params2 = this.slit(''); // 메서드 오타에도 타입에러가 발생!
}
```

## 원시타입 메서드 추가하기

> 원시타입 = String, Object, Array, Number,.. 와 같은 기본 객체를 말함?
> String객체에 메서드를 추가한다면? 모든 string 타입에서 쓸수 있는 메서드가 된다!

- 원시타입에 메서드를 추가할때는 **인터페이스**를 사용

```js
interface String {
  getParam(this: string, index: number): string;
}
String.prototype.getParam = function (index) {
  const result = this + index;
  return result;
};
console.log('따랏따라~~~'.getParam(34)); // 따랏따라~~~34
```

## 함수 오버로드 : 여러게 타입 정의하기

- 매개변수가 (숫자, 숫자)일때 (숫자) 리턴
- 매개변수가 (문자, 문자)일때 (문자) 리턴
- 매개변수가 (숫자, 문자)일때 에러. 즉, 매개변수는 같은 타입으로만 전달

위와 같은 조건으로 함수 타입을 정의할때 함수 오버로드를 사용한다!

- 조건에 따른 타입지정을 여러번에 걸처 해줄 수 있다.
- 조건문을 복잡하게 하지 않아도 됨으로 **코드가 엄청 간결해짐**
  - if(x가 넘버고,y도 넘버일때)이렇게..같은 ..

```js
// * 타입 조건을 나열한다
function funcOverload(x: number, y: number): number;
function funcOverload(x: string, y: string): string;

function funcOverload(x, y) {
  return x + y;
}
console.log(funcOverload(1, 10));
console.log(funcOverload('1', '10'));
// console.log(funcOverload(1, '10')); // 매개변수 타입이 선언된 조건과 맞지않음으로 에러
```

## 명명된 매개변수 사용하기

- 명명된 매개변수가 여러 함수에서 사용된다면 **인터페이스 사용을 추천**
- 먼저 명명된매개변수 + 초기값을 객체에 담고, `:`과 함께 타입지정도 객체에 담는다

```js
interface Types {
  name: string;
  age?: number; // 초기값이 있음으로 선택적 매개변수
  lang?: string;
}
function namedFunc({ name, age = 0, lang }: Types): void {}
```
