"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var msg = 'welcome back';
console.log(msg);
// 타입 선언하기
var isBeginner = true;
var total = 0;
var name = 'hwang';
var sentence = "my name is " + name;
console.log({ sentence: sentence });
// null, undefined는 모든타입 선언가능!
var n = null;
var u = undefined;
var isNew = null;
var myName = undefined;
// array, object 타입선언
// let list1: number[] = [1, 2, 'me'];
var list2 = [1, 2, 3];
// let list3: Array<number> = [1, 2, 'me'];
var list4 = [1, 2, 3];
var list5 = ['a', 'b', 'c'];
var person1 = ['string', 2];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log({ c: c });
var randomValue = 10;
randomValue = 'string';
randomValue = 10;
console.log(randomValue.name);
// randomValue();
console.log(String(randomValue).toUpperCase());
// 함수 선언과 매게변수 타입 지정
function hasName(obj) {
    return !!obj && typeof obj === 'object' && 'name' in obj;
    // obj가 false이고, obj타입이 object이고 name키가 obj에 들었을때 true 반환
    // 하나라도 아닐때 false 반환
}
console.log(hasName({ name: 'string' })); // true
console.log(hasName({ age: 12 })); // false
console.log(hasName('string')); // false
console.log(hasName(12)); // false
var multiType;
multiType = 30;
multiType = false;
// multiType = 'string'; // 불가능
var anyType;
anyType = 12;
anyType = true;
anyType = 'sting';
anyType = [1, 2, 'array'];
anyType = { name: 'hwang', age: 20 };
function add(num1, num2) {
    // return num1 + num2 + 'string';
    if (num2) {
        return num1 + num2;
    }
    else {
        // return num1 + 'string'; // 반환값이 number만 가능
        return num1; // 반환값이 number만 가능
    }
}
add(2, 4);
add(4); // 2번 인자  ? 넣어도 되고 안넣어도됨
function fullName(person) {
    console.log(person.firstName + " " + person.lastName);
}
var p1 = { firstName: 'zuzu', lastName: 'hwang' };
var p2 = { firstName: 'zuzu' };
var p3 = { lastName: 'hwang' };
fullName(p1);
fullName(p2);
// fullName(p3);
var Employee = /** @class */ (function () {
    function Employee(name) {
        this.employeeName1 = name + 1;
        this.employeeName2 = name + 2;
    }
    Employee.prototype.greet = function () {
        console.log("good morning " + this.employeeName1);
        console.log("good morning " + this.employeeName2);
    };
    return Employee;
}());
var Manage = /** @class */ (function (_super) {
    __extends(Manage, _super);
    function Manage(managerName) {
        return _super.call(this, managerName) || this;
    }
    Manage.prototype.delegaterWork = function () {
        console.log("Manager delegating tasks");
    };
    return Manage;
}(Employee));
var emp1 = new Employee('zuzu');
console.log(emp1.employeeName1);
// console.log(emp1.employeeName2);
console.log(emp1.greet());
var m1 = new Manage('mimi');
m1.delegaterWork();
m1.greet();
console.log(m1.employeeName1);
// console.log(m1.employeeName2);
