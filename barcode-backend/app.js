const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const cors = require('cors');

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require('mongoose');
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== 'test') {
      console.log('Connected to %s', MONGODB_URL);
      console.log('App is running ... \n');
      console.log('Press CTRL + C to stop the process. \n');
    }
  })
  .catch((err) => {
    const errMessage = `Failed to connect to Mongo: "${err.message}"`;
    console.error(errMessage);
    throw new Error(errMessage);
  });

// REMOVE ME - populateDB
// const {populateDB} = require('./models/setup_deleteMe');
// populateDB();

var port = process.env.PORT || 3222;
const hostname = '127.0.0.1';

var publicDir = path.join(__dirname, 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsConfig = {
  origin: true,
  credentials: true,
};

//To allow cross-origin requests
app.use(cors(corsConfig));

//Route Prefixes
app.use('/api/', apiRouter);
app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(publicDir, 'favicon.ico'));
});

app.use('*', function (req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
  // return apiResponse.notFoundResponse(res, 'Page not found');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = server;
