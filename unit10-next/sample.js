const { exportPathMap } = require('./next.config');

// const getExportPathMap = async () => {
//   const res = await exportPathMap();
//   const result = await res.json();
//   console.log(result);
//   return result;
// };

// const data = exportPathMap().then((data) => {
//   console.log('여기는 then', typeof data);
//   data.json();
// });
const prerenderList = exportPathMap();
console.log(typeof prerenderList);

for (const name in prerenderList) {
  console.log(name);
  console.log(prerenderList[name].page);
  console.log(prerenderList[name].query && prerenderList[name].query.text);
  // console.log({
  // name,
  // value: prerenderList[name],
  // path: `/${prerenderList[name].page}?text=${prerenderList[name].query.text}`,
  // });
}
