const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpusCount = os.cpus().length;
  console.log(`CPUs: ${cpusCount}`);
  console.log('Master started');
  for (let i = 0; i < cpusCount - 1; i++) {
    const worker = cluster.fork();
    worker.on('exit', () => {
      // taskkill /F /PID
      console.log(`Worker died. Pid: #${worker.process.pid}`);
      cluster.fork();
    });
    worker.send(`Hello from worker #${worker.process.pid}`);
  }
}

if (cluster.isWorker) {
  require('./worker');
  process.on('message', (msg) => {
    console.log(msg);
  })
  process.send(`Request from worker`);
}