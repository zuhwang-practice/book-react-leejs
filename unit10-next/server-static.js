const express = require('express');

const server = express();
server.use(express.static('out'));
server.listen(3000, (err) => {
  if (err) throw err;
  console.log(`
    http://localhost:3000
    http://localhost:3000/page3
    http://localhost:3000/page3-hi
    http://localhost:3000/page3-bye
  `);
});
