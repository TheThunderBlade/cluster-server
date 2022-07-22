const http = require('http');

const PORT = 5000;
const pid = process.pid;

http.createServer((req, res) => {
  for (let i = 0; i< 1e7; i++) {};
  res.end(`Hello from NodeJS`);
}).listen(PORT, () => {
  console.log(`Server started on port ${PORT} with pid #${pid}`);
});