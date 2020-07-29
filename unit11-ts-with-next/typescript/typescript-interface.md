- [인터페이스](#인터페이스)
  - [객체타입지정](#객체타입지정)
    - [선택속성](#선택속성)
    - [읽기전용 속성](#읽기전용-속성)
    - [정의되지 않은 속성값에 대한 처리](#정의되지-않은-속성값에-대한-처리)
    - [인덱스타입](#인덱스타입)
      - [여러 개의 인덱스타입을 정의하는 경우](#여러-개의-인덱스타입을-정의하는-경우)
  - [원시타입 메서드추가](#원시타입-메서드추가)
  - [함수타입 정의](#함수타입-정의)
    - [함수의 속성값 정의하기](#함수의-속성값-정의하기)
  - [클래스구현](#클래스구현)
  - [인터페이스 확장(합치기)](#인터페이스-확장합치기)

# 인터페이스

자바에서 인터페이스는 클래스 구현 전 필요항 메서드를 정의하는 용도로 사용한다.
타입스크립에서는 자바보다 다양한 곳에 사용된다. 어떤곳에 쓰이는지 알아보세

- [interface.ts](./interface.ts) 파일을 확인하여 예제를 보자

## 객체타입지정

- 인터페이스는 객체-비스무리형태를 갖음
- 변수에 객체를 대입할때 해당 인터페이스에 선언된 규칙에 따라 값할당

### 선택속성

- 선택속성 `?` 타입 사용하기 : 사용으로 해당 값을 선택적 사용 (basic에서 다룸)
- 선택속성 `undefined` 유니온타입 사용 : 선택속성이라지만 꼭 언디파인드 선언해야함으로 비추

### 읽기전용 속성

- 읽기전용 속성 : `readonly` 키워드 사용

### 정의되지 않은 속성값에 대한 처리

- 리터럴 입력시 에러 : **개발자의 실수로 판단**
- **객체 입려시 정상작동** : 이 방법으로 추가해야함 !

### 인덱스타입

> 인덱스 타입이란? 인터페이스 내부에서 속성이름을 지정하지 않고 값의 타입만 정의하는 것

```ts
interface Person6 {
  readonly name: string;
  age: number;
  [key: string]: string | number;
}
const p6: Person6 = {
  name: 'mike',
  birthday: '1999-00-00',
  age: 22,
};
```

- 속성 이름이 `string`인 값은 `string | number`로 지정
- `age`,`name`은 지정된 값이 우선시 한다. 그밖에 키에 대해서는 인덱스타입에 따라 타입지정 됨

#### 여러 개의 인덱스타입을 정의하는 경우

```ts
interface MayIndexTypes {
  [year: number]: number;
  [year: string]: string | number;
}
const yearMap: MayIndexTypes = {};
yearMap['1988'] = 1988;
yearMap['2000'] = '2000';
yearMap['3333'] = '3333';
// yearMap[4444] = '4444'; // 키가 숫자일때 값은 숫자만 가능하다
```

## 원시타입 메서드추가

[타입스크립트-basic-원시타입메서트 추가하기 - 내용확인](./typescript-basic.md#원시타입-메서드-추가하기)

## 함수타입 정의

```ts
interface GetInfo {
  // 매개변수와 리턴의 타입을 지정했다
  (name: string, age: number): string;
}
const getInfo: GetInfo = (name, age) => {
  return '';
};
```

- 인터페이스 내부에는 속성이름을 지정하지 않고 바로 작성
- 함수타입을 정의할땐 매개변수와 리턴타입을 지정
- 예제는 화살표함수로 작성했지만, 나머지 함수표현식에도 동일하게 작성

### 함수의 속성값 정의하기

> 자바스크립트에서는 함수도 속성을 갖을수 있다. 인터페이스-속성값을 키로한 타입을 지정한다

```ts
interface GetInfo2 {
  // 매개변수와 리턴의 타입을 지정했다
  (name: string, age: number): string;
  data: Array<string>;
}
const getInfo2: GetInfo2 = (name, age) => {
  const str = getInfo2.data
    ? getInfo2.data.reduce((acc, li) => acc + li, name + age)
    : name + age;
  return str;
};
const data = ['왜 이렇게', '되는걸까용'];
console.log(getInfo2('zuzu', 33)); //zuzu33
getInfo2.data = data;
console.log(getInfo2('zuzu', 33)); // zuzu33왜 이렇게되는걸까용
```

*함수 속성에 추가하는 것*과 **this**는 다르다. 조싐!

## 클래스구현

인터페이스와 클래스 구현은 알아야 할것이 옴청 많지만 리액트에서 클래스형 컴포넌트의 비중이 낮아지기도했고.. 지만~! 보고 넘어가기

```ts
interface Person7 {
  // 속성 name, age 메서드 isyonerthan을 갖는 클래스
  name: string;
  age: number;
  isYongerthan(age: number): boolean;
}

class SomePerson implements Person7 {
  // this.name과 this.age의 타입지정
  name: string;
  age: number;
  // 생성자함수, 생성할때 받는 매개변수의 타입지정
  constructor(name: string, age: number) {
    // 매겨변수로 this.name, this.age의 값 할당
    this.name = name;
    this.age = age;
  }
  isYongerthan(age: number) {
    return this.age < age;
  }
}

const mi = new SomePerson('은지', 33);
console.log(mi.name, mi.age, mi.isYongerthan(44));
```

- 인터페이스는 속성, 함수(메서드)를 타입지정 방식을 따름
- `implements` 키워드 를 사용하여 인터페이스로 클래스 타입지정을 함
- `constructor`위에 위치하는 것은 클래스가 갖는 **this 속성들의 타입지정**이다
- `constructor(매개변수 타입지정)`의 매개변수에 타입지정을 한다.
- `isYongerthan(age: number)`에서 매개변수에 타입지정을 또했음..**뭐하러 인터페이스에 메서드 타입지정하는지 모르겠음**.. 심지어 인터페이스 메서트 타입지정 제거하고 클래스 내에서만 써도 잘됨 **클래스에 인터페이스 적용하는게 무슨 의미**인가?

## 인터페이스 확장(합치기)

상속받아 인터페이스를 확장해보자

```ts
interface Person7 {
  name: string;
  age: number;
  isYongerthan?(age: number): boolean;
}
interface Person8 extends Person7 {
  height: number;
}

const p8: Person8 = {
  height: 160,
  name: 'hwang',
  age: 33,
};
console.log({ p8 });
// { p8: { height: 160, name: 'hwang', age: 33 } }
```
