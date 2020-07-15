module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        console.log('Identifier name:', path.node.name);
      },
      BinaryExpression(path) {
        console.log('BinaryExpression operator: ', path.node.operator);
      },
    },
  };
};
