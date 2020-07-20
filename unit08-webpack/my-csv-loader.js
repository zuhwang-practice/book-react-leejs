module.exports = function (src) {
  // 모듈을 사용하는 쪽에서 받게 될 데이터 = result
  const result = { header: undefined, rows: [] };
  // 문자열로 입력된 csv모듈의 내용을 파싱하여 result객체에 저장
  const rows = src.split('\n');
  for (const row of rows) {
    const cols = row.split(',');
    if (!result.header) {
      result.header = cols;
    } else {
      result.rows.push(cols);
    }
  }
  return `export default ${JSON.stringify(result)}`;
};
