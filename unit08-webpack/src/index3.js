function myFunc() {
  // import 키워드로 동적임포팅 시작 , import는 프로미스 객체를 반환함으로 then 사용이 가능하다
  import('./util').then((
    add // util.js 내용이 번들 3.chunk.js에 번들됨
  ) =>
    import('lodash').then((
      { default: _ } // 번들폴더 2.chunk.js에 로데쉬 내용이 번들됨
    ) => console.log('value', _.fill([1, 2, 3], and(10, 20))))
  );
}
