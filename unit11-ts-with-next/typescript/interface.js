var p1 = { name: 'zuzu', age: 22 };
var p2 = { name: '빵야' };
// const p3a: Person3 = { name: '얌얌' }; //  age가 없어서 에러
var p3b = { name: '얌얌', age: undefined };
var p4 = { name: '난읽기전용이야', age: 33 };
console.log(p4.name);
// const p5: Person5 = { name: '추가가능', msg: '마구마구추가' };
// ! 문자열 리터럴로 값 입력시, 개발자의 실수로 판단하여 값 할당이 불가능함 : 타입스크립트의 기능!
// ! 인터페이스에 포함되지 않는 키를 객체에 담아 할당하면 추가할 수 있드
// + 객체로 추가했을때 : 정상 추가됨
var etcData = {
    name: '객체로 새로운 키 추가',
    msg: '추가로 작성할 것은 이것!',
    age: 33
};
var p5 = etcData;
console.log({ p5: p5 });
var p6 = {
    name: 'mike',
    birthday: '1999-00-00',
    age: 22
};
var yearMap = {};
yearMap['1988'] = 1988;
yearMap['2000'] = '2000';
yearMap['3333'] = '3333';
var getInfo = function (name, age) {
    return '';
};
var getInfo2 = function (name, age) {
    var str = getInfo2.data
        ? getInfo2.data.reduce(function (acc, li) { return acc + li; }, name + age)
        : name + age;
    return str;
};
var data = ['왜 이렇게', '되는걸까용'];
console.log(getInfo2('zuzu', 33)); //zuzu33
getInfo2.data = data;
console.log(getInfo2.data);
console.log(getInfo2('zuzu', 33)); //zuzu33왜 이렇게되는걸까용
var SomePerson = /** @class */ (function () {
    // 생성자함수, 생성할때 받는 매개변수의 타입지정
    function SomePerson(name, age) {
        // 매겨변수로 this.name, this.age의 값 할당
        this.name = name;
        this.age = age;
    }
    SomePerson.prototype.isYongerthan = function (age) {
        return this.age < age;
    };
    return SomePerson;
}());
var mi = new SomePerson('은지', 33);
console.log(mi.name, mi.age, mi.isYongerthan(44));
var p8 = {
    height: 160,
    name: 'hwang',
    age: 33
};
console.log({ p8: p8 });
