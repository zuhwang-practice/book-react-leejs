const BODY = [
  {
    type: '로직1',
  },
  {
    type: '로직2',
  },
  {
    type: '로직3',
  },
  // {
  //   type: '리턴',
  // },
  // {
  //   type: '리턴',
  // },
  {
    type: '로직4',
  },
];

const START_LOG = {
  type: 'START_LOG',
};
const END_LOG = {
  type: 'END_LOG',
};
const RETURN_LOG = {
  type: 'RETURN_LOG',
};

// 아무것도 없을때 푸시로 3개 다 넣기
// BODY.unshift(START_LOG);
// console.log('시작로그 추가-----------\n', BODY);
if (BODY.filter((li) => li.type === '리턴').length > 0) {
  const index = [];
  BODY.filter((li, idx) => (li.type === '리턴' ? index.push(idx) : null));
  BODY.splice(index[0], 0, RETURN_LOG);
  console.log('리턴로그 추가-----------\n', BODY);
} else {
  BODY.push(END_LOG);
  console.log('엔드로그 추가-----------\n', BODY);
}

// // 리턴 있음 - 시작, 리턴전에 넣기
// if (BODY.length > 0 && BODY.filter((b) => b.type === 'ReturnStatement')) {
//   BODY.push(LOG);
//   BODY.splice(BODY.length - 1, 0, LOG);
// }

// console.log(BODY);
