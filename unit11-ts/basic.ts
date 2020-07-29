// 타입 지정하기

let v1: number | string = 123;

v1 = '123';
// v1 = true; // boolean 지정하지 않음, 에러출력

// 다양한 타입 사용 예

const size: number = 200;
const isBig: boolean = size > 100;
const msg: string = isBig ? '대따큼' : '쪼구매';

console.log({ size, isBig, msg });

const values: number[] = [1, 2, 3];
const values2: Array<string | number> = ['4', '5', '6'];

// values.push('7'); number가 아님으로 오류출력
values.push(222);
values2.push(222);

console.log({ values, values2 });

const data: [string, number] = [msg, size];
console.log(data);
console.log(data[0].substr(1));
// console.log(data[1].substr(1)); // data[1]는 숫자타입, 해당 메서드 사용불가능 에러
console.log(data[1] * 2);

//! undefined 와 null은 여러타입을 가능하다 지정할 때(유니온(|)타입) 많이 쓰인다.
let v2: undefined = undefined;
let v3: null = null;
let v4: number | undefined | null;
// v2 = 123; // 타입에러
console.log(v4);
v4 = 123;
console.log(v4);
v4 = null;
console.log(v4);

//! void & naver 함수의 리턴 타입

const voidFunction = (): void => {
  console.log('리턴 안할꺼야! 난 보이드 리턴타입을 갖으니까!');
};
const neverFunctionsError = (): never => {
  throw new Error('나는 무한루프 & 에러만 출력하는 함수란다');
};
const neverFunctionsStackOverflow = (): never => {
  while (true) {
    console.log('나는 무한루프 도는 함수란다');
  }
};

// ! 교차타입과 유니온 타입

let myNum: (1 | 3 | 5) & (3 | 5 | 7);

// ! type키워드로 타입 별칭주기

type Width = number | string;
let width: Width; // let width:nuber|string 과 동일

width = 123;
console.log({ width });
width = '123';
console.log({ width });

// ! enum 키워드로 열거타입 정의

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

console.log(
  `${Fruit.Banana}-${Fruit['Apple']}-${Fruit[5]}-${Fruit['키키킼키위']}`,
);

// ! 열거타입 응용 - 구현한 유틸함수 사용하기
import { getEnumLength, isValidEnumValue } from './util';

console.log('푸르츠 갯수 조회 ', getEnumLength(Fruit));
console.log('푸르츠에 값이 1인 것은? ', isValidEnumValue(Fruit, 1));
console.log('푸르츠에 값이 7인 것은? ', isValidEnumValue(Fruit, 7));
console.log(
  '푸르츠에 값중에 "키키킼키위" 있느뇽? ',
  isValidEnumValue(Fruit, '키키킼키위'),
);

const enum Lang {
  korean = 'ko',
  english = 'en',
  japanese = 'jp',
}
// ! const enum 상수 열거타입 에러
// getEnumLength(Lang);
// isValidEnumValue(Lang);
