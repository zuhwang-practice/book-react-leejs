module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        // ExpressionStatement type을 갖을때 호출
        if (t.isCallExpression(path.node.expression)) {
          if (t.isMemberExpression(path.node.expression.callee)) {
            // 노드체이닝이 넘 길어서 변수에 넣고 다시 체이닝
            const calleeNode = path.node.expression.callee;
            if (
              calleeNode.object.name === 'console' &&
              calleeNode.property.name === 'log'
            ) {
              path.remove(); // 조건에 맞으면 코드 최상위 제거! === console.log() 제거하게됨
            }
          }
        }
      },
    },
  };
};
