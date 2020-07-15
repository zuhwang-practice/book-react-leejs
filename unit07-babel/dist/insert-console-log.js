function onFunc1() {
  console.log("call onFunc1");
  return '일반함수 타입: FunctionDeclaration';
}

const onFunc3 = function () {
  return '익명함수 변수지정: VariableDeclaration';
};

const onFunc4 = function () {
  return '화살표함수 타입: VariableDeclaration';
};
