// + 인터페이스 타입 호환성
// ! A가 B를 포함할때, B의 필수옵션을 A가 모두 갖을때
var pA = { name: 'hwang', msg: 'abc', age: 33, height: 162 };
var pB = pA;
// ! A의 필수 옵션을 B가 포함하지 못함
var pBB = { name: 'BBB', age: 11 };
// ! C가 D의 필수 옵션을 모두 갖음, age가 문자여도 가능!
var pC = { name: 'ccc', age: 333 };
var pC2 = { name: 'ccc', age: '333' };
var pD = pC;
var pD2 = pC2;
// ! D가 의 age가 문자일경우 C가 수용하지 못하기 때문에 에러
var pDD = { name: 'ddd', age: '444' };
var pDDD = { name: 'ddd', age: 444 };
var f1 = function (a, b) { return 1; };
var f2 = function (a) { return 1; };
var f3 = function (a) { return 1; };
var f33 = function (a) { return '1'; };
f1 = f2;
// F2는 F1,F3 보다 범우가 작음으로 받아넣을 수 없음
// f2 = f1;
// f2 = f3;
// + 배열 map 메서드를 통해 살펴보는 함수의 타입 호환성
// ().map<제네릭>(콜백함수)
function addOne(value) {
    return value + 1;
}
var result = [1, 2, 3].map(addOne);
// -------------------------------------------
function addOne2(value) {
    return value + '1';
}
var result2 = [1, 2, 3].map(addOne2);
function addOne3(value) {
    return value + 1;
}
var resultNumber = [1, 2, 3].map(addOne3);
var resultString = ['1', '2', '3'].map(addOne3);
console.log({ resultNumber: resultNumber, resultString: resultString });
// -------------------------------------------
