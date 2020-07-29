const express = require('express');
const fs = require('fs');

const app = express();
app.get('/', (req, res) => {
  const html = fs.readFileSync('./template/index.html', 'utf8');
  // const ROOT_DIV = '<div id="root">';
  // const END_INDEX = html.indexOf(ROOT_DIV) + ROOT_DIV.length;
  // const beforeRoot = html.slice(0, END_INDEX);
  // const afterRoot = html.slice(END_INDEX);
  // const componentHTML = fs.readFileSync('./dist/index.html', 'utf8');

  // const resultHTML = beforeRoot.concat(componentHTML, afterRoot);
  console.log(req.url);
  res.send(resultHTML);
});

app.listen(3000, () => console.log('😈 http://localhost:3000 😈 '));
