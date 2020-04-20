const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParseer = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');

mongoose.connect('mongodb://localhost:auth/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParseer.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);
