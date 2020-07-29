const express = require('express');
const path = require('path');
const app = express();
// const router = express.Router(); // 라우터(get,post)기능 분리 추천!
// /static은 추가 주소로, 실제 주소와 다르게 경로를 바꿈
app.use(express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('/', (req, res) => {
  try {
    console.log('먼데에에에');
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  } catch (err) {
    res.status(404).send('ERROR');
  }
});
app.listen(3000, () => console.log('👻 http://localhost:3000'));
