const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const routes = require('./../routes');
require('newrelic');

const app = express();

if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  app.set('port', process.env.PORT || 3001);

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.redirect('/rooms/1');
  });

  app.use(express.static('public/'));
  app.use(express.static('client/dist'));

  app.get('/rooms/:id', (req, res) => {
    const reactPath = path.join(__dirname, '../public/index.html');
    res.sendFile(reactPath);
  });

  app.use('/api', routes);
}

module.exports = app;
