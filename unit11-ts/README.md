- [정적 타입 언어](#정적-타입-언어)
- [타입스크립트](#타입스크립트)
  - [타입스크립트 + jest 테스트코드 작성하기](#타입스크립트--jest-테스트코드-작성하기)
  - [타입스크립트 basic](#타입스크립트-basic)
  - [인터페이스](#인터페이스)
  - [타입 호환성](#타입-호환성)
  - [타입스크립트 고급기능](#타입스크립트-고급기능)
  - [타입스크립트 환경구축](#타입스크립트-환경구축)
  - [리액트에 타입스크립트 적용](#리액트에-타입스크립트-적용)

# 정적 타입 언어

동적 & 정적 타입 언어간의 장단점이 서로 다름으로 회사/프로젝트 성격에 맞는 방식으로 개발하면 됨! 하지만 추세는 타입스크립트😋

> 동적 타입 언어 장단점
>
> - 코드 양이 적을때 생산성이 높음
> - 타입에 대한 고민 않고 작성, 배우기 쉽다
> - 런타임시 타입에러가 아~~~~주 잘 발견!🤪
>
> 정적 타입 언어 장단점
>
> - 코드 양이 많을때 생산성이 높음, 협업에 도움이 됨
>   - 코드의 타입이 서로 연결, 연관된 코드끼리 이동이 용이하며, 이름을 변경하는 등 리펙토링이 용이
>   - 임포트 하지 않고 코드를 작성해도 IDE가 자동으로 필요한 코드 임포트, 개꿀
>   - IDE에서 함수 호출 시 매개변수 타입과 반환값을 팝업으로 띄워 알려줌, 매개변수 확인 용이
>   - 잘못된 타입에 대해 IDE 가 수시로 체크 & 알랴줌
> - 변수 선언시 타입 고민해야함, 진입장벽 상대적으로 높음
> - 타입 오류가 컴파일시 발견

# 타입스크립트

마이크로소프트에서 개발하고 vscode를 타입스크립트로 만들어 테스트함. 타입스크립트로 개발할꺼면 vscode 추천
리액트개발자 의견을 아주 잘 반영해주어 리액트와 궁합이 굳이요~
경쟁 언어에 비해 생태계가 큼, 웬만한 라이브러리는 타입스크립트 정의 파일이 항상 존재함! 굳굳~

라이브러리의 타입스크립트 정의파일은 라이브러리가 각자 갖고있거나 **DefinitelyTyped 라는 깃헙 레포**에 포함되어 있단다!

- [타입스크립트 공식문서 : 영문](https://www.typescriptlang.org/docs/home.html)
- [타입스크립트 공식문서 : 한글](https://www.typescriptlang.org/docs/home.html)
- [타입스크립트 공식문서 : 한글 : 깃헙레포](https://www.typescriptlang.org/docs/home.html)
- [한국어 타입스크립트 리소스 리스트 : 깃헙레포](https://github.com/typescript-kr/awesome-typescript-korean)

## 타입스크립트 + jest 테스트코드 작성하기

개발모드에서 사용할 것임으로 -D 옵션과 함께 설치
`npm i -D typescript jest @types/jest ts-jest`

- `typescript` : 타입스크립트
- `jest` ; 제스트
- `@types/jest` : 제스트는 js로 작성되어있다, `@types/jest`는 타입스크립트를 읽기 위한 패키지
- `ts-jest` : 제스트에서 타입스크립트 실행하기 위한 패키지

## 타입스크립트 basic

[타입스크립트-basic](./typescript-basic.md) 에서 확인하기

- [교차(`&`)타입 & 유니온(`|`)타입](./typescript-basic.md#교차타입--유니온타입)
- [`type` 키워드로 타입지정](./typescript-basic.md#type-키워드로-타입지정)
- [`enum` 키워드로 열거 타입지정](./typescript-basic.md#enum-키워드로-열거-타입지정)
- [`enum` 타입 응용](./typescript-basic.md#enum-타입-응용)
  - [`getEnumLength()`](./typescript-basic.md#getenumlength)
  - [[`isValidEnumValue()`]](./typescript-basic.md#isvalidenumvalue)
- [`const enum` 상수 열거타입](./typescript-basic.md#const-enum-상수-열거타입)
- [함수 타입 정의하기](./typescript-basic.md#함수-타입-정의하기)
  - [1) function 키워드 함수 타입지정](./typescript-basic.md#1-function-키워드-함수-타입지정)
  - [2) 익명 함수 타입지정](./typescript-basic.md#2-익명-함수-타입지정)
  - [3) 화살포 함수 타입지정](./typescript-basic.md#3-화살포-함수-타입지정)
  - [4) 선택 매개변수 지정](./typescript-basic.md#4-선택-매개변수-지정)
    - [`?` 매개변수지정 법](./typescript-basic.md#-매개변수지정-법)
    - [`매개변수 : 타입 | undefined` - 언디파인드 유티온 방식](./typescript-basic.md#매개변수--타입--undefined---언디파인드-유티온-방식)
  - [5) 전개연산자 (나머지) 매개변수](./typescript-basic.md#5-전개연산자-나머지-매개변수)
  - [6) `this` 타입지정하기](./typescript-basic.md#6-this-타입지정하기)
- [원시타입 메서드 추가하기](./typescript-basic.md#원시타입-메서드-추가하기)
- [함수 오버로드 : 여러게 타입 정의하기](./typescript-basic.md#함수-오버로드--여러게-타입-정의하기)
- [명명된 매개변수 사용하기](./typescript-basic.md#명명된-매개변수-사용하기)

## 인터페이스

[타입스크립트-인터페이스](./typescript-interface.md) 에서 확인하기

- 객체타입지정
- 원시타입 메서드추가
- 인덱스타입 지정
- 함수타입 정의
- 클래스구현
- 인터페이스 합치기

## 타입 호환성

## 타입스크립트 고급기능

## 타입스크립트 환경구축

## 리액트에 타입스크립트 적용
