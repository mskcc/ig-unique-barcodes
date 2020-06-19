var express = require('express');
var quoteRouter = require('./quote');

var app = express();

app.use('/quote/', quoteRouter);

module.exports = app;
