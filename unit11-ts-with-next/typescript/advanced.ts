// + 제네릭으로 리펙터링 하기

function makeNumberArray(defaultValue: number, size: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < size; i++) {
    result.push(defaultValue + i);
  }
  return result;
}
function makeStringArray(defaultValue: string, size: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < size; i++) {
    result.push(defaultValue + (i + 1));
  }
  return result;
}
const numArr = makeNumberArray(1, 10);
const strArr = makeStringArray('hwang', 10);
console.log({ numArr, strArr });

// ! 위 코드를 보면 중복 코드가 많이 발생한다. 함수오버로드로 코드를 개선해보자

function arrayMaker(defaultValue: number, size: number): number[];
function arrayMaker(defaultValue: string, size: number): string[];

function arrayMaker(defaultValue, size) {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(defaultValue + (1 + i));
  }
  return result;
}
const numArr2 = arrayMaker(1, 10);
const strArr2 = arrayMaker('hwang', 10);
console.log({ numArr2, strArr2 });

// ! 함수오버로드로 코드를 개선했지만, 내부 조정값의 영향으로 출력되는 결과가 위와 다름.
// ! 지금은 2가지 타입이지만, 타입종류가 많아진가면 여러 줄의 타입지정을 추가해야함 번거렁
// * 제네릭으로 더 효율적으로 관리해보댜!

function arrayMakerGeneric<T>(defaultValue: T, size: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < size; i++) {
    result.push(defaultValue);
  }
  return result;
}
// ! T자리에 제네릭 전달 = number와 string을 명시적으로 작성하였음
const Arr1 = arrayMakerGeneric<number>(1, 10);
const Arr2 = arrayMakerGeneric<string>('hwang', 10);
// ! T자리에 제네릭전달 하지 않았지만, 구동은 된다
// ! 왜? 첫번째 매개변수자리가 T를 나타내기 때문에 자동타입이 지정됨!
const Arr3 = arrayMakerGeneric(1, 10);
const Arr4 = arrayMakerGeneric('hwang', 10);

console.log({ Arr1, Arr2, Arr3, Arr4 });

// + 제네릭으로 클래스 구현

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
console.log(numStack.items);
numStack.pop();
console.log(numStack.items);

// + 제네릭 타입 제한하기 : extends

function identity<T extends number | string>(p1: T): T {
  return p1;
}
identity(1);
identity('1');
// identity([]); // 배열은 지정타입이 아님으로 에러

// ! extends의 활용 코드

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

// + 맵드 타입

interface PersonMap {
  name: string;
  age: number;
}
// ! in키워드 오른쪽에는 문자열의 유니온타입이 올수 있다 'prod1', 'prod2'

// ? 두개의 속성을 불타입으로 만드는 맵타입
type Map1 = { [K in 'prod1' | 'prod2']: boolean };

// ? 인터페이스의 모든 속성을 bool & 선택속성으로 만들어주는 맵타입 정의
type Map2<T> = { [P in keyof T]?: boolean };
const pMap: Map2<PersonMap> = {};
pMap.name = true;
pMap.age = false;

// ? 맵타입으로 만드는 partial과 readonly
// - 인터페이스의 특정속성타입 추출할때 사용하는 문법
type Map3 = PersonMap['name']; // string

// - 인터페이스의 모든 속성을 읽기전용 타입으로 만들어줌
type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

// - 인터페이스의 모든 속성을 선택타입으로 만들어줌
type MyPartial<T> = { [P in keyof T]?: T[P] };

type Map4 = MyReadonly<PersonMap>;
type Map5 = MyPartial<PersonMap>;

// - Pick 내장타입 사용하여 인터페이스에서 원하는 속성만 추출하자
// 내장타입 Pick의 모습 :
// type Pick<T, K extends keyof T> = { [P in K]: T[P] };
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
const im2: TTT2 = { name: 'hwang', msg: '메쉐징' };
// const im22: TTT2 = { name: 'hwang'};
// const im222: TTT2 = { name: 'hwang', msg: '메쉐징' ,age: 33  };
console.log({ im, im2 });

// - Record 내장타입을 사용하여 입력된 모든 속성을 같은 타입으로 만들자
// 내장타입 Record의 모습
// type Record<K extends string, T> = {[P in K]: T}
type TypeRe = Record<'p1' | 'p2', TypeP>;
// type TypeRe = {p1:TypeP, p2:TypeP}

// ! Record 단순하게 보기

type myRec = Record<'name' | 'msg', string>;
const myInfo: myRec = { name: 'hwang', msg: '메세-지야' };
console.log({ myInfo });

