// ! 일반함수 타입지정
function printPersonData(name, age) {
    var result = name + '는 ' + age + '짤!';
    return result;
}
var zuzu = printPersonData('zuzu', 22);
// const mimi: string = printPersonData('mimi', '30'); // ? 매개변수 타입에러
// const janny: number = printPersonData('janny', 18); // ? 반환값 타입에러
console.log({ zuzu: zuzu });
// ! 변수할당 함수 타입지정
// 햇갈릴 수 있으니 주의
// ':' 콜론 다음 화살표 함수는 매개변수와 리턴의 타입을 나타네며
// '=' 이후 function(){} 가 함수 선언부
var getInfoText = function (name, age) {
    // ...
    return '';
};
// ! 선택 매개변수 지정 - 1: 선택매개변수는 오른쪽 끝으로 몰아두기
function printPersonData2(name, etc, age) {
    var result = name + '는 ' + age + '짤!' + etc;
    return result;
}
function printPersonData3(name, age) {
    var result = name + '는 ' + age + '짤!';
    return result;
}
function printPersonData4(name) {
    var etc = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        etc[_i - 1] = arguments[_i];
    }
    console.log({ name: name, etc: etc });
    var result = etc.reduce(function (acc, item) {
        console.log({ item: item, acc: acc });
        return acc.concat(' ' + item);
    }, name);
    return result;
}
console.log(printPersonData4('zuzu', '안녕', '잘가', '즐거웠다'));
// ! this의 타입지정
function thisType(index) {
    var params1 = this.split('');
    // const params2 = this.slit(''); // 메서드 오타에도 타입에러가 발생!
}
String.prototype.getParam = function (index) {
    var result = this + index;
    return result;
};
console.log('따랏따라~~~'.getParam(34));
function funcOverload(x, y) {
    return x + y;
}
console.log(funcOverload(1, 10));
console.log(funcOverload('1', '10'));
