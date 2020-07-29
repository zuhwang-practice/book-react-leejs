// + 제네릭으로 리펙터링 하기
function makeNumberArray(defaultValue, size) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(defaultValue + i);
    }
    return result;
}
function makeStringArray(defaultValue, size) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(defaultValue + (i + 1));
    }
    return result;
}
var numArr = makeNumberArray(1, 10);
var strArr = makeStringArray('hwang', 10);
console.log({ numArr: numArr, strArr: strArr });
function arrayMaker(defaultValue, size) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(defaultValue + (1 + i));
    }
    return result;
}
var numArr2 = arrayMaker(1, 10);
var strArr2 = arrayMaker('hwang', 10);
console.log({ numArr2: numArr2, strArr2: strArr2 });
// ! 함수오버로드로 코드를 개선했지만, 내부 조정값의 영향으로 출력되는 결과가 위와 다름.
// ! 지금은 2가지 타입이지만, 타입종류가 많아진가면 여러 줄의 타입지정을 추가해야함 번거렁
// * 제네릭으로 더 효율적으로 관리해보댜!
function arrayMakerGeneric(defaultValue, size) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(defaultValue);
    }
    return result;
}
// ! T자리에 제네릭 전달 = number와 string을 명시적으로 작성하였음
var Arr1 = arrayMakerGeneric(1, 10);
var Arr2 = arrayMakerGeneric('hwang', 10);
// ! T자리에 제네릭전달 하지 않았지만, 구동은 된다
// ! 왜? 첫번째 매개변수자리가 T를 나타내기 때문에 자동타입이 지정됨!
var Arr3 = arrayMakerGeneric(1, 10);
var Arr4 = arrayMakerGeneric('hwang', 10);
console.log({ Arr1: Arr1, Arr2: Arr2, Arr3: Arr3, Arr4: Arr4 });
// + 제네릭으로 클래스 구현
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    return Stack;
}());
var numStack = new Stack();
numStack.push(0);
numStack.push(2);
numStack.push(4);
numStack.push(6);
console.log(numStack.items);
numStack.pop();
console.log(numStack.items);
// + 제네릭 타입 제한하기 : extends
function identity(p1) {
    return p1;
}
identity(1);
identity('1');
function pp(p1, p2, name) {
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
var p1 = { name: '치마', price: 20000 };
var p2 = { name: 'hwang', age: 33 };
// pp(p1, p2, 'hwang'); // p1의 타입인 Prod는 Person의 필수 타입을 충족하지 않아 에러
pp(p2, p2, 'name'); // 모든거 충족함
pp(p2, p2, 'age'); // 모든거 충족함
var pMap = {};
pMap.name = true;
pMap.age = false;
// 결과: type TTT = { name: string; age: number };
var im = { name: 'hwang', age: 33 };
var im2 = { name: 'hwang', msg: '메쉐징' };
// const im22: TTT2 = { name: 'hwang'};
// const im222: TTT2 = { name: 'hwang', msg: '메쉐징' ,age: 33  };
console.log({ im: im, im2: im2 });
var myInfo = { name: 'hwang', msg: '메세-지야' };
console.log({ myInfo: myInfo });
var typeExc1 = '문자열';
var typeExc11 = 1233;
// const typeExc111: TypeExc1 = []; // 배열은 안됨
var typeExc2 = 3;
var typeExc22 = 7;
// const typeExc222: TypeExc2 = 5; // 는 안됨
var typeExc222 = 5; // ! Extract는 됨
var typeExc3 = '문자열';
var typeExc33 = 1233;
// const typeExc333: TypeExc3 = () => {};// 함수는 안됨
var typeExc333 = function () { }; // ! Extract는 됨
function f1(s) {
    return s.length;
}
var spt_A = 'name';
var spt_B = 'nation';
// const spt3: SPT = 'messages'; // string타입이 아니기 때문에 SPT타입에 서 걸러짐
// const spt4: SPT = 'age'; // string타입이 아니기 때문에 SPT타입에 서 걸러짐
var spt2 = { name: 'hwang', desc: '설명불라불라', nation: 'korea' };
console.log({ spt_A: spt_A, spt_B: spt_B, spt2: spt2 });
var p = {
    // name,age, nation중에 nation, age를 제거했음으로
    // TypeOmit 은 name 키만 갖는다
    name: 'mike'
};
var newP = {
    name: 'nimo',
    age: '2',
    nation: 'koreaa'
};
// + 타입 추론
// ! let
var v1 = 123;
var v2 = 'v2 입니다만';
v1 = 11111;
v2 = '11111'; // 타입오류
// v1 = '123'; // 타입오류
// v2 = 123; // 타입오류
// ! const 변수의 타입 추론은 주의
var v3 = 123; // ? v3의 리터럴은 숫자 123이 아닌 타입이 된다
var v4 = 'VVVV4444';
var v5; // ? v5 : 123|'VVVV4444' 둘중 하나의 값만 갖을 수 있다
v5 = 123;
v5 = 'VVVV4444';
// v5 = 'v4'; // error
// v5 = 456; // error
// ! 배열 타입추론
var arr1 = [10, 20, 30];
var n1 = arr1[0], n2 = arr1[1], n3 = arr1[2];
arr1.push(123);
// arr1.push('123');
console.log({ n1: typeof n1, n2: typeof n2, n3: typeof n3 });
var arr2 = [10, 20, '30'];
var n4 = arr1[0], n5 = arr1[1], s1 = arr1[2];
console.log({ n4: typeof n4, n5: typeof n5, s1: typeof s1 }); // 왜 s1이 숫자야?
var ps1 = { name: 'person', age: 1 };
var ko1 = { name: 'hwang', age: 33, isLiveInSeoul: false };
var jp1 = { name: 'hwang', age: 33, isLiveInTokyo: true };
var UnionType1 = [ps1, ko1, jp1]; // 3개타입의 서브타입인 Person이 타입이된다
var UnionType2 = [ko1, jp1]; // 서브타입이 없음으로 Kprean, Japanese2타입을 갖는 변수 타입이다. (Korean,Japanese)[]
// ! 객체의 타입추론
var obj = {
    id: 123,
    date: '2020-07-29',
    data: [
        { id: 1, name: '밥먹기' },
        { id: 2, name: '청소하기' },
    ]
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
function func1(a, b) {
    if (a === void 0) { a = 'abc'; }
    if (b === void 0) { b = 10; }
    return a + " " + b;
}
var result = func1('문자열', 123);
console.log({ result: result });
// ! 타입가드 활용
// ! typeof 키워드
function pring(value) {
    if (typeof value === 'number') {
        return value.toFixed(2); // number객체의 메서드 사용
    }
    else {
        return value.trim(); // string객체의 메서드 사용
    }
}
var returnNum = pring(1234556);
var returnStr = pring('문자열일때?');
console.log({ returnNum: returnNum, returnStr: returnStr });
// ! instanceof 키워드
// 클래스의 경우 instanceof 키워드로 해당 클래스로 생성된는지 확인
var Person = /** @class */ (function () {
    function Person(name, age) {
        // 생성자 매개변수의 타입정의
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
function printClass(value) {
    console.log('name: ', value.name);
    if (value instanceof Person) {
        console.log('age: ', value.age);
    }
    else {
        console.log('price: ', value.price);
    }
}
var person = new Person('zuzu', 22);
var product = new Product('검정치마', 22500);
printClass(person);
printClass(product);
function printDUT(value) {
    console.log('name: ', value.name);
    if (value.type === 'person') {
        console.log('age: ', value.age);
    }
    else {
        console.log('price: ', value.price);
    }
}
var person_DUT = { type: 'person', name: '왕자', age: 22 };
var product_DUT = {
    type: 'product',
    name: '공주옷',
    price: 3123123
};
printDUT(person_DUT);
printDUT(product_DUT);