// + 조건부 타입

// ! 기본적인 조건부 타입 예
// T extends U? X:Y // - 조건부 타입의 기본 구조
type IsStringType<T> = T extends string ? 'yes' : 'no';
type TypeYes = IsStringType<string>; // yes
type TypeNo = IsStringType<number>; // no

// ! 유니온 타입을 입력한 결과 = 두 줄의 코드는 같은 결과를 출력함
type TypeUnionA = IsStringType<string | number>; // 'yes' | 'no'
type TypeUnionB = IsStringType<string> | IsStringType<number>; // 'yes' | 'no'

// + Exclude 내장타입
// Exclude 내장타입 모습
// type Exclude<T, U> = T extends U ? never : T;
// T에서 U를 제거하여 타입 정의

type TypeExc1 = number | string | never; // string|number, 유니온타입에서 never는 자동제거됨으로
type TypeExc2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3,7 : Exclude는 U의 서브타입을 제거해 준다. 즉 첫번 타입 1,3,5,7에서 서브타입 1,5를 제거함으로 3, 7이 된다
type TypeExc3 = Exclude<string | number | (() => void), Function>; // string | number, 2번째 인자 Function인 애들은 제거한다!

// + Extract 내장타입
// Extract 내장타입 모습
// type Extract<T, U> = T extends U ? T: never;
// Exclude에 반대되게 행동함
type TypeExt1 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // T의 서브타입인 U를 추출 : 1,5
type TypeExt2 = Extract<string | number | (() => void), Function>; // (()=>void)

const typeExc1: TypeExc1 = '문자열';
const typeExc11: TypeExc1 = 1233;
// const typeExc111: TypeExc1 = []; // 배열은 안됨

const typeExc2: TypeExc2 = 3;
const typeExc22: TypeExc2 = 7;
// const typeExc222: TypeExc2 = 5; // 는 안됨
const typeExc222: TypeExt1 = 5; // ! Extract는 됨

const typeExc3: TypeExc3 = '문자열';
const typeExc33: TypeExc3 = 1233;
// const typeExc333: TypeExc3 = () => {};// 함수는 안됨
const typeExc333: TypeExt2 = () => {}; // ! Extract는 됨

// + ReturnType 타입의 정의와사용 예
// ReturnType 타입 정의
// type ReturnType<T> = T extends (...args:any[])=> infer R? R:any
type RT1 = ReturnType<() => string>; // string
function f1(s: string): number {
  return s.length;
}
type RT2 = ReturnType<typeof f1>; // number

// + ifnfer 키워드를 중첩하여 사용하는 예

type Unpaked<T> = T extends (infer U)[] // T타입이 U의 배열이면 U가 사용
  ? U
  : T extends (...args: any[]) => infer U // 함수면 반환타입이 사용된다
  ? U
  : T extends Promise<infer U> // 프로미스면 프로미스에 입력된 제네릭타입이 사용됨
  ? U
  : T;

type TypeInf0 = Unpaked<string>; //string // 아무조건도 만족하지 않기 때문에 자기자신이됨
type TypeInf1 = Unpaked<string[]>; // string
type TypeInf2 = Unpaked<() => string>; // string
type TypeInf3 = Unpaked<Promise<string>>; // string
type TypeInf4 = Unpaked<Promise<string>[]>; // Promise<string>
type TypeInf5 = Unpaked<Unpaked<Promise<string>[]>>; // string

// + 조건부타입으로 유틸리티 타입 만들기
// + 1. 문자열 속성만 추출하는 유틸리티 타입

type StringPropNames<T> = {
  [K in keyof T]: T[K] extends String ? K : never;
}[keyof T];
// [keyof T] 는 인터페이스에서 모든 속성의 타입을 유니온으로 추출한다

type StringProps<T> = Pick<T, StringPropNames<T>>;
interface PS extends Person {
  nation: string;
  messages: Array<string>;
  famillyNum: number;
  desc: string;
}

type SPT = StringPropNames<PS>;
type SPT2 = StringProps<PS>;

const spt_A: SPT = 'name';
const spt_B: SPT = 'nation';
// const spt3: SPT = 'messages'; // string타입이 아니기 때문에 SPT타입에 서 걸러짐
// const spt4: SPT = 'age'; // string타입이 아니기 때문에 SPT타입에 서 걸러짐

const spt2: SPT2 = { name: 'hwang', desc: '설명불라불라', nation: 'korea' };
console.log({ spt_A, spt_B, spt2 });

