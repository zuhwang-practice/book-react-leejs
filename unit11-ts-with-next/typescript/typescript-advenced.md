- [타입스크립트 고급 기능](#타입스크립트-고급-기능)
  - [제네릭(generic) 타입](#제네릭generic-타입)
    - [제네릭으로 클래스 구현하기](#제네릭으로-클래스-구현하기)
    - [`extends`키워드로 제네릭 타입제한하기](#extends키워드로-제네릭-타입제한하기)
    - [`extends`키워드 활용 코드](#extends키워드-활용-코드)
  - [맵드(mapped) 타입 :`in`키워드](#맵드mapped-타입-in키워드)
    - [Pick 내장 타입](#pick-내장-타입)
    - [Record 내장 타입](#record-내장-타입)
  - [조건부(conditional) 타입](#조건부conditional-타입)
    - [`Exclude` 내장타입](#exclude-내장타입)
    - [`Extract` 내장타입](#extract-내장타입)
    - [`ReturnType` 내장타입](#returntype-내장타입)
    - [`infer` 키워드](#infer-키워드)
    - [유틸리티 타입 만들기](#유틸리티-타입-만들기)
  - [생산성을 높이는 타입스크립트 기능](#생산성을-높이는-타입스크립트-기능)
    - [타입추론](#타입추론)
    - [타입가드](#타입가드)
      - [`typeof` 키워드 사용하기 : 변수에게 사용](#typeof-키워드-사용하기--변수에게-사용)
      - [`instanceof` 키워드 사용: 클래스에게 사용](#instanceof-키워드-사용-클래스에게-사용)
      - [식별가능한 유니온 타입 : 인터페이스에서 사용](#식별가능한-유니온-타입--인터페이스에서-사용)
      - [타입을 검사하는 함수 사용하기: `is`키워드](#타입을-검사하는-함수-사용하기-is키워드)
      - [`in`키워드 사용하기](#in키워드-사용하기)

# 타입스크립트 고급 기능

각종 패키지 타입정의를 들여다보면 몰랐던 고급기능이 많이 사용되어 이해하기 힘듬

## 제네릭(generic) 타입

제네릭은?

- 타입 정보가 동적으로 결정되는 타입
- 같은 규칙을 여러 타입에 적용할 수 있어, **타입코드 중복작성을 줄일 수 있음**
- **함수 정의할때** 변경될 타입에 변수지정(T, D, ..등 원하는것), 와 같은 변수로 타입을 선언
- **함수 호출할때** 지정변수(T, D, ..등 원하는것)의 위치를 제네릭`함수명<number>()`과 같이 표기, 혹은 특정위치 매개변수의 값으로 지정

### 제네릭으로 클래스 구현하기

제네릭은 데이터의 타입에 다양성을 부여해 주기 때문에 자료구조에 많이 사용됨. **클래스에서 제네릭**을 사용해보자!

```ts
class Stack<D> {
  items: D[] = [];
  push(item: D) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
}
const numStack = new Stack<number>();
numStack.push(0);
numStack.push(2);
numStack.push(4);
numStack.push(6);
console.log(numStack.items); // [0,2,4,6]
numStack.pop();
console.log(numStack.items); // [0,2,4]
```

### `extends`키워드로 제네릭 타입제한하기

```ts
function identity<T extends number | string>(p1: T): T {
  return p1;
}
identity(1);
identity('1');
// identity([]); // 배열은 지정타입이 아님으로 에러
```

extends는 뭔가 확장하는 기분이지만, 제네릭에서는 타입을 제안할때 사용한다.

### `extends`키워드 활용 코드

```ts
interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  isLiveInSeoul: boolean;
}

function pp<T extends Person>(p1: T, p2: T, name: keyof Person): void {
  /*
   * pp함수는  Person타입을 상속받아 사용할꺼야.
   *
   * 매개변수 타입지정
   * p1의 타입은 {name:string, age:number} 여야해
   * p2의 타입은 {name:string, age:number} 여야해
   * name의 타입은 Person의 키이름 중 하나 여야해
   * 즉 , Person의 keys의 유니온타입 'name'|'age' 가 된다
   */
}
interface Prod {
  name: string;
  price: number;
}
const p1: Prod = { name: '치마', price: 20000 };
const p2 = { name: 'hwang', age: 33 };
// pp(p1, p2, 'hwang'); // p1의 타입인 Prod는 Person의 필수 타입을 충족하지 않아 에러
pp(p2, p2, 'name'); // 모든거 충족함
pp(p2, p2, 'age'); // 모든거 충족함
// pp(p2, p2, 'etc'); // etc는 keyof Person이 갖는 키가 이니여서 안됨
```

## 맵드(mapped) 타입 :`in`키워드

몇가지 규칙으로 새로운 인터페이스를 만들수 있음, 맵드는 **`in` 키워드를 사용해 정의**한다

```ts
interface PersonMap {
  name: string;
  age: number;
}

// ? 두개의 속성을 불타입으로 만드는 맵타입
type Map1 = { [K in 'prod1' | 'prod2']: boolean };

// ? 인터페이스의 모든 속성을 bool & 선택속성으로 만들어주는 맵타입 정의
type Map2<T> = { [P in keyof T]?: boolean };
const pMap: Map2<PersonMap> = {};
pMap.name = true;
pMap.age = false;

// - 인터페이스의 특정속성타입 추출할때 사용하는 문법
type Map3 = PersonMap['name']; // string

// - 인터페이스의 모든 속성을 읽기전용 타입으로 만들어줌
type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

// - 인터페이스의 모든 속성을 선택타입으로 만들어줌
type MyPartial<T> = { [P in keyof T]?: T[P] };

// - PersonMap의 속성을 읽기전용/선택타입으로 변환하여 뉴 타입에 할당
type Map4 = MyReadonly<PersonMap>;
type Map5 = MyPartial<PersonMap>;
```

- 맵드 적용해 모든 속성을 **선택 속성으로 변경하기**
- 맵드 적용해 모든 속성을 **읽기전용 속성으로 변경하기**
- 맵드 적용해 모든 속성을 **읽기전용 속성으로 변경하기**
- in키워드 오른쪽에는 문자열의 유니온타입이 올수 있다 'prod1', 'prod2'

### Pick 내장 타입

인터페이스에서 원하는 속성만 추출할때 사용하는 맵타입

- 내장타입Pick의 모습 : `type Pick<T, K extends keyof T> = { [P in K]: T[P] }`

```ts
interface TypeP {
  name: string;
  age: number;
  msg: string;
  familly: Array<string>;
}
type TTT = Pick<TypeP, 'name' | 'age'>;
// 결과: type TTT = { name: string; age: number };
const im: TTT = { name: 'hwang', age: 33 };

type TTT2 = Pick<TypeP, 'name' | 'msg'>;
const im2: TTT2 = { name: 'hwang', msg: '33' };
const im22: TTT2 = { name: 'hwang' }; // msg없어서 에러
const im2: TTT2 = { name: 'hwang', msg: '33', age: 33 }; // age속성을 넣을수 없음 에러
```

- 인터페이스에서 선택된 속성을 추출하여 새로은 타입을 생성했다.

### Record 내장 타입

입력된 모든 속성을 같은 타입으로 만들어주는 맵타입

- 내장타입 Record의 모습 : `type Record<K extends string, T> = {[P in K]: T}`

  ```ts
  type TypeRe = Record<'p1' | 'p2', TypeP>;
  // type TypeRe = {p1:TypeP, p2:TypeP}
  ```

  타입 `typeRe`의 `p1`, `p2` 키의 속성 타입은 인터페이스 `TypeP`로 지정했다.
  Record를 더 단순하게 보자면 아래 코드와 같다

  ```ts
  type myRec = Record<'name' | 'msg', string>;
  const myInfo: myRec = { name: 'hwang', msg: '메세-지야' };
  console.log({ myInfo });
  ```

  `type 타입명 = Record<'키이름1'|'키이름2'|'키이름-유니온으로나열', [적용할 타입]>`
  형태로 작성하면 된다!

## 조건부(conditional) 타입

- 입력된 제네릭 타입에 따라 타입을 결정 할 수 있는 기능
- `extends`와 `?` 키워드를 사용하여 정의
  > **`T extends U? X:Y`**
  >
  > - 조건부 타입의 기본 구조
  > - T가 U의 서브타입이야 ? 참이면 X , 거짓이면 Y 타입 사용

### `Exclude` 내장타입

- `type Exclude<T, U> = T extends U ? never : T`
- 제네릭 타입 에 2개가 정의된다 : `Exclud<T, U>`
- **T에서 T와 U의 서브타입을 제거한 타입**만 추출
- **`naver` 타입은 무조건 제거**

### `Extract` 내장타입

- `type Extract<T, U> = T extends U ? T: never`
- `Exclude`의 반대 개념이다
- T와 **U에서 T의 서브 타입 만 추출**한다

### `ReturnType` 내장타입

- `type ReturnType<T> = T extends (...args:any[])=> infer R? R:any`
- `ReturnType`은 함수의 **반환 타입을 추출**
- 입력된 타입 T가 함수면 **반환타입**이 사용되며, 그 밖의 경우 `any`타입 사용
- 타입 추론을 위햐 `infer` 키워드가 사용되었다

### `infer` 키워드

- 조건부타입을 정의할 때 `extends`키워드 뒤에 사용 사용
- `infer 타입` : infer 다음에 오는 타입이 추출된다: [예제확인하기](./advanced.ts)

### 유틸리티 타입 만들기

조건부 타입을 사용해 직접 유틸리티 타입을 만들어 보자
[예제확인하기](./advanced.ts)

- 문자열 속성만 추출해서 사용하는 유틸리티 타입
- 일부 속성만 제거해 주는 유틸리티 타입
- 인터페이스를 덮어쓰는 유틸리티 타입

## 생산성을 높이는 타입스크립트 기능

정적타입 언어 사용의 단점 타입을 정의할 때 시간, 수고가 들어가기 때문에 생산성 저하가 될 수 있다. 타입스크립트에서는 다양한 경우 **타입 추론**을 제공하기 때문에 필요한 경우에만 타입을 정의할 수 있다. 또한 **타입 가드**를 통해 타입 단언 코드를 최소화 할 수 있다.

### 타입추론

변수, 배열등을 선언할때 **초기화 된 값으로 타입추론**한다.

- `let` 변수의 타입추론 : `let v1 =123; let v2='문자열'` 일때 `v1` 타입은 숫자, `v2` 타입은 문자열이 된다.
- `const` 변수의 타입추론 : `const의` **값 자체가 타입**이 된다!

  ```ts
  const v3 = 123;
  const v4 = 'VVVV4444';
  let v5: typeof v3 | typeof v4; // ? v5 : 123|'VVVV4444' 둘중 하나의 값만 갖을 수 있다
  v5 = 123;
  v5 = 'VVVV4444';
  // v5 = 'v4'; // error
  // v5 = 456; // error
  ```

- 배열과 객체의 타입추론
  - 배열에 값이 썪였을 때는 추론이 정확하지 않음!
- 여러타입이 혼합된 배열의 타입추론

  ```ts
  interface Person {
    name: string;
    age: number;
  }
  interface Korean extends Person {
    isLiveInSeoul: boolean;
  }
  interface Japanese extends Person {
    isLiveInTokyo: boolean;
  }

  const ps1: Person = { name: 'person', age: 1 };
  const ko1: Korean = { name: 'hwang', age: 33, isLiveInSeoul: false };
  const jp1: Japanese = { name: 'hwang', age: 33, isLiveInTokyo: true };
  const UnionType1 = [ps1, ko1, jp1]; // 3개타입의 서브타입인 Person이 타입이된다
  const UnionType2 = [ko1, jp1]; // 서브타입이 없음으로 Kprean, Japanese2타입을 갖는 변수 타입이다. (Korean,Japanese)[]
  ```

- 함수의 매개변수와 변화값에 따른 타입추론
  - 함수 선언할때 갖는 값들을 추론하여 타입을 지정한다!

### 타입가드

조건문에 의해 타입의 범위를 좁히는 기능, 불필요한 타입안언 코드를 피할수 있어 생산성과 가독성이 높아짐

#### `typeof` 키워드 사용하기 : 변수에게 사용

#### `instanceof` 키워드 사용: 클래스에게 사용

- 클래스를 사용하는 경우에만 사용가능
- 인터페이스를 사용하는 경우엔 `instanceof` 사용 불가능 : 인터페이스는 컴파일이후 제거되기 때문에!!!! `instanceof` 옆에 빈칸이 되버림

#### 식별가능한 유니온 타입 : 인터페이스에서 사용

- 인터페이스를 구별하기 위한 방법중 하나
- 인터페이스의 속성명이 중복도며, 값을 다르게 주어 인터페이스가 겹치지 않도록 정의

  - 여러 인터페이스에 중복되는 속성 `type:'A'`,`type:'B'`,`type:'C'` ...을 정의
  - **중복속성 `type`를 확인하여 `A`일때, `B`일때, `C`일때 분기**하여 조건문 작성

  ```ts
  interface Person_DUT {
    type: 'person'; // 인터페이스 중복 속성
    name: string;
    age: number;
  }
  interface Product_DUT {
    type: 'product'; // 인터페이스 중복 속성
    name: string;
    price: number;
  }
  // 매개변수의 값을 유니온타입으로 지정
  function printDUT(value: Person_DUT | Product_DUT) {
    console.log('name: ', value.name);
    // 중복속성을 사용해 조건에 따라 분기하도록 코드 작성
    if (value.type === 'person') {
      console.log('age: ', value.age);
    } else {
      console.log('price: ', value.price);
    }
  }
  ```

> **switch문에서 식별가능한 유니온 타입 사용하기 **
>
> ```ts
> function printWithSwitch(value: Person_DUT | Product_DUT) {
>   switch (value.type) {
>     case 'person':
>       console.log(value.age);
>       break;
>     case 'product':
>       console.log(value.price);
>       break;
>     default:
>       break;
>   }
> }
> ```
>
> 많이본 모습.. 리덕스 리듀서에서

#### 타입을 검사하는 함수 사용하기: `is`키워드

- `매개변수이름 is 타입이름` 과 같이 `is`키워드 사용: **매개변수가 이 타입이야? 검사함**

```ts
// 매개변수 x는 모든 타입
// isPerson함수의 리턴은 : 매개변수 x가 Person 타입인 아닌지 확인
function isPerson(x: any): x is Person {
  // 매개변수 x를 Person이라 칭하고,
  // Person.age가  undefined가 아니면 : Person타입이네
  return (x as Person).age !== undefined;
}
function printIsPerson(value: Person_DUT | Product_DUT) {
  if (isPerson(value)) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

#### `in`키워드 사용하기

```ts
function printWithIn(value: Person_DUT | Product_DUT) {
  if ('age' in value) {
    // 단순히 키 이름을 검사
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

- 해당 키가 있는지 확인하는 방법으로 간단하게 사용가능
- 타입종류가 많아지고 이름이 중복사용되는 경우 혼돈을 야기함으로, [식별가능한 유니온 타입](#식별) 사용을 추천!
