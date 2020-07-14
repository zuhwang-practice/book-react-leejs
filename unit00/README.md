- [hooks 사용법 정리](#hooks-사용법-정리)
- [useState](#usestate)
  - [기본 사용법](#기본-사용법)
  - [객체 사용법](#객체-사용법)

# hooks 사용법 정리

[codevolution 유튜브 : hooks](https://www.youtube.com/watch?v=8DYlzVUTC7s&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A&index=8)

# useState

## 기본 사용법

`const [값, 값변경함수] = useState(초기값)`

- useState는 인자 2개를 갖는 **배열을 리턴**한다. `state`, `setState()`를 반환하니 distructure하여 사용
- distructure할 때는 꼭 `[`,`]`로 감싸기! `{`,`}` 아님! **배열리턴 잊지말기!**

## 객체 사용법

```jsx
// state - 객체 초기화
const [obj, setObj] = useState({ firstName: '', lastName: '' });

console.log(obj); //
setObj({ lastName: 'zuzu' });
console.log(obj);
setObj({ ...obj, lastName: 'zuzu' });
console.log(obj);
```

만약 state를 객체를 담는다면 ! `...obj` 사용을 잊지말자!
