export {}; // strict모드
let msg = 'welcome back';

console.log(msg);

// 타입 선언하기

let isBeginner: boolean = true;
let total: number = 0;
let name: string = 'hwang';
let sentence: string = `my name is ${name}`;
console.log({ sentence });

// null, undefined는 모든타입 선언가능!
let n: null = null;
let u: undefined = undefined;
let isNew: boolean = null;
let myName: string = undefined;

// array, object 타입선언

// let list1: number[] = [1, 2, 'me'];
let list2: number[] = [1, 2, 3];
// let list3: Array<number> = [1, 2, 'me'];
let list4: Array<number> = [1, 2, 3];
let list5: Array<string> = ['a', 'b', 'c'];
let person1: [string, number] = ['string', 2];

enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log({ c });

let randomValue: any = 10;
randomValue = 'string';
randomValue = 10;

console.log(randomValue.name);
// randomValue();
console.log(String(randomValue).toUpperCase());

// 함수 선언과 매게변수 타입 지정
function hasName(obj: any): obj is { name: string } {
  return !!obj && typeof obj === 'object' && 'name' in obj;
  // obj가 false이고, obj타입이 object이고 name키가 obj에 들었을때 true 반환
  // 하나라도 아닐때 false 반환
}

console.log(hasName({ name: 'string' })); // true
console.log(hasName({ age: 12 })); // false
console.log(hasName('string')); // false
console.log(hasName(12)); // false

let multiType: number | boolean;
multiType = 30;
multiType = false;
// multiType = 'string'; // 불가능

let anyType: any;
anyType = 12;
anyType = true;
anyType = 'sting';
anyType = [1, 2, 'array'];
anyType = { name: 'hwang', age: 20 };

function add(num1: number, num2?: number): number {
  // return num1 + num2 + 'string';
  if (num2) {
    return num1 + num2;
  } else {
    // return num1 + 'string'; // 반환값이 number만 가능
    return num1; // 반환값이 number만 가능
  }
}
add(2, 4);
add(4); // 2번 인자  ? 넣어도 되고 안넣어도됨
// add('string', 4);

interface Person {
  firstName: string;
  lastName?: string;
}
function fullName(person: Person) {
  console.log(`${person.firstName} ${person.lastName}`);
}

let p1 = { firstName: 'zuzu', lastName: 'hwang' };
let p2 = { firstName: 'zuzu' };
let p3 = { lastName: 'hwang' };
fullName(p1);
fullName(p2);
// fullName(p3);

class Employee {
  public employeeName1: string;
  private employeeName2: string;
  constructor(name: string) {
    this.employeeName1 = name + 1;
    this.employeeName2 = name + 2;
  }
  greet() {
    console.log(`good morning ${this.employeeName1}`);
    console.log(`good morning ${this.employeeName2}`);
  }
}
class Manage extends Employee {
  constructor(managerName: string) {
    super(managerName);
  }
  delegaterWork() {
    console.log(`Manager delegating tasks`);
  }
}
let emp1 = new Employee('zuzu');
console.log(emp1.employeeName1);
// console.log(emp1.employeeName2);
console.log(emp1.greet());
let m1 = new Manage('mimi');
m1.delegaterWork();
m1.greet();
console.log(m1.employeeName1);
// console.log(m1.employeeName2);
