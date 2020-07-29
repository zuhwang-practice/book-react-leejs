- [타입 호환성](#타입-호환성)
  - [Number vs String](#number-vs-string)
  - [인터페이스의 타입 호환성](#인터페이스의-타입-호환성)
  - [함수의 타입 호환성](#함수의-타입-호환성)
  - [배열 map 메서드의 함수 타입 호환](#배열-map-메서드의-함수-타입-호환)

# 타입 호환성

> [타입스크립트-타입호환성 예제코드](./subtypes.ts)

타입A가 타입B를 같은 타입으로 볼지, 다른 타입으로 볼지 판단하는 것을 말함

- 타입A에 타입B가 할당된다면, 타입B는 타입A의 **서브타입**
- 할당 가능여부를 판단할땐, 타입의 집합을 생각한다

## Number vs String

- `string`는 `snumber` 포함될 수 없음
- `number`는 `string`에 포함될 수 없음
- `string`는 `number | string` 에 포함됨
- `number`는 `number | string` 에 포함됨

## 인터페이스의 타입 호환성

동적타입인 자바스크립트를 기븐으로 하기 때문에 타입스크립트는 구조적 타이핑을 도입함.
구조적타이핑(structural typing) = 덕타이핑(duck typing) = 값 자체의 타입보다, 내부구조에 기반하여 타입 호환성 검사하는 방식

- 인터페이스B에 있는 모든 필수 속성의 이름이 인터페이스A에도 존재 해야함
- 같은 속성 이름에 대해 A의 속성이 B의 속성에 할당 가능해야 함

.. 말로하니 이해안됨 코드보자

```js
interface A {
  name: string;
  age: number;
  msg: string;
  height?: number;
}
interface B {
  name: string;
  age: number;
}

const pA: A = { name: 'hwang', msg: 'abc', age: 33, height: 162 };
const pB: B = pA;

const pBB: B = { name: 'BBB', age: 11 };
// const pAA: A = pBB; // 필수값 없음으로 에러
```

- B가 A를 받았다. B의 필수값은 모두 포함하기 때문에 A의 값 모두를 받는다.
- A는 B의 필수값을 모두 갖지 않음(`msg`없음)으로 값을 받을 수 없음 : 에러
- 만약, **선택가능 속성**이 있을때, **상대방이 같은 값이 필수라면 에러 출력**
- 만약, **추가속성**이 있을땐 값의 집합은 작아진다
- 만약, **유니온타입**이 있을땐 값의 집합은 커진다

## 함수의 타입 호환성

함수의 타입 호환성은 함수 호출 시기에 영향을 받음

- A의 매개변수가 B의 매개변수보다 갯수가 작아야 함
- 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 함
- A의 반환값은 B의 반환값으로 할당 가능해야 한다

```ts
type F1 = (a: number, b: string) => number;
type F2 = (a: number) => number;
type F3 = (a: number) => number | string;

let f1: F1 = (a, b) => 1;
let f2: F2 = (a) => 1;
let f3: F3 = (a) => 1;
let f33: F3 = (a) => '1';

f1 = f2;
// F2는 F1,F3 보다 범우가 작음으로 받아넣을 수 없음
f2 = f1; // Error
f2 = f3; // Error
```

> 공책에 위 타입 범위 벤다이어그램을 그려보자 ! 이해가 금방 된다.

## 배열 map 메서드의 함수 타입 호환

```ts
function addOne(value: number) {
  return value + 1;
}
const result1 = [1, 2, 3].map<number>(addOne);
// ().map<제네릭>(콜백함수)
```

- **제네릭**으로 입력한 `number`는 매개변수함수의 반환타입이다. 즉, **콜백함수가 반환하는 값을 말함**
- **함수 오버로드**를 통해 여러 개의 타입을 지정할 수 있다. [타입스크립트-타입호환성 예제코드](./subtypes.ts)에서 예제 확인하기
