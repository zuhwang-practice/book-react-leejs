// ! 일반함수 타입지정

function printPersonData(name: string, age: number): string {
  const result = name + '는 ' + age + '짤!';
  return result;
}

const zuzu: string = printPersonData('zuzu', 22);
// const mimi: string = printPersonData('mimi', '30'); // ? 매개변수 타입에러
// const janny: number = printPersonData('janny', 18); // ? 반환값 타입에러

console.log({ zuzu });

// ! 변수할당 함수 타입지정
// 햇갈릴 수 있으니 주의
// ':' 콜론 다음 화살표 함수는 매개변수와 리턴의 타입을 나타네며
// '=' 이후 function(){} 가 함수 선언부
const getInfoText: (name: string, age: number) => string = function (
  name,
  age,
) {
  // ...
  return '';
};

// ! 선택 매개변수 지정 - 1: 선택매개변수는 오른쪽 끝으로 몰아두기
function printPersonData2(
  name: string,
  etc: string,
  age?: number | undefined,
): string {
  const result = name + '는 ' + age + '짤!' + etc;
  return result;
}

function printPersonData3(name: string, age: number | undefined): string {
  const result = name + '는 ' + age + '짤!';
  return result;
}

function printPersonData4(name: string, ...etc: string[]): string {
  console.log({ name, etc });
  const result = etc.reduce((acc, item) => {
    console.log({ item, acc });
    return acc.concat(' ' + item);
  }, name);
  return result;
}

console.log(printPersonData4('zuzu', '안녕', '잘가', '즐거웠다'));

// ! this의 타입지정
function thisType(this: string, index: number) {
  const params1 = this.split('');
  // const params2 = this.slit(''); // 메서드 오타에도 타입에러가 발생!
}

// ! 원시타입에 메서드 추가하기 = 인터페이스 사용

interface String {
  getParam(this: string, index: number): string;
}
String.prototype.getParam = function (index) {
  const result = this + index;
  return result;
};
console.log('따랏따라~~~'.getParam(34));
// console.log('따랏따라~~~'.getParam('34')); // 매개변수가 문자열이라 에러
// console.log((33).getParam(34)); // 33(숫자) 속성이 getParam 메서드가 없어서 에러

// ! 함수 오버로드 사용하깅
// * 타입 조건을 나열한다
function funcOverload(x: number, y: number): number;
function funcOverload(x: string, y: string): string;

function funcOverload(x, y) {
  return x + y;
}
console.log(funcOverload(1, 10));
console.log(funcOverload('1', '10'));
// console.log(funcOverload(1, '10')); // 매개변수 타입이 선언된 조건과 맞지않음으로 에러

// ! 명명된 매개변수

function namedFunc({
  name,
  age = 0,
  lang,
}: {
  name: string;
  age?: number;
  lang: string;
}): void {}

// ! 명명된 매개변수 + 인터페이스 사용
interface Types {
  name: string;
  age?: number; // 초기값이 있음으로 선택적 매개변수
  lang?: string;
}
function namedFunc2({ name, age = 0, lang }: Types): void {}

namedFunc2({ name: '1', age: 2, lang: '3' });
