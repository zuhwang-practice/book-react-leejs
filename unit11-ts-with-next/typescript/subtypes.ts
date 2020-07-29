// + 인터페이스 타입 호환성

// + 선택 속성이 있을때
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
// ! A가 B를 포함할때, B의 필수옵션을 A가 모두 갖을때

const pA: A = { name: 'hwang', msg: 'abc', age: 33, height: 162 };
const pB: B = pA;

// ! A의 필수 옵션을 B가 포함하지 못함

const pBB: B = { name: 'BBB', age: 11 };
// const pAA: A = pBB;

interface C {
  name: string;
  age: number;
}
interface C2 {
  name: string;
  age: string;
}
interface D {
  name: string;
  age: number | string;
}

// ! C가 D의 필수 옵션을 모두 갖음, age가 문자여도 가능!
const pC: C = { name: 'ccc', age: 333 };
const pC2: C2 = { name: 'ccc', age: '333' };
const pD: D = pC;
const pD2: D = pC2;

// ! D가 의 age가 문자일경우 C가 수용하지 못하기 때문에 에러
const pDD: D = { name: 'ddd', age: '444' };
const pDDD: D = { name: 'ddd', age: 444 };
// const pCC: C = pDD;
// const pCCC: C = pDDD;

// + 함수의 타입 호환성
// + 아래 타입중 가장 범위가 큰것은? F1=F3 > F2!
type F1 = (a: number, b: string) => number;
type F2 = (a: number) => number;
type F3 = (a: number) => number | string;

let f1: F1 = (a, b) => 1;
let f2: F2 = (a) => 1;
let f3: F3 = (a) => 1;
let f33: F3 = (a) => '1';

f1 = f2;
// F2는 F1,F3 보다 범우가 작음으로 받아넣을 수 없음
// f2 = f1;
// f2 = f3;

// + 배열 map 메서드를 통해 살펴보는 함수의 타입 호환성
// ().map<제네릭>(콜백함수)

function addOne(value: number) {
  return value + 1;
}
const result = [1, 2, 3].map<number>(addOne);

// -------------------------------------------

function addOne2(value: number) {
  return value + '1';
}
const result2 = [1, 2, 3].map<string>(addOne2);

// -------------------------------------------
// 함수의 2중 타입지정
function addOne3(value: number): number;
function addOne3(value: string): string;

function addOne3(value) {
  return value + 1;
}
const resultNumber = [1, 2, 3].map<number>(addOne3);
const resultString = ['1', '2', '3'].map<string>(addOne3);

console.log({ resultNumber, resultString });
// -------------------------------------------
