import { addNum } from './util';

//! it-expect 문은 JEST에서 테스트코드를 작성할 때 사용하는 함수다.

it('add two numbers', () => {
  const result = addNum(1, 2);
  expect(result).toBe(3);
});
