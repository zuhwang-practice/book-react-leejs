'use strict';
// 타입 지정하기
exports.__esModule = true;
var v1 = 123;
v1 = '123';
// v1 = true; // boolean 지정하지 않음, 에러출력
// 다양한 타입 사용 예
var size = 200;
var isBig = size > 100;
var msg = isBig ? '대따큼' : '쪼구매';
console.log({ size: size, isBig: isBig, msg: msg });
var values = [1, 2, 3];
var values2 = ['4', '5', '6'];
// values.push('7'); number가 아님으로 오류출력
values.push(222);
values2.push(222);
console.log({ values: values, values2: values2 });
var data = [msg, size];
console.log(data);
console.log(data[0].substr(1));
// console.log(data[1].substr(1)); // data[1]는 숫자타입, 해당 메서드 사용불가능 에러
console.log(data[1] * 2);
//! undefined 와 null은 여러타입을 가능하다 지정할 때(유니온(|)타입) 많이 쓰인다.
var v2 = undefined;
var v3 = null;
var v4;
// v2 = 123; // 타입에러
console.log(v4);
v4 = 123;
console.log(v4);
v4 = null;
console.log(v4);
//! void & naver 함수의 리턴 타입
var voidFunction = function () {
  console.log('리턴 안할꺼야! 난 보이드 리턴타입을 갖으니까!');
};
var neverFunctionsError = function () {
  throw new Error('나는 무한루프 & 에러만 출력하는 함수란다');
};
var neverFunctionsStackOverflow = function () {
  while (true) {
    console.log('나는 무한루프 도는 함수란다');
  }
};
// ! 교차타입과 유니온 타입
var myNum;
var width; // let width:nuber|string 과 동일
width = 123;
console.log({ width: width });
width = '123';
console.log({ width: width });
// ! enum 키워드로 열거타입 정의
var Fruit;
(function (Fruit) {
  Fruit[(Fruit['Orange'] = 0)] = 'Orange';
  Fruit[(Fruit['Orange2'] = 1)] = 'Orange2';
  Fruit[(Fruit['Orange3'] = 2)] = 'Orange3';
  Fruit['Apple'] = '\uB098\uB294\uC57C \uC0AC\uACFC\uC57C';
  Fruit[(Fruit['Banana'] = 5)] = 'Banana';
  Fruit['Kiwi'] = '\uD0A4\uD0A4\uD0BC\uD0A4\uC704';
  // Kiwi = ['abc', 'def'],
  // Kiwi = null,
  // Kiwi2 = undefined,
  // Kiwi3 = true,
  // Kiwi3 = () => {},
})(Fruit || (Fruit = {}));
var Orange1 = Fruit.Orange;
var Orange2 = Fruit.Orange2;
var Orange3 = Fruit.Orange3;
var myFavoriteFruit = Fruit.Apple;
var myFavoriteFruit1 = Fruit.Orange;
var myFavoriteFruit2 = Fruit.Banana;
var myFavoriteFruit3 = Fruit.Kiwi;
console.log({
  Orange1: Orange1,
  Orange2: Orange2,
  Orange3: Orange3,
  myFavoriteFruit: myFavoriteFruit,
  myFavoriteFruit1: myFavoriteFruit1,
  myFavoriteFruit2: myFavoriteFruit2,
  myFavoriteFruit3: myFavoriteFruit3,
});
console.log(
  Fruit.Banana +
    '-' +
    Fruit['Apple'] +
    '-' +
    Fruit[5] +
    '-' +
    Fruit['키키킼키위'],
);
// ! 열거타입 응용 - 구현한 유틸함수 사용하기
var util_1 = require('../util');
console.log('푸르츠 갯수 조회 ', util_1.getEnumLength(Fruit));
console.log('푸르츠에 값이 1인 것은? ', util_1.isValidEnumValue(Fruit, 1));
console.log('푸르츠에 값이 7인 것은? ', util_1.isValidEnumValue(Fruit, 7));
console.log(
  '푸르츠에 값중에 "키키킼키위" 있느뇽? ',
  util_1.isValidEnumValue(Fruit, '키키킼키위'),
);
// ! const enum 상수 열거타입 에러
// getEnumLength(Lang);
// isValidEnumValue(Lang);
