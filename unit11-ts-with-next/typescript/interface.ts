// + 객체 타입 지정
interface Person {
  name: string;
  age: number;
}
const p1: Person = { name: 'zuzu', age: 22 };
// const p1: Person = { name: 'zuzu', age: '22' }; // age타입에러

// + 선택속성 정의하기 - ? 사용
interface Person2 {
  name: string;
  age?: number;
}
const p2: Person2 = { name: '빵야' };

// + 선택속성 정의하기 - undefined 사용
interface Person3 {
  name: string;
  age: number | undefined;
}
// const p3a: Person3 = { name: '얌얌' }; //  age가 없어서 에러
const p3b: Person3 = { name: '얌얌', age: undefined };

// + 읽기전용 속성
interface Person4 {
  readonly name: string;
  age: number;
}
const p4: Person4 = { name: '난읽기전용이야', age: 33 };
console.log(p4.name);
// p4.name = '덮어써볼까?'; // readonly라서 안됨!

// + 정의되지 않은 속성값에 대한 처리 :
// + 문저리터럴(손수 기입)로 추가했을때 : 에러출력
interface Person5 {
  name: string;
  age?: number;
}
// const p5: Person5 = { name: '추가가능', msg: '마구마구추가' };
// ! 문자열 리터럴로 값 입력시, 개발자의 실수로 판단하여 값 할당이 불가능함 : 타입스크립트의 기능!
// ! 인터페이스에 포함되지 않는 키를 객체에 담아 할당하면 추가할 수 있드

// + 객체로 추가했을때 : 정상 추가됨
const etcData = {
  name: '객체로 새로운 키 추가',
  msg: '추가로 작성할 것은 이것!',
  age: 33,
};
const p5: Person5 = etcData;
console.log({ p5 });

// + 인덱스 타입

interface Person6 {
  readonly name: string;
  age: number;
  [key: string]: string | number; // 속성이름 문자열인 모든 값을 스트링이나 문자열로 타입지정
}

const p6: Person6 = {
  name: 'mike',
  birthday: '1999-00-00',
  age: 22,
};

// + 여려개의 인덱스 타입 지정하기
interface MayIndexTypes {
  [year: number]: number;
  [year: string]: string | number;
}
const yearMap: MayIndexTypes = {};
yearMap['1988'] = 1988;
yearMap['2000'] = '2000';
yearMap['3333'] = '3333';
// yearMap[4444] = '4444'; // 키가 숫자일때 값은 숫자만 가능하다

// + 함수타입 정의하기

interface GetInfo {
  // 매개변수와 리턴의 타입을 지정했다
  (name: string, age: number): string;
}

const getInfo: GetInfo = (name, age) => {
  return '';
};

// + 함수의 속성값 정의하기

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
console.log(getInfo2.data);
console.log(getInfo2('zuzu', 33)); //zuzu33왜 이렇게되는걸까용

// + 클래스 구현하기

interface Person7 {
  // 속성 name, age 메서드 isyonerthan을 갖는 클래스
  name: string;
  age: number;
  isYongerthan?(age: number): boolean;
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

// + 인터페이스 확장

interface Person8 extends Person7 {
  height: number;
}

const p8: Person8 = {
  height: 160,
  name: 'hwang',
  age: 33,
};
console.log({ p8 });