// + 2. 일부 속성만 제거해 주는 유틸리티 타입
// Omit 내장 타입 ??????? 아래와 같이 생김.
// type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
interface PersonOmit {
  name: string;
  age: number;
  nation: string;
}
// Omit은 기준 타입에서 지정한 속성타입을 제거한다
type TypeOmit = Omit<PersonOmit, 'nation' | 'age'>;

const p: TypeOmit = {
  // name,age, nation중에 nation, age를 제거했음으로
  // TypeOmit 은 name 키만 갖는다
  name: 'mike',
};

// + 3. 인터페이스를 덮어쓰는 유틸리티 타입

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
interface PersonOrig {
  name: string;
  age: number;
}

type PersonOW = Overwrite<PersonOrig, { age: string; nation: string }>;
const newP: PersonOW = {
  name: 'nimo', // 기존 유지
  age: '2', // 스트링 타입으로 변경됨
  nation: 'koreaa', // 키와 타입이 추가 되었다
};

// + 타입 추론
// ! let

let v1 = 123;
let v2 = 'v2 입니다만';

v1 = 11111;
v2 = '11111'; // 타입오류
// v1 = '123'; // 타입오류
// v2 = 123; // 타입오류

// ! const 변수의 타입 추론은 주의

const v3 = 123; // ? v3의 리터럴은 숫자 123이 아닌 타입이 된다
const v4 = 'VVVV4444';

let v5: typeof v3 | typeof v4; // ? v5 : 123|'VVVV4444' 둘중 하나의 값만 갖을 수 있다
v5 = 123;
v5 = 'VVVV4444';
// v5 = 'v4'; // error
// v5 = 456; // error

// ! 배열 타입추론

const arr1 = [10, 20, 30];
const [n1, n2, n3] = arr1;

arr1.push(123);
// arr1.push('123');
console.log({ n1: typeof n1, n2: typeof n2, n3: typeof n3 });

const arr2 = [10, 20, '30'];
const [n4, n5, s1] = arr1;
console.log({ n4: typeof n4, n5: typeof n5, s1: typeof s1 }); // 왜 s1이 숫자야?

// ! 여러 타입이 혼합된 배열의 타입추론

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

// ! 객체의 타입추론

const obj = {
  id: 123,
  date: '2020-07-29',
  data: [
    { id: 1, name: '밥먹기' },
    { id: 2, name: '청소하기' },
  ],
};

/**
 * type Obj = {
 *   id:number,
 *   date:string,
 *   data:{
 *     id:number,
 *     name:string
 *   }[]
 * }
 */

// ! 함수의 매개변수와 반환값에 대한 타입추론
function func1(a = 'abc', b = 10) {
  return `${a} ${b}`;
}
const result = func1('문자열', 123);
console.log({ result });

// ! 타입가드 활용
// ! typeof 키워드

function pring(value: number | string) {
  if (typeof value === 'number') {
    return value.toFixed(2); // number객체의 메서드 사용
  } else {
    return value.trim(); // string객체의 메서드 사용
  }
}
const returnNum = pring(1234556);
const returnStr = pring('문자열일때?');
console.log({ returnNum, returnStr });

// ! instanceof 키워드
// 클래스의 경우 instanceof 키워드로 해당 클래스로 생성된는지 확인

class Person {
  name: string; // this.name의 타입 정의
  age: number; // this.age의 타입 정의
  constructor(name: string, age: number) {
    // 생성자 매개변수의 타입정의
    this.name = name;
    this.age = age;
  }
}

class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

function printClass(value: Person | Product) {
  console.log('name: ', value.name);
  if (value instanceof Person) {
    console.log('age: ', value.age);
  } else {
    console.log('price: ', value.price);
  }
}

const person = new Person('zuzu', 22);
const product = new Product('검정치마', 22500);
printClass(person);
printClass(product);

// ! 식별가능한 유니온타입
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
const person_DUT: Person_DUT = { type: 'person', name: '왕자', age: 22 };
const product_DUT: Product_DUT = {
  type: 'product',
  name: '공주옷',
  price: 3123123,
};
printDUT(person_DUT);
printDUT(product_DUT);

// ! switch문에서 식별가능한 유니온 타입 사용하기
function printWithSwitch(value: Person_DUT | Product_DUT) {
  switch (value.type) {
    case 'person':
      console.log(value.age);
      break;
    case 'product':
      console.log(value.price);
      break;
    default:
      break;
  }
}

// ! 타입을 검사하는 함수 : `is` 키워드 사용

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

// ! in키워드 이용한 타입가드

function printWithIn(value: Person_DUT | Product_DUT) {
  if ('age' in value) {
    // 단순히 키 이름을 검사
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
