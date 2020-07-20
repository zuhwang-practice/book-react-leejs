// commonjs 문법으로 exports 한다.
// require, module.exports={}

function func3() {
  console.log('func3 - commonjs');
}
function func4() {
  console.log('func4 - commonjs');
}

module.exports = { func3, func4 };
