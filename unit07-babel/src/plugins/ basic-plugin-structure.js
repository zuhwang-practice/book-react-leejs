module.exports = function ({ types: t }) {
  const node = t.BinaryExpression('+', t.Identifier('a'), t.Indentifier('b'));
  console.log('isBinaryEspression:', t.inBinaryExpression(node));
  return {};
};
