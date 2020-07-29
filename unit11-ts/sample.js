const Fruit = {
  Orange: 0,
  Orange2: 1,
  Orange3: 2,
  Apple: '나는야 사과야',
  Banana: 5,
  Kiwi: '키키킼키위',
};

const getEnumLength = (obj) => {
  // 객체 겟수 구하기
  const length = Object.keys(obj).length;
  return length;
};
