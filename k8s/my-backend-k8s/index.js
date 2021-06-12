const {v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();
const appId = uuidv4();
const port = 5000;

app.get('/api', (_req, res) => {
  res.send(`[${appId}] Hello from mybackend server`)
});

app.listen(port, _err => {
  console.log(`App listening on port ${port}`)
});